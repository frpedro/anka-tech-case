# Projeto de Gestão de Clientes e Ativos Financeiros

**Contexto:**  
Aplicação para um escritório de investimentos gerenciar clientes e visualizar ativos financeiros básicos. A aplicação é containerizada com Docker e usa uma instância de banco MySQL para persistência dos dados.

---

## Funcionalidades

- Cadastro, listagem e edição de clientes.
- Listagem de ativos financeiros fixos por cliente.
- Visualização das alocações de ativos por cliente.

---

## Tecnologias usadas

**Backend:**  
- Node.js + Fastify  
- Prisma ORM com MySQL  
- Zod para validação de dados  

**Frontend:**  
- Next.js  
- ShadCN UI para componentes reutilizáveis  
- React Query para buscas no backend  
- React Hook Form + Zod para formulários e validação  
- Axios para requisições HTTP  

**Docker:**  
- Docker Compose para orquestração dos serviços  
- Contêiner MySQL para banco de dados  
- Contêiner backend rodando Fastify  

---

## Como rodar

1. Clone o repositório:  
   ```bash
   git clone https://github.com/frpedro/asset-management.git
    ```
2. Inicie os contêineres com Docker Compose:
    ```bash
    docker-compose up -d
    ```
3. No diretório do frontend, rode:
    ```bash
    npm install
    npm run dev
    ```
4. Acesse a aplicação no navegador em `http://localhost:3000/clients`.