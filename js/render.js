// render.js — the card is a riso print, not a dashboard.
// Two spot inks, one paper. Every mark is drawn here; no photos, no gradients.
// Same payload prints the same sheet twice (seeded "press"), like a real run.
// renderCard(payload, {pro}) -> HTMLCanvasElement
(function (global) {

  // deterministic pseudo-random from a string seed — one card, one press run
  function seeded(seed) {
    let h = 2166136261;
    for (let i = 0; i < seed.length; i++) {
      h ^= seed.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    let s = h >>> 0;
    return () => {
      s ^= s << 13; s >>>= 0;
      s ^= s >> 17;
      s ^= s << 5;  s >>>= 0;
      return s / 4294967296;
    };
  }

  // xorshift paper grain, stamped once into a reusable tile
  function grainTile(rnd, W, H) {
    const tile = document.createElement('canvas');
    tile.width = 220; tile.height = 220;
    const tctx = tile.getContext('2d');
    const img = tctx.createImageData ? tctx.createImageData(220, 220) : { data: new Array(220 * 220 * 4) };
    for (let i = 0; i < img.data.length; i += 4) {
      const v = 231 + (rnd() * 22 - 11);          // paper fibre wobble
      img.data[i] = v; img.data[i+1] = v * 0.985; img.data[i+2] = v * 0.95; img.data[i+3] = 255;
    }
    if (tctx.putImageData) tctx.putImageData(img, 0, 0); // sandbox stubs may skip it
    return tile;
  }

  // ink passes get their own drift so the two colours never sit perfectly
  function inkDrift(rnd) { return (rnd() - 0.5) * 7; }

  // halftone screen: coarse dots like a real duplicator drum
  function halftone(ctx, x, y, w, h, dot, gap, ink, alpha, rnd) {
    ctx.fillStyle = ink;
    ctx.globalAlpha = alpha;
    const jit = () => (rnd() - 0.5) * 1.6;
    for (let yy = y; yy < y + h; yy += gap) {
      for (let xx = x; xx < x + w; xx += gap) {
        const r = dot * (0.75 + rnd() * 0.5);
        ctx.beginPath();
        ctx.arc(xx + jit(), yy + jit(), r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }

  function renderCard(payload, opts = {}) {
    const { headline, sub, lines, stamp, percents, name, createdAt } = payload;
    const pro = !!opts.pro;

    // seeded from card content — a saved card reprints pixel-identical
    const seed = `${headline}|${sub}|${name || 'anon'}|${createdAt || ''}`;
    const rnd = seeded(seed);

    const W = 1080, H = 1920;
    const cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    const ctx = cv.getContext('2d');

    // ---- PAPER ----
    ctx.fillStyle = '#f4eddc';
    ctx.fillRect(0, 0, W, H);
    const tile = grainTile(rnd);
    const pat = ctx.createPattern(tile, 'repeat');
    ctx.fillStyle = pat;
    ctx.fillRect(0, 0, W, H);
    // deckle-ish darker fibres at the left edge, like a ream edge
    halftone(ctx, 0, 0, 54, H, 2.1, 9, '#d8cdb2', 0.5, rnd);

    // ---- INKS: two fluorescent riso spot colours + their overlap ----
    // warm ink (fluorescent orange-pink) and cool ink (fluorescent blue)
    const INK_WARM = '#ff4f66';
    const INK_COOL = '#0072bc';
    const INK_DEEP = '#1d1b34';                    // near-black soy ink for type
    const drift = { warm: inkDrift(rnd), cool: inkDrift(rnd) };

    // ---- CROP MARKS (like a press sheet) ----
    ctx.strokeStyle = INK_DEEP;
    ctx.lineWidth = 3;
    const cm = 54, len = 44;
    [[cm,cm,1,1],[W-cm,cm,-1,1],[cm,H-cm,1,-1],[W-cm,H-cm,-1,-1]].forEach(([x,y,dx,dy]) => {
      ctx.beginPath();
      ctx.moveTo(x + dx*24, y); ctx.lineTo(x + dx*(24+len), y);
      ctx.moveTo(x, y + dy*24); ctx.lineTo(x, y + dy*(24+len));
      ctx.stroke();
    });

    // ---- MASTHEAD (hand-set, misregistered on purpose) ----
    ctx.textAlign = 'left';
    ctx.fillStyle = INK_WARM;                      // ghost pass
    ctx.font = '700 42px "Courier New", monospace';
    ctx.fillText('AURACHECK PRESS', 96 + drift.warm, 172 + drift.warm * 0.6);
    ctx.fillStyle = INK_DEEP;                      // key pass on top
    ctx.fillText('AURACHECK PRESS', 96, 168);
    ctx.font = '400 22px "Courier New", monospace';
    ctx.fillStyle = '#3a3556';
    ctx.fillText(name ? `EDITION No.1 · FOR ${name.toUpperCase()}` : 'EDITION No.1', 96, 208);
    // date, right-aligned, small caps mono
    const dstr = new Date(createdAt || Date.now()).toLocaleDateString('en', { day:'numeric', month:'short', year:'numeric' });
    ctx.textAlign = 'right';
    ctx.font = '400 22px "Courier New", monospace';
    ctx.fillStyle = '#3a3556';
    ctx.fillText(dstr, W - 96, 168);
    ctx.textAlign = 'left';

    // ---- HEADLINE: handset in Georgia, solid ink, misregistration ghost ----
    ctx.font = '700 96px Georgia, serif';
    const headlineY = 340;
    wrapText(ctx, headline, 96, headlineY, W - 192, 112, (yy, lineText, lastLine) => {
      // fluorescent underprint, offset — the classic riso slip
      ctx.fillStyle = INK_WARM;
      ctx.globalAlpha = 0.85;
      ctx.fillText(lineText, 96 + 5 + drift.warm, yy + 5 + drift.warm);
      ctx.globalAlpha = 1;
      ctx.fillStyle = INK_DEEP;
      ctx.fillText(lineText, 96, yy);
    });

    // ---- SUB LINE: typewriter mono, lightly inked ----
    ctx.font = '400 34px "Courier New", monospace';
    ctx.fillStyle = INK_COOL;
    wrapText(ctx, sub, 96, 600, W - 192, 50, null, 0.92);

    // ---- RULE: solid ink hairline with a halftone shadow ----
    ctx.strokeStyle = INK_DEEP;
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(96, 668); ctx.lineTo(W - 96, 668); ctx.stroke();
    halftone(ctx, 96, 684, W - 192, 20, 1.6, 8, INK_WARM, 0.55, rnd);

    // ---- TRAIT BARS: ink density gauges, not progress bars ----
    // labelled in lower-case mono, value in hand-circled numerals
    if (percents) {
      const rows = [['aura', percents.aura, INK_COOL], ['delulu', percents.delulu, INK_WARM], ['prickly', percents.toxic, INK_WARM], ['chill', percents.chill, INK_COOL]];
      let by = 760;
      rows.forEach(([label, pc, ink]) => {
        // label
        ctx.font = '700 30px "Courier New", monospace';
        ctx.fillStyle = INK_DEEP;
        ctx.fillText(label, 96, by);
        // hand-drawn underline (wobbly)
        ctx.strokeStyle = ink; ctx.lineWidth = 3;
        wavyLine(ctx, 96, by + 14, 96 + ctx.measureText(label).width + 14, by + 14, rnd);
        // gauge: halftone wedge scaled by percent — more ink, more dots
        const gw = W - 500;
        const fill = gw * (pc / 100);
        halftone(ctx, 420, by - 18, gw, 40, 2.6, 7, ink, 0.85, rnd);
        // the rest of the track stays unprinted, just a rule
        ctx.strokeStyle = '#b8ad92'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(420, by + 26); ctx.lineTo(420 + gw, by + 26); ctx.stroke();
        // value: circled, like a proof-reader's mark
        ctx.font = '700 34px "Courier New", monospace';
        ctx.fillStyle = INK_DEEP;
        const val = pc + '%';
        const vw = ctx.measureText(val).width;
        ctx.fillText(val, W - 96 - vw, by);
        // circle around the value — slight rotation, imperfect ellipse
        ctx.strokeStyle = ink; ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.ellipse(W - 96 - vw / 2, by - 10, vw / 2 + 16, 32, (rnd() - 0.5) * 0.3, 0, Math.PI * 2);
        ctx.stroke();
        by += 120;
      });
    }

    // ---- QUOTES: hand-set lines with ink chevrons ----
    let ly = percents ? 1290 : 760;
    ctx.font = '400 34px "Courier New", monospace';
    lines.forEach(l => {
      // chevron in warm ink, text in deep ink
      ctx.fillStyle = INK_WARM;
      ctx.font = '700 36px "Courier New", monospace';
      ctx.fillText('>', 96, ly);
      ctx.fillStyle = INK_DEEP;
      ctx.font = '400 34px "Courier New", monospace';
      wrapText(ctx, l, 148, ly, W - 148 - 96, 46, null, 0.95);
      ly += 96;
    });

    // ---- STAMP: rubber stamp, double-struck, slightly rotated ----
    ctx.save();
    const stampX = W / 2, stampY = percents ? 1770 : 1290;
    ctx.translate(stampX, stampY);
    ctx.rotate(-0.03 + (rnd() - 0.5) * 0.06);
    ctx.font = '700 40px "Courier New", monospace';
    const sw = ctx.measureText(stamp).width + 100;
    // strike one
    rubberBox(ctx, -sw/2, -46, sw, 92, INK_WARM, rnd);
    ctx.fillStyle = INK_WARM;
    ctx.textAlign = 'center';
    ctx.fillText(stamp, 0, 12, sw - 40);
    // strike two, offset — rubber stamps never land twice in the same place
    ctx.rotate((rnd() - 0.5) * 0.04);
    rubberBox(ctx, -sw/2 + 6, -40, sw, 92, INK_WARM, rnd);
    ctx.fillStyle = INK_WARM;
    ctx.fillText(stamp, 6, 18, sw - 40);
    ctx.restore();
    ctx.textAlign = 'left';

    // ---- INK TEST STRIP + REGISTRATION BLOCK (printer's proof marks) ----
    // small squares of each ink at the bottom, like checking the drum
    const stripY = H - 120;
    ['#ff4f66', '#0072bc', '#1d1b34', '#d8a200'].forEach((ink, i) => {
      ctx.fillStyle = ink;
      ctx.fillRect(96 + i * 64, stripY, 44, 44);
    });
    // edition line
    ctx.font = '400 20px "Courier New", monospace';
    ctx.fillStyle = '#3a3556';
    ctx.fillText('hand-pulled · 2 spot inks · entertainment, not evidence', 96 + 4 * 64 + 24, stripY + 30);

    // ---- WATERMARK (free only): offset colophon ----
    if (!pro) {
      ctx.textAlign = 'right';
      ctx.font = '400 22px "Courier New", monospace';
      ctx.fillStyle = '#6b6350';
      ctx.fillText('printed with auracheck · print yours', W - 96, stripY + 30);
      ctx.textAlign = 'left';
    }

    return cv;
  }

  // wavy hand-drawn underline
  function wavyLine(ctx, x1, y1, x2, y2, rnd) {
    const steps = 14;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      ctx.lineTo(x1 + (x2 - x1) * t, y1 + Math.sin(t * Math.PI * 2.2) * 3 + (rnd() - 0.5) * 2);
    }
    ctx.stroke();
  }

  // rubber-stamp border: uneven double ring with rough corners
  function rubberBox(ctx, x, y, w, h, ink, rnd) {
    ctx.strokeStyle = ink;
    ctx.lineWidth = 5;
    ctx.beginPath();
    const r = 14;
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.stroke();
    // inner ring, slightly off — stamps are never perfect
    ctx.lineWidth = 2.5;
    const in_ = 10;
    ctx.strokeRect(x + in_ + (rnd() - 0.5) * 3, y + in_ + (rnd() - 0.5) * 3, w - in_ * 2, h - in_ * 2);
  }

  function wrapText(ctx, text, x, y, maxW, lh, perLine, alpha) {
    if (alpha !== undefined) ctx.globalAlpha = alpha;
    const words = String(text).split(' ');
    let line = '', yy = y, first = true;
    const flush = () => {
      if (perLine) perLine(yy, line, first); else ctx.fillText(line, x, yy);
      first = false;
    };
    for (const w of words) {
      const test = line ? line + ' ' + w : w;
      if (ctx.measureText(test).width > maxW && line) {
        flush(); line = w; yy += lh;
      } else line = test;
    }
    if (line) flush();
    ctx.globalAlpha = 1;
    return yy;
  }

  global.Render = { renderCard, ready: Promise.resolve() };
})(typeof module !== 'undefined' ? global : this);
