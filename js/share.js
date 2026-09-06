// share.js — share canvas via Web Share API (files), fallback to download
(function (global) {
  async function canvasToBlob(cv) {
    return new Promise(res => cv.toBlob(res, 'image/png', 0.95));
  }
  async function shareCanvas(cv, text) {
    const blob = await canvasToBlob(cv);
    const file = new File([blob], 'auracheck.png', { type: 'image/png' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], text });
      return 'shared';
    }
    downloadCanvas(cv);
    return 'downloaded';
  }
  function downloadCanvas(cv) {
    const a = document.createElement('a');
    a.download = 'auracheck.png';
    a.href = cv.toDataURL('image/png');
    a.click();
  }
  function toast(msg) {
    let t = document.querySelector('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 1800);
  }
  global.ShareKit = { shareCanvas, downloadCanvas, toast };
})(this);
