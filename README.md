<pre>
 _    ___     __              __  ___      __                ____        __ 
| |  / (_)___/ /__  ____     /  |/  /___ _/ /_____  _____   / __ )____  / /_
| | / / / __  / _ \/ __ \   / /|_/ / __ `/ //_/ _ \/ ___/  / __  / __ \/ __/
| |/ / / /_/ /  __/ /_/ /  / /  / / /_/ / ,< /  __/ /     / /_/ / /_/ / /_  
|___/_/\__,_/\___/\____/  /_/  /_/\__,_/_/|_|\___/_/     /_____/\____/\__/  
</pre>


O **Video Maker Bot** é um projeto conceitual para a criação automática de vídeos para o Youtube utilizando e integrando inúmeras tecnologias.

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

## Pré-requisitos
- Node (https://nodejs.org)

## Estrutura de dados
Visando flexibilidade na troca dos dados entre os robôs, a estrutura de dados listada nesta [Issue](https://github.com/andalik/videomaker-bot/issues/5) é utilizada.

## Instalação
```
git clone https://github.com/andalik/videomaker-bot.git
cd videomaker-bot
npm install
```

## Credenciais de acesso aos serviços (API Keys)
Após clonar o repositório, acesse a pasta /credentials e crie os arquivos abaixo com as chaves de API obtidas através dos serviços Algorithmia, IBM Cloud e Google Cloud Platform.

### Formato dos arquivos de credenciais
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
  "iam_apikey_description": "Auto generated apikey during resource-key operation for Instance - crn:v1:bluemix:public:natural-language-understanding:us-south:a/xxxxxxxxxxxxxxxxxxxxxxxxxx:xxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx::",
  "iam_apikey_name": "auto-generated-apikey-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Manager",
  "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/xxxxxxxxxxxxxxxxxxxxxxxxxxx::serviceid:ServiceId-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxxx",
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

Ainda não possui as chaves de API dos serviços?
Siga os passos abaixo:

## Como ativar os serviços e obter as chaves de API
### Algorithmia
Acesse o **Algorithmia** em https://algorithmia.com/ e autentique-se na plataforma (se não possuir conta, cadastre-se). Clique em **Home**, e no menu central, selecione **API Keys**. Por fim, copie a chave de API. 

![Algorithmia](https://github.com/andalik/videomaker-bot/blob/master/docs/screenshots/screenshot-algorithmia-1.png)

### IBM Cloud
Acesse o **IBM Cloud** em https://cloud.ibm.com/login e autentique-se na plataforma (se não possuir conta, cadastre-se). No menu superior, clique em **Catalog**, selecione **AI** para filtrar as opções disponíveis e clique em **Natural Language Understanding**.

![IBMCloud](https://github.com/andalik/videomaker-bot/blob/master/docs/screenshots/screenshot-ibmcloud-1.png)

No rodapé da nova página, clique em **Create**. Você será redirecionado para a página de gerenciamento do serviço recém criado. No menu lateral esquerdo, selecione **Service Credentials** e em Actions, clique em **View Credentials**. Por fim, copie a chave de API.

![IBMCloud](https://github.com/andalik/videomaker-bot/blob/master/docs/screenshots/screenshot-ibmcloud-2.png)

### Google Cloud Platform
Acesse o **Google Cloud Platform** em https://cloud.google.com e autentique-se na plataforma (se for o seu primeiro acesso, vincule a sua conta Google ao serviço). Em seguida, clique em **Go to console**.

Clique no menu de navegação, selecione **APIs e serviços** e clique em **Biblioteca**.

![GoogleCloud](https://github.com/andalik/videomaker-bot/blob/master/docs/screenshots/screenshot-googlecloud-1.png)

Em **Biblioteca de APIs**, procure e clique em **Custom Search API**.

Ao abrir a página da API selecionada, clique em **ATIVAR**.
Em seguida, clique em **ATIVAR CREDENCIAIS** para obter a chave de API.

No texto,
```
Descubra que tipos de credenciais você precisa
Ajudaremos você a a configurar as credenciais corretas 
Se quiser, pule esta etapa e crie uma [chave de API], um ID do cliente ou uma conta de serviço
```
clique no link do texto **chave de API**.

Defina um nome para identificar a chave de API (Chave de API 1), e em restrições de aplicativo marque **Nenhuma**. Por fim, clique em **CRIAR**.

Anote a chave de API.

## Custom Search
Agora, vamos criar o nosso motor de busca personalizado (Custom Search).
Para isso, acesse o Custom Search Engine em https://cse.google.com/cse/create/new.

Em **Search Engine Name** escreva o nome do projeto (Video Maker Bot).

Altere a opção **Image Search** para **ON**.

Em **Sites to Search**, clique em **Add** e adicione **google.com**.

Logo abaixo, em **Search the Entire Web**, altere para **ON**.

Por fim, de posse da chave API obtida no passo anterior e do **Search Engine ID**, crie o arquivo google-search.json em /credentials. 

## YouTube
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

## 1, 2, 3, Testando!
Abra o prompt de comando, acesse a pasta **videomaker-bot** e execute o programa:
```
node index.js
```
![ezgif-5-a906cfcd3fd1](https://user-images.githubusercontent.com/34013325/57246263-33f69b80-7013-11e9-97a1-2f84acf2a7fe.gif)
