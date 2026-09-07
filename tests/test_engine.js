// tests/test_engine.js — no deps, plain assert. Run: node tests/test_engine.js

const assert = require('assert');
const { QUIZ } = require('../js/questions.js');
const { CARDS } = require('../js/cards.js');

global.Store = { get:()=>null, set:()=>{}, del:()=>{} };
require('../js/engine.js');
const { score, archetype, percentages, pickCard } = global.Engine;

let pass = 0;
function t(name, fn){ try { fn(); pass++; console.log('✓', name); } catch(e){ console.error('✗', name, e.message); process.exitCode = 1; } }

// --- data integrity ---
t('quiz has 8 questions', () => assert.strictEqual(QUIZ.length, 8));
t('every question has exactly 4 options', () =>
  QUIZ.forEach(q => assert.strictEqual(q.options.length, 4, `q${q.id}`)));
t('option weights are sane', () => {
  QUIZ.forEach(q => q.options.forEach(o => {
    const s = Object.values(o.weights).reduce((a,b)=>a+b,0);
    assert.ok(s >= 2 && s <= 10, `q${q.id} weight ${s}`);
  }));
});
t('cards exist for all 4 traits (3 each)', () => {
  ['aura','delulu','toxic','chill'].forEach(k => assert.ok(Array.isArray(CARDS[k]) && CARDS[k].length >= 3));
});
t('every card has exactly 3 funny lines', () => {
  Object.values(CARDS).flat().forEach(c => assert.strictEqual(c.lines.length, 3, c.id));
});
t('each card has stamp + palette', () => {
  Object.values(CARDS).flat().forEach(c => { assert.ok(c.stamp && c.palette.bg && c.palette.glow && c.palette.ink); });
});

// --- scoring ---
t('mixed answers sum weights correctly', () => {
  const tot = score([0,1], QUIZ); // q1.opt0: post aesthetic story (t4,d4,a2); q2.opt1: video essay (a3,d3,c4)
  assert.strictEqual(tot.delulu, 7);
  assert.strictEqual(tot.chill, 4);
  assert.strictEqual(tot.aura, 5);
  assert.strictEqual(tot.toxic, 4);
});
t('archetype picks max weight', () => {
  assert.strictEqual(archetype({aura:20,delulu:10,toxic:5,chill:1}), 'aura');
});
t('archetype tie breaks in declared order', () => {
  assert.strictEqual(archetype({aura:5,delulu:5,toxic:5,chill:5}), 'aura');
});
t('percentages sum exactly 100', () => {
  const p = percentages({aura:1,delulu:1,toxic:1,chill:1});
  assert.strictEqual(p.aura+p.delulu+p.toxic+p.chill, 100);
});
t('percentages handle zeros', () => {
  const p = percentages({aura:10,delulu:0,toxic:0,chill:0});
  assert.strictEqual(p.aura, 100);
});
t('empty score → even 25/25/25/25', () => {
  const p = percentages({});
  assert.deepStrictEqual(p, {aura:25,delulu:25,toxic:25,chill:25});
});

// --- card pick ---
t('free tier rotates weekly', () => {
  const c = pickCard('aura', CARDS, false);
  assert.ok(CARDS.aura.includes(c));
});
t('pro tier returns a valid card', () => {
  const c = pickCard('toxic', CARDS, true);
  assert.ok(CARDS.toxic.includes(c));
});

console.log(`\n${pass} tests passed`);
