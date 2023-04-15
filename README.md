# ![logo](https://github.com/DanJusto/Front_Food/blob/main/src/assets/polygon.svg) FoodExplorer API
API para um cardápio digital de um restaurante fictício.

## 📜 Sumário
1. [Detalhes do projeto](https://github.com/DanJusto/Project_FoodExplorer#1--detalhes-do-projeto)
2. [Tecnologias usadas](https://github.com/DanJusto/Project_FoodExplorer#2--tecnologias-usadas)
3. [Para rodar o projeto](https://github.com/DanJusto/Project_FoodExplorer#3--para-rodar-o-projeto)
4. [Documentação](https://github.com/DanJusto/Project_FoodExplorer#4--documenta%C3%A7%C3%A3o)
5. [Link](https://github.com/DanJusto/Project_FoodExplorer#5--link)
6. [Colaboradores](https://github.com/DanJusto/Project_FoodExplorer#6--colaboradores)
7. [Autor](https://github.com/DanJusto/Project_FoodExplorer#7--autor)

## 1. 🔍 Detalhes do projeto
A API food explorer tem como objetivo persistir dados para gerenciamento de um cardápio de um restaurante fictício, para fins acadêmicos. A troca de dados é realizada em formato JSON e utiliza-se o SQLite como banco de dados.

## 2. 💻 Tecnologias usadas
<div align="center">

Languages, Frameworks & Librarys:   
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JSON](https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

Tests:  
![Insomnia](https://img.shields.io/badge/Insomnia-5849be?style=for-the-badge&logo=Insomnia&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

Database:  
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

Deploy:  
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

IDE:  
![VSCode](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)

</div>

## 3. 🔌 Para rodar o projeto
1. Instale as dependências necessárias para rodar a API (relacionadas no package.json):

    ```
    npm install
    ```
2. Rode a aplicação em ambiente de desenvolvimento:

    ```
    npm run dev
    ```
3. Caso prefira apagar os dados base já cadastrados, basta apagar o arquivo database.db e rodar a aplicação. As migrations são processadas automaticamente.
4. Você precisará de uma ferramenta de teste de requisições como o [Insomnia](https://insomnia.rest/).
5. Utilize localhost:3200 e siga a documentação abaixo para utilizar a API.
6. Para rodar os testes automatizados já criados:
    ```
    npm run test
    ```
## 4. 🔌 Documentação
### Endpoints

**Auth** <br/>
[`POST /sessions/`](#post-sessions) - Autenticação de usuário (login)
<br/><br/>

**User** <br/>
[`POST /users/`](#post-users) - Criação de um novo usuário (admin ou comum)
<br/><br/>

**Contact** <br/>
[`GET /products/`](#get-products) Busca de todos produtos <br/>
[`GET /products/:id`](#get-products-id) Busca de produto específico <br/>
[`POST /products/`](#post-products) Criação de um novo produto <br/>
[`PUT /products/:id`](#put-products) Atualização de dados de um produto <br/>
[`PATCH /products/:id/image`](#patch-products) Atualização da imagem de um produto <br/>
[`DELETE /products/:id`](#delete-products) - Deleção de um produto
<br/><br/>

###
#### POST sessions

**Request**

|**Nome**|**Obrigatório**|**Tipo**|**Descrição**|
| :------------ | :------------ | :------------ | :------------ |
|email|sim|`string`|E-mail do usuário ou admin|
|password|sim|`string`|Senha do usuário ou admin|
|is_admin|parcial|`number`|Padrão 0 para user comum / 1 para admin|

<br />

> **_NOTA:_**  Não é necessário enviar Token JWT via Authorization Header.

<br />

**Response**

Sucesso
```json
{
    "data": {
      "user": {
        "user_id": 1, //número incremental
        "name": "Testador",
        "email": "teste@email.com",
        "password": "senha", //criptografada
        "is_admin": 0, //0 ou 1
        "created_at": "xxxx-xx-xx yy:yy:yy" //data e hora criados automaticamente
      },
      "token": "abcdefghijklmnopqrstuvwxyz"
    },
    "status": 200
}
```
<br />
Erro comum

```json
{
    "mensagem": "E-mail e/ou senha incorreta.",
    "status": 401
}
```
<br/>

###
#### POST users

**Request**

|**Nome**|**Obrigatório**|**Tipo**|**Descrição**|
| :------------ | :------------ | :------------ | :------------ |
|name|sim|`string`|Nome para perfil|
|email|sim|`string`|E-mail do usuário ou admin|
|password|sim|`string`|Senha do usuário ou admin|
|is_admin|parcial|`number`|Padrão 0 para user comum / 1 para admin|

<br />

> **_NOTA:_**  Não é necessário enviar Token JWT via Authorization Header.

<br />

**Response**

Sucesso  
```no body returned for response```
```status: 201```
<br /><br /> 
Erro comum

```json
{
    "mensagem": "Este email já está em uso.",
    "status": 400
}
```
<br/>

###
#### GET products

**Request**

Buscar todos produtos
|**Nome**|**Obrigatório**|**Tipo**|**Descrição**|
| :------------ | :------------ | :------------ | :------------ |
|-|-|-|Não é necessário enviar nenhum parâmetro|

<br />

> **_NOTA:_**  É necessário enviar Token JWT via Authorization Header.

<br />

**Response**

Sucesso
```json
{
    "data": [
      {
        "product_id": 1,
        "title": "Batata",
        "description": "Delícia de batata",
        "category": "Refeição",
        "price": "39,57",
        "image": "4gg456df456gdfngdfknjdgf-batata.png",
        "tags": [
          {
            "tag_name": "batata",
            "product_id": 1
          },
          {
            "tag_name": "azeite",
            "product_id": 1
          }
        ]
      },
      {
        "product_id": 2,
        "title": "Petit Gateau",
        "description": "Bolinho quentinho e sorvete geladinho",
        "category": "Sobremesa",
        "price": "12,00",
        "image": "ghdf165fs315gdf56sfgsd-sorvete.png",
        "tags": [
          {
            "tag_name": "brownie",
            "product_id": 2
          },
          {
            "tag_name": "sorvete",
            "product_id": 2
          }
        ]
      }
    ],
    "status": 200
}
```

<br /> 
Sucesso sem retorno de dados

```json
{
    "data": [],
    "status": 200
}
```
<br/>

###
#### GET products/:id

**Request**

Buscar produto específico
|**Nome**|**Obrigatório**|**Tipo**|**Descrição**|
| :------------ | :------------ | :------------ | :------------ |
|id|sim|`number`|Enviar via parâmetro de rota|

<br />

> **_NOTA:_**  É necessário enviar Token JWT via Authorization Header.

<br />

**Response**

Sucesso
```json
{
    "data": {
      "product_id": 2,
      "title": "Petit Gateau",
      "description": "Bolinho quentinho e sorvete geladinho",
      "category": "Sobremesa",
      "price": "12,00",
      "image": "ghdf165fs315gdf56sfgsd-sorvete.png",
      "tags": [
        {
          "tag_name": "brownie",
          "product_id": 2
        },          
        {
          "tag_name": "sorvete",
          "product_id": 2
        }
      ]
    },
    "status": 200
}
```

<br />Sucesso sem retorno de dados

```json
{
    "data": {},
    "status": 200
}
```
<br/>

###
#### POST products

**Request**

|**Nome**|**Obrigatório**|**Tipo**|**Descrição**|
| :------------ | :------------ | :------------ | :------------ |
|title|sim|`string`|Título do produto|
|category|não|`string`|Categoria do produto (pode ser Refeição, Sobremesa ou Bebida)|
|description|não|`string`|Descrição do produto|
|price|não|`string`|Preço do produto|
|tags|não|`string`|Principais ingredientes do produto (deve ser separado por vírgula e sem espaços / tratamento deve ser feito no front-end) - Ex.: "camarão,abóbora,requeijão"|

<br />

> **_NOTA:_**  É necessário enviar Token JWT de *Admin* via Authorization Header.

<br />

**Response**

Sucesso  
```no body returned for response```
```status: 201```
<br/>

Erro comum

```json
{
    "mensagem": "Este produto já está cadastrado.",
    "status": 400
}
```
<br/>

###
#### PUT products

**Request**

|**Nome**|**Obrigatório**|**Tipo**|**Descrição**|
| :------------ | :------------ | :------------ | :------------ |
|product_id|sim|`number`|ID do produto que será atualizado (recebido por parâmetro)|
|title|sim|`string`|Título do produto|
|category|não|`string`|Categoria do produto (pode ser Refeição, Sobremesa ou Bebida)|
|description|não|`string`|Descrição do produto|
|price|não|`string`|Preço do produto|
|tags|não|`string`|Principais ingredientes do produto (deve ser separado por vírgula e sem espaços / tratamento deve ser feito no front-end) - Ex.: "camarão,abóbora,requeijão"|

<br />

> **_NOTA:_**  É necessário enviar Token JWT de *Admin* via Authorization Header.

<br />

**Response**

Sucesso  
```no body returned for response```
```status: 200```
<br/>

Erros comuns

```json
{
    "mensagem": "Produto não encontrado.",
    "status": 400
}
```
```json
{
    "mensagem": "Este produto já está cadastrado.",
    "status": 400
}
```
<br/>

###
#### PATCH products

**Request**

|**Nome**|**Obrigatório**|**Tipo**|**Descrição**|
| :------------ | :------------ | :------------ | :------------ |
|product_id|sim|`number`|ID do produto que será atualizado (recebido por parâmetro)|
|image|parcial|`file`|Arquivo de imagem do produto|

<br />

> **_NOTA:_**  É necessário enviar Token JWT de *Admin* via Authorization Header.

<br />

**Response**

Sucesso  
```no body returned for response```
```status: 200```
<br/>

Erro comum

```json
{
    "mensagem": "Produto não encontrado.",
    "status": 400
}
```
<br/>

###
#### DELETE products

**Request**

|**Nome**|**Obrigatório**|**Tipo**|**Descrição**|
| :------------ | :------------ | :------------ | :------------ |
|product_id|sim|`number`|ID do produto que será deletado (recebido por parâmetro)|

<br />

> **_NOTA:_**  É necessário enviar Token JWT de *Admin* via Authorization Header.

<br />

**Response**

Sucesso  
```no body returned for response```
```status: 201```
<br/>

Erro comum

```json
{
    "mensagem": "Produto não encontrado.",
    "status": 400
}
```
<br/>

## 5. 🔗 Link
[API Food-Explorer](https://rocketfood-explorer-api.onrender.com)

## 6. 🧑‍🤝‍🧑 Colaboradores
API criada como parte do desafio final do curso Explorer da [RocketSeat](https://www.rocketseat.com.br/).

## 7. 👨‍💻 Autor
Criado por Daniel Justo  
  
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/danielmjusto/)
[![github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/DanJusto)  
  
Obrigado pela visita!