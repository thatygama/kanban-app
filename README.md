# Kanban App

Este é um projeto **Kanban App** desenvolvido com **Laravel** no backend e **Vue com Nuxt.js** no frontend. A aplicação foi configurada para rodar com **Docker**.
Neste projeto realizado em 2 dias, o foco foi demonstrar boas práticas de desenvolvimento para as seguintes funcionalidades:
##### No frontend: 
Componentização; Manipulação de elementos no DOM com funções "draggable"; Integração com API; Boas práticas de UX/UI; Validações de formulários; Utilização de SCSS; Estilização global; Uso da biblioteca Element-UI e mudanças em estilizações padrões; Primeira experiência pessoal na utilização de Nuxt em um projeto.
##### No backend:
Utilização de Laravel; Autenticação de usuário com JWT; Migrations, Seeds, Models, Controllers, Middlewares; Automatização da geração de chaves com Docker.


![Kanban](https://github.com/user-attachments/assets/033d8853-4044-4db9-8df8-10c4baa92825)


## Pré-requisitos

Certifique-se de ter os seguintes softwares instalados no seu computador:

- Git
- Docker
- Editor de código (VS Code)

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

#### 2.3 Garanta que o seu MySQL local não esteja rodando antes de subir o Docker
```
service mysql stop
````

#### 2.4. Builde o projeto no Docker

```
docker-compose up --build
```

#### 2.5. Acessar o container para rodar o seed de Status

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
