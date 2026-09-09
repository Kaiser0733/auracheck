const test=require('node:test'),a=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
// The old test pinned the AI-generated background image. That image is gone on
// purpose — the card is a procedural riso print now. This pins the new contract:
// no Image loads at all, paper+halftone drawn before text, same payload = same pixels.
test('press needs no artwork and lays ink before type',()=>{
 const calls=[];const ctx=new Proxy({measureText:t=>({width:String(t).length*16}),createPattern:()=>({}),createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4)})},{get:(o,k)=>k in o?o[k]:(...args)=>(calls.push([k,...args]),{})});
 const sandbox={document:{createElement:()=>({getContext:()=>ctx,width:0,height:0}),createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4)}),putImageData:()=>{}},Image:class{constructor(){throw Error('renderer must not load images')}}};
 vm.runInNewContext(fs.readFileSync('js/render.js','utf8'),sandbox);
 a.equal(typeof sandbox.Render.renderCard,'function');
 const payload={palette:{bg:'#000000',ink:'#ffffff',glow:'#ffffff',stamp:'#ffffff'},headline:'Test title',sub:'Today',lines:['One','Two','Three'],stamp:'TEST',percents:{aura:40,delulu:20,toxic:20,chill:20},name:'Reader',createdAt:'2026-09-09T10:00:00Z'};
 sandbox.Render.renderCard(payload);
 a.ok(calls.findIndex(c=>c[0]==='putImageData')<calls.findIndex(c=>c[0]==='fillText'&&c[1]==='Test title'),'paper grain before headline');
 a.ok(calls.some(c=>c[0]==='arc'&&c[1]>0&&c[1]<90),'halftone dots present');
 a.ok(calls.some(c=>c[0]==='ellipse'),'proof circles present');
});
test('same payload prints the same sheet twice (seeded press)',()=>{
 const seq=[];const ctx=new Proxy({measureText:t=>({width:String(t).length*16}),createPattern:()=>({}),createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4)})},{get:(o,k)=>k in o?o[k]:(...args)=>(seq.push(k+JSON.stringify(args).replace(/\d+\.\d+/g,'')), {})});
 const sandbox={document:{createElement:()=>({getContext:()=>ctx,width:0,height:0}),createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4)}),putImageData:()=>{}}};
 vm.runInNewContext(fs.readFileSync('js/render.js','utf8'),sandbox);
 const payload={palette:{},headline:'Detour',sub:'Today',lines:['A','B'],stamp:'X',percents:{aura:25,delulu:25,toxic:25,chill:25},name:'K',createdAt:'2026-09-09T10:00:00Z'};
 const clean=s=>s.replace(/\d+\.\d+/g,'').replace(/<\/?/g,'');
 sandbox.Render.renderCard(payload);const first=seq.map(clean).join('|');
 seq.length=0;
 sandbox.Render.renderCard(payload);const second=seq.map(clean).join('|');
 a.equal(first,second,'two printings of one card must match');
});
