# Design system do portfólio

Este sistema organiza a identidade visual já presente no portfólio: fundo quase preto, superfícies em camadas, tipografia Inter e acentos verde-água, azul e laranja. A referência é o código existente; este documento não representa uma inspeção do arquivo do Figma.

Os tokens e componentes compartilhados ficam em `src/styles/design-system.css`. O layout de cada página fica em `src/App.css`. Importe o design system depois do reset de `index.css` e antes dos estilos da aplicação. Prefira tokens a valores novos para manter todas as páginas consistentes.

## Cores e funções

| Token | Valor | Aplicação |
| --- | --- | --- |
| `--color-bg` | `#08090c` | Fundo geral |
| `--color-surface` | `#101319` | Painéis e cartões |
| `--color-surface-raised` | `#171b22` | Elementos dentro de cartões |
| `--color-text` | `#f5f7fb` | Títulos e conteúdo principal |
| `--color-muted` | `#a6b0c0` | Descrições e conteúdo secundário |
| `--color-subtle` | `#8996a9` | Metadados legíveis em fundo escuro |
| `--color-accent` | `#2dd4bf` | Ação principal, links e identificação de seção |
| `--color-secondary` | `#60a5fa` | Detalhes e segundo acento |
| `--color-warm` | `#f97316` | Destaque pontual |
| `--color-border` | Branco a 10% | Separação visual entre superfícies |
| `--color-success` | `#34d399` | Confirmação de operação |
| `--color-danger` | `#fb7185` | Erros e mensagens de validação |
| `--color-focus` | `#7dd3fc` | Contorno de foco por teclado |

`--color-violet` permanece como alias de compatibilidade para o azul secundário. Novos componentes devem preferir `--color-secondary`. Os nomes anteriores (`--accent`, `--bg-primary`, `--text-secondary`, entre outros) apontam para os novos tokens e permitem reutilizar o globo de habilidades, o mapa e o assistente sem duplicar a paleta.

O gradiente de marca segue verde-água → azul → laranja e deve ficar restrito a detalhes de identidade. Textos longos usam cores sólidas. Erros e sucessos sempre incluem mensagem escrita, além da cor. Bordas decorativas não substituem o contorno de foco.

## Tipografia

| Papel | Token / regra | Uso |
| --- | --- | --- |
| Família principal | `--font-sans` | Inter com fontes de sistema como alternativa |
| Família técnica | `--font-mono` | Identificadores e pequenas informações técnicas |
| Título de página | `--text-display` | Escala fluida de 40 a 92 px; entrelinha 1,08 |
| Título de seção | `--text-heading` | Escala fluida de 28 a 44 px; entrelinha 1,2 |
| Texto principal | `--text-base` | 16 px; entrelinha 1,7 |
| Descrição de página | Escala fluida | 16 a 18 px; largura máxima de 65 caracteres |
| Botões e metadados | `--text-sm` | 14 px |
| Etiquetas e sobrancelhas | `--text-xs` | 12 px; texto curto |

Cada página usa um único `h1`. Seções usam `h2`; títulos de cartões usam `h3`. A classe visual não muda a hierarquia semântica. Textos contínuos mantêm largura de leitura com `--reading-width`. Evite títulos inteiros em maiúsculas; a classe `.eyebrow` reserva esse tratamento para rótulos breves.

## Espaçamento, formas e layout

A escala começa em 4 px e oferece 8, 12, 16, 20, 24, 32, 40, 48, 64, 80 e 96 px (`--space-1` a `--space-24`). Use 8–12 px entre elementos relacionados, 16–24 px dentro de grupos e 32–96 px para separar blocos de conteúdo.

Os raios são 8, 12, 16 e 24 px. Botões usam 12 px, painéis usam 24 px e etiquetas usam raio completo. Painéis reduzem o raio para 16 px em telas estreitas. Sombras discretas aparecem em elementos elevados; painéis comuns usam superfície e borda.

O `.container` centraliza até 1152 px e mantém margens laterais fluidas entre 18 e 48 px. A página nunca deve depender de uma largura fixa mínima. Em grids, use `minmax(0, 1fr)` para permitir que conteúdo longo se ajuste.

