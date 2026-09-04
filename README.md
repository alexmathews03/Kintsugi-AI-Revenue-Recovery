# Kintsugi — Autonomous Revenue Recovery Engine
**Razorpay Buildathon — Track 03: AI Revenue Recovery**

Kintsugi monitors live Indian payment telemetry streams, diagnoses payment degradation at the bank switch and consumer level, and executes bounded recovery workflows to rescue dropped GMV without regulatory drift.

---

## Architecture

```
Webhook Telemetry Stream
(payment.failed · mandate.halted · checkout.abandoned)
                    │
                    ▼
┌────────────────────────────────────────────────────────┐
│             Stage 1: Telemetry Parser                  │
│  Webhook signature check · raw NPCI error extraction   │
│  Issuing bank & payment rail metadata enrichment       │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│        Stage 2: Semantic Diagnostic Engine             │
│  Sub-100ms classification · failure root-cause analysis│
│  Technical degradation vs. consumer liquidity timing   │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│          Stage 3: Bounded Action Router                │
│  Dynamic switch failover · salary-cycle sequencer      │
│  1-tap localized Hinglish WhatsApp recovery links      │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│          Stage 4: Regulatory & Safety Gate             │
│  Anti-harassment cap (<= 2 touches / 48h)              │
│  DPDP DND opt-out killswitch · RBI pre-debit checks    │
│  High-value FinOps dual-approval gate (>= Rs. 50,000)  │
└───────────────────────────┬────────────────────────────┘
                            │
              ┌─────────────┴─────────────┐
              ▼                           ▼
     Live Telemetry Feed        Dynamic Recovery Chart
     (Audit trail per txn)      (Real-time GMV trajectory)
```

---

## Core Recovery Interventions

| Failure Vector | Telemetry Trigger | Autonomous Intervention | Safety Guardrail |
|---|---|---|---|
| **Bank Switch Outage** | NPCI U30 / U69 latency spike | Dynamic switch failover to alternate healthy rail | Pre-retry authorization verification |
| **Subscription Timing** | NPCI U16 Insufficient Funds | Salary-cycle reschedule (auto-retry on 1st–5th) | RBI mandatory 24h pre-debit notice check |
| **Checkout Abandonment** | 3DS drop / Expired CoFT token | 1-tap Hinglish WhatsApp payment link | Max 2 touches per 48h; instant DND killswitch |
| **Overdue B2B Invoice** | Smart Collect overdue >Net-15 | Automated settlement reconciliation draft | Dual-control FinOps gate for >= Rs. 50,000 |

---

## Meeting "The Bar" (Evaluation Criteria)

| Requirement | Implementation in Kintsugi |
|---|---|
| **Measured Money Recovered** | Live telemetry tracking total dropped GMV vs. recovered GMV across 50+ batch records |
| **Explainable Root Cause** | Exact NPCI error codes, bank latency context, and failure archetype surfaced in the inspector |
| **Stopping Rules** | Maximum 2 touches per 48 hours; immediate outreach termination on STOP / DND response |
| **Compliant Escalation** | High-ticket transactions (>= Rs. 50,000) pause at a FinOps dual-control approval gate |
| **Audit Trail** | Permanent, timestamped chronological log for every decision, guardrail check, and dispatch |

---

## What Broke, and How We Got Out

### 01 · Static Math Curve ➔ Dynamic Transaction Slicing

```
[The Glitch]  Recovery chart computed points using a fixed curve: (total × ratio^1.3)
      │
      ├──> Symptom:  Graph line shape was identical on every load; detached from transactions
      │
      ▼
[The Fix]     Rewrote engine to compute points directly from live transactional state slices
      │
      ├──> Live Climb  ➔ Green recovery line dynamically rises as each payment clears
      ├──> Outage Jump ➔ Red risk curve shoots up +₹75,350 instantly on HDFC switch spike
      └──> Safety Halt ➔ Green line visibly plateaus when high-value FinOps gates trigger
```

