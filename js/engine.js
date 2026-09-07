// engine.js — quiz scoring + card selection (pure logic, testable)
(function (global) {

  /**
   * @param {number[]} answers - chosen option index per question
   * @param {Array} quiz - question bank [{options:[{weights:{}}]}, ...]
   * @returns {{a:number,d:number,t:number,c:number}}
   */
  function score(answers, quiz) {
    const tot = { aura:0, delulu:0, toxic:0, chill:0 };
    answers.forEach((optIdx, qi) => {
      if (optIdx === null) return;
      if (!Number.isInteger(optIdx) || !quiz[qi]?.options[optIdx]) throw new Error('Choose an answer or skip this question.');
      const opt = quiz[qi].options[optIdx];
      for (const k in (opt.weights||{})) tot[k] = (tot[k]||0) + opt.weights[k];
    });
    return tot;
  }

  /** @returns {'aura'|'delulu'|'toxic'|'chill'} - dominant trait, tie-break order aura>delulu>toxic>chill */
  function archetype(tot) {
    let best = 'aura', bestVal = -1;
    for (const k of ['aura','delulu','toxic','chill']) {
      const v = tot[k] || 0;
      if (v > bestVal) { bestVal = v; best = k; }
    }
    return best;
  }

  /** Normalize to whole percentages summing to 100 (largest-remainder). */
  function percentages(tot) {
    const keys = ['aura','delulu','toxic','chill'];
    const rawSum = keys.reduce((a,k)=>a+(tot[k]||0),0);
    if (rawSum === 0) return {aura:25,delulu:25,toxic:25,chill:25};
    const exact = keys.map(k => (tot[k]||0)/rawSum*100);
    const floor = exact.map(Math.floor);
    let rem = 100 - floor.reduce((a,b)=>a+b,0);
    const order = exact.map((v,i)=>({i,f:v-Math.floor(v)})).sort((a,b)=>b.f-a.f);
    const out = {...floor};
    for (let i=0;i<rem;i++) out[order[i].i]++;
    return { aura:out[0], delulu:out[1], toxic:out[2], chill:out[3] };
  }

  /**
   * Rotate the visual template by completed-card sequence.
   * personalize() supplies answer-based content independently of the template.
   */
  function pickCard(trait, cards, pro, sequence = 0) {
    const list = cards[trait];
    return list[Math.max(0, Math.trunc(sequence)) % list.length];
  }

  function personalize(answers, quiz, template) {
    const totals=score(answers,quiz);
    const ranked=Object.keys(totals).sort((a,b)=>totals[b]-totals[a]);
    const evidence=answers.flatMap((index,i)=>{
      if(index===null)return [];
      const question=quiz[i],option=question.options[index];
      return [{question:question.text,topic:question.topic||'Today',answer:option.text,
        trait:archetype(option.weights)}];
    });
    if(evidence.length<3)throw Error('Answer at least three questions.');
    const mixed=totals[ranked[0]]===totals[ranked[1]];
    const first=evidence.find(e=>e.trait===ranked[0]);
    // Include a contrasting answer when present, rather than hiding the rest of the day.
    const second=evidence.find(e=>e.trait!==first.trait)||evidence.find(e=>e!==first);
    const title={aura:'Confident',delulu:'Mind wandering',toxic:'Prickly',chill:'At ease'};
    const mix=ranked.filter(k=>totals[k]>0).map(k=>`${title[k]} ${totals[k]/10}`).join(' · ');
    const quip=mixed?'Today refused to pick a single genre.':template.lines[2];
    return {...template,
      headline:mixed?'Mixed Weather':template.headline,
      stamp:mixed?'A BIT OF BOTH':template.stamp,
      sub:`${evidence.length} answers today. ${mix}.`,
      lines:[`${first.topic}: “${first.answer}”`,`${second.topic}: “${second.answer}”`,quip],
      evidence,personalized:true};
  }

  global.Engine = { score, archetype, percentages, pickCard, personalize };
})(typeof module !== 'undefined' ? global : this);
