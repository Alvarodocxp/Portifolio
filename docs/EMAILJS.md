# Configuração e validação do contato

A página `/#/contato` envia uma mensagem ao proprietário pelo SDK `@emailjs/browser`. O formulário valida nome, e-mail, assunto e mensagem; mantém o texto quando ocorre uma falha e mostra sucesso somente após uma resposta confirmada do EmailJS. O link de e-mail direto abre o aplicativo do visitante com o rascunho e não registra um envio como concluído.

## Variáveis do Vite

Configure estas três variáveis em `.env.local` para desenvolvimento e nas variáveis de build da hospedagem:

```env
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

Os valores correspondem ao serviço conectado, ao template de recebimento pelo proprietário e à **Public Key** da conta EmailJS. O exemplo acima contém apenas os nomes; preencha os valores no ambiente. `.env.local` fica fora do controle de versão.

A Public Key do EmailJS foi criada para uso no navegador e aparece no bundle compilado, assim como os identificadores do serviço e do template. A Private Key não é necessária para esta integração e não deve ser colocada em uma variável `VITE_`, pois o Vite publica essas variáveis no código do cliente.

Depois de alterar as variáveis, reinicie `npm run dev`. Em produção, execute um novo build/deploy: editar as variáveis da hospedagem não modifica um bundle já publicado.

## Template de recebimento

No [painel do EmailJS](https://dashboard.emailjs.com/admin), conecte o serviço de e-mail e configure o template usado por `VITE_EMAILJS_TEMPLATE_ID`:

| Campo do template | Configuração |
| --- | --- |
| To Email | Endereço fixo do proprietário: `silvaalvarobf@gmail.com`, conforme `RESUME_DATA.email` |
| From Name | `{{name}}` |
| From Email | Endereço padrão/autorizado do serviço conectado |
| Reply To | `{{reply_to}}` |
| Subject | `{{title}}` |

O visitante informa o endereço para resposta; ele não escolhe o destinatário. O endereço do visitante fica em **Reply To**, e o endereço remetente permanece o do serviço conectado.

Um corpo de template compatível é:

```text
Novo contato pelo portfólio

Nome: {{name}}
E-mail: {{email}}
Assunto: {{subject}}
Data: {{time}}

Mensagem:
{{message}}
```

| Variável enviada | Origem |
| --- | --- |
| `name` | Nome do visitante, sem espaços nas extremidades |
| `email` | E-mail validado do visitante |
| `subject` | Assunto preenchido no formulário |
| `message` | Mensagem preenchida no formulário |
| `title` | Assunto com o prefixo `[Portfólio]` |
| `time` | Data e hora formatadas em português, no fuso `America/Sao_Paulo` |
| `reply_to` | Mesmo endereço do campo `email` |
| `user_name`, `from_name` | Aliases de `name` para templates anteriores |
| `user_email`, `from_email` | Aliases de `email` para templates anteriores |

O exemplo de contato fornecido envia uma confirmação ao visitante e uma notificação ao proprietário por templates distintos. Este projeto usa **um template de recebimento pelo proprietário**. Ele inclui `name`, `email`, `message`, `title` e `time` do exemplo, além dos aliases acima. Não é necessário cadastrar um segundo template para o fluxo atual.

O formulário atual não gera um token reCAPTCHA. Se o template estiver configurado para exigir reCAPTCHA, esse requisito precisará ser integrado antes de habilitar essa opção no painel; os campos enviados pelo exemplo não substituem o token.

## Domínios, conta e limites

O SDK faz um `POST` para `https://api.emailjs.com/api/v1.0/email/send`. O ambiente que executa o navegador precisa permitir acesso a `api.emailjs.com`.

Nas configurações de segurança da conta EmailJS, autorize as origens utilizadas para desenvolver e publicar o site. Uma origem é o protocolo, o domínio e a porta; o caminho do projeto e o fragmento da rota não fazem parte dela. Por exemplo:

- Desenvolvimento local: `http://localhost:5173`.
- Prévia na nuvem: a origem real da URL aberta no navegador.
- GitHub Pages, caso seja a hospedagem escolhida: `https://alvarodocxp.github.io`.
- Outra hospedagem: a origem do endereço público e, se utilizada, a do domínio próprio.

