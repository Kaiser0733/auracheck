const test=require('node:test'),a=require('node:assert/strict');
const {QUIZ}=require('../js/questions.js'),{CARDS}=require('../js/cards.js');require('../js/engine.js');
const pick=(q,t)=>q.options.findIndex(o=>o.weights[t]);
test('same category but different answers produces different supporting lines',()=>{
 const qs=QUIZ.slice(0,5),aa=qs.map(q=>pick(q,'aura'));
 const x=Engine.personalize(aa,qs,CARDS.aura[0]);
 const other=QUIZ.slice(5,10),y=Engine.personalize(other.map(q=>pick(q,'aura')),other,CARDS.aura[0]);
 a.notDeepEqual(x.lines,y.lines);a.equal(x.evidence.length,5);
 a.ok(x.lines[0].includes(qs[0].options[aa[0]].text));
});
test('ties are mixed, skips create no evidence, and input templates stay unchanged',()=>{
 const qs=QUIZ.slice(0,5),answers=['aura','chill','aura','chill',null].map((t,i)=>t===null?null:pick(qs[i],t));
 const before=JSON.stringify(CARDS.aura[0]);const x=Engine.personalize(answers,qs,CARDS.aura[0]);
 a.equal(x.headline,'Mixed Weather');a.equal(x.evidence.length,4);a.equal(x.lines.length,3);
 a.equal(JSON.stringify(CARDS.aura[0]),before);a.match(x.sub,/4 answers/);
});
