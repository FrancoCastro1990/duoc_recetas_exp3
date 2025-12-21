# Veterinaria Cuidado Animal

Sistema de gestion para la veterinaria "Cuidado Animal". Permite administrar clientes, mascotas y citas de manera eficiente.

## Descripcion

Este proyecto fue desarrollado como parte de la Evaluacion Final Transversal de la asignatura Desarrollo Frontend II (PFY2202). El sistema permite:

- **Visualizar clientes y mascotas**: Informacion de clientes con sus datos de contacto y las mascotas asociadas a cada uno.
- **Gestionar citas**: Listado de atenciones agendadas filtradas por dia (maximo 8 citas por dia), mostrando veterinario, mascota y dueno.
- **Ver detalles de mascotas**: Informacion completa incluyendo historial medico.

## Tecnologias Utilizadas

### Frontend
- **React 19** - Biblioteca de interfaces de usuario
- **TypeScript** - Tipado estatico
- **Vite 7** - Build tool y servidor de desarrollo
- **Tailwind CSS v4** - Framework de estilos utilitarios
- **React Router DOM v7** - Enrutamiento del lado del cliente
- **Redux Toolkit** - Gestion de estado de UI

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

1. **REST API** (`/api/*`): Proporciona listados de clientes, mascotas y citas. Utilizada para las vistas principales.

2. **GraphQL API** (`/graphql`): Proporciona informacion detallada de mascotas individuales incluyendo historial medico. Utilizada para la vista de detalle.

Esta arquitectura permite optimizar las consultas: las listas cargan datos ligeros via REST, mientras que los detalles completos se obtienen bajo demanda via GraphQL.

### Estructura del Proyecto (Screaming Architecture)

```
src/
├── features/                    # Modulos organizados por funcionalidad
│   ├── vet-management/          # Feature principal de veterinaria
│   │   ├── components/          # Componentes UI (ClientCard, PetCard, AppointmentCard, etc.)
│   │   ├── hooks/               # Custom hooks (useClients, usePets, useAppointments, usePetDetail)
│   │   ├── services/            # Clase de servicio REST (VetService)
│   │   ├── queries/             # Configuracion de TanStack Query
│   │   ├── graphql/             # Queries y tipos GraphQL
│   │   ├── pages/               # Componentes de pagina
│   │   ├── types/               # Interfaces TypeScript
│   │   └── utils/               # Funciones auxiliares (helpers)
│   └── shared/                  # Componentes compartidos (Layout)
├── store/                       # Redux store y slices
│   ├── index.ts                 # Configuracion del store
│   ├── hooks.ts                 # Hooks tipados (useAppDispatch, useAppSelector)
│   └── slices/                  # Redux slices (uiSlice)
├── lib/                         # Configuracion de clientes (Apollo, React Query)
├── mocks/                       # Handlers MSW (REST + GraphQL) y datos mock
│   ├── data/                    # Datos mock (clients, pets, appointments, veterinarians)
│   └── handlers/                # Handlers de requests
└── main.tsx                     # Punto de entrada con providers
```

### Patron de Data Fetching

- **Lista de Clientes/Mascotas/Citas**: REST via `VetService` -> TanStack Query
- **Detalle de Mascota**: GraphQL via `usePetDetail(id)` -> Apollo Client
- **Estado de UI**: Redux via `uiSlice` (filtro de fecha, busqueda)

## Instalacion

### Requisitos Previos
- Node.js >= 20.x
- npm >= 9.x

### Pasos de Instalacion

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd duoc_veterinaria

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
- `src/features/vet-management/components/*.test.tsx` - Tests de componentes
- `src/features/vet-management/hooks/*.test.ts(x)` - Tests de hooks
- `src/features/vet-management/services/*.test.ts` - Tests de servicios
- `src/features/vet-management/utils/*.test.ts` - Tests de utilidades
- `src/store/slices/*.test.ts` - Tests de Redux slices

