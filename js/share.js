(function(global){
  let toastTimer;
  function canvasToBlob(canvas){
    return new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(Error('Image export failed.')),'image/png'));
  }
  async function downloadCanvas(canvas){
    const blob=await canvasToBlob(canvas),url=URL.createObjectURL(blob);
    const link=document.createElement('a');link.href=url;link.download='auracheck.png';
    document.body.append(link);link.click();link.remove();
    setTimeout(()=>URL.revokeObjectURL(url),30000);
    return 'downloaded';
  }
  async function shareCanvas(canvas,text){
    const blob=await canvasToBlob(canvas);
    if(typeof File!=='undefined' && navigator.share && navigator.canShare){
      const file=new File([blob],'auracheck.png',{type:'image/png'});
      if(navigator.canShare({files:[file]})){
        await navigator.share({files:[file],text});return 'shared';
      }
    }
    return downloadCanvas(canvas);
  }
  function toast(message){
    const status=document.getElementById('status');
    status.textContent=message;status.classList.add('show');
    clearTimeout(toastTimer);toastTimer=setTimeout(()=>status.classList.remove('show'),4500);
  }
  global.ShareKit={canvasToBlob,downloadCanvas,shareCanvas,toast};
})(this);
