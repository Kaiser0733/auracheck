const test=require('node:test'),a=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
test('renderer waits for the local background and draws it before dynamic text',async()=>{
 let image;const calls=[];
 const ctx=new Proxy({measureText:t=>({width:t.length*16}),createLinearGradient:()=>({addColorStop(){}}),createRadialGradient:()=>({addColorStop(){}})}, {get:(o,k)=>k in o?o[k]:(...args)=>calls.push([k,...args])});
 const sandbox={Image:class{constructor(){image=this;}set src(v){this.url=v;}},document:{createElement:()=>({getContext:()=>ctx})}};
 vm.runInNewContext(fs.readFileSync('js/render.js','utf8'),sandbox);
 a.equal(typeof sandbox.Render.ready?.then,'function');a.match(image.url,/assets\/night-window.webp/);
 image.onload();await sandbox.Render.ready;
 sandbox.Render.renderCard({palette:{bg:'#000000',ink:'#ffffff',glow:'#ffffff',stamp:'#ffffff'},headline:'Test title',sub:'Today',lines:['One','Two','Three'],stamp:'TEST',percents:{aura:40,delulu:20,toxic:20,chill:20},name:'Reader'});
 a.ok(calls.findIndex(c=>c[0]==='drawImage')<calls.findIndex(c=>c[0]==='fillText'));
 a.ok(calls.some(c=>c[0]==='fillText'&&c[1]==='Test title'));
});
