# Evidências e critérios do Laboratório 01

Este documento relaciona os requisitos do PDF **LABORATÓRIO 01 — Portfólio Profissional** com a implementação e com as evidências disponíveis. A rubrica distribui 15 pontos entre planejamento e prototipação (4), funcionalidades principais (4) e hospedagem/finalização (7).

## Fontes utilizadas

- Enunciado enviado pelo aluno: páginas 1–3, descrição do sistema, entregas e critérios de avaliação.
- [Template de README do professor](https://github.com/joaopauloaramuni/desenvolvimento-e-integracao-de-aplicacoes-web/blob/main/TEMPLATES/template_README.md): referência para organização da documentação.
- [Protótipo informado no Figma](https://www.figma.com/design/CWnq4BugBfnHdXvTuWFP3i/Sem-t%C3%ADtulo?node-id=0-1): o ambiente retornou HTTP 403 em 14/10/2026. Não foi possível inspecionar o arquivo ou confirmar a correspondência visual com seus frames.
- Dados pessoais, formação, objetivo e habilidades: currículo PDF já presente em `public/curriculo-alvaro-barbosa.pdf`, dados existentes no projeto e informações fornecidas pelo aluno.

## Projetos e datas verificadas

As datas da linha do tempo vêm de commits públicos. Elas documentam o período do código disponível; não representam uma data de lançamento presumida.

| Projeto | Evidência | Data exibida | Capturas |
| --- | --- | --- | --- |
| CineRecomendação | [Repositório](https://github.com/Alvarodocxp/Semana-5-atividade), HTML/CSS em `public/` e README com telas reais; commit `8dfc59a` | Março de 2026; commit de 22/03/2026 | [Acesso](../public/media/cine-login.png) e [feed](../public/media/cine-feed.png), copiadas de `fotosite.png` e `fotosite1.png` do próprio repositório |
| Autenticação com Spring Boot | [Repositório](https://github.com/Alvarodocxp/Semana-2-Diaw) e [README da aplicação](https://github.com/Alvarodocxp/Semana-2-Diaw/blob/main/Atividade2/README.md); commit `05d4e2d` | Setembro de 2026; commit de 14/09/2026 | [Login](../public/media/auth-login.png) e [cadastro](../public/media/auth-register.png), capturadas com o backend real em execução |
| Portfólio profissional | [Repositório](https://github.com/Alvarodocxp/Portifolio); primeiro commit `e2e2e0b` | Outubro de 2026; primeiro commit de 07/10/2026 | [Sobre mim](../public/media/portfolio-desktop.png), [contato](../public/media/portfolio-contact.png), [início](../public/media/portfolio-home.png) e [celular](../public/media/portfolio-mobile.png), capturadas com a versão final em execução no Chromium |
| Castle Defenders | Participação colaborativa informada pelo aluno e [referência no portfólio de Rafael Gomes](https://github.com/rafaelgomes77oliveira-ux/Portfolio/blob/main/Portfolio/src/data/portfolioData.js), linhas 86–93 | Sem data de calendário confirmada; aparece fora da linha do tempo | Ainda não disponível: [URL informada](https://github.com/rafaelgomes77oliveira-ux/Pygame-Castle-Defenders) retornou HTTP 404 |

O CineRecomendação é apresentado como uma interface em HTML/CSS. Suas telas não comprovam um serviço de autenticação ou persistência de recomendações. As funcionalidades do projeto Java foram confirmadas no código e em sua execução local. O Castle Defenders não recebeu atribuição de autoria principal nem funcionalidades presumidas; Python, Pygame, Aseprite e pixel art constam da referência pública do colaborador.

Projetos de MQL5 e MetaTrader permanecem na experiência pessoal conforme a informação do aluno. Não foram apresentados como repositórios públicos ou demonstrações executáveis.

## Validação das capturas do projeto Java

Em 14/10/2026, a aplicação de autenticação foi executada em uma cópia temporária do repositório, com **Java 17**, **Gradle 9.7.1**, **Spring Boot 4.1.1** e **H2**. O JDK 17 foi obtido da distribuição oficial Temurin com TLS e checksum SHA256 verificados. Os arquivos-fonte do projeto permaneceram intactos.

- `GET /login` e `GET /register`: HTTP 200.
- Login pela interface com uma conta demonstrativa do próprio projeto: redirecionamento para `/home`.
- Capturas realizadas com Chromium/Playwright, resolução 1280 × 960, e verificadas visualmente.
- Serviço de e-mail do projeto Java mantido em simulação; nenhum e-mail foi enviado nesse teste.

## Validação da página Projetos

Em 14/10/2026, Chromium/Playwright abriu `/#/projetos` no servidor local e confirmou:

- Três projetos na linha do tempo, em ordem março → setembro → outubro de 2026.
- Filtro **Full stack** reduzindo a lista ao projeto Java e filtro **Todos** restaurando os três itens.
- Alternância da galeria do CineRecomendação entre acesso e recomendações.
- Alternância de português para inglês, mantendo o projeto colaborativo disponível.
- Ausência de rolagem horizontal nas larguras 320, 375, 768 e 1280 pixels.
- Nenhum erro JavaScript de página durante essas interações.

Essa verificação cobre a página Projetos. A validação global descrita abaixo cobre as outras páginas e as capturas finais do portfólio.

## Validação global do portfólio

Em 14/10/2026, passaram `npm run lint`, `npm test` (7 testes) e `npm run test:e2e` (17 testes Chromium). Os testes de navegador percorrem 40 combinações de páginas, português/inglês e larguras 320, 375, 768 e 1440 pixels. Confirmam ausência de overflow horizontal, conteúdo próprio por rota, histórico e recarregamento, idioma persistente, filtros/galeria, validação do formulário, estados simulados de envio e falha, proteção contra envio duplicado, foco e fechamento do diálogo por Escape.

As capturas de Sobre mim, Contato, Início e Contato móvel foram obtidas da aplicação real em execução. As respostas EmailJS nos testes automatizados de navegador são interceptadas e não comprovam recebimento. Separadamente, um teste real autorizado foi aceito pela API EmailJS com HTTP 200 — OK, usando os parâmetros do formulário e TLS verificado. Somente um envio foi aceito. O Chromium da nuvem apresentou erro de confiança no certificado do proxy; a chamada real foi validada por um cliente HTTP com a CA do sistema. O proprietário confirmou no chat, em 14/10/2026, o recebimento da mensagem na caixa configurada no template. A validação do EmailJS reúne a resposta da API e essa confirmação de recebimento.

O build com `--base=/Portifolio/` foi validado com as cinco rotas e recarregamento em cada uma, incluindo o currículo PDF. O workflow GitHub Pages foi preparado, mas não foi executado remotamente. O aviso de tamanho do bundle 3D continua presente; o globo é opcional e carregado sob demanda.

## Conferência por etapa

| Etapa | Requisito da rubrica | Evidência ou pendência |
| --- | --- | --- |
| Lab01S01 — 4 pontos | Repositório e README inicial | Repositório público existente, documentação organizada e referência ao template do professor |
| Lab01S01 | Wireframes de média fidelidade no Figma e imagens dos protótipos no README | Link fornecido e wireframes de referência SVG criados em docs/prototypes; inspeção do arquivo Figma e exportação dos seus frames ainda pendentes |
| Lab01S01 | Protótipo do front-end, menu, cabeçalho, rodapé e conteúdo | Aplicação React com páginas próprias e componentes compartilhados; navegação e conteúdo validados no Chromium |
| Lab01S02 — 4 pontos | Sobre Mim em português e inglês | Conteúdo bilíngue e currículo PDF; ambos os idiomas conferidos no navegador |
| Lab01S02 | Projetos em linha do tempo dinâmica, do mais antigo ao mais recente | Dados ordenados por data, filtros funcionais por área, tecnologias, descrições e links específicos dos três projetos verificados |
| Lab01S02 | Experiências com instituição, atividade, período e descrição | Dados de formação, projetos acadêmicos e experiências pessoais; não inventar vínculos profissionais |
| Lab01S02 | Contato com ícones e formulário funcional | Formulário, testes de interface simulados, teste real aceito com HTTP 200 — OK e recebimento confirmado pelo proprietário |
| Lab01S02 | Validações e responsividade | Campos inválidos, estados simulados de envio/erro/sucesso, teclado e larguras 320, 375, 768 e 1440 px verificados |
| Lab01S03 — 7 pontos | Deploy completo e funcional em hospedagem gratuita | Configuração pode estar pronta localmente, mas o endereço público precisa ser publicado e testado |
| Lab01S03 | Ajustes visuais e usabilidade | Design system documentado, componentes e páginas responsivas conferidos em navegador |
| Lab01S03 | Imagens ou GIFs dos projetos em execução | CineRecomendação, autenticação e portfólio possuem capturas reais; mídia real do Castle Defenders aguarda acesso ao projeto privado |
| Lab01S03 | README final com tecnologias, dependências, estrutura, execução e site publicado | README atualizado com tecnologias, dependências, estrutura, execução e capturas; endereço esperado informado como publicação ainda não confirmada |

## Pendências externas para a entrega

1. **EmailJS no domínio final:** o teste de desenvolvimento já foi aceito com HTTP 200 — OK e recebido, conforme confirmação do proprietário. Após publicar, autorizar a origem final no painel e validar o formulário nesse domínio. Não reenviar o teste de desenvolvimento já concluído sem nova autorização.
2. **Figma:** tornar o arquivo acessível para avaliação e exportar os frames das quatro páginas. Vincular as imagens no README e confirmar quais decisões do design system correspondem ao protótipo.
3. **Castle Defenders:** disponibilizar um link público correto ou acesso autorizado ao código, informar a data se desejar incluí-lo na linha do tempo e adicionar uma captura/GIF real do jogo em execução.
4. **Hospedagem:** publicar a versão final, abrir o endereço público, navegar entre páginas, atualizar a página em uma rota interna e testar o contato no domínio publicado. O endereço informado anteriormente (`https://alvarodocxp.github.io/Portifolio/`) não teve sua disponibilidade confirmada pelo ambiente, pois a requisição foi bloqueada pelo proxy com HTTP 403.
5. **Apresentação:** demonstrar as páginas nos dois idiomas, explicar a separação entre interface React e serviço EmailJS, mostrar os filtros da timeline e as capturas reais, e explicar os tokens e regras de responsividade do design system.

As pendências deste documento devem ser atualizadas após a validação final. Nenhuma publicação, recebimento de e-mail ou correspondência com o Figma deve ser marcada como concluída sem a respectiva evidência.
