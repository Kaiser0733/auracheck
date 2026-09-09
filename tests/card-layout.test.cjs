const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
function draw(){
 const marks=[];const ctx=new Proxy({font:'',measureText(t){return {width:String(t).length*22}},createImageData(w,h){return {data:new Uint8ClampedArray(w*h*4)}}},{get(o,k){return k in o?o[k]:(...args)=>{marks.push({op:k,args,color:o.fillStyle});return {}}}});
 const scope={document:{createElement:()=>({getContext:()=>ctx})},Image:class{constructor(){throw Error('No remote artwork')}}};
 vm.runInNewContext(fs.readFileSync('js/render.js','utf8'),scope);
 scope.Render.renderCard({headline:'Mind On A Detour',sub:'5 answers today.',name:'Kaiser',createdAt:'2026-09-07T10:00:00Z',lines:['Inner voice: “Asking one what-if after another.”','Feeling: “Settled. I feel fairly at ease.”','The director’s cut can wait.'],stamp:'MENTAL SIDE QUEST',percents:{aura:20,delulu:40,toxic:20,chill:20}});
 return marks;
}
test('card renders title and verdict once, no double-struck text',()=>{
 const marks=draw();for(const text of ['Mind On A Detour','MENTAL SIDE QUEST']) assert.equal(marks.filter(m=>m.op==='fillText'&&m.args[0]===text).length,1,text);
});
test('percentage bars encode 20/40/20/20 with reserved space for numbers',()=>{
 const bars=draw().filter(m=>m.op==='fillRect'&&m.args[3]===8&&m.color==='#d9a477');
 assert.equal(bars.length,4);assert.equal(bars[1].args[2],bars[0].args[2]*2);assert.ok(bars.every(m=>m.args[0]+m.args[2]<880));
});
