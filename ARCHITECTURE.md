# Real Estate OS — Architecture

This document describes the current application and the architecture `AGENTS.md` requires. Proposed pieces are not built. Supabase, the OpenAI API, payment providers, and the database are product direction. They are not installed, and no schema has been created.

## Current technology stack

Keep this stack. Do not replace it with another framework, database, or host.

| Layer | Choice | Status |
| --- | --- | --- |
| Application | Next.js, React, TypeScript, Tailwind CSS | Present. `package.json` has Next.js 16.4.5, React 19.3.0, and Tailwind CSS 4. |
| Auth, database, files, and row-level security | Supabase (Postgres, Auth, private storage, RLS) | Chosen. Not installed. |
| Assistive AI | OpenAI Responses API | Chosen. Not installed. |
| Source control | GitHub | Chosen. |
| Hosting | Vercel | Chosen. Not configured in this repository beyond the Next.js app. |

## Frontend and backend structure

The repository is a single Next.js app. The App Router lives under `src/app/`.

Current files:

- `src/app/layout.tsx` — root layout.
- `src/app/page.tsx` — static dashboard. It renders placeholder counts, a sidebar, and an "Add Property" button. The sidebar is text, not navigation. The numbers are hardcoded.
- `src/app/globals.css` — global styles.
- `public/` — static assets from the Next.js starter.

There is no `src/app/api` route, no server actions for product data, no auth client, and no database client. Backend behaviour is still to be added inside this Next.js app, with Supabase as the system of record for auth, Postgres, private files, and row-level security. The OpenAI Responses API is called from the server when a later task adds assistive AI. Secrets stay on the server.

Role-specific dashboards are a product rule. The current page is an agency-labelled placeholder and is not yet one of those dashboards.

## Proposed database architecture

No tables exist. Do not create them until a schema task explicitly asks for it. The model below is the planned shape.

Core records, implied by the product rules:

- **Users and profiles** for agencies, agents, individual owners, organisation members, and tenants.
- **Organisations** for property management companies, building owners, and real estate operating companies. Individual owners do not need this layer.
- **Memberships and permissions** so a company can invite people and assign what they can do.
- **Properties** as one shared record, linked to one owner (an individual or an organisation).
- **Agency permissions** linking one property to one or more agencies. This is a permission, not a copy of the property.
- **Buildings, floor plans, and rooms** under that single property, including availability and occupancy.
- **Listings** as the published public view of a property or room.
- **Tenant profiles and applications** to a property or to an individual room.
- **Document requests and private files** for application documents and check-in evidence.
- **Share records and audit events** for every authorised share and for payment-related actions: who did what, to which record, and when.
- **Rental contracts** as the agreement Rent Collection OS schedules against.

Financial records to plan for, still not a migration:

- `payment_accounts` — PSP account for a tenant, owner, organisation, or agency.
- `payment_methods` — tokenised method reference, never raw card or bank secrets.
- `payment_mandates` — authorisation such as a SEPA mandate, including its status.
- `rent_schedules` — what is due, how often, and which separate amount it is.
- `rent_payments` — one expected or attempted collection against a schedule or contract item.
- `payment_transactions` — PSP charge, failure, or reversal events.
- `payout_accounts` — tokenised IBAN or payout destination for an owner or organisation.
- `payouts` — money sent onward by the PSP.
- `payment_disputes` — complaint, hold, evidence, review, and outcome.
- `check_ins` — tenant arrival and condition confirmation.
- `check_in_evidence` — photos and checklist items, stored as private files.
- `refunds` — money returned through the PSP.

Relate financial records to tenants, properties, rental contracts, owners, agencies, and organisations. Initial rent, security deposit, agency fees, and other contractual amounts stay separate items.

## Authentication, roles, and permissions

Supabase Auth is the planned authentication system. It is not wired up.

Planned roles:

- Agency member, including an individual agent.
- Individual property owner.
- Organisation member of a property management company, with permissions assigned inside that organisation.
- Tenant.

Access is role-based and record-based. A tenant sees public property information, their own profile, their applications, their documents, and their own payments. An agency sees properties, fees, and applications it is authorised to see. An owner sees their properties and their payout information. A tenant does not see owner payout details.

Company accounts can invite team members. An individual owner account does not get that team layer.

## Property sharing between owners and agencies

A property has one owner. An owner can grant one or more agencies an explicit permission to manage or publish it. The agency works on the same record. Listing publication is done by the owner or by an authorised agency. Removing or changing that permission changes what the agency can do. It does not create or merge a duplicate property.

## Tenant applications and document workflows

A tenant keeps one reusable profile and applies to a property or to an individual room. After the application, the agency may ask only for documents that are relevant to that application. Files go to private storage. AI may organise those files and summarize them. A person reviews the summary and makes the decision.

An agency or owner may share a candidate profile or an application only with explicit authorization. Every share is auditable.

## Payment OS and Rent Collection OS

These are separate parts of the architecture.

- **Payment OS** covers accounts, methods, mandates, charges, transactions, disputes, refunds, and payouts.
- **Rent Collection OS** covers the rental contract, what is owed, the rent schedule, check-in, and when a collected payment may be released or held.

Use a licensed third-party payment service provider (PSP), with a marketplace-style integration if that provider offers one. Stripe Connect is a candidate to investigate. Do not choose a provider until its supported countries, onboarding, fund flows, delayed transfers, disputes, recurring payments, and fees are checked.

The platform must not custody or hold customer funds unless it is authorised to do so. Regulated payment flows stay with the PSP. The database stores PSP-hosted or tokenised references, never raw bank credentials or card numbers.

SEPA Direct Debit needs a valid mandate. Status must distinguish submitted, settled, failed, and reversed. A later reversal is still a real payment state.

The contract funnel is documented in `AGENTS.md` and `PROJECT_BRIEF.md`. A step is allowed only when the chosen PSP and the agreed legal terms support it. If a PSP feature is unavailable in the relevant country, that step is unsupported. Do not imitate custody, delayed release, or direct debit inside the application database. A 24-hour hold and automatic release are not assumed. Complaints stay in human review. AI may organise dispute evidence and must not close a dispute or release funds.

Spanish rules for rental deposits and payments need legal validation before they are implemented.

## AI architecture and integrations

AI is assistive. Planned uses, none of them built:

- Ask only for documents relevant to an application, then organise and summarize them for a person.
- Detect rooms and dimensions from an uploaded floor plan. The user verifies and edits the result before it becomes the property and room model.
- Organise check-in and dispute evidence for a person to review.

The planned interface is the OpenAI Responses API, called from the server. AI must not automatically reject or rank tenants using protected or sensitive personal characteristics.

Other integrations to plan later, without assuming a public API:

- Calendar integrations for visit scheduling.
- Virtual tours.
- Listing and document import/export through partner APIs, feeds, or CSV.

## Security, GDPR, and Supabase RLS

Privacy and access control are foundational.

- Data minimization: collect only what the workflow and the PSP require.
- Explicit consent where the law requires it.
- Private document storage for application files and check-in evidence.
- Role-based access enforced in the database with Supabase row-level security when the schema exists. Application checks are not a substitute for RLS.
- Audit logs for shares, permission changes, and payment-related actions.
- No raw card numbers or bank credentials in Postgres.
- Financial screens are limited by role.
- Human decision on applications, shares, disputes, and fund release.

RLS policies, storage buckets, and auth hooks do not exist yet. They are part of the schema task, not of this document.
