# Next js | Tailwind | TanStack Query

A Next js app that utilizes tailwind UI and TanStack Query

It has support for:

- TypeScript
- Tailwind UI
- TanStack Query

## Project Setup

- Clone the repo.
- Make sure NodeJS is installed.
- Run `npm i` from root.
- Run `npm run dev` to start the project

# Instructions for integrating TanStack Query for API calls.

- Install `@tanstack/react-query` using `npm i @tanstack/react-query`
- Now create a QueryProvider as below and wrap `layout.tsx` with it

```typescript
"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export function QueryProvider({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children} </QueryClientProvider>;
}
```

- Use `useQuery` to fetch and `useMutation` to update data from api using `@tanstack/react-query`.

# Interfaces for each API endpoint

- Interface for an individual product:

```typescript
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
```

- API Interface for retrieving all products:

```typescript
interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
```

# Commands

- For development purposes, run: `npm run dev`.
- To build the project, use: `npm run build`.
- For linting, run: `npm run lint`.
- To start the application, use: `npm run start`.
