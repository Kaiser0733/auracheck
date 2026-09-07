// render.js — 1080x1920 canvas card renderer (dark premium, gold glow, stamp watermark for free)
// renderCard(cardPayload, opts:{pro:boolean}) → HTMLCanvasElement
(function (global) {

  const backdrop=new Image();
  let loaded=false;
  const ready=new Promise(resolve=>{
    backdrop.onload=()=>{loaded=true;resolve();};
    backdrop.onerror=()=>resolve();
    backdrop.src='assets/night-window.webp';
  });

  function renderCard(payload, opts = {}) {
    if(!loaded)throw Error('Card artwork is not ready. Check your connection and reload; no credit was used.');
    const { headline, sub, lines, stamp, percents, name } = payload;
    const palette={bg:'#171025',ink:'#f1ebfa',glow:'#d4baff',stamp:'#c6a6f4'};
    const pro = !!opts.pro;

    const W = 1080, H = 1920;
    const cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    const ctx = cv.getContext('2d');

    // Clean right-hand panel of the supplied artwork; cover without stretching.
    const scale=Math.max(W/backdrop.width,H/backdrop.height);
    const bw=backdrop.width*scale,bh=backdrop.height*scale;
    ctx.drawImage(backdrop,(W-bw)/2,(H-bh)/2,bw,bh);
    const shade=ctx.createLinearGradient(0,0,0,H);
    shade.addColorStop(0,'rgba(15,9,29,0.65)');
    shade.addColorStop(0.64,'rgba(15,9,29,0.76)');
    shade.addColorStop(1,'rgba(15,9,29,0.45)');
    ctx.fillStyle=shade;ctx.fillRect(0,0,W,H);

    // radial glow (gold/iridescent, soft)
    const g = ctx.createRadialGradient(W*0.5, H*0.28, 60, W*0.5, H*0.28, W*0.85);
    g.addColorStop(0, palette.glow + '33');
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // header brand
    ctx.fillStyle = '#d5c5e8';
    ctx.font = '600 34px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.letterSpacing = '3px';
    ctx.fillText('⟡  AURACHECK', 80, 140);

    // date + name
    ctx.fillStyle = '#c3b5d3';
    ctx.font = '500 30px system-ui';
    ctx.textAlign = 'right';
    const dstr = new Date(payload.createdAt || Date.now()).toLocaleDateString('en', { day:'numeric', month:'short', year:'numeric' });
    ctx.fillText(dstr, W-80, 140);
    if (name) {
      ctx.textAlign = 'left';
      ctx.fillStyle = '#d5c5e8';
      ctx.font = '500 32px system-ui';
      ctx.fillText(`for ${name}`, 80, 210, W-160);
    }

    // headline (big serif-ish, gold)
    ctx.textAlign = 'left';
    ctx.fillStyle = palette.glow;
    ctx.font = '800 92px Georgia, serif';
    ctx.shadowColor = palette.glow;
    ctx.shadowBlur = 30;
    wrapText(ctx, headline, 80, 410, W-160, 100);
    ctx.shadowBlur = 0;

    // sub line
    ctx.fillStyle = palette.ink;
    ctx.font = '500 36px system-ui';
    wrapText(ctx, sub, 80, 700, W-160, 46);

    // divider
    ctx.strokeStyle = 'rgba(211,188,244,0.35)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(80, 820);
    ctx.lineTo(W-80, 820);
    ctx.stroke();

    // trait percentage bars
    if (percents) {
      let by = 900;
      const rows = [['✦ Aura', percents.aura],['⌖ Delulu', percents.delulu],['☀ Prickly', percents.toxic],['☁ Chill', percents.chill]];
      rows.forEach(([label, pc]) => {
        ctx.fillStyle = '#d5c5e8';
        ctx.font = '600 32px system-ui';
        ctx.fillText(label, 80, by);
        ctx.fillStyle = palette.glow;
        ctx.textAlign = 'right';
        ctx.fillText(pc + '%', W-80, by);
        ctx.textAlign = 'left';
        // bar
        ctx.fillStyle = 'rgba(165,133,205,0.25)';
        ctx.fillRect(80, by+18, W-160, 14);
        ctx.fillStyle = palette.glow;
        ctx.fillRect(80, by+18, (W-160) * (pc/100), 14);
        by += 100;
      });
    }

    // roast lines
    let ly = percents ? 1360 : 980;
    ctx.font = '400 34px system-ui';
    ctx.fillStyle = palette.ink;
    lines.forEach(l => {
      ctx.fillStyle = palette.glow;
      ctx.fillText('›', 80, ly);
      ctx.fillStyle = palette.ink;
      wrapText(ctx, l, 130, ly, W-220, 44);
      ly += 90;
    });

    // stamp — rotated capsule
    ctx.save();
    ctx.translate(W/2, H-240);
    ctx.rotate(0);
    ctx.strokeStyle = palette.stamp;
    ctx.lineWidth = 5;
    ctx.font = '800 38px system-ui';
    const sw = Math.min(W-180, ctx.measureText(stamp).width + 90);
    roundRect(ctx, -sw/2, -60, sw, 110, 20);
    ctx.fillStyle='rgba(81,51,119,0.28)';ctx.fill();
    ctx.stroke();
    ctx.fillStyle = palette.stamp;
    ctx.font = '800 38px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(stamp, 0, 12, sw-60);
    ctx.restore();

    // watermark (free only)
    if (!pro) {
      ctx.fillStyle = 'rgba(224,207,246,0.85)';
      ctx.font = '500 28px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText('made with auracheck ✦ check yours', W/2, H-100);
    }

    return cv;
  }

  function wrapText(ctx, text, x, y, maxW, lh) {
    const words = String(text).split(' ');
    let line = '';
    let yy = y;
    for (const w of words) {
      const test = line ? line + ' ' + w : w;
      if (ctx.measureText(test).width > maxW && line) {
        ctx.fillText(line, x, yy);
        line = w; yy += lh;
      } else line = test;
    }
    if (line) ctx.fillText(line, x, yy);
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.arcTo(x+w, y, x+w, y+h, r);
    ctx.arcTo(x+w, y+h, x, y+h, r);
    ctx.arcTo(x, y+h, x, y, r);
    ctx.arcTo(x, y, x+w, y, r);
    ctx.closePath();
  }

  global.Render = { renderCard, ready };
})(this);