**Configuracion MSW:**
- `src/test/server.ts` - Servidor MSW para pruebas
- `src/mocks/handlers/` - Handlers para REST y GraphQL

**Cobertura de Codigo:**
El proyecto esta configurado para alcanzar una cobertura minima del 70% en:
- Sentencias ejecutadas (Statements): ~84%
- Funciones ejecutadas (Functions): ~86%
- Lineas de codigo ejecutadas (Lines): ~84%

Para ver el reporte de cobertura:
```bash
npm run test:coverage
```

### Pruebas E2E

Cypress se utiliza para pruebas end-to-end que simulan la interaccion del usuario con la aplicacion.

**Tests E2E disponibles:**
- `cypress/e2e/navigation.cy.ts` - Pruebas de navegacion entre paginas
- `cypress/e2e/clients-pets.cy.ts` - Pruebas de visualizacion de clientes y mascotas
- `cypress/e2e/appointments.cy.ts` - Pruebas de citas y filtro de fecha
- `cypress/e2e/pet-detail.cy.ts` - Pruebas de vista de detalle de mascota

**Comando personalizado:**
- `cy.getByTestId(testId)` - Selecciona elementos por atributo `data-testid`

## Modelo de Datos

### Client
```typescript
interface Client {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
}
```

### PetSummary (REST API)
```typescript
interface PetSummary {
  id: string;
  name: string;
  species: 'dog' | 'cat' | 'bird' | 'rabbit' | 'hamster' | 'other';
  breed: string;
  age: number;
  imageUrl: string;
  ownerId: string;
}
```

### PetDetail (GraphQL API)
```typescript
interface PetDetail extends PetSummary {
  weight: number;
  color: string;
  birthDate: string;
  medicalHistory: MedicalRecord[];
  owner: Client;
}
```

### AppointmentSummary
```typescript
interface AppointmentSummary {
  id: string;
  date: string;       // YYYY-MM-DD
  time: string;       // HH:mm
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  petId: string;
  petName: string;
  petSpecies: PetSpecies;
  ownerId: string;
  ownerName: string;
  veterinarianId: string;
  veterinarianName: string;
  reason: string;
}
```

## Rutas de la Aplicacion

| Ruta | Descripcion |
|------|-------------|
| `/` | Pagina de bienvenida |
| `/clients` | Visualizacion de clientes y mascotas |
| `/appointments` | Citas del dia con filtro por fecha |
| `/pets/:id` | Detalle de mascota con historial medico |

## Estado de Redux

El `uiSlice` maneja el estado de la interfaz:
- `selectedDate`: Fecha seleccionada para filtrar citas
- `clientSearchTerm`: Termino de busqueda de clientes
- `clientsViewMode`: Modo de visualizacion (grid/list)
- `sidebarOpen`: Estado del menu mobile

## Configuracion de Tailwind CSS v4

El tema se configura mediante la directiva `@theme` en `src/index.css`. Colores personalizados:
- `primary-*`: Tonos teal (marca principal - profesional medico)
- `secondary-*`: Tonos sky blue
- `accent-*`: Tonos emerald (salud/vitalidad)
- `neutral-*`: Tonos grises

## Path Alias

El proyecto utiliza `@/*` como alias para importar desde el directorio `src/`:

```typescript
import { ClientCard } from '@/features/vet-management/components';
```

Configurado en `tsconfig.app.json` y `vite.config.ts`.

## Mocking con MSW

En modo desarrollo, Mock Service Worker intercepta las llamadas a las APIs y retorna datos simulados. Esto permite desarrollar el frontend de forma independiente del backend.

**Handlers:**
- `src/mocks/handlers/vet-rest.ts` - Handlers para REST API
- `src/mocks/handlers/vet-graphql.ts` - Handler para queries GraphQL

El worker se inicializa automaticamente en `src/main.tsx` cuando `import.meta.env.MODE === 'development'`.

## Autor

Desarrollado para DUOC UC - Desarrollo Frontend II (PFY2202)

## Licencia

Este proyecto es para fines educativos.
