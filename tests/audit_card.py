"""Card screen: DOM audit + live screenshot + vision verdict in one run."""
import json,time,urllib.request,websocket,base64
tab=next(t for t in json.load(urllib.request.urlopen('http://127.0.0.1:9222/json/list')) if t['type']=='page')
ws=websocket.create_connection(tab['webSocketDebuggerUrl'],timeout=20)
n=0
def call(m,p=None):
 global n;n+=1;ws.send(json.dumps({'id':n,'method':m,'params':p or {}}))
 while True:
  r=json.loads(ws.recv())
  if r.get('id')==n:return r
def ev(x):
 r=call('Runtime.evaluate',{'expression':x,'returnByValue':True,'awaitPromise':True})
 d=r.get('result',{}).get('result',{})
 if d.get('subtype')=='error':return 'ERR:'+str(d.get('description'))[:300]
 return d.get('value')
def wait(x):
 for _ in range(300):            # Android freezes renderers unpredictably; 30s budget
  if ev(x):return
  time.sleep(.1)
 raise AssertionError('timeout: '+x)
call('Page.bringToFront')
time.sleep(2)                      # give Android a beat to unfreeze the renderer
call('Emulation.setDeviceMetricsOverride',{'width':390,'height':844,'deviceScaleFactor':1,'mobile':True})
call('Page.navigate',{'url':'http://127.0.0.1:8481/'})
wait("document.readyState==='complete' && typeof Quota!=='undefined'")
ev("localStorage.clear()");call('Page.reload');wait("document.readyState==='complete' && typeof Quota!=='undefined'")
ev("document.getElementById('btn-start').click();document.getElementById('name-input').value='Aarav';document.getElementById('btn-name-next').click()")
wait("document.getElementById('screen-quiz').classList.contains('active')")
for _ in range(8):
 ev("document.querySelector('.opt').click();document.getElementById('btn-next').click()")
 time.sleep(.25)
wait("document.getElementById('screen-card').classList.contains('active')")
time.sleep(1.2)
# --- DOM audit: real measurements, no vision guesswork ---
audit=ev("""
(() => {
 const report=[];
 const vw=innerWidth, vh=innerHeight;
 document.querySelectorAll('#screen-card button, #screen-card h2, .masthead, footer, #card-canvas').forEach(el=>{
  const r=el.getBoundingClientRect();
  if (!r.width&&!r.height) return;
  report.push({el:el.tagName+'.'+(el.className||el.id||''),text:(el.textContent||'').trim().slice(0,22),
   x:Math.round(r.left),y:Math.round(r.top),w:Math.round(r.width),h:Math.round(r.height),
   offscreen: r.bottom>vh+1||r.right>vw+1});
 });
 // the one true contrast check: text-button color vs actual page bg
 const tb=document.querySelector('#screen-card .text-button');
 const cs=tb?getComputedStyle(tb):null;
 return JSON.stringify({vw,vh,report,backHomeColor:cs?cs.color:null,backHomeFont:cs?cs.fontSize:null});
})()
""")
print('AUDIT:',audit)
shot=call('Page.captureScreenshot',{'params':{'format':'png'}})
open('/data/data/com.termux/files/home/auracheck-card-live.png','wb').write(base64.b64decode(shot['result']['data']))
print('SAVED auracheck-card-live.png')
ws.close()
