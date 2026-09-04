import React, { useState } from 'react';
import { FailedTransaction } from '../types';
import { Info, FileText, Search } from 'lucide-react';

interface TransactionFeedProps {
  transactions: FailedTransaction[];
  onSelectTransaction: (tx: FailedTransaction) => void;
  selectedTxId?: string;
}

export const TransactionFeed: React.FC<TransactionFeedProps> = ({
  transactions,
  onSelectTransaction,
  selectedTxId
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [railFilter, setRailFilter] = useState('ALL');
  const [errorFilter, setErrorFilter] = useState('ALL');

  const filteredTransactions = transactions.filter(tx => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      tx.customerName.toLowerCase().includes(query) ||
      tx.orderId.toLowerCase().includes(query) ||
      tx.merchantName.toLowerCase().includes(query) ||
      tx.issuingBank.toLowerCase().includes(query) ||
      tx.failureCode.toLowerCase().includes(query);
    if (!matchesSearch) return false;

    if (railFilter === 'UPI' && tx.paymentMethod !== 'UPI') return false;
    if (railFilter === 'CARD' && tx.paymentMethod !== 'CARD') return false;
    if (railFilter === 'MANDATE' && tx.paymentMethod !== 'E_MANDATE') return false;

    if (errorFilter === 'U30' && !tx.failureCode.toUpperCase().includes('U30') && !tx.failureCode.toUpperCase().includes('TIMEOUT') && !tx.failureCode.toUpperCase().includes('504')) return false;
    if (errorFilter === 'U16' && !tx.failureCode.toUpperCase().includes('U16') && !tx.failureCode.toUpperCase().includes('BALANCE')) return false;
    if (errorFilter === '3DS' && !tx.failureCode.toUpperCase().includes('TOKEN') && !tx.failureCode.toUpperCase().includes('OTP') && !tx.failureCode.toUpperCase().includes('ABANDON')) return false;

    return true;
  });

  const getRailLabel = (method: FailedTransaction['paymentMethod']) => {
    switch (method) {
      case 'UPI': return { label: 'UPI AutoPay', color: '#34d399' };
      case 'CARD': return { label: 'Card Vault', color: '#a1a1aa' };
      case 'E_MANDATE': return { label: 'e-Mandate', color: '#fca5a5' };
      case 'B2B_INVOICE': return { label: 'B2B Invoice', color: '#fbbf24' };
      default: return { label: method, color: '#a1a1aa' };
    }
  };

  const getFriendlyErrorLabel = (code: string) => {
    const uppercase = code.toUpperCase();
    if (uppercase.includes('U30') || uppercase.includes('504') || uppercase.includes('TIMEOUT')) return 'U30 (Bank Timeout)';
    if (uppercase.includes('U16') || uppercase.includes('BALANCE')) return 'U16 (Month-End Liquidity)';
    if (uppercase.includes('3DS') || uppercase.includes('OTP') || uppercase.includes('ABANDON')) return '3DS Drop-off';
    if (uppercase.includes('U69')) return 'U69 (Switch Degraded)';
    if (uppercase.includes('NET15') || uppercase.includes('OVERDUE')) return 'Net-15 Invoice Overdue';
    return code;
  };

  const getStatusBadge = (status: FailedTransaction['status'], tx: FailedTransaction) => {
    const base: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '4px 10px',
      borderRadius: '4px',
      fontWeight: 700,
      fontSize: '13px',
      fontFamily: "'JetBrains Mono', monospace",
    };
    switch (status) {
      case 'recovered':
        return (
          <span style={{ ...base, background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#34d399' }}>
            RECOVERED
          </span>
        );
      case 'at_risk':
        return (
          <span style={{ ...base, background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#fca5a5' }}>
            AT RISK
          </span>
        );
      case 'diagnosing':
        return (
          <span style={{ ...base, background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#34d399', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399' }}></span>
            DIAGNOSING
          </span>
        );
      case 'recovering':
        return (
          <span style={{ ...base, background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#34d399' }}>
            AUTH PENDING
          </span>
        );
      case 'stopped_by_policy':
        return (
          <span style={{ ...base, background: '#18181b', border: '1px solid #27272a', color: '#e4e4e7' }}>
            HALTED (DND/POLICY)
          </span>
        );
      case 'escalated_to_human':
        return (
          <span style={{ ...base, background: 'rgba(168, 85, 247, 0.12)', border: '1px solid rgba(168, 85, 247, 0.4)', color: '#c4b5fd' }}>
            FINOPS GATE
          </span>
        );
      default:
        return <span style={base}>{status}</span>;
    }
  };

  const getSentinelAction = (tx: FailedTransaction) => {
    if (tx.recoveryAction) {
      switch (tx.recoveryAction.actionType) {
        case 'GATEWAY_FAILOVER_RETRY': return 'Dynamic Axis Bank Failover';
        case 'SALARY_CYCLE_RETRY': return 'Hinglish WhatsApp + 1st/5th Retry';
        case 'WHATSAPP_1CLICK_UPI': return 'Personalized WhatsApp 1-Click Link';
        case 'PROMISE_TO_PAY_ESCALATION': return 'High-Value Settlement Escalation';
      }
    }
    if (tx.status === 'at_risk') return 'Awaiting Diagnosis';
    if (tx.status === 'diagnosing') return 'Diagnosing Error Trace...';
    return 'Pending';
  };

  const selectStyle: React.CSSProperties = {
    background: '#000000',
    color: '#e4e4e7',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '14px',
    padding: '6px 12px',
    border: '1px solid #27272a',
    borderRadius: '6px',
    outline: 'none',
    cursor: 'pointer',
  };

  return (
    <div style={{ background: '#09090b', border: '1px solid #27272a', padding: '28px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Onboarding Explainer Box */}
      <div style={{ background: '#040405', border: '1px solid #27272a', borderRadius: '8px', padding: '16px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '18px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Info size={24} color="#a1a1aa" />
          <div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Testing Live Recovery:
            </div>
            <div style={{ fontSize: '14px', color: '#a1a1aa', marginTop: '3px', lineHeight: 1.5 }}>
              Click <strong style={{ color: '#ffffff' }}>"Run Batch Recovery"</strong> in the top header bar to start. Click any transaction row below to inspect the root cause diagnosis & recovery action.
            </div>
          </div>
        </div>
      </div>

      {/* Header & Filters */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '18px', borderBottom: '1px solid #27272a', paddingBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <FileText size={22} color="#ffffff" />
          <h3 style={{ fontWeight: 800, fontSize: '20px', color: '#ffffff', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Payment Telemetry & Recovery Feed
          </h3>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#000000', border: '1px solid #27272a', padding: '8px 14px', borderRadius: '6px' }}>
            <Search size={16} color="#71717a" style={{ marginRight: '8px' }} />
            <input
              type="text"
              placeholder="Search customer / order..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ background: 'transparent', color: '#ffffff', fontSize: '15px', outline: 'none', border: 'none', width: '200px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            />
          </div>
          <select value={railFilter} onChange={(e) => setRailFilter(e.target.value)} style={{ ...selectStyle, fontSize: '14px', padding: '8px 14px' }}>
            <option value="ALL">All Payment Rails</option>
            <option value="UPI">UPI AutoPay</option>
            <option value="CARD">Card Vault</option>
            <option value="MANDATE">e-Mandate</option>
          </select>
          <select value={errorFilter} onChange={(e) => setErrorFilter(e.target.value)} style={{ ...selectStyle, fontSize: '14px', padding: '8px 14px' }}>
            <option value="ALL">All Failure Types</option>
            <option value="U30">U30 Bank Timeout</option>
            <option value="U16">U16 Low Balance</option>
            <option value="3DS">3DS Abandon</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          <thead>
            <tr style={{ background: '#000000', borderBottom: '1px solid #27272a' }}>
              {['ORDER & CUSTOMER', 'AMOUNT', 'PAYMENT METHOD', 'FAILURE CAUSE', 'AI REMEDIATION ACTION', 'STATUS'].map((h, i) => (
                <th
                  key={h}
                  style={{
                    padding: '14px 18px',
                    fontSize: '14px',
                    fontWeight: 800,
                    color: '#71717a',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    textAlign: i === 5 ? 'right' : 'left',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx, idx) => {
              const isSelected = selectedTxId === tx.id;
              const rail = getRailLabel(tx.paymentMethod);
              return (
                <tr
                  key={tx.id}
                  onClick={() => onSelectTransaction(tx)}
                  style={{
                    borderBottom: '1px solid #27272a',
                    background: isSelected ? '#18181b' : idx % 2 === 1 ? '#040405' : 'transparent',
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = '#121214'; }}
                  onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = idx % 2 === 1 ? '#040405' : 'transparent'; }}
                >
                  {/* Order / Client */}
                  <td style={{ padding: '16px 18px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="font-mono" style={{ color: '#ffffff', fontWeight: 800, fontSize: '15px' }}>{tx.orderId}</span>
                      <span style={{ color: '#ffffff', fontSize: '16px', fontWeight: 700, marginTop: '2px' }}>
                        {tx.customerName}
                      </span>
                      <span style={{ color: '#71717a', fontSize: '14px' }}>
                        {tx.merchantName}
                      </span>
                    </div>
                  </td>

                  {/* Amount */}
                  <td style={{ padding: '16px 18px' }}>
                    <span style={{ fontWeight: 900, fontSize: '18px', color: '#ffffff' }}>
                      ₹{tx.amount.toLocaleString('en-IN')}
                    </span>
                  </td>

                  {/* Rail */}
                  <td style={{ padding: '16px 18px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#e4e4e7', fontWeight: 600, fontSize: '15px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: rail.color }}></span>
                      {rail.label}
                    </span>
                  </td>

                  {/* Failure Cause */}
                  <td style={{ padding: '16px 18px' }}>
                    <span style={{
                      padding: '5px 12px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.35)',
                      color: '#fca5a5',
                      fontWeight: 700,
                      fontSize: '14px',
                      borderRadius: '4px',
                    }}>
                      {getFriendlyErrorLabel(tx.failureCode)}
                    </span>
                  </td>

                  {/* AI Remediation Action */}
                  <td style={{ padding: '16px 18px', color: '#e4e4e7', fontSize: '15px', maxWidth: '260px', fontWeight: 600 }}>
                    {getSentinelAction(tx)}
                  </td>

                  {/* Status */}
                  <td style={{ padding: '16px 18px', textAlign: 'right' }}>
                    {getStatusBadge(tx.status, tx)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer count */}
      <div style={{ fontSize: '15px', color: '#71717a', textAlign: 'center', paddingTop: '12px', borderTop: '1px solid #27272a' }}>
        Showing {filteredTransactions.length} of {transactions.length} total payment failure records • Select any row to open inspector
      </div>
    </div>
  );
};


