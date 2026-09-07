const test=require('node:test'),a=require('node:assert/strict');
const bank=require('../js/questions.js');
test('28 prompts; draws are five unique IDs and exhaust the pool before repeats',()=>{
 a.equal(bank.QUIZ.length,28); let remaining=[],stream=[];
 for(let i=0;i<20;i++){
  const draw=bank.Rotation.next(remaining,()=>0.37);
  a.equal(draw.ids.length,5);a.equal(new Set(draw.ids).size,5);
  a.ok(draw.ids.every(id=>bank.QUIZ.some(q=>q.id===id)));
  stream.push(...draw.ids);remaining=draw.remaining;
 }
 a.equal(new Set(stream.slice(0,28)).size,28);
});
test('rotation recovers invalid stored queue and does not mutate it',()=>{
 const saved=[1,1,999,2]; const copy=[...saved];
 const draw=bank.Rotation.next(saved,()=>0.5);
 a.deepEqual(saved,copy);a.equal(new Set(draw.ids).size,5);
 a.equal(bank.Rotation.next('broken').ids.length,5);
});
