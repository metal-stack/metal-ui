# metal-ui -- LLM Development Guide

The metal-ui is the read-only web dashboard for [metal-stack](https://github.com/metal-stack), a bare-metal cloud platform. This SKILL.md documents the stack, architecture, and conventions to follow when modifying this codebase.

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + TypeScript (strict mode) |
| Build | Vite 7 |
| Styling | Tailwind CSS v4 (configurationless, CSS-based config) |
| UI Components | shadcn/ui (New York style) + Radix UI primitives |
| Routing | React Router v7 |
| Data Fetching | TanStack React Query + Connect RPC (`@connectrpc/connect-query`) |
| API Protocol | Connect/protobuf via `@metal-stack/api` (gRPC over HTTP/JSON) |
| Package Manager | bun (`bun.lock`) |
| Validation | Zod v4 + React Hook Form v5 (via `@hookform/resolvers`) |
| Icons | Tabler Icons + Lucide |
| Theme | `next-themes` (dark/light/system with `oklch` color space) |
| Toasts | Sonner |

## Package Scripts

```
bun run dev       # Start Vite dev server
bun run build     # TypeScript check + Vite production build
bun run preview   # Preview production build
bun run knip      # Dead code detection
```

## Repository Structure

```
src/
├── main.tsx                        # Entry, wraps with ThemeProvider + Toaster + App
├── App.tsx                         # RouterProvider
├── Router.tsx                      # All route definitions with nested layouts
│
├── assets/                         # Static assets (logo, etc.)
│
├── components/                     # Domain-specific + shared components
│   ├── ui/                         # shadcn/ui primitives
│   │   ├── button, card, dialog, table, sidebar, dropdown-menu, ...
│   │   ├── app-shell/              # App shell: sidebar, header, token selector, nav
│   │   ├── data-table/             # TanStack table wrapper with pagination/filters
│   │   ├── loading-screen/         # Loading overlay
│   │   ├── no-element-found/       # "Nothing found" placeholder
│   │   └── pagination/             # Table pagination
│   └─── ...                         # Custom components (code-block, errors, tables, info-grid, api-resources)
│
├── interceptors/
│   └── AuthInterceptor.ts          # Connect RPC interceptor: attaches Bearer token, catches 401
│
├── layouts/                        # Layout components + route guards
│   ├── AuthLayout.tsx              # Wraps with AuthProvider
│   ├── QueryLayout.tsx             # Nesting: QueryProvider > MethodsProvider > UserProvider > TenantProvider > ProjectProvider
│   ├── AppLayout.tsx               # SidebarProvider + SidebarInset (app shell)
│   ├── PageLayout.tsx              # SiteHeader + scrollable content wrapper
│   ├── PermissionLayout.tsx        # Checks handle.permission via MethodsProvider.isAllowed()
│   └── routes/
│       ├── public-route.tsx        # Redirects to / if authenticated
│       └── private-route.tsx       # Redirects to /login if unauthenticated
│
├── lib/
│   ├── utils.ts                    # cn() -- clsx + tailwind-merge merge utility
│   ├── token-store.ts              # localStorage token persistence: add/remove/switch/clear
│   ├── permissions-util.ts         # Permission constants for API and ADMIN routes
│   └── permissions-checker.ts      # Permission checking logic
│
├── pages/
│   ├── login.tsx                   # OIDC login redirect
│   ├── auth/callback.tsx           # OIDC callback: extracts token, stores it, redirects
│   ├── dashboard.tsx               # Home/dashboard
│   ├── topology.tsx                # Network topology (React Flow)
│   ├── ai-assistant.tsx            # AI chat (ai-sdk)
│   ├── error-page.tsx              # 404
│   ├── api/                        # No admin pages (machines, tenants, projects, tokens, ...)
│   └── admin/                      # Admin pages (machines, ips, networks, switches, tenants, projects)
│
└── providers/
    ├── AuthProvider.tsx            # Global auth state: loading/unauthenticated/authenticated
    ├── QueryProvider.tsx           # React Query + Connect transport with auth interceptor
    ├── UserProvider.tsx            # Fetches current user, provides useUser()
    ├── TenantProvider.tsx          # Manages tenant selection from user's available tenants
    ├── ProjectProvider.tsx         # Manages project selection
    ├── ThemeProvider.tsx           # Dark/light/system theme toggle (localStorage persisted)
    └── MethodsProvider.tsx         # Fetches available methods, exposes isAllowed() for permissions
```

## Routing & Layout Nesting

Routes are defined in `Router.tsx` using `createBrowserRouter`. Layout nesting (from outer to inner):

```
AuthProvider
  ├── PublicOnlyRoute (redirects to / if authenticated)
  │   ├── /login
  │   └── /auth/callback
  └── ProtectedRoute (redirects to /login if unauthenticated)
      └── QueryLayout (key={auth.apiToken} -- re-mounts on token change)
          └── MethodsProvider
          └── UserProvider
          └── TenantProvider
          └── ProjectProvider
          └── PageLayout (AppLayout + SiteHeader)
              └── PermissionLayout (checks handle.permission)
                  └── Actual page component
```

Every API resource route declares `handle: { title, permission }` for sidebar visibility and permission checking.

## UI Styling

### Core Convention: Tailwind CSS v4 (Configurationless)

- **No `tailwind.config.js/ts`** -- all configuration lives in `src/App.css` via `@theme inline` block and custom CSS variables
- All styling uses **pure Tailwind utility classes** in JSX -- zero CSS modules, zero styled-components
- Use the `cn()` utility from `src/lib/utils.ts` (clsx + tailwind-merge) for className merging and conditional classes
- Dark mode via HTML class toggling (`dark`) managed by `next-themes`
- Colors defined in `oklch()` color space for perceptual uniformity

### shadcn/ui Components

All shadcn/ui primitives live under `src/components/ui/`. Key patterns:
- Use `cn()` for composable variants
- Components with variants (Button, Badge, Alert, SidebarMenuButton) use `class-variance-authority` (`cva`)
- Form components (FormField, FormItem, FormLabel, FormControl, FormMessage) integrate with React Hook Form + Zod
- All interactive primitives are built on Radix UI (Dialog, DropdownMenu, Select, Sheet, Tooltip, Collapsible, etc.)

### Icon Libraries

- **Tabler Icons** (`@tabler/icons-react`) -- primary icon set used throughout
- **Lucide** (`lucide-react`) -- secondary, primarily used by shadcn/ui internal components

## Login Flow & Auth

The app uses **Bearer token authentication** backed by **OIDC** (OpenID Connect). Tokens are persisted in localStorage.

```
1. User visits app
   └── AuthState: "loading" (reading from localStorage) → LoadingScreen

2. No token stored → AuthState: "unauthenticated" → ProtectedRoute redirects to /login

3. Login page: user clicks "Connect"
   → Browser redirects to: ${VITE_API_URL}/auth/openid-connect?redirect-url=${origin}/auth/callback

4. Backend handles OIDC against IdP, redirects back to /auth/callback?token=<jwt>
   → AuthCallback extracts token from URL query → addToken("default", token, apiUrl)
   → Token stored in localStorage under key "metal-ui.tokens"
   → Browser redirects to /

5. AuthProvider reads localStorage → AuthState: "authenticated"
   → ProtectedRoute allows through
   → QueryProvider re-mounts with key={auth.apiToken} → fresh ConnectTransport
   → AuthInterceptor attaches "Bearer <token>" to every outgoing request
```

### Token Management (Multi-Token)

Users can add, switch, and remove tokens with different permissions via the sidebar.

- **Storage**: `localStorage` key `"metal-ui.tokens"`, structure: `{ tokens: TokenEntry[], activeId: string | null }`
- **TokenSelector** (`src/components/ui/app-shell/token-selector.tsx`): dropdown in sidebar showing each token name + 8-char preview, with switch and delete actions
- **AddTokenDialog** (`src/components/ui/app-shell/add-token-dialog.tsx`): form with name (1-64 chars, auto-postfixed on duplicates) and token (password input, min 10 chars), validates with Zod, uses React Hook Form
- **Adding a token**: stored in localStorage, **auto-activated** as the active token. `QueryProvider key` changes → entire provider tree remounts → fresh gRPC transport.
- **Switching tokens**: changes `activeId` in store → AuthProvider updates → same remount behavior.
- **Removing a token**: deletes from store, first remaining token becomes active.

### Permission Layer

Each token may have different permissions (`permission` on route handles + `handle.permission` array of method names like `"/metalstack.api.v2.TenantService/List"`):

1. `MethodsProvider` fetches `method.list` + `method.tokenScopedList` on mount (includes permissions, tenant roles, project roles, admin role)
2. `PermissionLayout` checks `isAllowed(route.handle.permission)` before rendering the page
3. `AppSidebar` conditionally shows/hides navigation items based on `requires: { methods: [...] }` with `any: boolean` logic
4. Denied: toast warning + redirect to `/`

### API Error Handling

`AuthInterceptor` catches `Code.Unauthenticated` (401) responses → calls `onUnauthorized()` in `QueryProvider` → toast ("Session expired"), clears Query cache, logs user out → redirects to `/login`.

## Data Layer

- **Connect RPC** (`@connectrpc/connect-web`) with `@connectrpc/connect-query` for React Query integration
- Proto-generated client from `@metal-stack/api` package -- this package contains all service definitions and messages
- Transport is created in `QueryProvider` with `useBinaryFormat: false` (uses HTTP/JSON)
- Transport is wrapped with `AuthInterceptor` for bearer token attachment

### Adding a New API Page

1. Import the generated service/hook from `@metal-stack/api`
2. Create a list page (e.g. `myresource-page.tsx`) with a `data-table` component
3. Create a detail page (e.g. `myresource-detail-page.tsx`) with a resource-specific info component
4. Add routes in `Router.tsx` with `handle: { title: "My Resource", permission: "..." }`
5. Add the resource to `api/` directory (read-only) or `admin/` directory

### Adding a New Table

Use the shared `data-table` component from `src/components/ui/data-table/data-table.tsx` -- it provides built-in pagination, sorting, column filters, column visibility toggle, and row selection.

## Important Conventions

- **Use bun** as the package manager (`bun install`, `bun run ...`)
- **TypeScript strict mode** is on; `noUnusedLocals`, `noUnusedParameters`, and `noFallthroughCasesInSwitch` are enabled
- **Path alias**: `@/` resolves to `src/` (use `@/components/...`, `@/lib/...`, etc.)
- **No new CSS files** -- all styling via Tailwind utility classes. Never modify `src/App.css`.
- **shadcn/ui components**: add new primitives via `npx shadcn@latest add <component>`; they are source files, not a dependency
- **Forms**: use React Hook Form + Zod via shadcn form components; never plain HTML inputs for forms
- **State**: prefer React Query for server state, React Context for app-level state (auth, theme, selections)
- **Toasts**: use Sonner via the `@/components/ui/sonner.tsx` wrapper (has built-in Lucide icons)
- **Read-only API pages** live in `src/pages/api/`; admin CRUD pages in `src/pages/admin/`
- Never store secrets in the repo; use `.env` (`VITE_API_URL`) which is `.gitignore`d
