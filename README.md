# Gestión de Proyectos (Prueba Técnica)

Aplicación fullstack para **gestionar proyectos y trabajadores**, permitiendo:

- Crear proyectos
- Listar proyectos
- Ver/editar el detalle de un proyecto
- Crear trabajadores
- Listar trabajadores
- Asignar **múltiples trabajadores** a un proyecto

El repositorio está dividido en:

- **BackEnd/**: API REST en **Node.js + Express + TypeScript** con **Prisma** y **SQLite**
- **FrontEnd/**: UI en **React + TypeScript + Vite** (MUI, Router, Axios)

---

## Requisitos

- **Node.js** (recomendado: LTS)
- **npm**

> Nota: ambos proyectos incluyen `node_modules/` en tu workspace, pero lo normal es instalarlos con `npm install`.

---

## Estructura del repositorio

```text
GestionProyectos/
  BackEnd/
    index.ts
    package.json
    prisma/
      schema.prisma
      dev.db
    src/
      features/
        proyectos/
        trabajadores/
  FrontEnd/
    index.html
    vite.config.ts
    package.json
    src/
      api/
      components/
      pages/
```

---

## Backend (BackEnd)

### Stack

- **Express 5**
- **TypeScript** (ejecución con `tsx`)
- **Prisma** + **SQLite**

### Configuración

- Archivo de variables de entorno: `BackEnd/.env`
- Variable usada por Prisma:

```bash
DATABASE_URL="file:/.../BackEnd/prisma/dev.db"
```

El esquema de BD está en `BackEnd/prisma/schema.prisma` con los modelos:

- `Proyecto`
- `Trabajador`
- `TrabajadorProyecto` (tabla intermedia para relación muchos-a-muchos)

### Ejecución

```bash
cd BackEnd
npm install
npm run dev
```


## Frontend (FrontEnd)

### Stack

- **React 19** + **TypeScript**
- **Vite**
- **React Router**
- **Material UI (MUI)** + Emotion
- **Axios**


### Ejecución

```bash
cd FrontEnd
npm install
npm run dev
```

Por defecto:

- `http://localhost:5173`

### Rutas de la app

Definidas en `FrontEnd/src/App.tsx`:

- `/` → `Dashboard`
- `/proyecto/:id` → `ProyectoDetalle`

---

## Puesta en marcha (desarrollo)

En dos terminales:

### 1) Backend

```bash
cd BackEnd
npm install
npm run dev
```

### 2) Frontend

```bash
cd FrontEnd
npm install
npm run dev
```

Luego abre el frontend en `http://localhost:5173`.

---

## Decisiones técnicas

**Monorepo:** Se optó por un monorepo con `BackEnd/` y `FrontEnd/` en el mismo repositorio. Esto simplifica la gestión del proyecto al tener todo el código en un solo lugar, facilita compartir tipos o utilidades en el futuro, y hace más cómodo el onboarding al clonar un solo repositorio. 

**Estructura por features:** El backend está organizado en carpetas por dominio (`proyectos/`, `trabajadores/`) en lugar de por tipo de archivo. Esto hace que cada feature sea autocontenida y más fácil de escalar sin tocar otras partes.

**SQLite + Prisma:** Se eligió SQLite para simplificar la configuración y no depender de un servidor de base de datos externo. Prisma permite cambiar fácilmente a PostgreSQL en el futuro sin reescribir queries.

**Relación muchos-a-muchos explícita:** Se creó el modelo `TrabajadorProyecto` como tabla intermedia explícita, lo que da más control si en el futuro se necesita agregar campos a la relación (como fecha de asignación o rol en el proyecto).

**Qué se priorizó:** Funcionalidad completa del CRUD de proyectos con asignación de trabajadores, estructura limpia y código legible.

**Qué se dejó fuera:** Autenticación, validación robusta de inputs, manejo de errores detallado en el frontend y tests.

---

## Mejoras futuras

- **Autenticación:** Agregar JWT para proteger los endpoints y tener usuarios con roles.
- **Validación:** Usar `zod` en el backend para validar los body de las requests antes de llegar al controller.
- **Variables de entorno en el frontend:** Migrar la `baseURL` de Axios a una variable de entorno de Vite (`VITE_API_BASE_URL`).
- **Tests:** Agregar tests unitarios en el backend con `jest` y tests de componentes con `testing-library`.
- **Eliminar registros:** Actualmente no existe endpoint ni UI para eliminar proyectos o trabajadores.
- **Paginación:** Si la lista de proyectos crece, agregar paginación en el listado.
- **Migrar a PostgreSQL:** Para un entorno de producción real, reemplazar SQLite por PostgreSQL.
