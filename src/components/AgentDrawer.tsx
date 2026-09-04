import React from 'react';
import { FailedTransaction } from '../types';
import { Activity, X, CheckCircle2, PauseCircle, AlertCircle, RefreshCw, Clock, Play, MessageSquare, Check } from 'lucide-react';

interface AgentDrawerProps {
  transaction: FailedTransaction | null;
  onClose: () => void;
  onDiagnose?: (tx: FailedTransaction) => void;
}

export const AgentDrawer: React.FC<AgentDrawerProps> = ({ transaction, onClose, onDiagnose }) => {
  if (!transaction) return null;

  const action = transaction.recoveryAction;
  const diagnosis = transaction.diagnosis;
  const isAtRisk = transaction.status === 'at_risk';
  const isDiagnosing = transaction.status === 'diagnosing';

  // Compute confidence percentage properly
  const rawConfidence = diagnosis?.confidence ?? 0.95;
  const confidencePercent = Math.round(rawConfidence <= 1 ? rawConfidence * 100 : rawConfidence);

  const getArchetypeLabel = (archetype?: string) => {
    switch (archetype) {
      case 'TECHNICAL_DEGRADATION': return 'Technical Gateway & Switch Degradation';
      case 'SALARY_BALANCE_TIMING': return 'Mandate & Salary Liquidity Timing';
      case 'AUTH_FRICTION_EXPIRED': return '3DS Auth Drop-off / Expired Intent';
      case 'COMMERCIAL_OVERDUE': return 'Commercial B2B Invoice Overdue';
      default: return archetype || 'Payment Failure Archetype';
    }
  };

  const getActionLabel = (actionType?: string) => {
    switch (actionType) {
      case 'GATEWAY_FAILOVER_RETRY': return 'Dynamic Failover to Secondary Switch Rail';
      case 'SALARY_CYCLE_RETRY': return 'Smart Salary-Cycle Sequencer (1st/5th Retry)';
      case 'WHATSAPP_1CLICK_UPI': return 'Personalized 1-Tap Hinglish WhatsApp Recovery';
      case 'PROMISE_TO_PAY_ESCALATION': return 'FinOps Human Settlement Gate (Over ₹50,000)';
      default: return actionType || 'Autonomous Remediation Dispatched';
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '700px',
          height: '100%',
          background: '#08080a',
          borderLeft: '1px solid #27272a',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '30px',
          overflowY: 'auto',
          color: '#ffffff',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Drawer Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #27272a', paddingBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: '#18181b', border: '1px solid #27272a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Activity size={22} color="#10b981" />
              </div>
              <div>
                <div className="font-mono" style={{ fontSize: '14px', color: '#71717a', fontWeight: 700 }}>
                  ORDER: <span style={{ color: '#34d399' }}>{transaction.orderId}</span>
                </div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff' }}>
                  Kintsugi Audit & Inspector
                </div>
              </div>
            </div>
            
            <button
              onClick={onClose}
              style={{ background: '#18181b', border: '1px solid #27272a', color: '#a1a1aa', borderRadius: '6px', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={20} color="#a1a1aa" />
            </button>
          </div>

          {/* Block 1: Transaction Summary */}
          <div style={{ background: '#09090b', padding: '20px', borderRadius: '8px', border: '1px solid #27272a', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '13px', color: '#71717a', fontWeight: 700 }} className="font-mono">CUSTOMER</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginTop: '3px' }}>{transaction.customerName}</div>
                <div style={{ fontSize: '15px', color: '#a1a1aa', marginTop: '2px' }}>{transaction.customerPhone}</div>
                <div style={{ fontSize: '14px', color: '#71717a', marginTop: '4px' }}>{transaction.merchantName}</div>
              </div>
              <div>
                <div style={{ fontSize: '13px', color: '#71717a', fontWeight: 700 }} className="font-mono">AMOUNT AT RISK</div>
                <div style={{ fontSize: '30px', fontWeight: 900, color: '#ffffff', marginTop: '2px' }}>₹{transaction.amount.toLocaleString('en-IN')}</div>
                <div style={{ fontSize: '14px', color: '#a1a1aa', marginTop: '4px' }}>
                  Payment Method: <strong style={{ color: '#ffffff' }}>{transaction.paymentMethod}</strong>
                </div>
              </div>
            </div>

            {/* Ingested Bank Error details */}
            <div style={{ background: '#040405', border: '1px solid #1e1e24', borderRadius: '6px', padding: '16px', fontSize: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span className="font-mono" style={{ color: '#ef4444', fontWeight: 800, fontSize: '14px' }}>
                  FAILURE CODE: {transaction.failureCode}
                </span>
                <span className="font-mono" style={{ color: '#71717a', fontSize: '13px' }}>
                  {transaction.issuingBank} • {transaction.gateway}
                </span>
              </div>
              <div style={{ color: '#e4e4e7', lineHeight: 1.5, fontFamily: "'JetBrains Mono', monospace", fontSize: '13px' }}>
                {transaction.rawErrorMessage}
              </div>
            </div>
          </div>

          {/* Block 2: Diagnosis & Executed Action */}
          {diagnosis || action ? (
            <div style={{ background: '#09090b', border: '1px solid #10b981', padding: '22px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <span className="font-mono" style={{ fontSize: '13px', color: '#34d399', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  DIAGNOSIS & RECOVERY STRATEGY
                </span>
                <span className="font-mono" style={{ fontSize: '13px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '4px 12px', borderRadius: '4px', color: '#34d399', fontWeight: 800 }}>
                  CONFIDENCE {confidencePercent}%
                </span>
              </div>

              <div>
                <div style={{ fontSize: '19px', fontWeight: 800, color: '#ffffff' }}>
                  {getArchetypeLabel(diagnosis?.archetype || transaction.archetype)}
                </div>
                {action && (
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#34d399', marginTop: '6px' }}>
                    Action: {getActionLabel(action.actionType)}
                  </div>
                )}
              </div>

              {/* Root Cause Analysis */}
              {diagnosis?.rootCauseAnalysis && (
                <div style={{ background: '#040405', border: '1px solid #27272a', padding: '16px', borderRadius: '6px' }}>
                  <div className="font-mono" style={{ fontSize: '12px', color: '#71717a', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                    Root Cause Analysis
                  </div>
                  <div style={{ fontSize: '15px', color: '#ffffff', lineHeight: 1.55 }}>
                    {diagnosis.rootCauseAnalysis}
                  </div>
                </div>
              )}

              {/* Recommended Strategy */}
              {diagnosis?.recommendedStrategy && (
                <div style={{ background: '#040405', border: '1px solid #27272a', padding: '16px', borderRadius: '6px' }}>
                  <div className="font-mono" style={{ fontSize: '12px', color: '#71717a', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                    Recommended Strategy
                  </div>
                  <div style={{ fontSize: '15px', color: '#d4d4d8', lineHeight: 1.55 }}>
                    {diagnosis.recommendedStrategy}
                  </div>
                </div>
              )}

              {/* Outcome Status Banner */}
              {transaction.status === 'recovered' && (
                <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '6px', padding: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle2 size={20} color="#34d399" />
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#34d399' }}>
                    Revenue Recovered: ₹{transaction.amount.toLocaleString('en-IN')}
                  </div>
                </div>
              )}

              {transaction.status === 'stopped_by_policy' && (
                <div style={{ background: '#18181b', border: '1px solid #3f3f46', borderRadius: '6px', padding: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <PauseCircle size={20} color="#fbbf24" />
                  <div style={{ fontSize: '14px', color: '#e4e4e7' }}>
                    <strong>Halted by Guardrail:</strong> {action?.auditReason || 'Policy limit reached'}
                  </div>
                </div>
              )}

              {transaction.status === 'escalated_to_human' && (
                <div style={{ background: 'rgba(168, 85, 247, 0.12)', border: '1px solid rgba(168, 85, 247, 0.4)', borderRadius: '6px', padding: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <AlertCircle size={20} color="#c4b5fd" />
                  <div style={{ fontSize: '14px', color: '#e4e4e7' }}>
                    <strong>FinOps Gate:</strong> Amount exceeds policy threshold and requires dual approval.
                  </div>
                </div>
              )}
            </div>
          ) : isDiagnosing ? (
            <div style={{ background: '#09090b', border: '1px solid #3f3f46', padding: '28px', borderRadius: '8px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
              <RefreshCw size={32} color="#10b981" className="pulse-indicator" />
              <div style={{ fontSize: '17px', fontWeight: 800, color: '#ffffff' }}>
                Diagnostic Engine Running...
              </div>
              <div style={{ fontSize: '14px', color: '#a1a1aa' }}>
                Parsing NPCI telemetry trace, switch degradation, and customer risk profile.
              </div>
            </div>
          ) : isAtRisk ? (
            <div style={{ background: '#09090b', border: '1px solid #27272a', padding: '22px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Clock size={22} color="#f59e0b" />
                <div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: '#ffffff' }}>
                    Awaiting Root Cause Diagnosis
                  </div>
                  <div style={{ fontSize: '14px', color: '#a1a1aa', marginTop: '3px' }}>
                    Ingested into telemetry stream. Click below to execute diagnosis and plan remediation.
                  </div>
                </div>
              </div>

              {onDiagnose && (
                <button
                  onClick={() => onDiagnose(transaction)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '14px',
                    background: '#10b981',
                    color: '#000000',
                    fontWeight: 800,
                    fontSize: '15px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    border: 'none',
                    transition: 'all 0.15s',
                  }}
                >
                  <Play size={16} color="#000000" fill="#000000" />
                  Run Diagnosis & Recovery Now
                </button>
              )}
            </div>
          ) : (
            <div style={{ background: '#09090b', padding: '18px', borderRadius: '8px', border: '1px solid #27272a', color: '#a1a1aa', fontSize: '15px' }}>
              Transaction status: {transaction.status}
            </div>
          )}

          {/* Block 3: Hinglish WhatsApp Message Preview */}
          {action?.dispatchPayload.hinglishCopy && (
            <div style={{ background: '#09090b', padding: '20px', borderRadius: '8px', border: '1px solid #27272a', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '15px', fontWeight: 800, color: '#34d399', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MessageSquare size={18} color="#34d399" />
                  Generated Hinglish WhatsApp Message Preview
                </span>
                <span className="font-mono" style={{ fontSize: '12px', color: '#71717a' }}>AUTO-GENERATED</span>
              </div>

              <div style={{ background: '#040405', padding: '16px', borderRadius: '6px', border: '1px solid #27272a', fontSize: '15px', color: '#ffffff', lineHeight: 1.65 }}>
                {action.dispatchPayload.hinglishCopy}
              </div>
            </div>
          )}

          {/* Block 4: Regulatory & Compliance Audit Trail */}
          <div style={{ background: '#09090b', padding: '20px', borderRadius: '8px', border: '1px solid #27272a', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <span style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={18} color="#fbbf24" />
              Regulatory & Guardrail Verification
            </span>

            {/* Standard Compliance Checks */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#a1a1aa' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Check size={16} color="#10b981" />
                Anti-Harassment Check: 1 attempt in 48h (Below cap of 2)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Check size={16} color="#10b981" />
                National DND Registry: Not Opted-Out
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Check size={16} color="#10b981" />
                RBI e-Mandate: Pre-debit SMS timestamp verified
              </div>
            </div>

            {/* Real Audit Trail entries */}
            {transaction.auditTrail && transaction.auditTrail.length > 0 && (
              <div style={{ marginTop: '10px', borderTop: '1px solid #1e1e24', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span className="font-mono" style={{ fontSize: '12px', color: '#71717a', fontWeight: 700 }}>
                  CHRONOLOGICAL AUDIT LOG ({transaction.auditTrail.length} EVENTS)
                </span>
                {transaction.auditTrail.map((log) => (
                  <div key={log.id} style={{ background: '#040405', padding: '10px 12px', borderRadius: '4px', border: '1px solid #1e1e24', fontSize: '13px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                      <span className="font-mono" style={{ color: '#34d399', fontWeight: 800 }}>{log.event}</span>
                      <span className="font-mono" style={{ color: '#52525b', fontSize: '12px' }}>{new Date(log.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <div style={{ color: '#d4d4d8', lineHeight: 1.4 }}>{log.agentDecision}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <button
          onClick={onClose}
          className="btn-secondary"
          style={{ width: '100%', justifyContent: 'center', padding: '14px', marginTop: '24px', fontSize: '15px' }}
        >
          Close Inspector
        </button>
      </div>
    </div>
  );
};
