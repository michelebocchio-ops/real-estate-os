# Real Estate OS — Project Brief

Real Estate OS is a unified AI-powered rental ecosystem. Agencies, individual owners, property management companies, and tenants share one platform and see different experiences. It is not an agency-only property management CRM.

This brief follows `AGENTS.md`. Items below are product scope unless a section says they already exist in the application.

## Product vision and problem

Rentals today are split across agencies, private owners, property managers, listing portals, document folders, calendars, and payment tools. The same property is often copied into a second record when an owner asks an agency to publish it. Tenant profiles are rebuilt for every application. Money movement is mixed with the rental contract, so rent, deposits, fees, and payouts are hard to track separately.

Real Estate OS keeps one shared property record and gives each role only the access that role needs. A person reviews applications, shares candidate information only with explicit authorization, and decides disputes. AI helps organise documents, floor plans, and evidence. AI does not reject or rank tenants using protected or sensitive personal characteristics, and it does not close a dispute or release funds on its own.

## Target users and their different needs

| User | What they need |
| --- | --- |
| Real estate agencies and individual agents | Manage authorised properties, rooms, occupancy, listings, visits, virtual tours, and applications. See fees and applications they are authorised to see, not every bank destination. |
| Individual property owners | Register themselves, add a payout destination, register buildings and properties, set availability, publish a listing themselves or through an authorised agency, and see their own financial dashboard. No team layer. |
| Property management companies, building owners, and real estate operating companies | The same owner journey, plus an organisation, team invitations, and assigned permissions. |
| Tenants and renters | Keep one reusable profile, browse published listings and public property information, apply to a property or a room, supply requested documents, sign a contract, pay contractual amounts, check in, and pay recurring rent. They do not see owner payout details. |

## Unified platform concept

One platform. One property record. Role-specific dashboards.

- A property links to one owner and to one or more agencies through explicit permissions.
- Publishing through an agency uses that permission. The property is never copied into a second record to represent the relationship.
- Agencies and owners manage floor plans, rooms, and occupancy. Tenants see only public property information and room availability.
- Sharing a candidate profile or an application requires explicit authorization and an audit trail.

## Main modules and features

These modules are planned. None of them are implemented beyond the static home screen described in `PROGRESS.md`.

- **Identity and organisations.** Accounts for agencies, individual owners, company owners, and tenants. Company accounts belong to an organisation and can invite team members.
- **Properties, floor plans, and rooms.** One shared property, visual occupancy, and room-level availability. Floor-plan AI may detect rooms and dimensions. A person verifies and edits the result before it becomes the interactive model.
- **Listings and applications.** Published listings, a reusable tenant profile, and applications to a property or an individual room.
- **Documents.** After an application, AI may help the agency ask only for relevant documents, organise them, and summarize them for a person to review. Documents stay in private storage.
- **Visits and tours.** Virtual tours, visit scheduling, and calendar integrations for agencies and individual agents.
- **Import and export.** Future listing and document exchange may use APIs, partner integrations, feeds, or CSV. Do not assume an external portal has a public API.
- **Payment OS.** Accounts, methods, mandates, charges, transactions, disputes, refunds, and payouts, through a licensed payment service provider.
- **Rent Collection OS.** The rental contract, what is owed, the rent schedule, check-in, and when a collected payment may be released or held.
- **Financial dashboard.** Expected rent, received payments, overdue payments, fees, and payouts, limited by role.
- **Audit and privacy.** GDPR, data minimization, explicit consent where required, role-based access, Supabase row-level security, and audit logs.

## Workflows

### Tenant

1. Create a reusable profile.
2. Browse published listings and public room availability.
3. Apply to a property or to an individual room.
4. Provide only the documents the agency asks for after the application.
5. If accepted, approve and sign the rental contract digitally.
6. Pay the initial contractual amounts as separate items. The payment service provider runs the protected payment flow.
7. Check in and confirm the property condition with photos and a checklist, or submit a complaint.
8. After the contract is active, pay recurring monthly rent with an authorised SEPA Direct Debit mandate or another method the provider supports.

### Agency and individual agent

