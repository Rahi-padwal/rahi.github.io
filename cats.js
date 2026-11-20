/* Piku & Chiku as inline SVG, shared by the café page and the game. */
(function () {
  window.catSVG = c => `
  <svg viewBox="0 0 120 135" aria-hidden="true">
    <path class="tail" d="M88 112 C114 110 118 82 104 70" stroke="${c.body}" stroke-width="10" fill="none" stroke-linecap="round"/>
    <ellipse cx="60" cy="96" rx="32" ry="30" fill="${c.body}"/>
    <ellipse cx="60" cy="102" rx="17" ry="21" fill="${c.belly}"/>
    ${c.stripes ? `<path d="M32 90 q6 2 8 8 M30 102 q6 1 9 7 M88 90 q-6 2 -8 8 M90 102 q-6 1 -9 7" stroke="${c.stripes}" stroke-width="3" fill="none" stroke-linecap="round"/>` : ''}
    <ellipse cx="47" cy="124" rx="10" ry="7" fill="${c.belly}"/>
    <ellipse class="paw-r" cx="73" cy="124" rx="10" ry="7" fill="${c.belly}"/>
    <path d="M32 44 L37 10 L60 30 Z" fill="${c.earL}"/><path d="M88 44 L83 10 L60 30 Z" fill="${c.earR}"/>
    <path d="M38 36 L40 18 L51 29 Z" fill="#e9a3a3"/><path d="M82 36 L80 18 L69 29 Z" fill="#e9a3a3"/>
    <ellipse cx="60" cy="52" rx="31" ry="27" fill="${c.body}"/>
    ${c.patch ? `<path d="M64 30 q24 -2 27 22 q-8 6 -20 2 q-8 -10 -7 -24z" fill="${c.patch}"/>` : ''}
    ${c.stripes ? `<path d="M52 30 l2 9 M60 28 v10 M68 30 l-2 9" stroke="${c.stripes}" stroke-width="3" stroke-linecap="round"/>` : ''}
    <ellipse cx="60" cy="63" rx="14" ry="10" fill="${c.belly}"/>
    <g class="eyes"><ellipse cx="48" cy="50" rx="5" ry="6" fill="#d9c25a"/><ellipse cx="72" cy="50" rx="5" ry="6" fill="#d9c25a"/>
      <g class="pupils"><ellipse cx="48" cy="50" rx="2.2" ry="4.5" fill="#1d1a16"/><ellipse cx="72" cy="50" rx="2.2" ry="4.5" fill="#1d1a16"/></g></g>
    <g class="lids" stroke="#3a2a1e" stroke-width="2.2" fill="none" stroke-linecap="round"><path d="M43 51 q5 4 10 0"/><path d="M67 51 q5 4 10 0"/></g>
    <path d="M57 59 L63 59 L60 62.5 Z" fill="#d97a7a"/>
    <path d="M60 62 q-3 4 -6 2 M60 62 q3 4 6 2" stroke="#3a2a1e" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    <g stroke="${c.whisk}" stroke-width="1" stroke-linecap="round"><path d="M44 62 L24 58 M44 65 L24 66 M76 62 L96 58 M76 65 L96 66"/></g>
  </svg><span class="name">${c.name}</span><span class="zzz">z z z</span>`;

  window.CATS = {
    PIKU:  { name: 'Piku · agent of chaos', body: '#e9a25f', belly: '#f4e2c6', earL: '#e9a25f', earR: '#e9a25f', stripes: '#c97c3a', whisk: '#8a5a30' },
    CHIKU: { name: 'Chiku · calm, cute, dumb', body: '#8f949a', belly: '#f4f1ea', earL: '#2b2b30', earR: '#8f949a', patch: '#2b2b30', whisk: '#555' }
  };
})();
