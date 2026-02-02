# Matchbooks

This is a book recommendation web app that makes use of the OpenLibraryAPI to suggest reading paths to users.

Tech stack: TypeScript, React (Vite), Redux, RTKQuery, styled-components, shadcn/ui, Framer Motion, React Router.
Features:

- **Path Generator:** Search for a "seed" book to generate a curated list of recommendations based on subject similarity and authorship.
- **Smart Search:** Real-time search with debouncing (400ms), input validation, and caching.
- **Curated Collections:** Browse top collections (based on subjects for now) fetched dynamically via normalized API endpoints.
- **Randomizer:** "Surprise Me" feature generating paths from random genres with randomized offsets for variety.

## Project Structure

```text
src/
├── components/
│   ├── features/       # Domain-specific components (SearchBar, PathGrid)
│   └── ui/             # Reusable UI primitives (shadcn/ui)
├── data/               # Stored books for constant renders
├── hooks/              # Custom hooks (useGeneratePath, useDebounce)
├── lib/                # Utilities & Algorithms
│   ├── bookScoring.ts  # Client-side recommendation algorithm
│   └── pathSlice.ts    # Redux slice for path persistence
├── services/           # RTK Query API definitions
└── pages/              # Route views
```

## Running Locally

Clone the repository:

```text
git clone https://github.com/{github_username}/matchbooks.git
cd matchbooks
```

Install dependencies:

```text
pnpm i
```

Start the dev server:

```text
pnpm dev
```

Build for production:

```text
pnpm build
```
