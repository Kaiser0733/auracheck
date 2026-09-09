// The exported card uses the same ink-and-brass identity as the site.
(function (global) {
  function renderCard(payload, opts = {}) {
    const cv = document.createElement('canvas');
    cv.width = 1080; cv.height = 1920;
    const ctx = cv.getContext('2d');
    const ink = '#f0e9dd', muted = '#b7aea2', accent = '#d9a477';
    ctx.fillStyle = '#191b1b'; ctx.fillRect(0, 0, 1080, 1920);
    ctx.fillStyle = accent; ctx.fillRect(72, 76, 5, 55);

    function text(value, x, y, font, color = ink, width = 912) {
      ctx.font = font; ctx.fillStyle = color;
      ctx.fillText(String(value), x, y, width);
    }
    function rule(y) {
      ctx.fillStyle = '#42433e'; ctx.fillRect(84, y, 912, 2);
    }
    function wrap(value, width) {
      const rows = []; let row = '';
      for (const word of String(value || '').split(/\s+/)) {
        const next = row ? row + ' ' + word : word;
        if (row && ctx.measureText(next).width > width) { rows.push(row); row = word; }
        else row = next;
      }
      if (row) rows.push(row);
      return rows;
    }
    text('auracheck /', 100, 116, '700 42px Arial, sans-serif');
    ctx.textAlign = 'right';
    const date = new Date(payload.createdAt || Date.now());
    text(Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString('en-GB', {day:'2-digit',month:'short',year:'numeric',timeZone:'Asia/Kolkata'}), 996, 114, '28px Arial, sans-serif', muted, 360);
    ctx.textAlign = 'left';
    rule(162);
    text(payload.name ? `${payload.name} / today’s read` : 'Your day / on the record', 84, 238, '32px Arial, sans-serif', muted);

    // A single off-centre orbit, kept behind empty space rather than text.
    ctx.strokeStyle = '#42433e'; ctx.lineWidth = 2;
    for (let i = 0; i < 4; i++) {
      ctx.beginPath(); ctx.ellipse(820, 425, 70 + i * 25, 140, 0.55, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.fillStyle = accent; ctx.beginPath(); ctx.arc(903, 338, 8, 0, Math.PI * 2); ctx.fill();
    let titleSize = 108, titleRows;
    do { ctx.font = `400 ${titleSize}px Georgia, serif`; titleRows = wrap(payload.headline, 720); if(titleRows.length <= 2) break; titleSize -= 4; } while(titleSize > 64);
    titleRows.forEach((row, i) => text(row, 84, 384 + i * 120, `400 ${titleSize}px Georgia, serif`, ink, 720));
    text(payload.stamp || '', 86, 600, '700 30px Arial, sans-serif', accent);
    rule(646);

    text('TODAY’S MIX', 84, 718, '700 26px Arial, sans-serif', muted);
    if (payload.percents) {
      [['aura','aura'],['delulu','delulu'],['prickly','toxic'],['chill','chill']].forEach(([label,key], i) => {
        const y = 802 + i * 102;
        const pc = Math.max(0, Math.min(100, Number(payload.percents[key]) || 0));
        text(label, 84, y, '38px Arial, sans-serif');
        ctx.fillStyle = '#42433e'; ctx.fillRect(340, y - 15, 480, 8);
        ctx.fillStyle = accent; ctx.fillRect(340, y - 15, 480 * pc / 100, 8);
        ctx.textAlign = 'right'; text(`${pc}%`, 996, y, '38px Arial, sans-serif', ink, 150); ctx.textAlign = 'left';
      });
    }
    rule(1172);
    text('IN YOUR WORDS', 84, 1246, '700 26px Arial, sans-serif', muted);
    const lines = payload.lines || [];
    let bodySize = 40, blocks;
    do {
      ctx.font = `400 ${bodySize}px Georgia, serif`;
      blocks = lines.map(line => wrap(line, 880));
      if (blocks.reduce((n, rows) => n + rows.length * bodySize * 1.4 + 28, 0) <= 430) break;
      bodySize -= 2;
    } while(bodySize > 24);
    let y = 1322;
    blocks.forEach((rows, i) => {
      rows.forEach(row => {text(row, 84, y, `400 ${bodySize}px Georgia, serif`, i === lines.length-1 ? accent : ink, 880); y += bodySize * 1.4;});
      y += 28;
    });
    rule(1772);
    text('A moment, not a diagnosis.', 84, 1830, '28px Arial, sans-serif', muted);
    text(opts.pro ? 'Entertainment only.' : 'auracheck · make yours', 84, 1878, '26px Arial, sans-serif', muted);
    return cv;
  }
  global.Render = {renderCard, ready: Promise.resolve()};
})(typeof module !== 'undefined' ? global : this);
