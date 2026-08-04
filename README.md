# React MUI TypeScript

Documentação técnica completa do painel administrativo para gerenciamento de pessoas e cidades.

## 1. Visão geral

O **React MUI TypeScript** é uma Single Page Application (SPA) para gerenciamento de pessoas e cidades. A interface possui autenticação simulada, dashboard, menu lateral responsivo, alternância entre temas claro e escuro, listagens paginadas e formulários de cadastro.

Durante o desenvolvimento, a aplicação utiliza o JSON Server como API REST local. O frontend é compilado e servido pelo Vite.

### Tecnologias principais

| Tecnologia | Responsabilidade |
| --- | --- |
| React 18 | Construção da interface |
| TypeScript | Tipagem estática |
| Vite | Servidor de desenvolvimento e build |
| Material UI 5 | Componentes visuais e temas |
| React Router | Navegação da SPA |
| Axios | Comunicação HTTP |
| Unform | Controle dos formulários |
| Yup | Validação dos dados |
| JSON Server | API REST simulada |

## 2. Requisitos

- Node.js 20.19 ou superior;
- npm;
- duas portas locais disponíveis: `3000` para o frontend e `3333` para a API mock.

Confira as versões instaladas:

```bash
node --version
npm --version
```

## 3. Instalação e execução

Na raiz do projeto, instale as dependências:

```bash
npm install
```

Inicie a API mock em um terminal:

```bash
npm run mock
```

Em outro terminal, inicie o frontend:

```bash
npm run dev
```

Acesse `http://localhost:3000`.

### Login local

O formulário exige um e-mail válido e uma senha com pelo menos cinco caracteres. Exemplos:

```text
E-mail: admin@example.com
Senha: 12345
```

> A autenticação é apenas demonstrativa. O JSON Server retorna o token definido em `mock/database.json` e não valida o e-mail ou a senha. Uma API real deve validar as credenciais e nunca armazenar senhas em texto puro.

## 4. Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o Vite em modo de desenvolvimento |
| `npm start` | Alias de `npm run dev` |
| `npm run mock` | Inicia o JSON Server na porta 3333 |
| `npm run mock:delay` | Inicia a API com 500 ms de latência artificial |
| `npm run typecheck` | Verifica os tipos sem gerar arquivos |
| `npm run build` | Verifica os tipos e gera a versão de produção em `dist/` |
| `npm run preview` | Serve localmente o conteúdo de `dist/` |

## 5. Configuração de ambiente

A URL da API é lida da variável `VITE_API_URL`. Para personalizá-la, copie `.env.example` para `.env`:

```env
VITE_API_URL=http://localhost:3333
```

Se a variável não for definida, a aplicação usa `http://localhost:3333`.

Variáveis expostas pelo Vite são incorporadas ao bundle do navegador. Portanto, não coloque senhas, tokens privados ou outras informações secretas em variáveis com prefixo `VITE_`.

## 6. Estrutura do projeto

```text
.
├── mock/
│   └── database.json             # Dados da API local
├── public/                       # Ícones e arquivos públicos
├── src/
│   ├── pages/                    # Páginas da aplicação
│   │   ├── cidades/
│   │   ├── dashboard/
│   │   └── pessoas/
│   ├── routes/                   # Definição das rotas
│   ├── shared/
│   │   ├── components/           # Componentes reutilizáveis
│   │   ├── contexts/             # Autenticação, tema e menu lateral
│   │   ├── environment/          # Configurações globais
│   │   ├── forms/                # Integração com Unform
│   │   ├── hooks/                # Hooks compartilhados
│   │   ├── layouts/              # Estrutura base das páginas
│   │   ├── services/api/         # Cliente Axios e serviços REST
│   │   └── themes/               # Temas claro e escuro
│   ├── App.tsx                   # Composição dos providers
│   └── index.tsx                 # Ponto de entrada React
├── index.html                    # Entrada HTML do Vite
├── vite.config.ts                # Configuração do Vite
└── tsconfig.json                 # Configuração TypeScript
```

## 7. Arquitetura