Confira no painel se o serviço está conectado, se o template pertence à conta da Public Key e se há cota disponível. Respeite os limites do serviço e do plano. Uma resposta `429` exige aguardar antes de tentar novamente; o formulário recomenda um minuto. O botão fica desabilitado durante o envio e o código evita chamadas simultâneas do mesmo formulário.

## O que os testes comprovam

| Validação | Evidência | Comprova recebimento? |
| --- | --- | --- |
| Configuração local | As três variáveis são carregadas pelo Vite em desenvolvimento e produção, sem placeholders | Não; confirma somente a configuração do cliente |
| Testes unitários | 7 testes em `src/lib/contact.test.js`: configuração, campos, parâmetros, respostas confirmadas, erros e rascunho de e-mail direto | Não; utilizam um cliente simulado |
| Navegador com API simulada | Verifica os estados de envio, sucesso, erro e nova tentativa com respostas interceptadas | Não; a resposta não vem do serviço real |
| API real | Teste autorizado aceito com HTTP 200 — OK, com TLS verificado e parâmetros do formulário | Aceitação confirmada e recebimento confirmado pelo proprietário |
| Recebimento | Proprietário confirmou no chat a mensagem recebida na caixa do template | Sim, confirmação do proprietário; Reply To não foi inspecionado separadamente |

Execute os testes unitários com:

```bash
node --test src/lib/contact.test.js
```

**Estado da validação em 14/10/2026:** as variáveis foram carregadas pelo Vite em desenvolvimento e produção. Passaram os 7 testes unitários e os testes de navegador com API interceptada. Após autorização explícita do proprietário, um envio real com assunto `[Portfólio] Teste do portfólio` foi aceito pela API EmailJS: **HTTP 200, corpo `OK`**. A chamada usou o endpoint REST, a origem de desenvolvimento e os mesmos parâmetros construídos por `buildContactParams`, com verificação TLS preservada. Somente um envio foi aceito; não repetir esse teste sem nova autorização.

O acesso de rede inicialmente falhou; uma verificação posterior de preflight retornou HTTP 204 e a chamada real retornou HTTP 200. O domínio `api.emailjs.com` está salvo no rascunho do ambiente. O Chromium automatizado desta máquina apresentou `ERR_CERT_AUTHORITY_INVALID` ao acessar HTTPS pelo proxy, então o envio real foi validado por um cliente HTTP que usa a CA confiada pelo sistema. A validação TLS não foi desativada. Isso distingue a comprovação da API da execução do formulário com uma conexão externa real no navegador da nuvem.

**Recebimento na caixa de entrada:** confirmado pelo proprietário no chat em 14/10/2026. A mensagem de teste foi recebida na caixa configurada no template. Isso complementa a resposta HTTP 200 da API e foi registrado em [EVIDENCIAS.md](EVIDENCIAS.md). A inspeção do campo Reply To no cliente de e-mail não foi relatada separadamente.

## Teste real para a entrega da atividade

1. Confirme serviço, template, destinatário fixo e origens autorizadas no painel EmailJS. Aplique a permissão de rede do ambiente, caso teste pela prévia na nuvem.
2. Abra `/#/contato` no navegador da versão que será entregue. Use seu próprio e-mail como endereço para resposta e identifique a mensagem como um teste do portfólio.
3. Envie uma única mensagem. Nas ferramentas do navegador, confira a requisição à API EmailJS e a resposta `2xx`. Não publique capturas com valores de configuração ou dados pessoais de outros visitantes.
4. Confira o registro correspondente no histórico do painel EmailJS. Se o formulário mostrar erro, use o código de status e o registro do painel para conferir serviço, template, origem, conexão ou limite.
5. Abra a caixa de entrada do proprietário, confira também spam e confirme nome, assunto, texto e data recebidos. Ao responder, confirme que **Reply To** aponta para o e-mail informado no formulário.
6. Registre a data, o endereço público testado e o resultado em [EVIDENCIAS.md](EVIDENCIAS.md). O sucesso do formulário confirma que o serviço aceitou a solicitação; a caixa de entrada comprova o recebimento.

## Referências

- [EmailJS: SDK `send`](https://www.emailjs.com/docs/sdk/send/)
- [EmailJS: REST API `send`](https://www.emailjs.com/docs/rest-api/send/)
- [Vite: variáveis e modos](https://vite.dev/guide/env-and-mode)
- [Implementação do contato](../src/pages/ContactPage.jsx)
- [Validação e parâmetros](../src/lib/contact.js)
