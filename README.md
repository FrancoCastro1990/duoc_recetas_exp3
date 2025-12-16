# Recetas App

Aplicacion web para explorar y consultar una base de datos de recetas culinarias. Permite a los usuarios navegar por el catalogo de recetas, filtrar por categoria, buscar por nombre y ver los detalles completos de cada receta incluyendo ingredientes, instrucciones de preparacion y tiempo de coccion.

## Tecnologias Utilizadas

### Frontend
- **React 19** - Biblioteca de interfaces de usuario
- **TypeScript** - Tipado estatico
- **Vite 7** - Build tool y servidor de desarrollo
- **Tailwind CSS v4** - Framework de estilos utilitarios
- **React Router DOM v7** - Enrutamiento del lado del cliente

### Data Fetching
- **TanStack Query v5** - Gestion de estado del servidor para REST API
- **Apollo Client v4** - Cliente GraphQL para consultas de detalles

### Testing
- **Vitest** - Framework de pruebas unitarias (compatible con Jest API)
- **React Testing Library** - Testing de componentes React
- **MSW (Mock Service Worker)** - Mocking de APIs para pruebas
- **Cypress 15** - Pruebas end-to-end

### Herramientas de Calidad
- **ESLint** - Linting de codigo TypeScript
- **TypeScript Compiler** - Verificacion de tipos

## Arquitectura

### Arquitectura Hibrida REST + GraphQL

La aplicacion implementa una arquitectura hibrida que utiliza dos tipos de APIs:

1. **REST API** (`/api/recipes`): Proporciona listados de recetas con informacion resumida (titulo, dificultad, categoria, imagen, tiempo de coccion). Utilizada para la vista de exploracion.

2. **GraphQL API** (`/graphql`): Proporciona informacion detallada de cada receta individual (ingredientes, instrucciones paso a paso, consejos, autor). Utilizada para la vista de detalle.

Esta arquitectura permite optimizar las consultas: las listas cargan datos ligeros via REST, mientras que los detalles completos se obtienen bajo demanda via GraphQL.

### Estructura del Proyecto (Screaming Architecture)

```
src/
├── features/                    # Modulos organizados por funcionalidad
│   ├── recipes-explorer/        # Feature principal de exploracion
│   │   ├── components/          # Componentes UI (RecipeCard, RecipeGrid, etc.)
│   │   ├── hooks/               # Custom hooks (useRecipesExplorer, useRecipeDetail)
│   │   ├── services/            # Clase de servicio REST
│   │   ├── queries/             # Configuracion de TanStack Query
│   │   ├── graphql/             # Queries y tipos GraphQL
│   │   ├── pages/               # Componentes de pagina
│   │   ├── types/               # Interfaces TypeScript
│   │   └── utils/               # Funciones auxiliares
│   └── shared/                  # Componentes compartidos (Layout)
├── lib/                         # Configuracion de clientes (Apollo, React Query)
├── mocks/                       # Handlers MSW (REST + GraphQL)
└── main.tsx                     # Punto de entrada con providers
```

### Patron de Data Fetching

- **Lista de Recetas**: REST via `RecipesService.getAllRecipes()` -> TanStack Query
- **Detalle de Receta**: GraphQL via `useRecipeDetail(id)` -> Apollo Client

## Instalacion

### Requisitos Previos
- Node.js >= 18.x
- npm >= 9.x

### Pasos de Instalacion

```bash
# Clonar el repositorio
git clone <https://github.com/FrancoCastro1990/duoc_recetas_exp3.git>

# Instalar dependencias
npm install
```

## Comandos Disponibles

### Desarrollo

```bash
npm run dev          # Inicia servidor de desarrollo con HMR
npm run build        # Compila TypeScript y genera build de produccion
npm run lint         # Ejecuta ESLint en archivos TypeScript
npm run preview      # Previsualiza build de produccion
```

### Pruebas Unitarias

