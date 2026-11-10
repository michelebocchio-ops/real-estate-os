# Real Estate OS — Decisions

Confirmed decisions come from `AGENTS.md` and the current repository. Open questions are not decided. Do not treat an open question as a rule.

## Confirmed decisions

### 1. One rental platform, not an agency CRM

**Decision.** Real Estate OS is a unified platform for real estate agencies (including individual agents), property owners, and tenants. Each role gets its own experience and dashboard.

**Why.** The product has to serve the whole rental relationship. An agency-only CRM would leave owners and tenants outside the system and would encourage copied records.

### 2. Two kinds of owner account

**Decision.** Support an individual property owner and a company account for a property management company, building owner, or real estate operating company. Company accounts belong to an organisation, invite team members, and assign permissions. An individual owner does not get that team layer.

**Why.** Owners are not only private individuals. A company needs staff and permissions. A private owner should not have to administer a team.

### 3. One shared property record

**Decision.** A property is one record. It links to one owner and to one or more agencies through explicit permissions. Publishing through an agency uses that permission. Never duplicate a property to represent another relationship.

**Why.** Duplicates drift apart: availability, documents, and applications stop matching the real unit. Permissions express the relationship without a second property.

### 4. Tenants apply with a reusable profile

**Decision.** Tenants keep one profile, browse published listings, and apply to a property or to an individual room. They see public property information and room availability, not the management workspace.

**Why.** Repeating the same identity and documents for every listing wastes data and increases exposure. Room-level applications match how shared homes are actually rented.

### 5. People decide applications, shares, and disputes

**Decision.** AI may ask only for relevant documents, organise them, and summarize them. Agencies and owners share a candidate profile or an application only with explicit authorization, and every share is auditable. A person makes the decision. AI must not reject or rank tenants using protected or sensitive personal characteristics. AI must not close a dispute or release funds.

**Why.** Hiring and housing decisions, and the movement of money, need a responsible person. AI is there to reduce paperwork, not to become the decision-maker.

### 6. Floor-plan detection stays editable

**Decision.** Floor-plan AI may detect rooms and dimensions. The user must verify and edit the result before it becomes the interactive property and room model.

**Why.** A wrong room or dimension becomes the occupancy and listing model. Automatic acceptance would publish bad data.

### 7. Chosen stack

**Decision.** Next.js, React, TypeScript, and Tailwind CSS for the application. Supabase for authentication, Postgres, private storage, and row-level security. OpenAI Responses API for assistive AI. GitHub for source control and Vercel for hosting.

**Why.** The stack is already chosen for this product. Replacing the framework, database, or host would split the project. Supabase and OpenAI are direction, not a licence to install them or change the database until a task explicitly asks for that.

### 8. Payment OS and Rent Collection OS are separate

**Decision.** Payment OS covers accounts, methods, mandates, charges, transactions, disputes, refunds, and payouts. Rent Collection OS covers the rental contract, what is owed, the rent schedule, check-in, and when a collected payment may be released or held.

**Why.** The contract says what is owed and when it may be released. The payment provider moves the money. Mixing them hides failed collections, reversals, and disputes.

### 9. A licensed PSP moves the money

**Decision.** Use a licensed third-party payment service provider, with a marketplace-style integration if the provider offers one. The platform must not custody or hold customer funds unless it is authorised to do so. Store only PSP-hosted or tokenised references, never raw bank credentials or card numbers. If a provider feature is unavailable in the relevant country, mark that step unsupported. Do not imitate custody, delayed release, or direct debit in the application database.

**Why.** Holding customer funds and storing raw payment secrets are regulated activities. Pretending those flows exist in Postgres would be inaccurate and unsafe.

### 10. Contractual amounts stay separate

**Decision.** Initial rent, security deposit, agency fees, and other contractual amounts are separate financial items. Do not assume one hold or release rule applies to all of them.

**Why.** These amounts have different purposes, payees, and legal treatment. One balance would make payouts and disputes ambiguous.

### 11. Payment status includes failure and reversal

**Decision.** SEPA Direct Debit requires a valid mandate. A collection can fail or be reversed later. Status must show that. "Submitted" is not "settled".

**Why.** Treating a submitted debit as collected money overstates what the owner has received.

### 12. The contract funnel is specified, not assumed to be available

**Decision.** The funnel is: digital signature, collection of separate initial amounts, the PSP payment flow, check-in with photos and a checklist, confirmation or complaint, possible delayed release only where the PSP and the legal terms allow it, human dispute resolution, then recurring rent by SEPA Direct Debit or another method the PSP supports. Build a step only when the chosen PSP and the agreed legal terms support it. Do not assume a 24-hour hold and automatic release exist.

**Why.** Provider capabilities and the law decide whether a hold, a delay, or a direct debit is real. Documenting the funnel avoids inventing it in code.

### 13. Financial tables are a plan, not a migration

**Decision.** `payment_accounts`, `payment_methods`, `payment_mandates`, `rent_schedules`, `rent_payments`, `payment_transactions`, `payout_accounts`, `payouts`, `payment_disputes`, `check_ins`, `check_in_evidence`, and `refunds` are proposed entities. Do not create them until a schema task explicitly asks for it. Payment actions need an audit log.

**Why.** Naming the records early keeps later schema work aligned. Creating empty tables now would pretend the payment system exists.

### 14. External portals are not assumed to have a public API

**Decision.** Future listing and document import/export may use APIs, partner integrations, feeds, or CSV.

**Why.** Many portals do not offer a public API. The product should not depend on one that has not been confirmed.

### 15. Spanish rental payment rules are not invented

**Decision.** Spanish rules for rental deposits and payments need legal validation before they are implemented. Do not invent those rules in code or copy.

**Why.** Deposit handling and payment timing are legal questions. A plausible rule in the product would still be the wrong rule.

### 16. The current app is a starter plus a static dashboard

**Decision.** The running application is the Next.js starter plus the placeholder dashboard in `src/app/page.tsx`. That screen is not an implemented agency product.

**Why.** The page shows hardcoded sample numbers and labels. Treating it as live data would mislead the next build step.

## Open questions

These are unresolved. They are recorded so they are not silently treated as decisions.

| Question | What is already fixed while it stays open |
| --- | --- |
| Which PSP, and does it support the target countries, onboarding, marketplace fund flows, delayed transfers, disputes, recurring payments, and the fee model? Stripe Connect is only a candidate. | No provider is integrated. No custody inside the app. |
| Do Spanish law and the chosen PSP allow a delayed release, a 24-hour window, deposit holding, or SEPA Direct Debit for these rental amounts? | Those steps stay unsupported until both the provider and the legal terms allow them. |
| What exact consent, retention, and data-minimization rules apply to tenant documents and identity checks? | GDPR, minimization, explicit consent where required, private storage, and RLS remain required. The legal text is not written. |
| How should organisation permissions be named (owner admin, property manager, finance, publishing)? | Companies can invite members and assign permissions. The permission catalogue is not defined. |
| Which calendar and virtual-tour providers will be used? | Agencies and agents need visits, tours, and calendar integrations. No vendor is selected. |
| Which listing feeds or CSV formats matter first? | Import/export is future work. No portal API is assumed. |
| When should Supabase and the OpenAI SDK be added, and what is the first schema? | Both are chosen. Neither is installed. Tables wait for an explicit schema task. |
