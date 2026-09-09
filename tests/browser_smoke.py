"""Bounded CDP smoke test. Only opens a NEW isolated browser context."""
import json, time, urllib.request, websocket, sys
version=json.load(urllib.request.urlopen('http://127.0.0.1:9222/json/version'))
ws=websocket.create_connection(version['webSocketDebuggerUrl'],timeout=20)
serial=0

def call(method,params=None,session=None):
 global serial
 serial+=1; packet={'id':serial,'method':method,'params':params or {}}
 if session: packet['sessionId']=session
 ws.send(json.dumps(packet))
 while True:
  reply=json.loads(ws.recv())
  if reply.get('id')==serial:
   if 'error' in reply: raise RuntimeError(reply['error'])
   return reply.get('result',{})

ctx=call('Target.createBrowserContext')['browserContextId']
try:
 target=call('Target.createTarget',{'url':'about:blank','browserContextId':ctx})['targetId']
 session=call('Target.attachToTarget',{'targetId':target,'flatten':True})['sessionId']
 def evaluate(expression):
  r=call('Runtime.evaluate',{'expression':expression,'returnByValue':True,'awaitPromise':True},session)
  if 'exceptionDetails' in r: raise AssertionError(r['exceptionDetails'])
  return r.get('result',{}).get('value')
 def wait(expression):
  for _ in range(80):
   if evaluate(expression): return
   time.sleep(.1)
  raise AssertionError('Timed out: '+expression)
 url=sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:8479/'
 call('Emulation.setDeviceMetricsOverride',{'width':360,'height':740,'deviceScaleFactor':1,'mobile':True},session)
 call('Page.navigate',{'url':url},session)
 wait("document.readyState==='complete'")
 evaluate("document.getElementById('btn-start').click(); document.getElementById('name-input').value='Test Reader';document.getElementById('btn-name-next').click()")
 wait("document.getElementById('screen-quiz').classList.contains('active')")
 first_ids=evaluate("Store.get('ac_draft_v7_rotation').ids")
 assert len(first_ids)==5 and len(set(first_ids))==5
 first_question=evaluate("QUIZ.find(q=>q.id==="+json.dumps(first_ids[0])+").text")
 evaluate("document.querySelector('.opt').click();document.querySelector('.opt').click()")
 assert evaluate("document.getElementById('quiz-progress').textContent").startswith('1'), 'selection advanced the question'
 evaluate("document.getElementById('btn-next').click();document.getElementById('btn-next').click()")
 wait("document.getElementById('quiz-progress').textContent.startsWith('2')")
 evaluate("document.getElementById('btn-pause').click()")
 call('Page.reload',{},session);wait("document.readyState==='complete' && !document.getElementById('btn-resume').hidden")
 evaluate("document.getElementById('btn-resume').click()")
 assert evaluate("document.getElementById('quiz-progress').textContent").startswith('2'), 'resume lost position'
 assert evaluate("Store.get('ac_draft_v7_rotation').ids")==first_ids, 'resume changed questions'
 evaluate("document.getElementById('btn-quiz-back').click()")
 assert evaluate("document.querySelector('.opt[aria-pressed=true]')!==null"), 'back lost selected answer'
 wait("document.getElementById('q-text').textContent==="+json.dumps(first_question)), 'typewriter still setting the question'
 for i in range(5):
  evaluate("document.querySelector('.opt').click();document.getElementById('btn-next').click()")
  time.sleep(.22)
 wait("document.getElementById('screen-card').classList.contains('active')")
 assert evaluate('Quota.remaining()')==2
 assert 'Test Reader' in evaluate("document.getElementById('card-canvas').getAttribute('aria-label')")
 assert evaluate("document.querySelectorAll('#card-basis p').length")==5
 assert evaluate("Store.get('ac_history_v1')[0].personalized") is True
 # Verify every possible answer-based line fits the existing two-line canvas slots.
 overflow=evaluate("""(()=>{
 const ctx=document.createElement('canvas').getContext('2d');ctx.font='400 34px system-ui';ctx.letterSpacing='3px';
 const bad=[];for(const q of QUIZ)for(const o of q.options){
  const text=q.topic+': “'+o.text+'”';let line='',rows=1;
  for(const word of text.split(' ')){const next=line?line+' '+word:word;if(ctx.measureText(next).width>860&&line){rows++;line=word;}else line=next;}
  if(rows>2)bad.push(text);
 }return bad;})()""")
 assert not overflow, 'answer text overflows canvas slots: '+str(overflow)
 import subprocess
 call('Page.bringToFront',{},session)
 subprocess.run(['sh','-c','DISPLAY=:0 import -window root "$HOME/auracheck-personalized-x11.png"'],check=True)

 evaluate("document.querySelector('#screen-card [data-home]').click();document.getElementById('btn-history').click();document.querySelector('#history-list button').click()")
 assert evaluate('Quota.remaining()')==2,'history burned quota'
 assert evaluate("document.documentElement.scrollWidth<=innerWidth"),'mobile horizontal overflow'
 call('Emulation.setEmulatedMedia',{'features':[{'name':'prefers-reduced-motion','value':'reduce'}]},session)
 assert evaluate("document.getAnimations().filter(a=>a.playState==='running').length")==0, 'reduced motion still running'
 for width in [320,390,768,1280]:
  call('Emulation.setDeviceMetricsOverride',{'width':width,'height':800,'deviceScaleFactor':1,'mobile':width<500},session)
  assert evaluate('document.documentElement.scrollWidth<=innerWidth'),f'overflow at {width}'
 # A failed render must not spend quota; saved draft remains retryable.
 evaluate("document.querySelector('#screen-card [data-home]').click();document.getElementById('btn-start').click();document.getElementById('btn-name-next').click()")
 second_ids=evaluate("Store.get('ac_draft_v7_rotation').ids")
 assert not set(first_ids)&set(second_ids), 'next check-in repeated questions'
 evaluate("window.originalRender=Render.renderCard;Render.renderCard=()=>{throw Error('test render failure')}")
 for i in range(5):
  evaluate("document.querySelector('.opt').click();document.getElementById('btn-next').click()")
  time.sleep(.22)
 assert evaluate('Quota.remaining()')==2,'failed render burned quota'
 assert evaluate("document.getElementById('quiz-message').textContent")=='test render failure'
 evaluate("Render.renderCard=window.originalRender;document.getElementById('btn-next').click()")
 wait("document.getElementById('screen-card').classList.contains('active')")
 assert evaluate('Quota.remaining()')==1
 evaluate("document.getElementById('btn-again').click();document.getElementById('btn-name-next').click()")
 for i in range(5):
  evaluate("document.querySelector('.opt').click();document.getElementById('btn-next').click()")
  time.sleep(.22)
 wait("document.getElementById('screen-card').classList.contains('active')")
 assert evaluate('Quota.remaining()')==0
 evaluate("document.getElementById('btn-again').click()")
 assert evaluate("document.getElementById('screen-history').classList.contains('active')"),'zero quota is a dead end'
 assert evaluate("document.querySelectorAll('#history-list button').length")==3
 # Wait for installation, then exercise an actual offline navigation and saved card.
 wait("navigator.serviceWorker.controller!==null")
 evaluate("navigator.serviceWorker.ready.then(()=>true)")
 call('Network.enable',{},session)
 call('Network.emulateNetworkConditions',{'offline':True,'latency':0,'downloadThroughput':0,'uploadThroughput':0},session)
 call('Page.reload',{},session)
 wait("document.readyState==='complete' && typeof Quota!=='undefined'")
 evaluate("document.getElementById('btn-history').click();document.querySelector('#history-list button').click()")
 assert evaluate("document.getElementById('screen-card').classList.contains('active')"),'offline history failed'
 print('PASS: selection, double-click, back, resume, completion, quota, history, card accessibility, responsive widths, reduced motion, failed-render refund, exhausted quota, offline reload/history')
finally:
 call('Target.disposeBrowserContext',{'browserContextId':ctx});ws.close()
