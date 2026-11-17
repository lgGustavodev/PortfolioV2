# Portfólio · Luis Gustavo Paz Barbosa

Site pessoal de apresentação, feito em **Angular** e **TypeScript**, com foco em acessibilidade, código organizado e animações que têm função.

🔗 **Site no ar:** https://lggustavodev.github.io/PortfolioV2/

<!-- Dica: adicione um print do site em docs/preview.png e descomente a linha abaixo -->
<!-- ![Prévia do portfólio](docs/preview.png) -->

## Sobre o projeto

Reúne em uma página única quem eu sou, minha trajetória (trabalho e estudo), meus projetos e formas de contato. Também tem download do currículo em PDF.

## Funcionalidades

- **Hero com efeito de digitação**: nome e cargo aparecem letra por letra, com cursor piscando.
- **Linha do tempo interativa**: a linha cresce conforme a rolagem e cada marco acende ao ser alcançado. Filtro por *Tudo*, *Trabalho* e *Estudo*.
- **Cards de projetos**: título, descrição, tecnologias e links para o repositório e para o site online.
- **Tema claro e escuro**: começa com a preferência do sistema e pode ser alternado pelo usuário.
- **Ajuste do tamanho da fonte**: botões A+ e A− escalam o site inteiro (todo o CSS usa `rem`).
- **Menu responsivo** com hambúrguer no celular.
- **Rodapé de contato** com e-mail, LinkedIn e GitHub.

## Acessibilidade

- Link "Pular para o conteúdo" para navegação por teclado.
- Atributos ARIA em menu, filtros, painel de acessibilidade e títulos de seção.
- Foco visível em todos os elementos interativos.
- Respeita `prefers-reduced-motion`: transições e animações são desativadas para quem prefere menos movimento.
- Contraste de cores definido por variáveis, com paleta própria para cada tema.

## Tecnologias

| Área | Ferramentas |
| --- | --- |
| Framework | Angular 22 (componentes standalone) |
| Linguagem | TypeScript 6 |
| Estilos | SCSS com CSS custom properties |
| Testes | Vitest |
| Formatação | Prettier + EditorConfig |
| Deploy | GitHub Actions + GitHub Pages |

### Recursos do Angular usados

- **Signals** (`signal`, `computed`, `effect`, `input`, `model`) para estado e reatividade.
- **Novo control flow** (`@for`, `@if`) nos templates.
- **`ChangeDetectionStrategy.OnPush`** em todos os componentes.
- **Componente genérico reutilizável** (`ChipFilterComponent<T>`) com binding de duas vias via `model()`.
- **Serviços** `providedIn: 'root'` para tema e tamanho da fonte.
- **`IntersectionObserver`** para acender os marcos da linha do tempo.

## Estrutura do projeto

```
src/
├── app/
│   ├── core/
│   │   ├── constants/      # dados compartilhados (SITE)
│   │   ├── models/         # interfaces (Project, TimelineItem)
│   │   └── services/       # ThemeService, FontSizeService
│   ├── layout/             # header, footer, skip-link
│   ├── sections/           # hero, timeline, projetos
│   └── shared/             # chip-filter, tag-list, accessibility-toolbar
└── styles/                 # tema, reset, tipografia, botões, mixins
```

A separação segue a ideia de que o componente raiz (`App`) só monta a página, sem regras de negócio. Os conteúdos editáveis (projetos e linha do tempo) ficam em listas nos próprios componentes de seção.

## Como rodar localmente

Pré-requisito: Node.js `^22.22.3`, `^24.15.0` ou `>=26`, com npm.

```bash
# clonar o repositório
git clone https://github.com/lgGustavodev/PortfolioV2.git
cd PortfolioV2

# instalar dependências
npm install

# servidor de desenvolvimento
npm start
```

Abra `http://localhost:4200/`. A página recarrega sozinha a cada alteração.

### Outros comandos

```bash
npm run build   # build de produção em dist/portfolio/browser
npm test        # testes unitários com Vitest
```

## Deploy

O deploy é automático. A cada push na branch `main`, o workflow `.github/workflows/deploy-angular.yml`:

1. instala as dependências com `npm ci`;
2. gera o build de produção com `--base-href /PortfolioV2/`;
3. publica o resultado no GitHub Pages.

## Como personalizar

- **Dados pessoais** (nome, cargo, e-mail, links, currículo): `src/app/core/constants/site.constants.ts`
- **Projetos**: lista `projects` em `projects-section.component.ts`
- **Linha do tempo**: lista `items` em `timeline-section.component.ts`
- **Cores e fontes**: `src/styles/_theme.scss`
- **Currículo em PDF**: coloque o arquivo na pasta `public/` com o nome definido em `cvUrl`

## Contato

- 📧 lggustavodev@gmail.com
- 💼 [LinkedIn](https://linkedin.com/in/lggustavodev)
- 🐙 [GitHub](https://github.com/lgGustavodev)

---

Feito por Luis Gustavo, desenvolvedor back-end júnior em Fortaleza, CE.
