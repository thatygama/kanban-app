# Kanban App

Este é um projeto **Kanban App** desenvolvido com **Laravel** no backend e **Vue com Nuxt.js** no frontend. A aplicação foi configurada para rodar com **Docker**.

## Pré-requisitos

Certifique-se de ter os seguintes softwares instalados no seu computador:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/install/)


## Como rodar o projeto

### 1. Clone o repositório
Faça o clone deste repositório no seu computador:

```
git clone https://github.com/thatygama/kanban-app.git
```


### 2. Rodando o Backend

#### 2.1. Acessar a pasta do backend

```
cd backend
```

#### 2.2. Copie e configure o arquivo .env

```
cp .env.example .env
```

Certifique-se de configurar corretamente as variáveis de ambiente, especialmente as de conexão com o banco de dados.

#### 2.3. Builde o projeto no Docker

```
docker-compose up --build
```

#### 2.4. Acessar o container para rodar o seed de Status

```
docker exec -it laravel-app sh
php artisan db:seed
```


### 3. Rodando o Frontend

#### 3.1. Acessar a pasta do frontend

```
cd frontend
```

#### 3.2. Copie e configure o arquivo .env

```
cp .env.example .env
```

#### 3.3. Builde o projeto no Docker

```
docker-compose up --build
```


### 4. Serviços disponíveis
Frontend: http://localhost:3000
Backend: http://localhost:8000