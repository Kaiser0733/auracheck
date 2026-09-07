const test=require('node:test'),assert=require('node:assert/strict');
const {QUIZ}=require('../js/questions.js');
require('../js/engine.js');
test('every prompt asks about today or right now, never usual personality',()=>{
 for(const q of QUIZ){assert.match(q.text,/today|right now/i);assert.doesNotMatch(q.text,/usually|usual|lately|would you/i);}
});
test('each daily mood can win without unrelated answers adding points',()=>{
 for(const trait of ['aura','delulu','toxic','chill']){
 const answers=QUIZ.map(q=>q.options.findIndex(o=>o.weights[trait]===10));
 assert.ok(answers.every(i=>i>=0),trait+' unavailable');
 assert.equal(Engine.archetype(Engine.score(answers,QUIZ)),trait);
 }
});
