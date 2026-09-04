# Kintsugi
### Autonomous Revenue Recovery Engine for Payment Degradation
**Track 03 - AI Revenue Recovery**

---

## 1. Overview and What It Solves

Digital commerce and subscription platforms in India lose 20% to 30% of their checkout and recurring gross merchandise value (GMV) to silent payment infrastructure degradation. These losses rarely occur in one clean step:

1. **Issuing Bank and Central Switch Degradation**: Issuing banks frequently encounter upstream microservice latency spikes (such as NPCI U30, U69, 504 Gateway Timeout). Transactions drop silently minutes before formal bank outages are declared.
2. **Recurring e-Mandate Liquidity Timing**: Subscription debits executed between the 28th and 31st often trigger U16 Insufficient Funds due to temporary month-end liquidity dips before salary credits land on the 1st to 5th.
3. **Checkout Abandonment and Invalidated Tokens**: RBI CoFT (Card-on-File Tokenization) cryptogram expiries and 3DS OTP drop-offs lead to lost checkout conversions.
4. **Overdue Commercial Receivables**: High-value B2B invoices sit past Net-15 or Net-30 credit windows without automated settlement reconciliation.

**Kintsugi** is an autonomous revenue recovery agent sitting directly on payment webhook telemetry streams. It ingests raw failure codes, determines the root cause, and executes bounded recovery actions: dynamic rail failover, smart salary-cycle rescheduling, 1-tap localized WhatsApp recovery, and FinOps escalation, all within strict regulatory and anti-harassment guardrails.

---

## 2. Architecture: 4-Stage Autonomous Pipeline

```
Webhook Telemetry Stream
(payment.failed | mandate.halted)
             |
             v
+-----------------------------------------+
| Stage 1: Ingestion & Telemetry Parser   |
| - Validates webhook signature           |
| - Extracts raw NPCI & gateway codes     |
+--------------------+--------------------+
                     |
                     v
+-----------------------------------------+
| Stage 2: Semantic Diagnostic Core       |
| - Sub-100ms error classification        |
| - Distinguishes technical vs funds dip  |
+--------------------+--------------------+
                     |
                     v
+-----------------------------------------+
| Stage 3: Bounded Action Router          |
| - Dynamic switch failover (UPI/Cards)   |
| - Smart retry scheduler (1st-5th cycle) |
| - 1-tap Hinglish WhatsApp payment link  |
+--------------------+--------------------+
                     |
                     v
+-----------------------------------------+
| Stage 4: Safety & Regulatory Gate       |
| - Max 2 touches per 48h (Anti-spam)     |
| - DPDP Act / DND opt-out killswitch     |
| - RBI pre-debit 24h SMS check           |
| - Dual-control FinOps gate for >=₹50k   |
+--------------------+--------------------+
                     |
                     v
       Live Audit Log & GMV Yield
```

---

## 3. Meeting The Bar (Evaluation Criteria)

- **Measured Money Recovered**: Real-time ticker and transaction telemetry feed tracking dropped GMV versus actual GMV recovered across batches of 50+ records.
- **Root Cause Diagnostics**: Explains the technical failure reason (NPCI code, gateway latency, bank switch status) alongside customer context.
- **Compliant Escalation and Stopping Rules**:
  - **Anti-Harassment Cap**: Maximum 2 touches per customer within a 48-hour cooldown window.
  - **DPDP Opt-Out Killswitch**: Immediate halt if consumer replies STOP or is flagged on the National DND registry.
  - **High-Value FinOps Gate**: Transactions >= ₹50,000 generate automated settlement drafts but require dual human controller sign-off.
- **Tamper-Evident Audit Trail**: Every automated decision, regulatory check, and dispatch timestamp is permanently logged in chronological audit records.

---

## 4. What Broke, and How We Got Out

### The Problem
During high-frequency webhook ingestion testing (50+ failures dispatched in rapid sequence), the UI telemetry feed and slide-out inspector suffered from state race conditions. The inspection drawer read stale immutable snapshots when opened during an ongoing batch run, causing diagnostic states to appear hung in "Awaiting AI diagnosis" even though the underlying recovery engine had already processed the transaction. Additionally, batch processing loops were directly triggering visual drawer selection, interrupting real-time monitoring.

### The Solution
1. **Decoupled Derived State**: Replaced direct component selection with a reactive derived lookup (`activeSelectedTx`) bound to the central transactional store by unique order ID. State transitions reflect live updates immediately without race conditions.
2. **Worker Dispatcher Pacing**: Decoupled the batch simulation into a paced asynchronous execution queue with configurable processing intervals (Fast / Normal / Paced) to prevent UI thread lock.
3. **Deterministic State Lifecycle**: Standardized transaction states across deterministic lifecycle phases (`at_risk` -> `diagnosing` -> `recovered` | `stopped_by_policy` | `escalated_to_human`), ensuring audit trail continuity and sub-10ms render cycles.

---

## 5. Repository Structure

```
src/
  types.ts                    # TypeScript schemas (FailedTransaction, Diagnosis, RecoveryAction, AuditLog)
  data/
    syntheticData.ts          # 50+ realistic Indian fintech transaction records (UPI, Mandates, Cards, B2B)
  engine/
    complianceEngine.ts       # Guardrails, stopping rules, frequency caps, and audit logs
    recoveryEngine.ts         # Diagnostic classifier & Hinglish WhatsApp / failover router
  components/
    Navbar.tsx                # Navigation bar with simulation controls & bank gateway health
    BankHealthBar.tsx         # Real-time telemetry status, speed controls & outage simulator
    MetricCards.tsx           # KPI scoreboard (Money at Risk, Recovered, Yield %, Latency)
    RecoveryChart.tsx         # Dynamic trajectory chart (Batch Stream, 1H, 24H, 7D)
    TransactionFeed.tsx       # Filterable live telemetry table with status badges
    AgentDrawer.tsx           # Slide-out inspector (Root cause analysis, WhatsApp preview, Audit trail)
    ArchitectureView.tsx      # Interactive architecture diagram & comparison matrix
    ComplianceMatrixView.tsx  # Regulatory guardrails matrix & dynamic policy parameters
    ManualInjectModal.tsx     # Modal for injecting custom failure edge-cases live
  App.tsx                     # Main application layout & simulation controller
  index.css                   # Core design tokens & typography
```

---

## 6. Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build for production
npm run build
```
