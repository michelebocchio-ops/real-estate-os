# Real Estate OS — Progress

This file records what is already in the project. Planned modules in `PROJECT_BRIEF.md` and `ARCHITECTURE.md` are not implemented here.

## Completed

- **Next.js application created.** The repository is a Next.js app using React, TypeScript, and Tailwind CSS (`package.json`: Next.js 16.4.5, React 19.3.0, Tailwind CSS 4). Scripts exist for `dev`, `build`, `start`, and `lint`.
- **Application running locally.** The app has been run locally with the Next.js development server. A `.next` build output directory is present from that local work.
- **Cursor installed and the project opened.** This repository is open in Cursor at `/Users/michelebocchio/real-estate-os`.
- **Initial dashboard created.** `src/app/page.tsx` renders a static "REAL ESTATE OS" screen labelled "Agency Management". It shows a sidebar (Dashboard, Properties, Applications, Tenants, Owners, Settings), four hardcoded stat cards, an "Add Property" button, and an empty "Recent Properties" panel. The sidebar and button do not navigate or save data. The figures are sample text, not database records.
- **Product scope documented in `AGENTS.md`.** `AGENTS.md` records the unified platform for agencies, individual owners, property management companies, and tenants, the chosen stack, and Payment OS and Rent Collection OS. That file was left unchanged by this documentation pass.
- **Project documentation added.** These files now exist in the project root and follow `AGENTS.md`:
  - `PROJECT_BRIEF.md` — vision, users, workflows, MVP, and later scope.
  - `ARCHITECTURE.md` — current app, proposed data model, roles, payments, AI, and privacy.
  - `DECISIONS.md` — confirmed decisions, why they were made, and open questions.
  - `PROGRESS.md` — this status.

`README.md` is still the default Next.js starter. It was not replaced.

## Not implemented

Do not treat these as done. They are specified only.

- Supabase Auth, Postgres, private storage, and row-level security. The Supabase client is not installed.
- OpenAI Responses API. No AI calls exist.
- Accounts, organisations, team invitations, and role-specific dashboards. The home page is a single static agency-styled placeholder.
- Properties, floor plans, rooms, occupancy, listings, and agency permissions.
- Tenant profiles, applications, document requests, and private files.
- Visit scheduling, virtual tours, and calendar integrations.
- Payment OS, Rent Collection OS, a payment service provider, payout destinations, contracts, check-in, disputes, and recurring rent.
- Audit logs.
- Vercel project configuration and deployment.

## Recommended next steps

1. Keep `AGENTS.md` as the product rule source. Update `DECISIONS.md` and this file when a decision is made or a feature actually lands.
2. Add Supabase only when a task asks for it. Start with Auth and the first role model: agency, individual owner, organisation member, and tenant.
3. Design the first schema task around one property, its owner, rooms, and an explicit agency permission. Do not add the financial tables in that first migration.
4. Replace the static dashboard with real role-specific empty states after auth exists. Until then, leave the placeholder numbers clearly fake.
5. Build the tenant path next: public listing, reusable profile, and an application to a property or a room.
6. Add private document upload and a human review screen. Add the OpenAI summary only after that flow stores documents.
7. Choose a payment service provider only after checking countries, onboarding, fund flows, delayed transfers, disputes, recurring payments, and fees. Get Spanish rental deposit and payment rules validated before any payment step is built.
8. After the provider and the legal terms are known, design Payment OS and Rent Collection OS as separate models, with tokenised references and an audit log.
