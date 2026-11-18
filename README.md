# Treino de Respeito, com Alfredo

Site de uma página só: `index.html` + `estilo.css` + `site.js`. Sem banco de dados, sem painel. Os últimos vídeos do canal entram sozinhos (função `api/feed.js` na Vercel lê o feed público do YouTube).

Briefing original: doc "Briefing Claude Code - Treino de Respeito" (Claude Docs).

## Como trocar as coisas
| O que | Onde |
| --- | --- |
| Links do YouTube e do Instagram, ID do canal, quantos vídeos | `config.js` (um arquivo, tudo no topo) |
| Fotos | pasta `fotos/`: `capa.jpg` (Alfredo na lancha, vertical 4:5, ~1000×1250), `alfredo.jpg` (selfie de regata preta, 4:5) e `compartilhar.jpg` (imagem que aparece ao compartilhar o link, 1200×630). Mantenha os mesmos nomes. Peso ideal: até 300 KB cada. |
| Textos (título, frases, "Quem é o Alfredo", rodapé) | `index.html`, direto no texto |
| Cores e tamanhos de letra | bloco `:root` no começo de `estilo.css` |

Fotos da seção "Não é só do corpo": `familia-mar.jpg`, `familia-casa.jpg`, `esposa-praia.jpg`, `bike.jpg` (todas 4:5, ~800×1000). As legendas ficam no `index.html`, logo abaixo de cada foto.

## Onde está publicado
- Repositório: `ByTech-3/ByTech-3-treino-de-respeito` (branch `main`).
- Vercel: projeto `treino-de-respeito` na equipe ByTech3, ligado ao repositório. **Cada push na `main` publica sozinho.**
- Endereço: https://treino-de-respeito-bytech-3-projects.vercel.app
- Domínio próprio, quando tiver: na Vercel, Settings → Domains.
- O site está com `noindex` (linha no `index.html`) até o Alfredo aprovar. Depois, apague essa linha.

Para testar no computador sem a Vercel, abra o `index.html` no navegador: a página inteira funciona, e os vídeos vêm por uma ponte pública (rss2json) em vez da função.

## Antes de divulgar (fora do código)
- No YouTube Studio, marcar os 11 vídeos antigos de música como **Privado** ou **Não listado** (esconder, não apagar). Até lá, o site mostra esses vídeos.
- Renomear o canal para "Treino de Respeito", trocar foto e banner.
- Deixar o Instagram público e usar a bio sugerida no briefing.
- Se o canal mudar de nome, o link muda: atualize `youtube` no `config.js`. O ID do canal não muda.

## Decisões de design (para quem for mexer)
- Uma família de letra só (Bricolage Grotesque, Google Fonts), do corpo de 20 px ao título gigante. Corpo nunca abaixo de 20 px, botões com 64 px de altura.
- Fundo bege dourado, texto preto, dourado em títulos de seção, botões e detalhes. Dourado de texto é o tom escuro `#8A6B12` (contraste 4,1:1 sobre o bege); o claro `#C9A227` só em botões (texto preto por cima) e traços.
- Única animação: a entrada do título na abertura. Respeita `prefers-reduced-motion`.
- Abertura: frase, depois a foto (vertical no celular, larga no computador), depois a frase dourada, a assinatura e os botões.
- Sem menu: o topo tem a marca e um link para os vídeos. Nada escondido atrás de ícone.
