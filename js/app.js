(function () {
  const $ = id => document.getElementById(id);
  const DRAFT = 'ac_draft_v7_rotation', HISTORY = 'ac_history_v1';
  let answers = [], qi = 0, name = '', selected, busy = false;
  let nextAllowedAt = 0, questions = [];
  function history() {
    const saved = Store.get(HISTORY);
    return Array.isArray(saved) ? saved.filter(p => p && p.palette && Array.isArray(p.lines)).slice(0,20) : [];
  }
  function draft() {
    const saved = Store.get(DRAFT);
    if (!saved || !Array.isArray(saved.answers) || !Number.isInteger(saved.qi) || saved.qi < 0 || saved.qi >= 5) return null;
    if (saved.answers.some(a => a !== null && (!Number.isInteger(a) || a < 0 || a > 3))) return null;
    if (!Array.isArray(saved.ids) || saved.ids.length!==5 || new Set(saved.ids).size!==5 || saved.ids.some(id=>!QUIZ.some(q=>q.id===id))) return null;
    return saved;
  }
  function persist() {
    Store.set(DRAFT,{answers,qi,name,selected,ids:questions.map(q=>q.id)});
    storageNote();
  }
  function storageNote() {
    $('storage-note').textContent = Store.persistent ? 'Local browser storage · no cloud backup' : 'Storage is unavailable. Progress lasts only in this tab; download your card.';
  }
  function show(id) {
    document.querySelectorAll('.screen').forEach(section => section.classList.toggle('active',section.id===id));
    window.scrollTo(0,0);
    const title = document.querySelector(`#${id} h1, #${id} h2`);
    if (title) { title.tabIndex=-1; title.focus({preventScroll:true}); }
    if (id==='screen-home') updateHome();
  }
  function updateHome() {
    const remaining = Quota.remaining();
    $('quota-pill').textContent = `${remaining} of 3 free cards left this week`;
    $('btn-resume').hidden = !draft();
    const monday = new Date(Quota.weekKey()+'T00:00:00Z');
    const reset = new Date(monday.getTime()+7*86400000-330*60000);
    $('reset-note').textContent = `Next reset: ${reset.toLocaleString(undefined,{weekday:'short',hour:'numeric',minute:'2-digit',timeZoneName:'short'})} (your time).`;
    storageNote();
  }
  function start() {
    if (Quota.remaining()<=0) {
      ShareKit.toast('Your free cards are used. Saved cards are still yours to share.');
      show('screen-history');renderHistory();return;
    }
    answers=[];qi=0;name='';selected=undefined;nextAllowedAt=0;questions=[];
    $('name-input').value='';show('screen-name');
  }
  function begin() {
    if(!questions.length){
      const draw=Rotation.next(Store.get('ac_rotation_v1'));
      questions=draw.ids.map(id=>QUIZ.find(q=>q.id===id));
      Store.set('ac_rotation_v1',draw.remaining);
    }
    name=$('name-input').value.trim().slice(0,20);
    persist();renderQuestion();show('screen-quiz');
  }
  function renderQuestion() {
    selected=answers[qi];
    $('quiz-progress').textContent=`${qi+1} / ${questions.length}`;
    $('quiz-bar-fill').max=questions.length;$('quiz-bar-fill').value=qi;
    typeOut($('q-text'),questions[qi].text);   // typewriter: the press sets the question live
    $('quiz-message').textContent='';
    $('btn-next').textContent=qi===questions.length-1?'Make my card':'Next question';
    const box=$('q-opts');box.replaceChildren();
    questions[qi].options.forEach((option,index)=>{
      const button=document.createElement('button');button.className='opt';
      button.textContent=option.text;button.onclick=()=>select(index);box.append(button);
    });
    syncSelection();
    $('q-text').focus({preventScroll:true});
  }
  function syncSelection() {
    [...$('q-opts').children].forEach((button,i)=>button.setAttribute('aria-pressed',String(selected===i)));
    $('btn-skip').setAttribute('aria-pressed',String(selected===null));
    $('btn-next').disabled=selected===undefined || busy;
  }
  function select(index) {
    if(busy)return;
    selected=index;answers[qi]=index;persist();syncSelection();
  }
  function next() {
    if(busy || selected===undefined || performance.now()<nextAllowedAt)return;
    nextAllowedAt=performance.now()+180;
    answers[qi]=selected;
    if(qi<questions.length-1){qi++;persist();renderQuestion();}
    else finish();
  }
  function back() {
    if(busy)return;
    if(qi>0){qi--;persist();renderQuestion();}else show('screen-name');
  }
  // typewriter — chars land with a human beat, not a metronome.
  // back() and resume() can interrupt; each call cancels the previous run.
  let typeTimer = 0;
  function typeOut(el, text) {
    clearTimeout(typeTimer);
    el.textContent = '';
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = text; return; }
    let i = 0;
    (function step() {
      if (el.dataset.typed !== undefined && el.textContent.length >= text.length) return;
      el.textContent = text.slice(0, ++i);
      if (i < text.length) typeTimer = setTimeout(step, 18 + Math.random() * 34);
    })();
  }

  function displayCard(payload) {
    const rendered=Render.renderCard(payload,{pro:false});
    const target=$('card-canvas');
    target.getContext('2d').clearRect(0,0,target.width,target.height);
    target.getContext('2d').drawImage(rendered,0,0);
    // stamp-thunk: the sheet lands on the felt, one small rotation settle
    target.classList.remove('thunk');
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      void target.offsetWidth;               // restart the animation
      target.classList.add('thunk');
    }
    const transcript=[payload.name,payload.headline,payload.sub,...payload.lines,
      ...Object.entries(payload.percents).map(([trait,pct])=>`${trait==='toxic'?'prickly':trait}: ${pct}%`),'Entertainment only.'].filter(Boolean).join(' ');
    target.setAttribute('aria-label',transcript);$('card-transcript').textContent=transcript;
    const basis=$('card-basis');basis.replaceChildren();
    (payload.evidence||[]).forEach(entry=>{
      const paragraph=document.createElement('p');
      paragraph.textContent=`${entry.question} — ${entry.answer}`;basis.append(paragraph);
    });
    if(!payload.evidence)basis.textContent='This older card has no saved answer breakdown.';
    $('card-explanation').open=false;
  }
  async function finish() {
    if(answers.filter(a=>Number.isInteger(a)).length<3){
      $('quiz-message').textContent='Answer at least three questions so the card has something to work with. Use Back to revisit skipped ones.';return;
    }
    busy=true;syncSelection();
    const complete=()=>{
      if(Quota.remaining()<=0)throw Error('Your free cards were used in another tab. Your draft is saved.');
      const totals=Engine.score(answers,questions),trait=Engine.archetype(totals);
      const old=history();
      const counts=Store.get('ac_variants_v1')||{};
      const sequence=Number.isInteger(counts[trait])?counts[trait]:0;
      const card=Engine.pickCard(trait,CARDS,false,sequence);
      const payload={...Engine.personalize(answers,questions,card),percents:Engine.percentages(totals),name,createdAt:new Date().toISOString()};
      displayCard(payload); // Rendering must succeed before spending a credit.
      if(!Quota.consume())throw Error('No credits left. Your draft is saved.');
      Store.set(HISTORY,[payload,...old].slice(0,20));
      Store.set('ac_variants_v1',{...counts,[trait]:sequence+1});
      Store.del(DRAFT);show('screen-card');storageNote();
    };
    try {
      await Render.ready;
      if(navigator.locks)await navigator.locks.request('auracheck-generate',complete);
      else complete();
    } catch(error){$('quiz-message').textContent=error.message;ShareKit.toast(error.message);}
    finally{busy=false;syncSelection();}
  }
  function renderHistory() {
    const box=$('history-list');box.replaceChildren();
    const cards=history();
    if(!cards.length){box.textContent='No cards yet. Your first completed card will appear here.';return;}
    cards.forEach(payload=>{
      const button=document.createElement('button');button.className='history-entry';
      button.textContent=`${payload.name||'Anonymous'} · ${payload.headline}`;
      button.onclick=async()=>{try{await Render.ready;displayCard(payload);show('screen-card');}catch{ShareKit.toast('This saved card could not be opened.');}};
      box.append(button);
    });
  }
  async function exportCard(share) {
    const button=$(share?'btn-share':'btn-save');button.disabled=true;
    try {
      const outcome=share ? await ShareKit.shareCanvas($('card-canvas'),`My aura today. Your turn: ${new URL('./',location.href).href}`) : await ShareKit.downloadCanvas($('card-canvas'));
      ShareKit.toast(outcome==='shared'?'Shared.':'Download started. Check your browser downloads.');
    } catch(error){if(error.name!=='AbortError')ShareKit.toast('Could not export. Your card is saved here; try again.');}
    finally{button.disabled=false;}
  }
  $('btn-start').onclick=start;$('btn-again').onclick=start;
  $('btn-name-next').onclick=begin;
  $('name-input').onkeydown=event=>{if(event.key==='Enter')begin();};
  $('btn-quiz-back').onclick=back;$('btn-next').onclick=next;$('btn-skip').onclick=()=>select(null);
  $('btn-pause').onclick=()=>{persist();show('screen-home');};
  $('btn-resume').onclick=()=>{
    const saved=draft();if(!saved)return;
    questions=saved.ids.map(id=>QUIZ.find(q=>q.id===id));
    answers=saved.answers;qi=saved.qi;name=String(saved.name||'').slice(0,20);
    $('name-input').value=name;renderQuestion();show('screen-quiz');
  };
  $('btn-history').onclick=()=>{renderHistory();show('screen-history');};
  $('btn-pro').onclick=()=>show('screen-pro');
  document.querySelectorAll('[data-home]').forEach(button=>button.onclick=()=>show('screen-home'));
  $('btn-share').onclick=()=>exportCard(true);$('btn-save').onclick=()=>exportCard(false);
  window.addEventListener('hashchange',()=>show('screen-home'));
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)updateHome();});
  window.addEventListener('storage',()=>updateHome());
  updateHome();
  if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{
    $('storage-note').textContent='Offline cache unavailable. Keep an internet connection while using this page.';
  });
})();
