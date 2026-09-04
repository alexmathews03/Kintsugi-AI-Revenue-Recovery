import React from 'react';
import { FailedTransaction } from '../types';

interface MetricCardsProps {
  transactions: FailedTransaction[];
}

export const MetricCards: React.FC<MetricCardsProps> = ({ transactions }) => {
  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
  const recoveredTransactions = transactions.filter(t => t.status === 'recovered');
  const recoveredAmount = recoveredTransactions.reduce((sum, t) => sum + (t.recoveryAction?.recoveredAmount || t.amount), 0);
  
  const stoppedTransactions = transactions.filter(t => t.status === 'stopped_by_policy' || t.status === 'escalated_to_human');
  const processedTransactions = transactions.filter(t => t.status !== 'at_risk');
  
  const recoveryRate = processedTransactions.length > 0 
    ? ((recoveredTransactions.length / (processedTransactions.length - stoppedTransactions.length || 1)) * 100).toFixed(1)
    : '0.0';

  const cardBase: React.CSSProperties = {
    background: '#09090b',
    border: '1px solid #27272a',
    padding: '20px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'border-color 0.2s',
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '16px',
    }}>
      
      {/* Card 1: Revenue at Risk */}
      <div
        style={{ ...cardBase, borderTop: '3px solid #ef4444' }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.6)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#27272a'; }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '16px', fontWeight: 800, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Total Money at Risk
            </span>
            <span style={{ fontSize: '14px', background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.4)', padding: '3px 10px', borderRadius: '4px', color: '#fca5a5', fontWeight: 700 }} className="font-mono">
              {transactions.length} Ingested
            </span>
          </div>
          <div style={{ fontSize: '44px', fontWeight: 900, color: '#ffffff', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            ₹{totalAmount.toLocaleString('en-IN')}
          </div>
        </div>
        <div style={{ fontSize: '15px', color: '#71717a', marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #1e1e24' }}>
          Value of failed payment webhooks
        </div>
      </div>

      {/* Card 2: Recovered Revenue */}
      <div
        style={{ ...cardBase, borderTop: '3px solid #10b981' }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#10b981'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#27272a'; }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '16px', fontWeight: 800, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Recovered Revenue
            </span>
            <span style={{ fontSize: '14px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '3px 10px', borderRadius: '4px', color: '#34d399', fontWeight: 800 }} className="font-mono">
              {recoveryRate}% Yield
            </span>
          </div>
          <div style={{ fontSize: '44px', fontWeight: 900, color: '#34d399', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            ₹{recoveredAmount.toLocaleString('en-IN')}
          </div>
        </div>
        <div style={{ fontSize: '15px', color: '#71717a', marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #1e1e24', display: 'flex', justifyContent: 'space-between' }}>
          <span>Rescued by AI agent</span>
          <span style={{ color: '#34d399', fontWeight: 800 }} className="font-mono">{recoveredTransactions.length} recovered</span>
        </div>
      </div>

      {/* Card 3: AI Processing Speed */}
      <div
        style={{ ...cardBase, borderTop: '3px solid #52525b' }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#71717a'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#27272a'; }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '16px', fontWeight: 800, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              AI Processing Time
            </span>
            <span style={{ fontSize: '14px', background: '#18181b', border: '1px solid #27272a', padding: '3px 10px', borderRadius: '4px', color: '#e4e4e7', fontWeight: 700 }} className="font-mono">
              Sub-second
            </span>
          </div>
          <div style={{ fontSize: '44px', fontWeight: 900, color: '#ffffff', fontFamily: "'Plus Jakarta Sans', sans-serif", display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            84 <span style={{ fontSize: '20px', color: '#a1a1aa', fontWeight: 700 }}>ms</span>
          </div>
        </div>
        <div style={{ fontSize: '15px', color: '#71717a', marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #1e1e24' }}>
          Instant semantic error parsing
        </div>
      </div>

      {/* Card 4: Safety & Guardrail Halts */}
      <div
        style={{ ...cardBase, borderTop: '3px solid #f59e0b' }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.6)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#27272a'; }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '16px', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Guardrail Protection
            </span>
            <span style={{ fontSize: '14px', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.4)', padding: '3px 10px', borderRadius: '4px', color: '#fbbf24', fontWeight: 700 }} className="font-mono">
              RBI Compliant
            </span>
          </div>
          <div style={{ fontSize: '44px', fontWeight: 900, color: '#fbbf24', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {stoppedTransactions.length} <span style={{ fontSize: '18px', color: '#a1a1aa', fontWeight: 500 }}>Halted</span>
          </div>
        </div>
        <div style={{ fontSize: '15px', color: '#71717a', marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #1e1e24' }}>
          Stopped to prevent spam / DND breach
        </div>
      </div>

    </div>
  );
};