| Largura disponível | Diretriz de layout |
| --- | --- |
| Até 640 px | Uma coluna; navegação compacta; ações podem quebrar linha |
| 641–900 px | Duas colunas somente quando o conteúdo comportar; hero e formulário podem continuar empilhados |
| Acima de 900 px | Layouts de duas colunas e grades de cartões conforme o conteúdo |
| Acima de 1152 px | Conteúdo permanece centralizado na largura máxima |

Os limites são pontos de adaptação, não categorias de aparelhos. A tipografia, as margens e o padding dos painéis são fluidos. O layout da aplicação deve ser validado também em 320 px e com zoom, sem rolagem horizontal.

## Componentes compartilhados

| Classe | Contrato |
| --- | --- |
| `.container` | Define largura e margens horizontais; não adiciona padding vertical |
| `.eyebrow` | Rótulo curto de seção em verde-água |
| `.page-header` | Espaço do cabeçalho; estiliza `h1` e `.eyebrow` internos |
| `.page-description` | Descrição de página com largura de leitura |
| `.button` | Base de botão ou link de ação; altura mínima de 48 px |
| `.button-primary` | Ação principal com fundo verde-água e texto escuro |
| `.button-secondary` | Ação secundária em superfície escura com borda |
| `.button-quiet` | Ação auxiliar com fundo verde-água suave |
| `.panel` | Superfície com borda, padding fluido e cantos arredondados |
| `.tag` | Etiqueta informativa; não presume comportamento interativo |
| `.section-heading` | Título ou agrupamento de `h2` com descrição/link auxiliar |
| `.skip-link` | Link visível ao receber foco para pular para o conteúdo |

Combine sempre `.button` com uma variante. Use `<button>` para ações locais e `<a>` para navegação e downloads. Ícones decorativos devem usar `aria-hidden="true"`; botões com apenas ícone precisam de nome acessível. Não remova sublinhados de links em texto contínuo sem outro indicador reconhecível.

```jsx
<a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
<main id="conteudo" className="container" tabIndex={-1}>
  <header className="page-header">
    <p className="eyebrow">Projetos</p>
    <h1>Ideias que ganham forma.</h1>
    <p className="page-description">Contexto, decisões e resultados de cada projeto.</p>
  </header>
  <article className="panel">
    <span className="tag">React</span>
    <h2>Nome do projeto</h2>
    <a className="button button-primary" href="https://example.com">Ver projeto</a>
  </article>
</main>
```

## Estados e acessibilidade

- **Hover:** destaque de fundo e borda em aparelhos com apontador; conteúdo continua acessível em telas de toque.
- **Foco:** contorno azul-claro de 3 px com afastamento de 4 px nos controles interativos. Nunca use `outline: none` sem substituição equivalente.
- **Ativo:** deslocamento de 1 px no botão, sem alteração de layout.
- **Desabilitado:** superfície neutra, texto legível e cursor correspondente. Prefira o atributo nativo `disabled`. Para `aria-disabled`, a aplicação também deve impedir a ação e explicar o motivo quando necessário.
- **Enviando:** botão com texto explicando a operação; formulário com `aria-busy`. Mantenha o texto de status em uma região viva apropriada.
- **Erro:** mensagem próxima do campo, `aria-invalid` e associação por `aria-describedby`. Não dependa apenas de uma borda vermelha.
- **Sucesso:** confirmação escrita; não apague uma falha anterior antes de haver um novo resultado.
- **Movimento reduzido:** respeite `prefers-reduced-motion`. O CSS desativa rolagem suave e reduz transições e animações. Animações controladas por JavaScript também devem consultar essa preferência.

Use labels visíveis nos formulários, mensagens claras, ordem de foco previsível e áreas de toque de pelo menos 44 px. Os botões do sistema têm 48 px de altura. Verifique contraste, navegação por teclado, foco ao mudar de página, leitura em telas pequenas e o comportamento com zoom antes de publicar.

## Critérios de consistência

Novas páginas reutilizam o mesmo cabeçalho, container, escala tipográfica e componentes de ação. Adicione um token quando houver uma função recorrente; evite um token para cada exceção. Documente alterações visuais neste arquivo e valide os estados interativos em todas as páginas afetadas.