O ponto de entrada monta o componente `App`, que organiza os providers nesta ordem:

```text
AuthProvider
└── AppThemeProvider
    ├── CssBaseline
    └── Login
        └── DrawerProvider
            └── BrowserRouter
                └── MenuLateral
                    └── AppRoutes
```

- `AuthProvider`: controla token, login, logout e estado autenticado;
- `AppThemeProvider`: seleciona o tema claro ou escuro;
- `Login`: protege visualmente o restante da aplicação;
- `DrawerProvider`: gerencia as opções e a abertura do menu lateral;
- `BrowserRouter`: fornece navegação no navegador;
- `MenuLateral`: renderiza a navegação responsiva;
- `AppRoutes`: associa URLs às páginas.

As páginas são carregadas com `React.lazy`. Assim, o código de cada tela é baixado somente quando necessário.

## 8. Rotas

| Rota | Tela | Finalidade |
| --- | --- | --- |
| `/pagina-inicial` | Dashboard | Totais de pessoas e cidades |
| `/pessoas` | Lista de pessoas | Busca, paginação, edição e exclusão |
| `/pessoas/detalhe/nova` | Formulário de pessoa | Criação de pessoa |
| `/pessoas/detalhe/:id` | Formulário de pessoa | Consulta e edição de pessoa |
| `/cidades` | Lista de cidades | Busca, paginação, edição e exclusão |
| `/cidades/detalhe/nova` | Formulário de cidade | Criação de cidade |
| `/cidades/detalhe/:id` | Formulário de cidade | Consulta e edição de cidade |

Qualquer rota desconhecida redireciona para `/pagina-inicial`.

## 9. Autenticação

O fluxo atual funciona da seguinte maneira:

1. O formulário valida o e-mail e a senha com Yup;
2. `AuthService.auth` consulta `GET /auth`;
3. o token retornado é salvo em `localStorage` com a chave `APP_ACCESS_TOKEN`;
4. `AuthProvider` atualiza `isAuthenticated`;
5. o componente `Login` libera o conteúdo protegido;
6. ao sair, o token é removido e a tela de login volta a ser exibida.

Esta proteção ocorre somente no cliente. Para produção, a API deve validar o token em todas as operações protegidas e o frontend deve enviar a credencial no cabeçalho `Authorization`.

## 10. API e modelo de dados

A instância Axios central usa `VITE_API_URL` como `baseURL`. Os interceptors convertem falhas de conexão e respostas `401` em mensagens mais amigáveis.

### Cidade

```ts
interface Cidade {
  id: number;
  nome: string;
}
```

### Pessoa

```ts
interface Pessoa {
  id: number;
  nomeCompleto: string;
  email: string;
  cidadeId: number;
}
```

`cidadeId` referencia o campo `id` de uma cidade.

### Endpoints usados

| Método | Endpoint | Operação |
| --- | --- | --- |
| `GET` | `/auth` | Obtém o token mock |
| `GET` | `/cidades` | Lista e filtra cidades |
| `GET` | `/cidades/:id` | Consulta uma cidade |
| `POST` | `/cidades` | Cria uma cidade |
| `PUT` | `/cidades/:id` | Atualiza uma cidade |
| `DELETE` | `/cidades/:id` | Exclui uma cidade |
| `GET` | `/pessoas` | Lista e filtra pessoas |
| `GET` | `/pessoas/:id` | Consulta uma pessoa |
| `POST` | `/pessoas` | Cria uma pessoa |
| `PUT` | `/pessoas/:id` | Atualiza uma pessoa |
| `DELETE` | `/pessoas/:id` | Exclui uma pessoa |

As listagens enviam `_page` e `_limit` ao JSON Server. O limite padrão é cinco registros, definido por `Environment.LIMITE_DE_LINHAS`. O total é lido do cabeçalho `x-total-count`.

## 11. Formulários e validação

Os formulários usam Unform para registro e controle dos campos. O hook `useVForm` expõe:

