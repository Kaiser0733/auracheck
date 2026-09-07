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
   * Pick a card: same-day stability (siblings get same card), but free users
   * ROTATE through the 3 cards each week so variety exists even unpaid.
   * Pro: fresh random each time within the archetype's deck.
   */
  function pickCard(trait, cards, pro) {
    const list = cards[trait];
    const today = new Date();
    if (pro) return list[(today.getDate() + Math.floor(Math.random()*list.length)) % list.length];
    // free tier: rotate by week number so each week's card differs
    const week = Math.floor((today - new Date(today.getFullYear(),0,1)) / 604800000);
    return list[week % list.length];
  }

  global.Engine = { score, archetype, percentages, pickCard };
})(typeof module !== 'undefined' ? global : this);
