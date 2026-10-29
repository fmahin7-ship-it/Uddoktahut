# Architecture

**📚 Documentation:** [🏠 README](../README.md) | **🏗️ Architecture** | [🔌 API](./API.md) | [📋 Testing](./TESTING.md) | [🚀 Deployment](./DEPLOYMENT.md)

UddoktaHut's frontend is a **Next.js 16 (App Router) + React 19 + strict TypeScript** app organised as **feature modules**, mirroring the backend's modular monolith (`features/billing` ↔ backend `modules/billing`).

## Folder layout

```
app/                      ROUTES ONLY — thin pages/layouts that compose features
  (main)/                 app shell: login, signup, onboarding, dashboard/*, store/[shopSlug]/*, legal pages
  bn/, en/                landing pages, pre-built per price market: /bn/[market], /en/[market]
  api/ai/stream/route.ts  streams the AI copilot answer from the backend
proxy.ts                  runs on every request (Next 16's name for middleware) — see below

features/                 one folder per business feature
  auth/                   login, signup, OTP, session lookup (session.ts)
  onboarding/             store creation stepper
  products/               dashboard product management
  orders/                 dashboard orders + returns (actions also used by storefront checkout)
  billing/                plan + Stripe checkout
  analytics/              AI copilot chat (streaming, history, session persistence)
  store-settings/         template picker
  storefront/             public store: template registry, cart, checkout
  landing/                marketing site sections + content
  dashboard/              dashboard shell (sidebar, nav, subscription gate)
  legal/                  terms / privacy / refunds layout

shared/                   used by every feature; never imports from features/
  api/                    backend client + response types (see "Talking to the backend")
  providers/              User, Shop, Modal, Stepper contexts; React Query; theme
  ui/                     shadcn/ui components (components.json points here)
  components/             app-wide components (forms, modals, loaders, table helpers)
  lib/ market/ pricing/   pure helpers (cn, store URLs, market detection, price formatting)
  constants/ hooks/ fonts/

i18n/                     next-intl config + locale detection   messages/  bn.json, en.json
__tests__/                Jest + Testing Library (mirrors the folders above)
```

A feature folder typically holds `components/`, `actions.ts` (server actions), `hooks.ts` (React Query), `schema.ts` (zod), `constants.ts` and `types.ts`.

**Rules**
1. `app/` pages only read params, load data and render a feature component.
2. Features talk to each other through their exported actions/components — not each other's internals.
3. `shared/` never imports from `features/`.
4. Server Components by default; `"use client"` only where there is interaction.

## Request flow (`proxy.ts`)

Order matters; each step can end the request:

1. Skip `/_next/*` and `/api/*`.
2. `/` on the main site → **307** to `/bn` or `/en` (cookie → browser language → Bangladesh IP → English).
3. `/bn` or `/en` → rewrite to the pre-built page for the visitor's **price market** (`/en/au`, `/bn/bd`…). Market = signed-in seller's store country, else IP country, else AU. Language never changes the price.
4. `/dashboard*`, `/onboarding` → verify the `accessToken` JWT, apply onboarding redirects, pass `x-user-id` / `x-store-url` to the page.
5. Store subdomain `shop.uddoktahut.com/x` → rewrite to `/store/shop/x`. The address bar keeps the subdomain.

`storeSlugFromHost`, `storePath` and `onboardingRedirect` are pure functions with tests in `__tests__/proxy.test.ts`.

## Talking to the backend (`shared/api`)

| File | Runs in | Used for |
|------|---------|----------|
| `server.ts` → `apiRequest()` | server actions / Server Components | everything authenticated (reads the `accessToken` cookie) |
| `browser.ts` → `browserRequest()` | the browser | login, signup, OTP, onboarding — the backend sets auth cookies on these responses |
| `result.ts` | both | the `Result<T>` type: `{ ok: true, data }` or `{ ok: false, error, status }` |
| `types.ts` | both | backend response shapes (plans, session user, products, orders…) |

**Server actions never throw** — they return a `Result`. Next.js hides the message of errors thrown inside server actions in production, so a thrown "Product limit reached" would reach the user as a generic error. Hooks call `unwrap(result)`, which throws an `ApiError` **in the browser**, so React Query `onError` and `try/catch` see the backend's real message.

```ts
// features/products/actions.ts  ("use server")
export const addProduct = (data) => apiRequest<Product>("/product", { method: "POST", auth: true, body: data });

// features/products/hooks.ts
useMutation({ mutationFn: async (data) => unwrap(await addProduct(data)) });
```

## Storefront templates

`features/storefront/components/templates/registry.tsx` maps a template id (`classic`, `modernDark`, `boutique`) to a `TemplateDefinition` (`features/storefront/types.ts`): a home page plus the same slots in every template — `Header`, `Footer`, `Shop`, `StoreShell`, `ProductCard`, `PrimaryButton`, `StoreCard`, `SectionHeading` — and its colours/typography. Shared pages render `getTemplate(id).ProductCard` etc., so a new template only has to implement the slot props.

The cart lives in `localStorage` per shop (`features/storefront/cart`); entries are validated on read because the user can edit them.

## State

| Data | Where |
|------|-------|
| Signed-in seller + plan | `UserProvider`, filled by the dashboard layout from `GET /subscription/status` |
| Public store + products | `ShopProvider`, filled by `store/[shopSlug]/layout.tsx` (cached 10 s) |
| Dashboard lists (products, orders) | React Query via feature `hooks.ts` |
| Cart | `localStorage` |
| AI chat | `sessionStorage` (last 8 turns sent as history) |

## Types

`tsconfig.json` is `strict` with `noUncheckedIndexedAccess`. Route params use Next's generated `PageProps<"/route">` / `LayoutProps<"/route">` (`npx next typegen`). Run `npm run typecheck`.

## Local development

`.env.local` sets `NEXT_PUBLIC_BACKEND_API`, `JWT_SECRET` (same as the backend, to verify the session cookie) and `DEV_IP_COUNTRY` (stands in for Vercel's IP header). Store subdomains need hosts-file entries such as `127.0.0.1 shop.uddoktahut.local`; `next.config.mjs` lists `*.uddoktahut.local` in `allowedDevOrigins`, which Next 16 requires.