- `formRef`: referência do formulário;
- `save`: salva e permanece na tela;
- `saveAndNew`: sinaliza a intenção de salvar e abrir um novo registro;
- `saveAndClose`: salva e volta à listagem;
- `isSaveAndNew` e `isSaveAndClose`: consultam a ação escolhida.

O Yup valida os dados antes de chamar os serviços. Erros são convertidos em um objeto `IVFormErrors` e associados aos respectivos campos.

Regras principais:

- cidade: nome obrigatório com pelo menos três caracteres;
- pessoa: nome obrigatório com pelo menos três caracteres;
- pessoa: e-mail obrigatório e válido;
- pessoa: cidade obrigatória;
- login: e-mail válido e senha com pelo menos cinco caracteres.

O campo de cidade da pessoa usa autocomplete. A busca é atrasada em 300 ms pelo hook `useDebounce`, reduzindo chamadas consecutivas à API.

## 12. Temas e responsividade

O projeto possui temas claro e escuro em `src/shared/themes`. Ambos usam amarelo como cor primária e ciano como cor secundária.

O menu lateral é permanente em telas maiores e temporário em telas pequenas. A troca é controlada pelo breakpoint `sm` do Material UI.

## 13. Build e publicação

Gere o build de produção:

```bash
npm run build
```

O resultado fica em `dist/`. Para conferi-lo localmente:

```bash
npm run preview
```

Ao publicar em um servidor, configure:

1. a variável `VITE_API_URL` antes do build;
2. CORS na API para permitir a origem do frontend;
3. fallback de todas as URLs desconhecidas para `index.html`, necessário para o `BrowserRouter`;
4. HTTPS no frontend e na API.

Exemplo conceitual de fallback:

```text
/assets/*  -> arquivo solicitado
/*         -> /index.html
```

## 14. Como adicionar um novo recurso

Para cadastrar uma nova entidade, siga a organização existente:

1. crie o serviço REST em `src/shared/services/api`;
2. defina interfaces separadas para listagem e detalhe;
3. crie as páginas de listagem e formulário em `src/pages`;
4. valide o formulário com Yup;
5. exporte as páginas no índice correspondente, se necessário;
6. adicione as rotas em `src/routes/index.tsx`;
7. inclua a opção no menu configurado por `AppRoutes`;
8. acrescente a coleção correspondente em `mock/database.json` durante o desenvolvimento;
9. execute `npm run typecheck` e `npm run build`.

## 15. Solução de problemas

### A aplicação abre, mas não carrega dados

Confirme se `npm run mock` está ativo e se `VITE_API_URL` aponta para a porta correta. Abra `http://localhost:3333/cidades` para verificar diretamente a API local.

### Erro de conexão

Verifique se a API está ativa, se a URL usa o protocolo correto e, em ambientes remotos, se o CORS está configurado.

### A página retorna 404 ao atualizar o navegador

O servidor de hospedagem não está redirecionando rotas da SPA para `index.html`. Configure o fallback descrito na seção de publicação.

### Alterações no `.env` não aparecem

Reinicie o servidor Vite. Variáveis de ambiente são carregadas ao iniciar o processo e precisam começar com `VITE_` para chegar ao frontend.

### Porta ocupada

Encerre o processo que usa a porta `3000` ou `3333`, ou altere a porta do Vite em `vite.config.ts` e a da API no script do `package.json`.

## 16. Verificações recomendadas

Antes de enviar alterações:

```bash
npm run typecheck
npm run build
```

Também é recomendável executar periodicamente:

```bash
npm audit
```

Alertas devem ser analisados conforme o modo de uso da dependência. Atualizações forçadas podem introduzir mudanças incompatíveis e devem ser testadas antes de serem aplicadas.

## 17. Limitações atuais

- autenticação apenas simulada;
- token não é enviado nas requisições da API;
- mensagens de sucesso e erro usam `alert` do navegador;
- não há suíte automatizada de testes;
- não há persistência do tema selecionado;
- JSON Server é adequado somente para desenvolvimento e demonstração.

Esses itens são os pontos prioritários para uma futura evolução do projeto.
