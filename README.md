# API REST com Node.js Puro

Este projeto é uma API REST simples desenvolvida com Node.js puro, sem o uso de frameworks. A API permite gerenciar links encurtados, oferecendo endpoints para criar, listar, buscar, excluir e redirecionar links.

Este projeto faz parte da postagem do meu blog:  
[Criei uma API estilo Bit.ly com Node.js e zero dependências](https://www.wesleydmscn.com/posts/2025-05-04-criando-uma-api-rest-com-nodejs-puro)

## Endpoints

### 1. Listar todos os links

**GET** `/links`  
Retorna uma lista de todos os links cadastrados.

**Exemplo de resposta:**

```json
[
  {
    "id": "9d66dd18-0125-4677-8fd1-3a541da16e1d",
    "original_url": "https://wesleydmscn.com/",
    "short_code": "wesleydmscn",
    "created_at": "2025-04-05T13:37:01.869Z"
  }
]
```

### 2. Buscar link por `short_code`

**GET** `/links/:short_code`  
Retorna os detalhes de um link específico.

**Exemplo de resposta:**

```json
{
  "id": "9d66dd18-0125-4677-8fd1-3a541da16e1d",
  "original_url": "https://wesleydmscn.com/",
  "short_code": "wesleydmscn",
  "created_at": "2025-04-05T13:37:01.869Z"
}
```

### 3. Redirecionar para o link original

**GET** `/r/:short_code`
Redireciona o usuário para a URL original associada ao `short_code`.

**Exemplo de resposta:**
Redireciona com o status `301 Moved Permanently`.

### 4. Criar um novo link

**POST** `/links`  
Cria um novo link encurtado.

**Corpo da requisição:**

```json
{
  "original_url": "https://linkedin.com/in/wesleydmscn",
  "short_code": "linkedin-wesley"
}
```

**Exemplo de resposta:**

```json
{
  "id": "a1b2c3d4-5678-90ef-ghij-klmnopqrstuv",
  "original_url": "https://linkedin.com/in/wesleydmscn",
  "short_code": "linkedin-wesley",
  "created_at": "2025-04-05T14:00:00.000Z"
}
```

**Erros possíveis:**

- `400 Bad Request`: Código curto já existe.

### 5. Excluir um link

**DELETE** `/links/:short_code`  
Exclui um link específico.

**Exemplo de resposta:**
Status `204 No Content`.

**Erros possíveis:**

- `400 Bad Request`: Link não encontrado.

## Como executar o projeto

### 1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/link-shortener-api.git
cd link-shortener-api
```

### 2. Instale o Node.js (versão 18 ou superior).

### 3. Inicie o servidor:

```bash
node src/index.js
```

### 4. Acesse a API em:

[http://localhost:3000](http://localhost:3000)

## Testando a API

Você pode testar os endpoints utilizando o arquivo `rest.http` com a extensão [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) no Visual Studio Code.

## Estrutura do Projeto

```
src/
├── controllers/
│   └── link.controller.js # Lógica dos endpoints
├── helpers/
│   ├── body-parser.js # Middleware para parsear o corpo da requisição
│   └── extend-response.js # Extensões para o objeto de resposta
├── mocks/
│   └── links.js # Dados mockados para teste
├── route.js # Definição das rotas
├── index.js # Servidor principal
└── rest.http # Arquivo para testar a API
```

## Licença

Este projeto é de código aberto e está licenciado sob os termos da [MIT](./LICENSE) License.
