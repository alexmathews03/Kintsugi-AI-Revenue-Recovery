import React, { useState } from 'react';
import { Sliders, Lock } from 'lucide-react';
import { ComplianceConfig } from '../types';

interface ComplianceMatrixViewProps {
  config: ComplianceConfig;
  onUpdateConfig: (newConfig: Partial<ComplianceConfig>) => void;
  stoppedCount: number;
  escalatedCount: number;
}

export const ComplianceMatrixView: React.FC<ComplianceMatrixViewProps> = ({
  config,
  onUpdateConfig,
  stoppedCount,
  escalatedCount
}) => {
  const [maxTouches, setMaxTouches] = useState(config.maxTouchesPerCustomer);
  const [cooldown, setCooldown] = useState(config.cooldownHours);
  const [threshold, setThreshold] = useState(config.highValueEscalationThreshold);

  const handleSave = () => {
    onUpdateConfig({
      maxTouchesPerCustomer: maxTouches,
      cooldownHours: cooldown,
      highValueEscalationThreshold: threshold
    });
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '6px',
    background: '#040405',
    border: '1px solid #27272a',
    color: '#ffffff',
    fontSize: '15px',
    marginTop: '6px',
    outline: 'none',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', background: '#000000', color: '#ffffff', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
      {/* Onboarding Screen Explainer Header */}
      <div style={{ background: '#09090b', border: '1px solid #27272a', padding: '28px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', borderBottom: '1px solid #27272a', paddingBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '8px', background: '#18181b', border: '1px solid #27272a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sliders size={22} color="#10b981" />
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.01em' }}>
                Stopping Rules & Policy Guardrails
              </div>
              <div style={{ fontSize: '18px', color: '#a1a1aa', marginTop: '4px' }}>
                Enforcing RBI 2024 regulations, DPDP DND rules, and human FinOps approval gates
              </div>
            </div>
          </div>
          <span className="font-mono" style={{ fontSize: '14px', background: '#18181b', border: '1px solid #27272a', padding: '6px 14px', color: '#e4e4e7', fontWeight: 700, borderRadius: '6px' }}>
            RBI & DPDP 2024 ENFORCED
          </span>
        </div>

        <p style={{ fontSize: '17px', color: '#e4e4e7', lineHeight: 1.65, margin: 0 }}>
          Every autonomous recovery action is bound by strict compliance guardrails. Test editing thresholds below to watch the AI enforce stopping rules live during simulations.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        
        {/* Guardrail Policy Matrix */}
        <div style={{ background: '#09090b', border: '1px solid #27272a', padding: '28px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #27272a', paddingBottom: '16px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Lock size={20} color="#ffffff" />
              Active Safety Rules
            </h3>
            <span className="font-mono" style={{ fontSize: '14px', color: '#a1a1aa', fontWeight: 700 }}>4 RULES LIVE</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Rule 1 */}
            <div style={{ background: '#040405', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #52525b', borderTop: '1px solid #27272a', borderRight: '1px solid #27272a', borderBottom: '1px solid #27272a' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '19px', fontWeight: 800, color: '#ffffff' }}>Anti-Harassment Nudge Cap</span>
                <span className="font-mono" style={{ fontSize: '13px', background: '#18181b', border: '1px solid #27272a', color: '#e4e4e7', padding: '3px 10px', borderRadius: '4px', fontWeight: 700 }}>ACTIVE</span>
              </div>
              <p style={{ fontSize: '16px', color: '#a1a1aa', marginTop: '8px', lineHeight: 1.55, margin: 0 }}>
                Halts outreach if customer receives &gt;{config.maxTouchesPerCustomer} attempts in {config.cooldownHours} hours. Prevents consumer spam and merchant reputation damage.
              </p>
            </div>

            {/* Rule 2 */}
            <div style={{ background: '#040405', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #52525b', borderTop: '1px solid #27272a', borderRight: '1px solid #27272a', borderBottom: '1px solid #27272a' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '19px', fontWeight: 800, color: '#ffffff' }}>DPDP Act & DND Opt-Out</span>
                <span className="font-mono" style={{ fontSize: '13px', background: '#18181b', border: '1px solid #27272a', color: '#e4e4e7', padding: '3px 10px', borderRadius: '4px', fontWeight: 700 }}>ENFORCED</span>
              </div>
              <p style={{ fontSize: '16px', color: '#a1a1aa', marginTop: '8px', lineHeight: 1.55, margin: 0 }}>
                Instant kill-switch if consumer replies STOP or is flagged on National DND registry. Zero outgoing WhatsApp/SMS touches permitted.
              </p>
            </div>

            {/* Rule 3 */}
            <div style={{ background: '#040405', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #f59e0b', borderTop: '1px solid #27272a', borderRight: '1px solid #27272a', borderBottom: '1px solid #27272a' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '19px', fontWeight: 800, color: '#ffffff' }}>High-Value FinOps Gate</span>
                <span className="font-mono" style={{ fontSize: '13px', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.4)', color: '#fbbf24', padding: '3px 10px', borderRadius: '4px', fontWeight: 700 }}>HUMAN APPROVAL</span>
              </div>
              <p style={{ fontSize: '16px', color: '#a1a1aa', marginTop: '8px', lineHeight: 1.55, margin: 0 }}>
                Transactions &ge;₹{config.highValueEscalationThreshold.toLocaleString('en-IN')} (e.g. enterprise B2B receivables) generate an automated settlement draft but require human controller sign-off.
              </p>
            </div>

            {/* Rule 4 */}
            <div style={{ background: '#040405', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #a855f7', borderTop: '1px solid #27272a', borderRight: '1px solid #27272a', borderBottom: '1px solid #27272a' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '19px', fontWeight: 800, color: '#ffffff' }}>RBI e-Mandate Pre-Debit</span>
                <span className="font-mono" style={{ fontSize: '13px', background: 'rgba(168, 85, 247, 0.12)', border: '1px solid rgba(168, 85, 247, 0.4)', color: '#c4b5fd', padding: '3px 10px', borderRadius: '4px', fontWeight: 700 }}>COMPLIANT</span>
              </div>
              <p style={{ fontSize: '16px', color: '#a1a1aa', marginTop: '8px', lineHeight: 1.55, margin: 0 }}>
                Enforces mandatory 24h pre-debit notification timestamps before scheduling recurring auto-debit retries.
              </p>
            </div>

          </div>
        </div>

        {/* Dynamic Config Controls & Stats */}
        <div style={{ background: '#09090b', border: '1px solid #27272a', padding: '28px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <div style={{ borderBottom: '1px solid #27272a', paddingBottom: '16px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sliders size={20} color="#ffffff" />
              Live Policy Parameter Controller
            </h3>
            <div style={{ fontSize: '16px', color: '#a1a1aa', marginTop: '4px' }}>
              Adjust safety parameters below to test policy behavior
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ fontSize: '16px', color: '#e4e4e7', fontWeight: 700, display: 'block' }}>
                Max Nudges Per Customer (Within Cooldown)
              </label>
              <input
                type="number"
                min={1}
                max={5}
                value={maxTouches}
                onChange={(e) => setMaxTouches(Number(e.target.value))}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ fontSize: '16px', color: '#e4e4e7', fontWeight: 700, display: 'block' }}>
                Cooldown Window (Hours)
              </label>
              <input
                type="number"
                min={12}
                max={168}
                value={cooldown}
                onChange={(e) => setCooldown(Number(e.target.value))}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ fontSize: '16px', color: '#e4e4e7', fontWeight: 700, display: 'block' }}>
                Human FinOps Escalation Threshold (₹ INR)
              </label>
              <input
                type="number"
                step={5000}
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                style={inputStyle}
              />
            </div>

            <button
              onClick={handleSave}
              style={{
                marginTop: '10px',
                justifyContent: 'center',
                padding: '14px',
                borderRadius: '6px',
                fontSize: '15px',
                fontWeight: 800,
                background: '#ffffff',
                color: '#000000',
                border: '1px solid #ffffff',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: 'all 0.15s',
              }}
            >
              Apply Policy Parameters
            </button>

            {/* Live Enforcement Counter Scoreboard */}
            <div style={{ marginTop: '18px', paddingTop: '18px', borderTop: '1px solid #27272a', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ background: '#040405', padding: '20px', borderRadius: '8px', border: '1px solid #27272a' }}>
                <div style={{ fontSize: '15px', color: '#fbbf24', fontWeight: 800, textTransform: 'uppercase' }}>Stopped by Policy</div>
                <div style={{ fontSize: '42px', fontWeight: 900, color: '#fbbf24', marginTop: '6px', lineHeight: 1 }}>{stoppedCount}</div>
                <div style={{ fontSize: '14px', color: '#a1a1aa', marginTop: '6px' }}>DND & Frequency Caps</div>
              </div>
              <div style={{ background: '#040405', padding: '20px', borderRadius: '8px', border: '1px solid #27272a' }}>
                <div style={{ fontSize: '15px', color: '#c4b5fd', fontWeight: 800, textTransform: 'uppercase' }}>Escalated to FinOps</div>
                <div style={{ fontSize: '42px', fontWeight: 900, color: '#c4b5fd', marginTop: '6px', lineHeight: 1 }}>{escalatedCount}</div>
                <div style={{ fontSize: '14px', color: '#a1a1aa', marginTop: '6px' }}>High-Value B2B Gate</div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};


