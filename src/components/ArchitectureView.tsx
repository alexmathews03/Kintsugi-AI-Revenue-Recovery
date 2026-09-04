import React from 'react';
import { Layers, Database, Cpu, GitBranch, CheckCircle2, SlidersHorizontal } from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', background: '#000000', color: '#ffffff', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
      {/* Header */}
      <div style={{ background: '#09090b', border: '1px solid #27272a', padding: '28px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', borderBottom: '1px solid #27272a', paddingBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: '#18181b', border: '1px solid #27272a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Layers size={22} color="#10b981" />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.01em' }}>
                Architecture & System Logic
              </div>
              <div style={{ fontSize: '15px', color: '#a1a1aa', marginTop: '2px' }}>
                How Kintsugi diagnoses payment drop-offs and recovers revenue
              </div>
            </div>
          </div>
          <span className="font-mono" style={{ fontSize: '12px', background: '#18181b', border: '1px solid #27272a', padding: '6px 14px', color: '#e4e4e7', fontWeight: 700, borderRadius: '6px' }}>
            SYSTEM SPECIFICATION
          </span>
        </div>

        <p style={{ fontSize: '15px', color: '#d4d4d8', lineHeight: 1.6, margin: 0 }}>
          Overview of Kintsugi's 4-stage telemetry pipeline and comparison against legacy payment retry mechanisms.
        </p>
      </div>

      {/* 4-Stage Autonomous Recovery Pipeline */}
      <div style={{ background: '#09090b', border: '1px solid #27272a', padding: '28px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #27272a', paddingBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff' }}>
              4-Stage Autonomous Recovery Pipeline
            </h3>
            <div style={{ fontSize: '14px', color: '#a1a1aa', marginTop: '2px' }}>
              From failure webhook ingestion to compliant settlement
            </div>
          </div>
          <span className="font-mono" style={{ fontSize: '12px', background: '#18181b', border: '1px solid #27272a', padding: '5px 12px', color: '#e4e4e7', borderRadius: '6px', fontWeight: 700 }}>
            REAL-TIME MESH
          </span>
        </div>

        {/* Visual Pipeline Grid Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          
          {/* Step 1: Ingestion */}
          <div style={{ background: '#040405', padding: '20px', borderRadius: '8px', border: '1px solid #27272a', borderTop: '3px solid #52525b', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <Database size={20} color="#ffffff" />
                <div>
                  <span className="font-mono" style={{ fontSize: '11px', color: '#71717a', fontWeight: 700 }}>STAGE 01</span>
                  <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>Webhook Ingest</h4>
                </div>
              </div>
              <p style={{ fontSize: '14px', color: '#a1a1aa', lineHeight: 1.5, margin: 0 }}>
                Captures failure webhooks (<code className="font-mono" style={{ color: '#ffffff', background: '#18181b', padding: '2px 5px', borderRadius: '4px', fontSize: '12px' }}>payment.failed</code>) and raw NPCI error packets.
              </p>
            </div>
            <div style={{ marginTop: '16px', padding: '8px 12px', background: '#09090b', border: '1px solid #27272a', borderRadius: '6px', fontSize: '13px', color: '#e4e4e7', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Latency: &lt;15ms</span>
              <CheckCircle2 size={16} color="#10b981" />
            </div>
          </div>

          {/* Step 2: Classifier */}
          <div style={{ background: '#040405', padding: '20px', borderRadius: '8px', border: '1px solid #27272a', borderTop: '3px solid #52525b', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <Cpu size={20} color="#ffffff" />
                <div>
                  <span className="font-mono" style={{ fontSize: '11px', color: '#71717a', fontWeight: 700 }}>STAGE 02</span>
                  <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>Root Cause Diagnosis</h4>
                </div>
              </div>
              <p style={{ fontSize: '14px', color: '#a1a1aa', lineHeight: 1.5, margin: 0 }}>
                Classifies failure telemetry into 4 archetypes: bank degradation, salary timing, 3DS friction, or B2B overdue.
              </p>
            </div>
            <div style={{ marginTop: '16px', padding: '8px 12px', background: '#09090b', border: '1px solid #27272a', borderRadius: '6px', fontSize: '13px', color: '#e4e4e7', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Accuracy: 99.4%</span>
              <CheckCircle2 size={16} color="#10b981" />
            </div>
          </div>

          {/* Step 3: Action Dispatch */}
          <div style={{ background: '#040405', padding: '20px', borderRadius: '8px', border: '1px solid #27272a', borderTop: '3px solid #52525b', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <GitBranch size={20} color="#ffffff" />
                <div>
                  <span className="font-mono" style={{ fontSize: '11px', color: '#71717a', fontWeight: 700 }}>STAGE 03</span>
                  <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>Target Dispatch</h4>
                </div>
              </div>
              <p style={{ fontSize: '14px', color: '#a1a1aa', lineHeight: 1.5, margin: 0 }}>
                Executes optimal fix: secondary bank failover, 1-tap WhatsApp payment link, or scheduled 1st/5th salary retry.
              </p>
            </div>
            <div style={{ marginTop: '16px', padding: '8px 12px', background: '#09090b', border: '1px solid #27272a', borderRadius: '6px', fontSize: '13px', color: '#e4e4e7', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Yield: ~74% Recovered</span>
              <CheckCircle2 size={16} color="#10b981" />
            </div>
          </div>

          {/* Step 4: Guardrail Gate */}
          <div style={{ background: '#040405', padding: '20px', borderRadius: '8px', border: '1px solid #27272a', borderTop: '3px solid #f59e0b', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <SlidersHorizontal size={20} color="#fbbf24" />
                <div>
                  <span className="font-mono" style={{ fontSize: '11px', color: '#fbbf24', fontWeight: 700 }}>STAGE 04</span>
                  <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>Safety Guardrail Gate</h4>
                </div>
              </div>
              <p style={{ fontSize: '14px', color: '#a1a1aa', lineHeight: 1.5, margin: 0 }}>
                Enforces RBI pre-debit rules, max 2 nudges per 48h, DND opt-out registry, and FinOps escalation for &ge;₹50,000.
              </p>
            </div>
            <div style={{ marginTop: '16px', padding: '8px 12px', background: '#09090b', border: '1px solid #27272a', borderRadius: '6px', fontSize: '13px', color: '#fbbf24', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Zero Compliance Faults</span>
              <CheckCircle2 size={16} color="#fbbf24" />
            </div>
          </div>

        </div>
      </div>

      {/* Feature Comparison Table */}
      <div style={{ background: '#09090b', border: '1px solid #27272a', padding: '28px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff' }}>
            Kintsugi vs Legacy Payment Recovery Systems
          </h3>
          <div style={{ fontSize: '14px', color: '#a1a1aa', marginTop: '2px' }}>
            Why semantic root cause analysis outperforms static retry scripts
          </div>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #27272a', color: '#a1a1aa', textAlign: 'left', background: '#040405' }}>
                <th style={{ padding: '14px 18px', fontWeight: 800 }}>CAPABILITY</th>
                <th style={{ padding: '14px 18px', fontWeight: 800 }}>LEGACY DUNNING / RETRIES</th>
                <th style={{ padding: '14px 18px', color: '#34d399', fontWeight: 800 }}>KINTSUGI ENGINE</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: '14px' }}>
              <tr style={{ borderBottom: '1px solid #27272a', background: '#08080a' }}>
                <td style={{ padding: '14px 18px', fontWeight: 800, color: '#ffffff' }}>Failure Diagnosis</td>
                <td style={{ padding: '14px 18px', color: '#a1a1aa' }}>Static HTTP error code matching</td>
                <td style={{ padding: '14px 18px', color: '#ffffff', fontWeight: 700 }}>NPCI payload & switch latency trace parsing</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #27272a' }}>
                <td style={{ padding: '14px 18px', fontWeight: 800, color: '#ffffff' }}>Mandate Auto-Debits</td>
                <td style={{ padding: '14px 18px', color: '#a1a1aa' }}>Blind exponential backoff (causes bank bounce fees)</td>
                <td style={{ padding: '14px 18px', color: '#ffffff', fontWeight: 700 }}>Salary-cycle alignment (1st/5th predictive trigger)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #27272a', background: '#08080a' }}>
                <td style={{ padding: '14px 18px', fontWeight: 800, color: '#ffffff' }}>Customer Outreach</td>
                <td style={{ padding: '14px 18px', color: '#a1a1aa' }}>Generic cold email blasts (&lt;4% open rate)</td>
                <td style={{ padding: '14px 18px', color: '#ffffff', fontWeight: 700 }}>Personalized 1-tap Hinglish WhatsApp payment link</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #27272a' }}>
                <td style={{ padding: '14px 18px', fontWeight: 800, color: '#ffffff' }}>Bank Downtime</td>
                <td style={{ padding: '14px 18px', color: '#a1a1aa' }}>Manual gateway route changes by developers</td>
                <td style={{ padding: '14px 18px', color: '#ffffff', fontWeight: 700 }}>Autonomous failover to healthy secondary switch</td>
              </tr>
              <tr>
                <td style={{ padding: '14px 18px', fontWeight: 800, color: '#ffffff' }}>Safety & Compliance</td>
                <td style={{ padding: '14px 18px', color: '#a1a1aa' }}>Spam risk and regulatory fines</td>
                <td style={{ padding: '14px 18px', color: '#ffffff', fontWeight: 700 }}>Enforced 48h quiet window & FinOps &gt;₹50k escalation</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
