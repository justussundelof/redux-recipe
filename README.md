# Redux Recipe Explorer

En receptsök-app byggd med React, TypeScript, Redux Toolkit och RTK Query.

## Funktioner

- 🔍 Sök efter recept via DummyJSON API
- ⭐ Spara favoriter med Redux
- 📱 Enkel och responsiv UI
- 🎯 Fullständig TypeScript-typning
- 🚀 RTK Query för datahantering

## Kom igång

### Installation

```bash
npm install
```

### Starta utvecklingsserver

```bash
npm run dev
```

Appen öppnas på `http://localhost:5173`

### Bygg för produktion

```bash
npm run build
```

## Teknologier

- **React 18** - UI-bibliotek
- **TypeScript** - Typsäkerhet
- **Redux Toolkit** - State management
- **RTK Query** - Data fetching och caching
- **Vite** - Build tool och dev server

## Projektstruktur

```
src/
├── app/
│   └── store.ts              # Redux store-konfiguration
├── features/
│   ├── favorites/
│   │   └── favoritesSlice.ts # Favoriter slice
│   └── recipes/
│       └── recipesApi.ts     # RTK Query API
├── types/
│   └── recipe.ts             # TypeScript-typer
├── App.tsx                   # Huvudkomponent
├── App.css                   # Styling
└── main.tsx                  # Entry point
```

## API

Projektet använder [DummyJSON Recipes API](https://dummyjson.com/docs/recipes)

## Lär dig mer

- [Redux Toolkit](https://redux-toolkit.js.org/)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [React Redux](https://react-redux.js.org/)
# redux-recipe