```bash
npm test             # Ejecuta pruebas en modo watch
npm run test:run     # Ejecuta pruebas una vez
npm run test:coverage # Ejecuta pruebas con reporte de cobertura
```

### Pruebas E2E

```bash
npm run e2e          # Ejecuta pruebas Cypress en modo headless
npm run e2e:open     # Abre interfaz interactiva de Cypress
```

## Pruebas

### Pruebas Unitarias

El proyecto utiliza Vitest con React Testing Library para pruebas unitarias. MSW se utiliza para simular respuestas de las APIs REST y GraphQL.

**Archivos de prueba:**
- `src/features/recipes-explorer/components/*.test.tsx` - Tests de componentes
- `src/features/recipes-explorer/hooks/*.test.ts(x)` - Tests de hooks
- `src/features/recipes-explorer/services/*.test.ts` - Tests de servicios
- `src/features/recipes-explorer/utils/*.test.ts` - Tests de utilidades

**Configuracion MSW:**
- `src/test/server.ts` - Servidor MSW para pruebas
- `src/mocks/handlers/` - Handlers para REST y GraphQL

**Cobertura de Codigo:**
El proyecto esta configurado para alcanzar una cobertura minima del 70% en:
- Sentencias ejecutadas (Statements)
- Funciones ejecutadas (Functions)
- Lineas de codigo ejecutadas (Lines)

Para ver el reporte de cobertura:
```bash
npm run test:coverage
```

### Pruebas E2E

Cypress se utiliza para pruebas end-to-end que simulan la interaccion del usuario con la aplicacion.

**Tests E2E disponibles:**
- `cypress/e2e/navigation.cy.ts` - Pruebas de navegacion entre paginas
- `cypress/e2e/filtering.cy.ts` - Pruebas de filtrado por categoria
- `cypress/e2e/search.cy.ts` - Pruebas de busqueda de recetas
- `cypress/e2e/recipe-detail.cy.ts` - Pruebas de vista de detalle

**Comando personalizado:**
- `cy.getByTestId(testId)` - Selecciona elementos por atributo `data-testid`

## Modelo de Datos

### RecipeSummary (REST API)
```typescript
interface RecipeSummary {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'dessert' | 'main-course';
  imageUrl: string;
  cookingTime: number; // minutos
}
```

### RecipeDetail (GraphQL API)
```typescript
interface RecipeDetail {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'dessert' | 'main-course';
  imageUrl: string;
  cookingTime: number;
  prepTime: number;
  servings: number;
  ingredients: Ingredient[];
  instructions: string[];
  tips: string[];
  author: string;
}
```

## Rutas de la Aplicacion

| Ruta | Descripcion |
|------|-------------|
| `/` | Pagina de bienvenida |
| `/recipes` | Explorador de recetas con filtros y busqueda |
| `/recipes/:id` | Detalle de receta individual |

## Configuracion de Tailwind CSS v4

El tema se configura mediante la directiva `@theme` en `src/index.css`. Colores personalizados:
- `primary-*`: Tonos naranja (marca principal)
- `secondary-*`: Tonos ambar/amarillo
- `accent-*`: Tonos verdes
- `neutral-*`: Tonos grises

## Path Alias

El proyecto utiliza `@/*` como alias para importar desde el directorio `src/`:

```typescript
import { RecipeCard } from '@/features/recipes-explorer/components';
```

Configurado en `tsconfig.app.json`.

## Mocking con MSW

En modo desarrollo, Mock Service Worker intercepta las llamadas a las APIs y retorna datos simulados. Esto permite desarrollar el frontend de forma independiente del backend.

**Handlers:**
- `src/mocks/handlers/recipes-rest.ts` - Handler para GET /api/recipes
- `src/mocks/handlers/recipes-graphql.ts` - Handler para query GetRecipeById

El worker se inicializa automaticamente en `src/main.tsx` cuando `import.meta.env.MODE === 'development'`.
