# Wireframes das páginas do portfólio

Os quatro SVGs abaixo foram criados nesta alteração a partir das páginas implementadas. São wireframes de média fidelidade para revisão da estrutura, hierarquia e adaptação entre desktop e mobile. Cada arquivo reúne uma referência desktop de 1200 px e uma mobile de 388 px, com conteúdo real do portfólio e acabamento monocromático.

Eles não são exportações do Figma nem comprovam a existência de telas no arquivo compartilhado. A consulta ao [arquivo original do Figma](https://www.figma.com/design/CWnq4BugBfnHdXvTuWFP3i/Sem-t%C3%ADtulo?node-id=0-1) retornou HTTP 403 nesta sessão; a correspondência com os frames desse arquivo continua pendente de validação. Os SVGs podem ser importados no Figma para organizar a entrega e fazer essa revisão.

## Sobre mim

[Abrir o SVG completo](prototypes/sobre.svg)

![Wireframe das versões desktop e mobile da página Sobre mim](prototypes/sobre.svg)

A página apresenta a formação, os interesses e o objetivo profissional. No desktop, a apresentação e o cartão de currículo compartilham a mesma linha. No mobile, o currículo aparece depois do texto. As habilidades usam categorias, links para documentação e acesso opcional ao globo 3D; a lista continua disponível sem o globo.

## Projetos

[Abrir o SVG completo](prototypes/projetos.svg)

![Wireframe das versões desktop e mobile da página Projetos](prototypes/projetos.svg)

A página usa filtros e uma linha do tempo, do projeto mais antigo ao mais recente. Cada cartão inclui categoria, descrição, entregas, tecnologias, código, documentação e área de captura. As áreas cruzadas representam espaços de imagem; a aplicação utiliza capturas reais. A colaboração em Castle Defenders aparece em uma seção própria, com a disponibilidade do repositório informada.

## Experiências

[Abrir o SVG completo](prototypes/experiencias.svg)

![Wireframe das versões desktop e mobile da página Experiências](prototypes/experiencias.svg)

A página distingue formação acadêmica e projetos pessoais. Os cartões mostram instituição ou contexto, título, período e descrição. A chamada final conduz à página de contato. A hierarquia preserva a busca pelo primeiro estágio sem apresentar projetos pessoais como empregos anteriores.

## Contato

[Abrir o SVG completo](prototypes/contato.svg)

![Wireframe das versões desktop e mobile da página Contato](prototypes/contato.svg)

A página oferece e-mail, WhatsApp, localização, redes e cópia do endereço. No desktop, os canais diretos acompanham o formulário em duas colunas; no mobile, precedem o formulário. Nome, e-mail, assunto e mensagem mantêm labels visíveis. A nota de privacidade explica o uso dos dados e o processamento pelo EmailJS.

O desenho representa o formulário em repouso. A implementação também contempla validação, envio em andamento, confirmação, falha com preservação do conteúdo e alternativa por e-mail direto. Esses estados devem ser acrescentados como variantes ao preparar o protótipo interativo no Figma.

## Correspondência com a implementação

| Página | Rota | Componentes representados |
| --- | --- | --- |
| Sobre mim | `/#/sobre` | Cabeçalho, apresentação, currículo, categorias e habilidades |
| Projetos | `/#/projetos` | Cabeçalho, filtros, linha do tempo, galerias e colaboração |
| Experiências | `/#/experiencias` | Cabeçalho, cartões de formação/prática e chamada de contato |
| Contato | `/#/contato` | Cabeçalho, canais, formulário e privacidade |

Todos os desenhos incluem a navegação principal, seleção PT/EN e rodapé. A versão mobile representa o menu recolhido. O conteúdo escrito aparece em português; a aplicação fornece a versão em inglês usando a mesma estrutura.

Os wireframes priorizam organização e leitura; as dimensões e os textos de alguns blocos foram condensados para facilitar a revisão. A implementação usa escalas fluidas, conteúdo completo, estados interativos e os tokens documentados em [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md). Os SVGs não substituem a validação da aplicação em outras larguras.

## Preparar a revisão no Figma

1. Importe os quatro SVGs e organize os grupos em frames identificados por página e dispositivo.
2. Confira a ordem de conteúdo com as rotas implementadas e ajuste os frames às dimensões exigidas pela atividade.
3. Aplique os tokens de cor, tipografia, espaçamento e componentes do design system para evoluir os wireframes.
4. Conecte a navegação entre páginas, o menu mobile, os filtros, o currículo e as chamadas de contato.
5. Acrescente variantes de foco, validação, envio, sucesso e erro do formulário.
6. Valide o arquivo original, as permissões de acesso e o link compartilhado antes da entrega.

Os arquivos usam formas e texto vetoriais, sem imagens externas ou bibliotecas de ícones. A família solicitada é Inter, com Arial como alternativa; a disponibilidade de fontes pode alterar a aparência ao importar. O SVG contém um título e uma descrição para permitir sua identificação ao abrir no navegador.
