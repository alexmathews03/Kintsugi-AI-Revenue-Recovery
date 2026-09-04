# Kintsugi - 5-Minute Video Pitch Script
**Track 03: AI Revenue Recovery**

Use this exact script while recording your 5-minute demo video. Keep your voice natural, relaxed, and conversational.

---

### [0:00 – 0:45] The Problem & The Big Picture

**What you do on screen:**
- Start on the **Live Recovery Dashboard**.
- Hover your mouse over the top bar showing **"HDFC: Latency Spike (U30)"**.
- Hover over the **"Total Money at Risk"** card showing over ₹1.8 Lakhs.

**What you say:**
> *"Hey everyone! This is Kintsugi, built for the AI Revenue Recovery track.*
>
> *Here is the problem: when people try to pay online in India, a huge number of payments fail. But most of the time, it is not because the customer does not have money.*
>
> *It is usually technical friction: maybe HDFC's server gets slow for 5 minutes during lunch. Maybe someone's monthly subscription tries to charge on the 29th, but their salary does not arrive until the 1st. Or maybe their bank app just timed out.*
>
> *Normally, payment gateways just give up and show a red 'Payment Failed' error. The customer leaves, and businesses lose 20 to 30 percent of their sales.*
>
> *Kintsugi solves this. It listens to payment errors the second they happen, figures out what actually went wrong, and automatically recovers the money."*

---

### [0:45 – 2:00] Running Batch Recovery Live

**What you do on screen:**
- Click the white **"Run AI Batch Recovery"** button in the top header.
- Watch the transaction table rows change from red `AT RISK` to green `RECOVERED`.
- Point your mouse at the **Recovered Revenue** counter climbing up live.
- Point at the **Cumulative Trajectory Graph** showing the green recovery line rising step by step.

**What you say:**
> *"Let's see it work live.*
>
> *Right now on our dashboard, we have over 1.8 Lakh rupees of failed payments sitting in the queue.*
>
> *I am clicking 'Run AI Batch Recovery'. Watch the live feed.*
>
> *In real-time, Kintsugi takes each failed payment and applies the best fix. If a bank server was slow, it switches to a working bank route. If an auto-debit failed at the end of the month, it reschedules it for salary day. If someone dropped out of checkout, it sends them a simple 1-tap WhatsApp link.*
>
> *You can see our Recovered Revenue counter climbing live—now past 1.5 Lakh rupees!*
>
> *And look at our graph below: the green recovery curve climbs in real-time as each payment gets rescued.*
>
> *At the bottom, the breakdown bar shows exactly where the money was saved across UPI, Cards, and WhatsApp links."*

---

### [2:00 – 3:15] The Inspector & The Audit Log

**What you do on screen:**
- Click on any green **`RECOVERED`** row in the table (like a UPI U30 timeout).
- The slide-out inspector opens on the right.
- Scroll through:
  1. The payment details & bank error.
  2. The AI diagnosis and action taken.
  3. The Hinglish WhatsApp message preview.
  4. The timestamped audit log at the bottom.

**What you say:**
> *"Now let's see what happened behind the scenes. I will click on this recovered payment.*
>
> *The inspector explains everything clearly. Here, the customer got an NPCI U30 timeout on HDFC Bank. Instead of asking them to type everything again, Kintsugi automatically routed the payment through a secondary healthy bank switch, and the money went through.*
>
> *For dropped checkouts, it creates friendly WhatsApp messages written in everyday Hinglish—like 'Hey Aarav, your payment was interrupted, click here to finish with 1 tap'.*
>
> *And at the bottom, every single action is permanently recorded with exact timestamps so the finance team has a 100% complete audit log."*

---

### [3:15 – 4:00] Safety Rules & Human FinOps Approval

**What you do on screen:**
- Close the drawer and click on the row marked **`HALTED (DND/POLICY)`** or **`FINOPS GATE`** (the ₹1,20,000 transaction).
- Show the banner explaining why it was halted or escalated.
- Click **"Stopping Rules & Guardrails"** in the left sidebar to show the active rules.

**What you say:**
> *"Now, safety is just as important as recovery. An automated system cannot just spam customers.*
>
> *Notice this row marked 'HALTED'. If a customer replies STOP or is on DND, the AI immediately stops. We also have a hard rule: never send more than 2 messages in 48 hours.*
>
> *And for high-value payments—like this one for 1.2 Lakh rupees—the AI does not touch the money automatically. It prepares the settlement, but pauses at a FinOps approval gate so a real person on the team can review and sign off.*
>
> *Here on the Guardrails tab, teams can adjust these limits anytime, and the system enforces them immediately."*

---

### [4:00 – 4:45] Testing a Bank Outage Live

**What you do on screen:**
- Click back to the **Live Recovery Dashboard**.
- Click the red **"Simulate HDFC Spike"** button in the top bar.
- Point to the red line jumping up on the graph.

**What you say:**
> *"Let's test an unexpected bank outage. I will click 'Simulate HDFC Spike'.*
>
> *Three new high-value failures totaling 75,000 rupees are injected into the queue. Look at the graph: the red line immediately spikes up.*
>
> *Kintsugi flags the spike right away, isolates the degraded bank rail, and starts protecting those transactions from further drops."*

---

### [4:45 – 5:00] Conclusion

**What you do on screen:**
- Show the full dashboard view with the final recovered total and high recovery rate.

**What you say:**
> *"To wrap up: Kintsugi turns dropped transactions back into real revenue. It gives merchants measurable money recovered, zero customer spam, and a complete audit trail.*
>
> *Thank you!"*