1. Work inside an agency account with a role-specific dashboard.
2. Receive explicit permission to act on an owner’s property. Do not duplicate the property.
3. Manage floor plans, rooms, occupancy, listings, visits, and virtual tours for authorised properties.
4. Review applications. Use AI only to request relevant documents, organise them, and summarize them.
5. Share a candidate profile or application with an owner only with explicit authorization. Record the share.
6. A person decides. See authorised fees and applications, not every payout destination.

### Individual owner

1. Register the account.
2. Complete identity verification if the payment provider requires it.
3. Add a payout destination (bank account / IBAN) for rental payouts.
4. Register buildings and properties.
5. Set property and room availability.
6. Publish the listing directly, or authorise an agency to publish the same property record.
7. Use a financial dashboard for expected rent, received payments, overdue payments, fees, and payouts.

### Property management company

The company follows the owner workflow and adds an organisation layer:

1. Register the account and the organisation.
2. Complete company verification if the payment provider requires it.
3. Add the organisation payout destination.
4. Invite team members and assign permissions.
5. Register buildings and properties, set availability, and publish directly or through an authorised agency.
6. Use the organisation financial dashboard.

Onboarding order, when the payment provider requires it: account and organisation registration, identity or company verification, payout destination, building and property registration, team invitations for companies, availability, listing publication, then the financial dashboard.

## Payment and rental collection workflows

Money movement is separate from the rental contract.

- **Payment OS** covers accounts, methods, mandates, charges, transactions, disputes, refunds, and payouts.
- **Rent Collection OS** covers the rental contract, what is owed, the rent schedule, check-in, and when a collected payment may be released or held.

Use a licensed third-party payment service provider, with a marketplace-style integration if the provider offers one. Stripe Connect is a candidate to investigate. The provider is not chosen. The platform must not custody or hold customer funds unless it is authorised to do so.

Keep these as separate financial items. Do not assume one hold or release rule applies to all of them:

- Initial rent
- Security deposit
- Agency fees
- Other contractual amounts

The intended contract funnel, built only when the chosen provider and the agreed legal terms support each step:

1. The rental contract is approved and signed digitally.
2. The initial contractual amounts are collected at signing, as separate items.
3. The provider runs the protected payment flow.
4. The tenant checks in and confirms the property condition with photos and a checklist.
5. The tenant confirms that everything is satisfactory, or submits a complaint.
6. If no complaint arrives, release may happen after 24 hours only where the provider supports that delay and the legal terms allow it.
7. A complaint opens a dispute: payment hold where the provider supports it, evidence, human review, and resolution. A person decides.
8. After the contract is active, recurring monthly rent is collected with an authorised SEPA Direct Debit mandate or another supported method.

A collection can fail or be reversed later. Payment status must represent that. "Submitted" is not "settled". Spanish rules for rental deposits and payments need legal validation before they are implemented.

## MVP scope and future features

### Already in the repository

- A Next.js, React, TypeScript, and Tailwind CSS application.
- A static agency-style dashboard in `src/app/page.tsx` with placeholder numbers and non-working navigation.
- Product rules in `AGENTS.md`, plus this brief, `ARCHITECTURE.md`, `DECISIONS.md`, and `PROGRESS.md`.

### MVP to design and build next

The first product slice should prove the shared property and the three experiences before money movement:

- Role-specific access for an agency, an individual owner, a property-management organisation, and a tenant.
- One property record with rooms, availability, and an explicit agency permission.
- Public listing view for tenants and an application to a property or a room.
- Private document request, upload, and a human review summary.
- Audit log for shares and other sensitive actions.

Payment OS and Rent Collection OS stay specified, and stay unimplemented, until a payment provider is chosen and Spanish rental payment rules are legally validated. Supabase and the OpenAI integration are part of the product direction and are not installed yet.

### Later

- Floor-plan detection that a person must verify and edit.
- Virtual tours, visit scheduling, and calendar integrations.
- Listing and document import/export through APIs, partner feeds, or CSV.
- PSP onboarding, tokenised payout destinations, separate contractual charges, mandates, check-in, disputes, recurring rent, and the financial dashboard.
- Team permissions inside property-management organisations.
