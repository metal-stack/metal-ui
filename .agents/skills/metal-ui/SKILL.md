---
name: metal-ui
description: >
  Coding skill for maintaining and developing features in the metal-stack/metal-ui repository — a Tauri v2 desktop
  application for managing metal-stack bare-metal infrastructure. The frontend is React 19 + TypeScript + Vite 7 with
  Tailwind CSS v4, shadcn/ui (new-york style), TanStack Table, ConnectRPC (protobuf), and React Router v7. The backend
  is Rust (Tauri). Use this skill whenever working on metal-ui code: adding pages, components, API resources, fixing
  bugs, refactoring, or reviewing changes. Also use when the task involves metal-stack resources like machines,
  partitions, images, IPs, networks, sizes, filesystems, switches, tenants, projects, or tokens.
---

# metal-ui Development Skill

This skill encodes the architecture, conventions, and patterns of the **metal-ui** repository so that an AI coding
agent can maintain and extend it consistently.

## Project Overview

metal-ui is a **Tauri v2** desktop application that serves as a GUI for [metal-stack](https://metal-stack.io) — a
bare-metal cloud infrastructure platform. It uses the metal-stack V2 API via ConnectRPC (protobuf). The interface is
currently read-only and displays resources like machines, partitions, networks, IPs, images, sizes, filesystems,
tenants, projects, tokens, and switches.

## Tech Stack

| Layer         | Technology                                                       |
|---------------|------------------------------------------------------------------|
| Desktop shell | Tauri v2 (Rust)                                                  |
| Frontend      | React 19, TypeScript ~5.8, Vite 7                                |
| Styling       | Tailwind CSS v4 (`@tailwindcss/vite`), CSS variables             |
| Components    | shadcn/ui (new-york style, lucide icons), Radix UI primitives    |
| Data fetching | `@connectrpc/connect-query` + `@tanstack/react-query`            |
| API types     | `@metal-stack/api` (protobuf-generated service stubs)            |
| Routing       | `react-router` v7 (`createBrowserRouter`)                        |
| Tables        | `@tanstack/react-table` v8                                       |
| Forms         | `react-hook-form` + `zod` (v4) + `@hookform/resolvers`          |
| Toasts        | `sonner`                                                         |
| Theme         | `next-themes` (dark default, stored in `vite-ui-theme`)          |
| Topology      | `@xyflow/react` + `@dagrejs/dagre`                               |
| Drag-and-drop | `@dnd-kit`                                                       |
| Package mgr   | **bun** (`bun install`, `bun tauri dev`)                         |

## Repository Layout

```
metal-ui/
├── src/                          # Frontend source
│   ├── App.tsx                   # Root: mounts RouterProvider
│   ├── main.tsx                  # Entry: ThemeProvider + Toaster + App
│   ├── Router.tsx                # All routes (createBrowserRouter)
│   ├── assets/                   # Static images
│   ├── components/
│   │   ├── ui/                   # shadcn/ui base components (button, card, table, etc.)
│   │   ├── machines/             # Domain components for machines
│   │   ├── networks/             # Domain components for networks
│   │   ├── ips/                  # ... (one folder per resource)
│   │   ├── info-grid/            # Reusable key-value grid layout
│   │   ├── info-collapsible/     # Collapsible section wrapper
│   │   ├── info-drawer/          # Side-sheet detail drawer
│   │   ├── data-table/           # Generic DataTable wrapper (in ui/)
│   │   ├── errors/               # Error boundary components
│   │   ├── topology/             # Network topology visualization
│   │   └── chat/                 # AI assistant chat components
│   ├── hooks/                    # Custom hooks (e.g., use-mobile)
│   ├── interceptors/             # ConnectRPC interceptors (auth)
│   ├── layouts/                  # Layout wrappers
│   │   ├── AppLayout.tsx
│   │   ├── AuthLayout.tsx
│   │   ├── PageLayout.tsx
│   │   ├── QueryLayout.tsx
│   │   ├── PermissionLayout.tsx
│   │   └── routes/               # PublicOnlyRoute, ProtectedRoute
│   ├── lib/                      # Utilities
│   │   ├── cli-config.ts         # Tauri invoke → read CLI config
│   │   ├── permissions-checker.ts
│   │   ├── permissions-util.ts   # Permission string constants
│   │   ├── utils.ts              # cn() helper
│   │   └── ...
│   ├── pages/
│   │   ├── api/                  # User-facing resource pages
│   │   │   ├── Machines/         # machines-page.tsx + machine-detail-page.tsx
│   │   │   ├── Networks/
│   │   │   ├── IPs/
│   │   │   └── ...               # One folder per resource
│   │   ├── admin/                # Admin resource pages (same structure)
│   │   ├── dashboard.tsx
│   │   ├── login.tsx
│   │   ├── topology.tsx
│   │   ├── ai-assistant.tsx
│   │   └── error-page.tsx
│   └── providers/                # React context providers
│       ├── AuthProvider.tsx       # Auth state from CLI config + OIDC
│       ├── QueryProvider.tsx      # ConnectRPC transport + TanStack QueryClient
│       ├── MethodsProvider.tsx    # Permission methods from API
│       ├── ProjectProvider.tsx    # Current project selection
│       ├── TenantProvider.tsx     # Current tenant
│       ├── ThemeProvider.tsx      # Dark/light theme
│       └── UserProvider.tsx
├── src-tauri/                    # Tauri Rust backend
│   ├── src/
│   │   ├── lib.rs                # Commands: read_cli_config, start_oauth_login
│   │   └── main.rs               # Entry point
│   ├── Cargo.toml
│   └── tauri.conf.json
├── components.json               # shadcn/ui config (new-york, @/ aliases)
├── vite.config.ts                # Vite config with path alias @/ → ./src
├── tsconfig.json                 # Strict TS, ES2020 target, @/* paths
└── package.json                  # bun scripts: dev, build, tauri
```

## Architecture Patterns

### Provider Hierarchy

The app wraps providers in a strict order. Understand this before adding new providers:

```
ThemeProvider → AuthLayout → (AuthProvider) → ProtectedRoute → QueryLayout →
  QueryProvider (ConnectRPC transport) → PageLayout → PermissionLayout →
    MethodsProvider → ProjectProvider → TenantProvider → UserProvider → Pages
```

### Data Fetching Pattern

All API calls use `@connectrpc/connect-query` hooks backed by protobuf service definitions from `@metal-stack/api`.
The transport is created in `QueryProvider` using the authenticated user's token and API URL.

**List page pattern:**
```tsx
import { useQuery } from "@connectrpc/connect-query";
import { SomeService } from "@metal-stack/api/js/metalstack/api/v2/some_pb";

export default function SomePage() {
  const { currentProject } = useProject();
  const { data, isLoading, error } = useQuery(
    SomeService.method.list,
    { project: currentProject?.uuid },
    { enabled: !!currentProject?.uuid },
  );

  if (!currentProject?.uuid) return <NoProjectSelected />;
  if (isLoading) return <LoadingScreen />;
  if (error) return <AlertHint title="Error" description={error.message} />;
  if (!data?.items.length) return <NoElementFound />;

  return <SomeTable data={data.items} />;
}
```

**Detail page pattern:**
```tsx
export default function SomeDetailPage() {
  const { id } = useParams();
  const { currentProject } = useProject();
  const { data, isLoading, error } = useQuery(SomeService.method.get, {
    uuid: id,
    project: currentProject?.uuid,
  });

  if (isLoading) return <Skeleton className="h-12" />;
  if (error) return <AlertHint title="Error" description={error.message} />;
  if (!data?.item) return <AlertHint title="Error" description="No data" />;

  return <SomeInfo data={data.item} />;
}
```

### Table Pattern

Tables use `@tanstack/react-table` with a shared `DataTable` wrapper from `@/components/ui/data-table/data-table`.

```tsx
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table/data-table";

export function SomeTable({ data }: { data: SomeType[] }) {
  const location = useLocation();
  const prefix = location.pathname.startsWith("/admin") ? "/admin" : "";

  const columns: ColumnDef<SomeType>[] = [
    {
      accessorKey: "uuid",
      header: "UUID",
      enableHiding: false,
      cell: ({ row }) => (
        <Link to={prefix + "/resource/" + row.original.uuid}>
          {row.original.uuid}
        </Link>
      ),
    },
    // ... more columns
  ];

  return (
    <DataTable
      initialData={data}
      columns={columns}
      getRowId={(row) => row.uuid.toString()}
    />
  );
}
```

### Detail Component Pattern

Detail views use `InfoCollapsible` sections with sub-components and `InfoGrid` for key-value display:

```tsx
export default function SomeInfo({ data }: { data: SomeType }) {
  return (
    <div className="flex flex-col gap-2">
      <div><strong>Name:</strong> {data.name || "-"}</div>
      <InfoCollapsible title="Details">
        <InfoGrid rows={[
          { label: "Key", value: data.key },
          { label: "Other", value: data.other },
        ]} />
      </InfoCollapsible>
    </div>
  );
}
```

### Routing Convention

Routes are defined in `src/Router.tsx`. Every resource has:
- A list route: `/resource` → `ResourcePage`
- A detail route: `/resource/:id` → `ResourceDetailPage`
- Admin equivalents under `/admin/resource` and `/admin/resource/:id`

Each route has a `handle` object with `title` and optionally `permission`:
```tsx
{
  path: "/resource",
  children: [
    { index: true, element: <ResourcePage />, handle: { title: "Resources", permission: permissions.API.resource } },
    { path: ":id", element: <ResourceDetailPage />, handle: { title: "Resource detail", permission: permissions.API.resource } },
  ],
}
```

### Permission System

Permissions are gRPC method paths defined in `src/lib/permissions-util.ts`. They follow the pattern
`/metalstack.api.v2.ServiceName/MethodName` (or `metalstack.admin.v2` for admin). The `MethodsProvider` fetches
allowed methods at startup and exposes an `isAllowed()` checker.

When adding a new resource, add its permission strings to `permissions-util.ts` under the appropriate namespace
(API or ADMIN).

### Styling & Visual Design

This section is critical — the UI should look polished and professional in both dark and light modes. The app defaults
to dark mode. Every component you create must work correctly in both themes without manual overrides.

#### Theme System

The theme is powered by CSS variables defined in `src/App.css` with `:root` (light) and `.dark` (dark) scopes. The
`ThemeProvider` from `next-themes` toggles a `.dark` class on the root element. Tailwind v4 hooks into this via
`@custom-variant dark (&:is(.dark *))` — so standard Tailwind `dark:` prefixes work automatically.

**Color tokens to use** (these auto-switch between light and dark):

| Token                    | Purpose                                              |
|--------------------------|------------------------------------------------------|
| `bg-background`          | Main page/app background                             |
| `text-foreground`        | Default text color                                   |
| `bg-card` / `text-card-foreground` | Card surfaces and their text                |
| `bg-muted` / `text-muted-foreground` | Subdued backgrounds, secondary text       |
| `bg-primary` / `text-primary-foreground` | Brand accent (warm amber/orange oklch)  |
| `text-primary`           | Accent text, links, highlighted titles               |
| `bg-secondary` / `text-secondary-foreground` | Neutral secondary surfaces            |
| `bg-accent` / `text-accent-foreground` | Hover/active states on surfaces           |
| `bg-destructive` / `text-destructive-foreground` | Error/danger states             |
| `border-border`          | Default border color                                 |
| `bg-input`               | Input field backgrounds                              |
| `ring-ring`              | Focus ring color                                     |
| `bg-sidebar` / `text-sidebar-foreground` | Sidebar-specific surfaces                |

**The golden rule:** never use raw Tailwind colors (`bg-slate-900`, `text-gray-500`, etc.) for surfaces, text, or
borders in new components. Always use the semantic tokens above. They automatically adapt to dark/light mode. The one
exception is the `CodeBlock` component which uses `bg-slate-950` for its code area — this is intentional because code
blocks should stay dark regardless of theme.

#### When You Must Use Raw Colors

Status indicators are the one place where raw colors are acceptable, because they represent semantic meaning beyond
the theme. Follow the existing pattern from `MachineConditionBadge` and `ServiceHealthItem`:

```tsx
// Status badges — use outline variant + colored text/border
<Badge variant="outline" className={`text-green-600 border-green-600`}>
  🟢 ALIVE
</Badge>

// Health indicators — use colored bg + contrasting text
<Badge className="bg-green-100 text-green-800">HEALTHY</Badge>
<Badge className="bg-red-100 text-red-800">UNHEALTHY</Badge>
<Badge className="bg-yellow-100 text-yellow-800">DEGRADED</Badge>
```

When using raw colors for status indicators, be aware that the `bg-green-100 text-green-800` pattern can look washed
out in dark mode. If you're adding a new status indicator, prefer the `variant="outline"` approach with `text-{color}-600
border-{color}-600` — it works cleanly in both themes. If you need filled badges for dark mode, add a `dark:` override:
```tsx
className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
```

#### Component Styling Rules

1. **Use `cn()` for conditional classes** — imported from `@/lib/utils`. Merge classes cleanly:
   ```tsx
   import { cn } from "@/lib/utils";
   <div className={cn("rounded-lg border", isActive && "border-primary bg-accent")} />
   ```

2. **Use shadcn/ui components first** — before building custom UI, check what's already available in
   `src/components/ui/`. The project already has: `Button`, `Card`, `Badge`, `Alert`, `Table`, `Tooltip`, `Popover`,
   `Select`, `Input`, `Form`, `Sheet` (drawers), `Skeleton`, `Separator`, `Switch`, `DropdownMenu`, `Collapsible`,
   `Sidebar`, `Drawer` (vaul), `Pagination`, and `Avatar`. Use `class-variance-authority` (`cva`) for variant-based
   styling when creating component variants.

3. **No inline styles** — use Tailwind utility classes exclusively.

4. **No separate CSS files for components** — all styling lives in Tailwind classes. The only CSS file is `App.css`
   for theme variables and base layer rules.

5. **Typography and spacing** follow the existing patterns:
   - Font stack: `Inter` (sans), `JetBrains Mono` (mono), `Source Serif 4` (serif)
   - Border radius: `rounded-lg` for cards/containers, `rounded-full` for badges
   - Spacing: use Tailwind's spacing scale (`gap-2`, `gap-4`, `p-4`, `px-6`, etc.)
   - Text sizes: `text-xs` for badges/meta, `text-sm` for body/descriptions, `text-lg`/`text-2xl` for headings

#### Presenting Information Nicely

The codebase has established visual patterns for displaying data. Follow these consistently:

**Key-value data → `InfoGrid`**

Use `InfoGrid` from `@/components/info-grid/info-grid` for any structured key-value display. It renders a responsive
two-column grid (`label | value`) that collapses to single-column on mobile. Use the `fullWidth` flag when a value
needs the full row width (e.g., nested collapsible sections or lists).

```tsx
<InfoGrid rows={[
  { label: "Name:", value: data.name },
  { label: "Status:", value: <StatusBadge status={data.status} /> },
  { label: "Details:", value: <NestedInfo data={data.details} />, fullWidth: true },
]} />
```

**Grouped/nested detail data → `InfoCollapsible`**

Wrap sub-sections in `InfoCollapsible` from `@/components/info-collapsible/info-collapsible` to keep detail views
scannable. Group related fields logically — users can expand what they need:

```tsx
<div className="flex flex-col gap-2">
  <div><strong>Partition:</strong> {data.partition?.id || "-"}</div>
  <InfoCollapsible title="Hardware">
    <InfoGrid rows={[...]} />
  </InfoCollapsible>
  <InfoCollapsible title="Status">
    <SomeStatusInfo data={data.status} />
  </InfoCollapsible>
</div>
```

**Tabular data → `DataTable`**

Use the `DataTable` wrapper from `@/components/ui/data-table/data-table` backed by `@tanstack/react-table`. Make
UUID/ID columns clickable links. Handle the admin prefix for URL generation:

```tsx
const prefix = location.pathname.startsWith("/admin") ? "/admin" : "";
// In column cell:
cell: ({ row }) => (
  <Link to={prefix + "/resource/" + row.original.uuid}>{row.original.uuid}</Link>
)
```

**Side panel details → `InfoDrawer` (Sheet)**

Use `InfoDrawer` from `@/components/info-drawer/info-drawer` for inline detail panels that slide in from the right.
Triggered by clicking a link/button in a table row.

**Empty states → `NoElementFound`**

Always handle the empty case with `NoElementFound` from `@/components/ui/no-element-found/no-element-found`. It shows
a centered card with an icon and message. Consistent empty states make the app feel complete.

**Loading states → `LoadingScreen` or `Skeleton`**

Use `LoadingScreen` (full-page spinner with `IconLoader3`) for page-level loading and `Skeleton` for inline/partial
loading within detail pages.

**Error states → `AlertHint`**

Use `AlertHint` from `@/components/ui/alert/AlertHint` with the `destructive` variant for errors. Always pass both
`title` and `description`.

**JSON/debug data → `CodeBlock`**

Use `CodeBlock` from `@/components/code-block/code-block` for displaying raw JSON. It has a dark code area, a header
with a title, and a copy-to-clipboard button. The header uses `dark:` overrides for its border styling.

#### Status Indicators & Visual Feedback

Follow the emoji-icon + Badge pattern used throughout the codebase for machine states and service health. This gives
immediate visual recognition:

```tsx
// Liveliness with colored circle emoji
🟢 ALIVE (green)    🔴 DEAD (red)    ❓ UNKNOWN (yellow)

// Condition with contextual emoji
✔️ AVAILABLE    🔒 LOCKED    💼 RESERVED    ❓ UNSPECIFIED

// LED state
💡 ON    ❌ OFF
```

For tooltips on status badges, wrap them with shadcn's `Tooltip` + `TooltipTrigger` + `TooltipContent` to show
additional context on hover.

#### Page Layout Patterns

**Login page:** Centered `Card` on a `bg-sidebar` background with logo, form fields, and a full-width submit button.

**Dashboard/list pages:** Vertical stack with `gap-4 md:gap-6` spacing. Can include alerts at the top.

**Detail pages:** Vertical stack of `InfoCollapsible` sections with a simple header showing key identifiers.

#### Links and Interactive Text

Links within the app use `react-router`'s `<Link>` component, styled either as:
- `variant="link"` on a `Button` (in drawers/sheets): `className="text-foreground w-fit px-0 text-left"`
- Plain inline links: `className="underline underline-offset-2 hover:text-primary"`

#### Icons

The project uses **@tabler/icons-react** as the primary icon library (sidebar navigation, loading spinners, code
block copy button, empty states). Some shadcn/ui components use **lucide-react** (alerts). When adding new icons,
prefer `@tabler/icons-react` for consistency with the rest of the app, but `lucide-react` is acceptable within
shadcn components.

### Import Aliases

The `@/` alias maps to `./src/`. Always use it:
```tsx
import { Button } from "@/components/ui/button";
import { useProject } from "@/providers/ProjectProvider";
```

## Adding a New Resource

This is the most common task. Follow these steps in order:

1. **Permissions** — Add permission strings to `src/lib/permissions-util.ts`
2. **List page** — Create `src/pages/api/ResourceName/resource-page.tsx` following the list page pattern
3. **Detail page** — Create `src/pages/api/ResourceName/resource-detail-page.tsx` following the detail page pattern
4. **Table component** — Create `src/components/resource-name/resource-table.tsx` following the table pattern
5. **Info component** — Create `src/components/resource-name/resource-info.tsx` following the detail component pattern
6. **Routes** — Add routes in `src/Router.tsx` with proper handle + permissions
7. **Admin pages** (if applicable) — Repeat for `src/pages/admin/ResourceName/`
8. **Navigation** — Add sidebar entry in the app shell layout

The API service stubs come from `@metal-stack/api/js/metalstack/api/v2/resource_pb` — import the service and use
its `.method.list` and `.method.get` with `useQuery`.

## Tauri Backend

The Rust backend in `src-tauri/src/lib.rs` handles:
- Reading `~/.metal-stack/config.yaml` via `read_cli_config` command
- OAuth login flow via `start_oauth_login` command (opens browser, listens for callback, writes token to config)

When adding Tauri commands:
- Define the function with `#[tauri::command]`
- Register it in `tauri::generate_handler![]` in `run()`
- Call from frontend with `invoke("command_name", { args })`

## Common Pitfalls

- The project uses **bun**, not npm or yarn. Run `bun install` and `bun tauri dev`.
- API types are generated from protobuf — don't hand-write API types; import from `@metal-stack/api`
- ConnectRPC uses `useQuery` from `@connectrpc/connect-query`, not plain `@tanstack/react-query` — the hook
  signatures differ (first arg is the method descriptor, not a query key)
- The `QueryProvider` only renders children when authenticated — components inside it can safely assume auth
- Tailwind v4 uses `@tailwindcss/vite` plugin — no `tailwind.config.js` file exists
- shadcn/ui is configured with `rsc: false` (no React Server Components) and `tsx: true`
