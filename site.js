// Treino de Respeito — comportamento da página.
// 1) coloca os links do config.js nos botões; 2) busca os últimos vídeos do canal.
(function () {
  const C = window.CONFIG || {};

  // Links
  document.querySelectorAll('[data-link]').forEach((a) => {
    const destino = C[a.dataset.link];
    if (destino) a.href = destino;
  });
  document.querySelectorAll('[data-ano]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  // Vídeos
  const grade = document.getElementById('lista-videos');
  const estado = document.getElementById('estado-videos');
  if (!grade) return;

  const formatarData = (iso) => {
    try { return new Date(iso).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }); }
    catch (e) { return ''; }
  };

  function mostrar(videos) {
    if (!videos.length) return vazio();
    grade.innerHTML = videos.map((v) => `
      <li>
        <a class="video" href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener">
          <span class="video__capa">
            <img src="${v.capa || `https://i.ytimg.com/vi/${v.id}/hq720.jpg`}" alt="" loading="lazy"
                 onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${v.id}/mqdefault.jpg'">
            <span class="video__play" aria-hidden="true"></span>
          </span>
          <span class="video__titulo">${v.titulo}</span>
          <span class="video__data">${formatarData(v.publicado)}</span>
        </a>
      </li>`).join('');
    estado.hidden = true;
    grade.hidden = false;
  }

  function vazio() {
    grade.hidden = true;
    estado.hidden = false;
    estado.innerHTML = '<p>Os primeiros vídeos estão chegando. O canal já está no ar: se inscreve que você recebe o aviso.</p>';
  }

  async function buscar() {
    const id = C.youtubeCanalId;
    const n = C.quantidadeVideos || 6;
    if (!id) return vazio();
    // 1ª opção: a função /api/feed deste site (na Vercel). 2ª: ponte pública, para quem abrir o arquivo sem a Vercel.
    const fontes = [
      `/api/feed?canal=${id}&limite=${n}`,
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent('https://www.youtube.com/feeds/videos.xml?channel_id=' + id)}`,
    ];
    for (const url of fontes) {
      try {
        const r = await fetch(url);
        if (!r.ok) continue;
        const dados = await r.json();
        const lista = dados.videos || (dados.items || []).map((i) => ({
          id: (i.guid || '').replace('yt:video:', ''), titulo: i.title, publicado: i.pubDate,
        }));
        if (Array.isArray(lista)) return mostrar(lista.filter((v) => v.id).slice(0, n));
      } catch (e) { /* tenta a próxima fonte */ }
    }
    if (window.VIDEOS_AMOSTRA) return mostrar(window.VIDEOS_AMOSTRA.slice(0, n));
    vazio();
  }

  buscar();
})();
