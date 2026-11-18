// Função mínima na Vercel: lê o feed público do YouTube e devolve os últimos vídeos em JSON.
// O navegador não consegue ler o feed direto (o YouTube bloqueia), por isso esta ponte existe.
// Não precisa de chave de API. Resultado fica em cache por 10 minutos.
const ENTIDADES = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&apos;': "'" };
const limpar = (s) => s.replace(/&(amp|lt|gt|quot|#39|apos);/g, (m) => ENTIDADES[m]);

module.exports = async (req, res) => {
  const canal = String(req.query.canal || '').replace(/[^A-Za-z0-9_-]/g, '');
  const limite = Math.min(parseInt(req.query.limite, 10) || 6, 15);
  if (!canal) return res.status(400).json({ erro: 'Informe o ID do canal em ?canal=UC...' });

  const resposta = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${canal}`);
  if (!resposta.ok) return res.status(502).json({ erro: 'O YouTube não respondeu.' });

  const xml = await resposta.text();
  const videos = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
    .map((m) => m[1])
    .map((e) => ({
      id: (e.match(/<yt:videoId>([^<]+)/) || [])[1],
      titulo: limpar((e.match(/<title>([^<]*)/) || [, ''])[1]),
      publicado: (e.match(/<published>([^<]+)/) || [])[1],
    }))
    .filter((v) => v.id)
    .slice(0, limite);

  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=3600');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.status(200).json({ videos });
};
