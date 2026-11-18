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

As duas fotos atuais são **provisórias** (lancha vista de cima e halteres). Troque pelas do Alfredo e apague a legenda "Foto provisória…" do `index.html`.

## Publicar na Vercel (de graça)
1. Suba esta pasta num repositório do GitHub (ex.: `ByTech-3/treino-de-respeito`).
2. Na Vercel: Add New Project → importe o repositório → Framework: **Other** → Deploy. Se a pasta do site não for a raiz do repositório, em **Root Directory** aponte para ela.
3. Cada `git push` publica de novo. Domínio próprio: Settings → Domains.

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
- Sem menu: o topo tem a marca e um link para os vídeos. Nada escondido atrás de ícone.
