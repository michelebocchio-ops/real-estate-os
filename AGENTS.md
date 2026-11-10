<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Real Estate OS

Real Estate OS is a unified AI-powered rental ecosystem. It is not an agency-only property management CRM.

Three user types share one platform, with different experiences:

- Real estate agencies, including individual agents
- Property owners
- Tenants and renters

## Chosen stack

Keep this stack. Do not replace it with another framework, database, or host.

- Next.js, React, TypeScript, and Tailwind CSS for the application
- Supabase for authentication, Postgres, private storage, and row-level security
- OpenAI Responses API for assistive AI
- GitHub for source control and Vercel for hosting

Supabase and the OpenAI integration are part of the product direction. Do not install them, change the database, or add application code unless the task explicitly asks for that.

## Binding product rules

1. One platform. Agencies, owners, and tenants each get a role-specific experience and dashboard.
2. Agencies and owners can manage properties, floor plans, rooms, and occupancy visually. Tenants see only public property information and room availability.
3. A property is one shared record. It can link to one owner and to one or more agencies through explicit permissions. Never duplicate a property to represent another relationship.
4. Tenants keep a reusable profile, browse published listings, and apply to a property or to an individual room.
5. After an application, AI may help the agency ask only for relevant documents, organize them, and summarize them for a person to review.
6. Agencies and owners may share a candidate profile or an application only with explicit authorization. Every share must be auditable. A person makes the decision.
7. Agencies and individual agents need virtual tours, visit scheduling, and calendar integrations.
8. Future listing and document import/export may use APIs, partner integrations, feeds, or CSV. Do not assume an external portal has a public API.
9. Floor-plan AI may detect rooms and dimensions from an uploaded plan. The user must be able to verify and edit the result before it becomes the interactive property and room model.
10. Privacy and access control are foundational: GDPR, data minimization, explicit consent where required, private document storage, role-based access, Supabase row-level security, and audit logs. AI must not automatically reject or rank tenants using protected or sensitive personal characteristics.

## Owner and property-manager accounts

Owners are not only private individuals. Support two account types:

- Individual property owner
- Property management company, building owner, or real estate operating company

Company accounts belong to an organisation. They can invite team members and assign permissions. An individual owner does not need that team layer.

Onboarding for either type must be able to cover, in this order when the payment provider requires it:

1. Account and organisation registration
2. Identity or company verification required by the payment service provider
3. A payout destination (bank account / IBAN) for rental payouts
4. Building and property registration
5. Team invitations and permissions, for companies
6. Property and room availability
7. Listing publication, by the owner or by an authorised agency
8. A financial dashboard: expected rent, received payments, overdue payments, fees, and payouts

A property stays one shared record. Publishing through an agency uses an explicit permission. Do not copy the property into a second record.

## Payment OS and Rent Collection OS

Money movement is a separate part of the architecture:

- **Payment OS** covers accounts, methods, mandates, charges, transactions, disputes, refunds, and payouts.
- **Rent Collection OS** covers the rental contract, what is owed, the rent schedule, check-in, and when a collected payment may be released or held.

Use a licensed third-party payment service provider (PSP), with a marketplace-style integration if the provider offers one. Stripe Connect is a candidate to investigate. Do not choose a provider until its supported countries, onboarding, fund flows, delayed transfers, disputes, recurring payments, and fees are checked.

The platform must not custody or hold customer funds unless it is authorised to do so. Regulated payment flows stay with the PSP.

Never store raw bank credentials or card numbers in our database. Store only PSP-hosted or tokenised references.

Keep these as separate financial items. Do not assume one hold or release rule applies to all of them:

- Initial rent
- Security deposit
- Agency fees
- Other contractual amounts

SEPA Direct Debit needs a valid mandate. A collection can fail or be reversed later. Payment status must represent that. Do not treat "submitted" as "settled".

Spanish rules for rental deposits and payments need legal validation before they are implemented. Do not invent those rules in code or copy.

## Contract, check-in, and recurring rent

Document and later build this funnel. A step is allowed only when the chosen PSP and the agreed legal terms support it.

1. The rental contract is approved and signed digitally.
2. The initial contractual amounts are collected at signing, as separate items.
3. The PSP runs the protected payment flow.
4. The tenant checks in and confirms the property condition with photos and a checklist.
5. The tenant confirms that everything is satisfactory, or submits a complaint.
6. If no complaint arrives, release may happen after 24 hours only where the PSP supports that delay and the legal terms allow it. Do not assume a 24-hour hold and automatic release exist.
7. A complaint opens a dispute: payment hold where the PSP supports it, evidence, human review, and resolution. A person decides. AI may organise evidence; it must not close a dispute or release funds on its own.
8. After the contract is active, recurring monthly rent is collected with an authorised SEPA Direct Debit mandate or another method the PSP supports.

## Financial records to plan for

These are proposed entities, not a database migration. Do not create them until a schema task explicitly asks for it.

- `payment_accounts` — PSP account for a tenant, owner, organisation, or agency
- `payment_methods` — tokenised method reference, never raw card or bank secrets
- `payment_mandates` — authorisation such as a SEPA mandate, including its status
- `rent_schedules` — what is due, how often, and which separate amount it is
- `rent_payments` — one expected or attempted collection against a schedule or contract item
- `payment_transactions` — PSP charge, failure, or reversal events
- `payout_accounts` — tokenised IBAN or payout destination for an owner or organisation
- `payouts` — money sent onward by the PSP
- `payment_disputes` — complaint, hold, evidence, review, and outcome
- `check_ins` — tenant arrival and condition confirmation
- `check_in_evidence` — photos and checklist items, stored as private files
- `refunds` — money returned through the PSP

Relate them to tenants, properties, rental contracts, owners, agencies, and organisations. Access is role-based, enforced later with Supabase row-level security. Payment actions need an audit log: who did what, to which record, and when.

## Financial guardrails

- Collect only the payment data the PSP and the workflow require.
- Financial screens and actions are limited by role. A tenant does not see owner payout details. An agency sees fees and applications it is authorised to see, not every bank destination.
- Complaints and disputes stay in human review.
- Audit payment-related actions.
- If a PSP feature is unavailable in the relevant country, design the step as unsupported. Do not imitate custody, delayed release, or direct debit inside the application database.
