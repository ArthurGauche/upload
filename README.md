# Upload API

API NestJS simples para upload e gerenciamento de arquivos em uma pasta local.

 📦 Pré-requisitos

- Node.js 18+ instalado
- npm disponível
- (Opcional) Nest CLI instalado globalmente para facilitar comandos: `npm install -g @nestjs/cli`

 🚀 Instalação

1. Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
```

2. Entre na pasta do projeto NestJS:

```bash
cd upload/upload
```

3. Instale as dependências:

```bash
npm install
```

▶️ Rodando o projeto localmente

Inicie o servidor em modo normal:

```bash
npm run start
```

O servidor será iniciado em `http://localhost:3000`.

> Se preferir rodar em modo de desenvolvimento com reload automático, use `npm run start:dev`.

📁 Estrutura importante

- `src/app.module.ts` - módulo principal da aplicação
- `src/arquivo/arquivo.controller.ts` - controlador que expõe as rotas de arquivo
- `src/arquivo/arquivo.service.ts` - lógica de upload, listagem e remoção de arquivos
- `drive/` - pasta local onde os arquivos enviados são armazenados

 🧪 Endpoints da API

 1) GET `/`

Retorna uma saudação simples.

- Método: `GET`
- URL: `http://localhost:3000/`

Resposta de sucesso:

```json
"Hello World!"
```

 2) POST `/arquivo/upload`

Faz upload de um arquivo usando `multipart/form-data`.

- Método: `POST`
- URL: `http://localhost:3000/arquivo/upload`
- Parâmetros:
  - `file` (FormData) — arquivo enviado
- Tipos aceitos: `image/jpeg`, `image/png`, `image/tiff`
- Limite: 5MB

Exemplo de corpo (Postman / curl):

```bash
curl -F "file=@imagem.jpg" http://localhost:3000/arquivo/upload
```

Resposta de sucesso:

```json
{
  "message": "Aruivo enviado com sucesso!",
  "filename": "nome-do-arquivo.jpg",
  "originalname": "nome-do-arquivo.jpg",
  "size": 12345
}
```

Resposta de erro (arquivo inválido):

```json
{
  "statusCode": 400,
  "message": "Formato de arquivo não permitido. Apenas JPG, PNG e TIFF são aceitos.",
  "error": "Bad Request"
}
```

Resposta de erro (arquivo maior que 5MB):

```json
{
  "statusCode": 400,
  "message": "Arquivo maior que 5MB",
  "error": "Bad Request"
}
```

 3) GET `/arquivo`

Retorna a lista de arquivos presentes na pasta `drive`.

- Método: `GET`
- URL: `http://localhost:3000/arquivo`

Resposta de sucesso:

```json
{
  "total": 2,
  "files": [
    {
      "filename": "file-1681234567890-123456789.jpg",
      "size": 10240,
      "criado": "2026-05-20T00:00:00.000Z"
    }
  ]
}
```

Resposta de erro (falha na leitura):

```json
{
  "statusCode": 400,
  "message": "Não foi possivel listar os arquivos"
}
```

 4) GET `/arquivo/:id`

Retorna uma mensagem de placeholder para um arquivo com ID númerico.

- Método: `GET`
- URL: `http://localhost:3000/arquivo/1`

Resposta de sucesso:

```json
"This action returns a #1 arquivo"
```

 5) PATCH `/arquivo/:id`

Rota placeholder de atualização de arquivo.

- Método: `PATCH`
- URL: `http://localhost:3000/arquivo/1`
- Corpo JSON:
  - `name`, `description` ou outros campos de acordo com `UpdateArquivoDto`

Exemplo de corpo:

```json
{
  "name": "novo-nome"
}
```

Resposta de sucesso:

```json
"This action updates a #1 arquivo"
```

 6) DELETE `/arquivo/:filename`

Remove um arquivo pelo nome armazenado.

- Método: `DELETE`
- URL: `http://localhost:3000/arquivo/file-1681234567890-123456789.jpg`

Resposta de sucesso:

```json
{
  "message": "Arquivo file-1681234567890-123456789.jpg removido com sucesso"
}
```

Resposta de erro (arquivo não encontrado):

```json
{
  "statusCode": 400,
  "message": "Arquivo não encontrado"
}
```
 ✅ Observações

- A pasta `drive` é criada automaticamente pelo serviço quando o backend inicia.
- O endpoint de upload só aceita imagens nos formatos JPG, PNG e TIFF.
- Os endpoints `GET /arquivo/:id` e `PATCH /arquivo/:id` ainda retornam mensagens de placeholder e podem ser ajustados para suportar um banco de dados ou lógica de atualização.

