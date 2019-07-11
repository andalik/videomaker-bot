<pre>
 _    ___     __              __  ___      __                ____        __ 
| |  / (_)___/ /__  ____     /  |/  /___ _/ /_____  _____   / __ )____  / /_
| | / / / __  / _ \/ __ \   / /|_/ / __ `/ //_/ _ \/ ___/  / __  / __ \/ __/
| |/ / / /_/ /  __/ /_/ /  / /  / / /_/ / ,< /  __/ /     / /_/ / /_/ / /_  
|___/_/\__,_/\___/\____/  /_/  /_/\__,_/_/|_|\___/_/     /_____/\____/\__/  
</pre>


O **Video Maker Bot** é um projeto conceitual para criação automática de vídeos para o Youtube utilizando inúmeras tecnologias distintas.

À partir de um orquestrador, quatro robôs com funções bem específicas são executados para pesquisar textos na Wikipedia, baixar imagens relacionadas ao tema escolhido, tratar as imagens obtidas, compor um vídeo com animação e áudio, renderizar, realizar upload do vídeo, e na plataforma Youtube, definir o título, a descrição e as tags do vídeo. 

As tecnologias utilizadas neste projeto são:
- JavaScript + Node.js,
- Algorithmia (marketplace de algoritmos),
- Wikipedia (pesquisa e obtenção dos textos),
- API de buscas do Google (Google Custom Search e Google Images),
- IBM Watson (Natural Language Understanding),
- ImageMagick (tratamento de imagens),
- Adobe After Effects (renderização do vídeo em modo headless),
- Google APIs Node.js Client (autenticação por OAuth e upload do vídeo para o Youtube),

# Pré-requisitos
- Node (https://nodejs.org)

# Instalação
## Clonar repositório ##
```
git clone https://github.com/andalik/videomaker-bot.git
cd videomaker-bot
npm install
```

# Credenciais de acesso aos serviços (chaves de API)
Após clonar o repositório, acesse a pasta /credentials e crie os arquivos abaixo com as API Keys obtidas através dos serviços Algorithmia, IBM Cloud e Google Cloud Platform.

## Formato dos arquivos de credenciais
### Algorithmia

Arquivo: `algorithmia.json`

```
{
  "apiKey": "xxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

### IBM Cloud
Arquivo: `watson-nlu.json`

```
{
  "apikey": "xxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "iam_apikey_description": "Auto generated apikey during resource-key operation for Instance - crn:v1:bluemix:public:natural-language-understanding:us-south:a/ffcb2c250e19bc335de2e9f1533711c8:4423b565-1e77-4d4c-a56e-656b3af7ac0d::",
  "iam_apikey_name": "auto-generated-apikey-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Manager",
  "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/ffcb2c250e19bc335de2e9f1533711c8::serviceid:ServiceId-3b990ca3-62e6-4445-b303-84239f956d01",
  "url": "https://gateway.watsonplatform.net/natural-language-understanding/api"
}
```

### Google Cloud Platform
Arquivo: `google-search.json`
```
{
    "apiKey": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "searchEngineId": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

# Como/onde ativar os serviços e obter as chaves de API
## Algorithmia ##
Acesse o Algorithmia em https://algorithmia.com/ e autentique-se na plataforma. Clique em Home, e no menu central selecione API Keys. Por fim, copie a chave de API. 

![Algorithmin](https://i.imgsafe.org/ba/ba1d23897c.gif)

## IBM Cloud ##
Você precisa criar também as credenciais do *Watson* no site da [IBM](https://cloud.ibm.com/login), também não tem segredo, basta se cadastrar, quando estiver logado no menu superior clique em **Catálogo**, depois dentro de **IA** procure por *Natural Language Understanding*

![IBM](https://i.imgsafe.org/ba/bab0fc4ecd.jpeg)

clicando nele na nova página vai aparece um botão "criar" no final da página, uma vez que o serviço for criado, você será redirecionado para a página de gerenciamento do serviço que você acabou de criar, no menu lateral esquerdo procure por **Credenciais de Serviços** e depois clique em **Auto-generated service credentials** destacado abaixo, então copie as *Credenciais*:

![IBM](https://i.imgsafe.org/ba/bace46f16b.jpeg)

Novamente, voltando na pasta do projeto ainda dentro da pasta **video-maker\credentials** você ira criar um novo arquivo de texto com o nome `watson-nlu.json` e dentro desse arquivo você vai colar as credenciais que copiou anteriormente:
``` js
{
  "apikey" : "...",
  "iam_apikey_description" : "...",
  "iam_apikey_name": "...",
  "iam_role_crn": "...",
  "iam_serviceid_crn": "...",
  "url": "..."
}
```

## Google Cloud Platform ##
Antes de criarmos as api's que iremos utilizar é necessário vincular a nossa conta do Google com o [Google Cloud Plataform](https://cloud.google.com/), na página do **Google Cloud Plataform** você irá clicar no botão **Faça uma Avaliação Gratuita**:

![google-cloud](https://i.imgsafe.org/61/61ce83ca22.png)

 em seguida marque a opção **Termos e Condições**

![google-cloud-step1](https://i.imgsafe.org/62/621a2df511.png)

> Ps.: É importante lembrar que alguns recursos do **Google Cloud Plataform** são **Pagos**, por esse motivo é necessário inserir as informações de pagamento, mas fique tranquilo porque iremos utilizar apenas os recursos **Gratuitos**

![google-cloud-pay](https://i.imgsafe.org/62/6253ce8142.jpeg)

Agora é a hora de criarmos um projeto que iremos vincular as Api's que vamos utilizar, para isso basta clicar no menu do topo da página "**Selecionar projeto**" e depois em "**Novo Projeto**":

![image](https://user-images.githubusercontent.com/34013325/55571155-52e3d400-56db-11e9-998f-bd99ab647403.png)

de um nome ao projeto e clique no botão **criar:**

![image](https://user-images.githubusercontent.com/34013325/55571267-963e4280-56db-11e9-9b21-7f028caa05c1.png)

após isso o projeto começará a ser criado e assim que terminar um menu vai aparecer com o projeto que acabamos de criar então você irá seleciona-lo:

![image](https://user-images.githubusercontent.com/34013325/55571506-064cc880-56dc-11e9-804b-f14003dccc09.png)

Com o projeto criado agora é hora de habilitarmos e configurarmos a Api, você irá clicar no menu lateral esquerdo no topo navegar até **API's e Serviços** > **Bibliotecas**:

![image](https://user-images.githubusercontent.com/34013325/55572521-22ea0000-56de-11e9-89cc-f477fe18bf65.png)

no campo de pesquisa basta procurar por **Custom Search API**, clicar em **Ativar**, e aguardar até a ativação da api:

![image](https://user-images.githubusercontent.com/34013325/55572661-78bea800-56de-11e9-9ae3-fbc87758aa84.png)

Após a ativação vai aparecer uma mensagem solicitando a criação das credenciais da API, então basta você clicar em **Criar Credenciais**:

![image](https://user-images.githubusercontent.com/34013325/55572835-eb2f8800-56de-11e9-8292-fc3c4bf74084.png)

Procure por **Custom Search API** no dropdown e clique em "**Preciso de quais credenciais?**"

![image](https://user-images.githubusercontent.com/34013325/55572958-2cc03300-56df-11e9-8bc1-17641ba5138e.png)

Após isso irá aparecer sua Api Key, você vai copia-la e clicar no botão concluir, voltando a pasta do projeto você vai navegar até **video-maker/credentials** e irá criar um novo arquivo chamado **google-search.json**


### Custom Search ###
Agora iremos configurar o nosso motor de busca personalizado do google, para isso você vai acessar o [Custom Search Engine](https://cse.google.com/cse/create/new), e irá informar o **site a pesquisar** coloque **google.com**, ire selecionar o idioma que preferir, e por fim clique em **Opções avançadas** e para o esquema iremos utilizar o mais genérico **Thing**, pronto tudo preenchido você irá clicar em **criar**:

![image](https://user-images.githubusercontent.com/34013325/55578410-38662680-56ec-11e9-80ea-06ff9e25ba3f.png)

Agora basta clicar em **Painel de Controle** na nova tela nós iremos habilitar a opção **Pesquisa de imagens** e depois iremos clicar no botão **Copiar para área de transferência**"

![image](https://user-images.githubusercontent.com/34013325/55574756-8a567e80-56e3-11e9-99ea-d307547c781f.png)

> Ps.: Existem diversas opções que eu aconselho futuramente você testar e descobrir o que cada uma dela faz 😋 

![image](https://user-images.githubusercontent.com/34013325/55574920-0355d600-56e4-11e9-8f36-822a62224fab.png)

Voltando no arquivo **google-search.json** iremos criar uma nova propriedade e iremos colar o código identificador do mecanismo de busca que criamos, identificado por `searchEngineId`, no final irá ficar assim:

```
{
  "apiKey": "API_KEY_AQUI"
  "searchEngineId": "ID_MECANISMO_DE_BUSCA"
}
```

# YouTube
Chegou a hora de configurarmos a api do youtube!, como fizemos na api custom search iremos fazer o mesmo com a api do YoutTube, então basta acessar o [Google Cloud](https://cloud.google.com/) e habilitar o serviço do YouTube, clicando no menu Lateral **Apis e Serviços -> Biblioteca**, na caixa de pesquisa procure por **YouTube**, e click no botão Ativar: 

![ezgif-5-fa13fd3c8407](https://user-images.githubusercontent.com/34013325/57034414-d08cf800-6c25-11e9-9867-03024a30028a.gif)

> Ps. O ideal é criar um novo projeto para adicionar a api do Youtube, porem aqui, estou usando o mesmo projeto que criei para o video-maker, mas caso queria criar um novo projeto basta seguir os passos de **Criando o Projeto** que está no começo desse guia!

Agora clique na guia **Tela de consentimento OAuth** 
![image](https://user-images.githubusercontent.com/34013325/57034753-c0294d00-6c26-11e9-8ee9-ff5e12ea6470.png)

Em seguida preencha apenas o campo "nome do aplicativo", futuramente você pode voltar aqui para personalizar com as outras informações caso desejar:

![image](https://user-images.githubusercontent.com/34013325/57034907-1d250300-6c27-11e9-8c9f-e2e0d4e95b95.png)

Clique no dropdown **Criar credenciais** e escolha **ID do Cliente OAuth**:
![image](https://user-images.githubusercontent.com/34013325/57035299-1054df00-6c28-11e9-9a04-a4cef439e41e.png)

Aqui não tem muito segredo, escolha **Aplicativo da Web** para o **Tipo de Aplicativo**, escolha um **nome do aplicativo**, no primeiro campo insira o endereço **http://localhost:5000** e no segundo **http://localhost:5000/oauth2callback** e clique no botão criar:

![image](https://user-images.githubusercontent.com/34013325/57035477-85281900-6c28-11e9-829a-1c0c074bc478.png)

Após ser criada, irá aparecer uma janela com as credenciais, você pode dar ok, pois iremos baixar as credencias como na tela abaixo:

![image](https://user-images.githubusercontent.com/34013325/57036076-aa695700-6c29-11e9-8c4d-fc78fecdae46.png)

renomeio o arquivo para **youtube.json** e salve dentro da pasta **video-maker/credentials** 😄

## 1.., 2..., 3... Testando! ##
Agora dentro da pasta **video-maker** você pode abrir o **cmd** ou **powershell** e executar o comando:
```
node index.js
```
![ezgif-5-a906cfcd3fd1](https://user-images.githubusercontent.com/34013325/57246263-33f69b80-7013-11e9-97a1-2f84acf2a7fe.gif)
