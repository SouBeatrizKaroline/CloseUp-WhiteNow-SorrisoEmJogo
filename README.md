# CloseUp White Now - Sorriso em Jogo

Protótipo independente criado por Beatriz Karoline para o desafio de Marketing e Comunicação do Programa de Estágio Unilever 2027. Adaptado de [Game_FantasminhaQuerDentes](https://github.com/SouBeatrizKaroline/Game_FantasminhaQuerDentes), preservando a mecânica snake, os controles e os sons da base.

## A experiência

- Embalagem ilustrativa de White Now como personagem, com rastro verde de brilho.
- Tabuleiro em formato de dente: as bordas e os espaços entre as raízes são obstáculos reais do jogo.
- Colete 12 cáries fictícias, sem bater nas bordas ou na cauda.
- Mensagens sobre a proposta do produto a cada coleta.
- Mini quiz educativo e demonstração de cupom, sem cadastro ou coleta de dados pessoais.
- Teclado, WASD, gestos e botões no celular; pausa, níveis de velocidade, som opcional e recorde local.

## O desafio em quatro pontos

**Oportunidade:** aumentar conhecimento e compreensão do diferencial do White Now por meio de uma experiência interativa.

**Solução:** campanha “Conheça seu sorriso”, distribuída por QR Codes, conteúdo social e ações de experimentação. O jogo conecta descoberta, informação e interesse pelo produto.

**Execução:** piloto em universidades e lojas próximas; revisão odontológica e validação da marca antes de uso real; marketing atrai o público, supply chain planeja amostras e reposição, vendas conecta a ação aos pontos de venda.

**Impacto esperado:** conhecimento do produto, conclusão de partidas, interesse em experimentar, resgate de cupons e conversão. Indicadores são uma proposta, não resultados observados. Este protótipo não envia eventos de analytics.

## Rodar e testar

Site estático, sem dependências de build. Abra `index.html` ou use:

```sh
python -m http.server 8000
node --test tests/engine.test.cjs
```

Para Vercel: preset **Other**, sem comando de build, diretório de saída `.`. GitHub Pages também pode servir a raiz da branch `main`.

## Comunicação responsável

A coleta de cáries é uma metáfora de jogo. Creme dental não remove nem trata cáries existentes. O efeito óptico não representa clareamento permanente. As mensagens de tecnologia óptica e efeito visual desde a primeira escovação vêm do briefing fornecido na dinâmica e exigem validação da marca antes de uma campanha pública. A embalagem SVG é ilustrativa; não é arte oficial.

O cupom SORRISO10 é fictício e não oferece desconto. Não existem parcerias comerciais ou distribuição de amostras ativas. Este projeto não é um site oficial da Closeup ou da Unilever.

Os arquivos antigos da pasta `imagem` foram preservados para rastreabilidade da adaptação; a interface utiliza os novos SVGs.
