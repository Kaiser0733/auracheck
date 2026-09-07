// app.js — AuraCheck orchestration
(function () {
  const $ = id => document.getElementById(id);
  const screens = ['screen-home','screen-name','screen-quiz','screen-ritual','screen-card','screen-pro'];

  let answers = [];
  let qi = 0;
  let name = '';

  function show(id) {
    screens.forEach(s => document.getElementById(s).classList.toggle('active', s === id));
  }

  function updateQuotaPill() {
    const r = Quota.remaining();
    const el = $('quota-pill');
    if (Quota.isPro()) el.innerHTML = '<b>✦ pro</b> — unlimited cards';
    else el.innerHTML = `<b>${r}</b> card${r===1?'':'s'} left this week`;
  }

  const ritualLines = [
    'reading your aura...',
    'consulting the receipts...',
    'this is going to hurt (affectionately)...',
    'finalizing the verdict...',
  ];

  function startQuiz() {
    if (!Quota.isPro() && Quota.remaining() <= 0) {
      ShareKit.toast('out of cards this week 💀 pro = unlimited');
      show('screen-pro');
      return;
    }
    answers = []; qi = 0; name = '';
    $('name-input').value = '';
    show('screen-name');
  }

  function startQuizAfterName() {
    name = $('name-input').value.trim();
    qi = 0;
    renderQuestion();
    show('screen-quiz');
  }

  function renderQuestion() {
    const q = QUIZ[qi];
    $('quiz-progress').textContent = `${qi+1} / ${QUIZ.length}`;
    $('quiz-bar-fill').style.width = `${((qi)/QUIZ.length)*100}%`;
    $('q-text').textContent = q.text;
    const box = $('q-opts');
    box.innerHTML = '';
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'opt';
      btn.textContent = opt.text;
      btn.onclick = () => pickOption(i);
      box.appendChild(btn);
    });
    $('quiz-bar-fill').style.width = `${((qi+1)/QUIZ.length)*100}%`;
  }

  function quizBack() {
    if (qi > 0) { qi--; answers.pop(); renderQuestion(); }
    else show('screen-name');
  }

  function pickOption(i) {
    answers.push(i);
    qi++;
    if (qi < QUIZ.length) renderQuestion();
    else runRitual();
  }

  function runRitual() {
    show('screen-ritual');
    let step = 0;
    const el = $('ritual-line');
    el.textContent = ritualLines[0];
    const ticks = setInterval(() => {
      step++;
      if (step < ritualLines.length) {
        el.textContent = ritualLines[step];
      } else {
        clearInterval(ticks);
        finishQuiz();
      }
    }, 750);
    // safety: total ritual ~3s
  }

  function finishQuiz() {
    Quota.consume();
    const totals = Engine.score(answers, QUIZ);
    const trait = Engine.archetype(totals);
    const card = Engine.pickCard(trait, CARDS, Quota.isPro());
    const percents = Engine.percentages(totals);
    const payload = { ...card, percents, name };
    const cv = Render.renderCard(payload, { pro: Quota.isPro() });
    const target = $('card-canvas');
    target.getContext('2d').drawImage(cv, 0, 0);
    show('screen-card');
    ShareKit.toast('your aura has been judged ✦');
    updateQuotaPill();
  }

  async function doShare() {
    const cv = $('card-canvas');
    try {
      const how = await ShareKit.shareCanvas(cv, 'my aura report — check yours');
      ShareKit.toast(how === 'shared' ? 'sent ✦' : 'saved to downloads');
    } catch (e) {
      if (e.name !== 'AbortError') ShareKit.toast('share failed — try save');
    }
  }

  function doUnlock() {
    const code = $('unlock-input').value;
    const msg = $('unlock-msg');
    if (Quota.unlock(code)) {
      msg.textContent = 'unlocked ✦ welcome to pro';
      msg.className = 'unlock-msg ok';
      updateQuotaPill();
    } else {
      msg.textContent = 'invalid code';
      msg.className = 'unlock-msg err';
    }
  }

  function wire() {
    $('btn-start').onclick = startQuiz;
    $('btn-pro').onclick = () => show('screen-pro');
    $('btn-back-home').onclick = () => show('screen-home');
    $('btn-name-next').onclick = startQuizAfterName;
    $('name-input').addEventListener('keydown', e => { if (e.key === 'Enter') startQuizAfterName(); });
    $('btn-quiz-back').onclick = quizBack;
    $('btn-share').onclick = doShare;
    $('btn-save').onclick = () => ShareKit.downloadCanvas($('card-canvas'));
    $('btn-again').onclick = startQuiz;
    $('btn-unlock').onclick = doUnlock;
    updateQuotaPill();
  }

  document.addEventListener('DOMContentLoaded', wire);
})();
