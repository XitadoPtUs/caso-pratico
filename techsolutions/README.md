# TechSolutions

Aplicacao web para gestao de projetos e tarefas, desenvolvida com React, TypeScript e Vite. A interface permite criar projetos, acompanhar progresso e gerir tarefas com persistencia local via `json-server`.

## Funcionalidades

- Criacão, edicão e remocão de projetos.
- Criacão, edicão e remocão de tarefas por projeto.
- Alteracão rapida do estado da tarefa entre `Pendente`, `Em Progresso` e `Concluída`.
- Calculo automatico do progresso de cada projeto.
- Validacões de formulários para evitar nomes duplicados, campos vazios e datas inválidas.

## Stack

- `React 19`
- `TypeScript`
- `Vite`
- `Jest` + `Testing Library`
- `Axios`
- `json-server`

## Requisitos

- `Node.js` 20+.
- `npm`.

## Como executar

Instale as dependencias:

```bash
npm install
```

Inicie a API:

```bash
npm run server
```

Noutro terminal, inicie o frontend:

```bash
npm run dev
```

A aplicacão espera a API em `http://localhost:3001/projetos`.

## Scripts

- `npm run dev`: inicia o Vite em modo de desenvolvimento.
- `npm run build`: gera o build de producão.
- `npm run preview`: faz preview local do build.
- `npm run lint`: executa o ESLint.
- `npm run test`: executa a suite de testes.
- `npm run server`: sobe o `json-server` com base em `db.json`.

## Testes

A suite atual cobre:

- Modelos `Project` e `Task`.
- Regras do contexto `ProjetosProvider`, incluindo carregamento inicial, CRUD de projetos e CRUD de tarefas.
- Validacões do formulário `NovoProjeto`.

Para correr os testes:

```bash
npm test -- --runInBand
```

## Estrutura principal

```text
src/
  components/       componentes de interface e formulários
  context/          estado global de projetos e tarefas
  models/           modelos Project e Task
  modals/           mensagens de erro
  styles/           estilos por área da aplicacão
testes/             testes unitários e de integracão
db.json             base usada pelo json-server
```

## Regras de negócio implementadas

- Nome do projeto: entre 3 e 15 caracteres.
- Descricão do projeto: entre 10 e 25 caracteres.
- Nome da tarefa: entre 3 e 15 caracteres.
- Descricão da tarefa: entre 10 e 25 caracteres.
- Não são permitidos nomes duplicados dentro do mesmo contexto:
  projeto por nome global e tarefa por nome dentro do projeto.
- Datas de tarefas precisam ser futuras e validas.