### 02 · Telemetry Stream Race Conditions ➔ Decoupled Reactive State

```
[The Glitch]  50+ failure webhooks ingested in rapid sequence triggered React state collisions
      │
      ├──> Symptom:  Slide-out inspector showed stale snapshots ("Awaiting AI") on recovered rows
      │
      ▼
[The Fix]     Decoupled telemetry stream from UI selection via derived reactive lookup
      │
      ├──> Zero De-sync ➔ activeSelectedTx resolves reactively by order ID across batch mutations
      ├──> Paced Queue  ➔ Added 3 execution speeds (Fast 200ms · Normal 700ms · Paced 1.6s)
      └──> Determinism  ➔ Atomic lifecycle guards (at_risk ➔ diagnosing ➔ recovered | halted)
```

---

## Key Features

- **Live Telemetry Stream**: Real-time webhook ingestion table with search, rail filtering, and status badges.
- **Dynamic Trajectory Graph**: Area chart tracking GMV at risk vs. recovered revenue across Batch Stream, 1H, 24H, and 7D views.
- **Slide-out Audit Inspector**: Deep-dive into root cause diagnostics, Hinglish WhatsApp previews, and timestamped audit logs.
- **Simulation Speed Controller**: Toggle between Fast (200ms), Normal (700ms), and Paced (1.6s) simulation, with single-step debugging.
- **Outage Spike Trigger**: One-click simulation of HDFC central switch degradation (injecting Rs. 75,350 at risk).
- **Interactive Guardrail Matrix**: Live sliders to test policy thresholds and verify autonomous halts in real time.

---

## Future Roadmap

- **ML Liquidity Predictor**: Train light gradient-boosted trees on historical recurring debit traces to predict individual consumer salary replenishment windows instead of calendar rules.
- **Native UPI In-App Intent**: Expand 1-tap WhatsApp recovery into deep-links opening installed UPI apps (GPay, PhonePe, Paytm) directly without web browser redirects.
- **Proactive NPCI Outage Parsing**: Integrate LLM scrapers on bank status feeds and NPCI downtime circulars to reroute gateway traffic *before* payments drop.
- **Automated ERP Ledger Clearance**: Two-way webhooks for enterprise accounting software (Tally, Zoho Books) to reconcile recovered B2B invoices automatically.

---

## Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build production bundle
npm run build
```

---

## Project Structure

```
kintsugi/
├── src/
│   ├── engine/
│   │   ├── recoveryEngine.ts       # Diagnostic classifier & recovery intervention router
│   │   └── complianceEngine.ts     # RBI guardrails, stopping rules & audit trails
│   ├── components/
│   │   ├── Navbar.tsx              # Top bar, bank gateway health & simulation controls
│   │   ├── BankHealthBar.tsx       # Live status, speed controller & outage spike trigger
│   │   ├── MetricCards.tsx         # Real-time GMV scoreboard & processing latency
│   │   ├── RecoveryChart.tsx       # Dynamic trajectory chart (Batch, 1H, 24H, 7D)
│   │   ├── TransactionFeed.tsx     # Telemetry table with status badges & filter controls
│   │   ├── AgentDrawer.tsx         # Slide-out inspector (Root cause, WhatsApp copy, Audit log)
│   │   ├── ArchitectureView.tsx    # 4-stage pipeline architecture & system comparison
│   │   ├── ComplianceMatrixView.tsx# Guardrail parameter controller & compliance matrix
│   │   └── ManualInjectModal.tsx   # Custom payment failure injection modal
│   ├── data/
│   │   └── syntheticData.ts        # 50+ realistic Indian payment failure records
│   ├── types.ts                    # Core TypeScript interfaces & schemas
│   ├── App.tsx                     # Main layout & simulation state controller
│   └── index.css                   # Design tokens & typography
├── DEMO_SCRIPT.md                  # 5-minute video presentation script
└── package.json
```
