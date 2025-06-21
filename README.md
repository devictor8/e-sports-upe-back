# API E-Sports

## Stack: 
- Node
- Typescrip
- Fastify
- Prisma ORM
- Zod
- Open API

## Rodar o projeto

### 1) Clone o repositório: 

```bash
$ git clone https://github.com/devictor8/e-sports-upe-back.git
```
### 2) Crie o `.env` igual ao arquivo `example.env`
### 3) crie um banco (pode usar o `docker-compose.yaml` já existente)
### 4) instale as dependências do projeto
```bash
$ npm i 
```
### 5) Passe as migrations para o banco de dados:
```bash
$ npm run prisma:migrate
```
### 6) Para rodar:

- Em modo dev: 
```bash
$ npm run dev
```
- Com build para produção:
```bash
$ npm run build
```
Em seguida inicie o servidor com:
```bash
$ npm run start
```
 
