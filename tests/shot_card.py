"""Drive the live X11 Chromium tab to the card screen, then screenshot it."""
import json,time,urllib.request,websocket
tabs=json.load(urllib.request.urlopen('http://127.0.0.1:9222/json/list'))
tab=next(t for t in tabs if t['type']=='page')
ws=websocket.create_connection(tab['webSocketDebuggerUrl'],timeout=20)
n=0
def call(m,p=None):
 global n;n+=1;ws.send(json.dumps({'id':n,'method':m,'params':p or {}}))
 while True:
  r=json.loads(ws.recv())
  if r.get('id')==n:return r
def ev(x):
 r=call('Runtime.evaluate',{'expression':x,'returnByValue':True,'awaitPromise':True})
 if 'exceptionDetails' in r:raise RuntimeError(r['exceptionDetails'].get('exception',{}).get('description'))
 return r['result'].get('result',{}).get('value')
def wait(x):
 for _ in range(80):
  if ev(x):return True
  time.sleep(.1)
 raise AssertionError('timeout: '+x)
call('Emulation.setDeviceMetricsOverride',{'width':390,'height':844,'deviceScaleFactor':1,'mobile':True})
call('Page.navigate',{'url':'http://127.0.0.1:8481/'})
wait("document.readyState==='complete' && typeof Quota!=='undefined'")
ev("localStorage.clear()")
call('Page.reload')
wait("document.readyState==='complete' && typeof Quota!=='undefined'")
ev("document.getElementById('btn-start').click();document.getElementById('name-input').value='Aarav';document.getElementById('btn-name-next').click()")
wait("document.getElementById('screen-quiz').classList.contains('active')")
for _ in range(8):
 ev("document.querySelector('.opt').click();document.getElementById('btn-next').click()")
 time.sleep(.25)
wait("document.getElementById('screen-card').classList.contains('active')")
time.sleep(1.5)
shot=call('Page.captureScreenshot',{'format':'png'})['result']['data']
import base64
open('/data/data/com.termux/files/home/auracheck-card-live.png','wb').write(base64.b64decode(shot))
print('CARD SCREEN CAPTURED, quota:',ev('Quota.remaining()'),', card aria:',ev("document.getElementById('card-canvas').getAttribute('aria-label')")[:80])
ws.close()
