import React, { useState } from 'react';
import { FailedTransaction, PaymentMethod } from '../types';
import { PlusCircle, X } from 'lucide-react';

interface ManualInjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInject: (newTx: FailedTransaction) => void;
}

export const ManualInjectModal: React.FC<ManualInjectModalProps> = ({
  isOpen,
  onClose,
  onInject
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('Vivek Oberoi');
  const [customerPhone, setCustomerPhone] = useState('+91 98330 22109');
  const [merchantName, setMerchantName] = useState('Urban Company Premium');
  const [amount, setAmount] = useState(4999);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [issuingBank, setIssuingBank] = useState('HDFC Bank');
  const [failureCode, setFailureCode] = useState('U30');
  const [rawErrorMessage, setRawErrorMessage] = useState('NPCI_U30: Issuing bank system timeout during VPA validation step.');

  const handlePresetChange = (code: string) => {
    setFailureCode(code);
    if (code === 'U30') {
      setPaymentMethod('UPI');
      setRawErrorMessage('NPCI_U30: Issuing bank system timeout during VPA validation step.');
    } else if (code === 'U16') {
      setPaymentMethod('E_MANDATE');
      setRawErrorMessage('NPCI_U16: Insufficient funds in consumer account at auto-debit trigger.');
    } else if (code === 'TOKEN_EXPIRY') {
      setPaymentMethod('CARD');
      setRawErrorMessage('RBI_COFT_EXPIRED: Network token cryptogram invalidated by card network.');
    } else if (code === 'CUSTOMER_OPT_OUT') {
      setPaymentMethod('UPI');
      setRawErrorMessage('DND_ACTIVE: Customer previously replied STOP to recovery nudges within 48h.');
    } else if (code === 'HIGH_VALUE_B2B') {
      setPaymentMethod('B2B_INVOICE');
      setAmount(120000);
      setRawErrorMessage('SMART_COLLECT_OVERDUE: Enterprise invoice overdue past Net-30 credit period.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTx: FailedTransaction = {
      id: `tx_rec_${Date.now().toString().slice(-4)}`,
      orderId: `ORD_RZP_${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: new Date().toISOString(),
      customerName,
      customerPhone,
      customerEmail: `${customerName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      merchantName,
      amount: Number(amount),
      paymentMethod,
      issuingBank,
      gateway: 'Razorpay PG Direct',
      failureCode,
      rawErrorMessage,
      status: 'at_risk',
      riskAmount: Number(amount),
      attemptsCount: 1,
      auditTrail: [
        {
          id: `aud_${Date.now()}`,
          timestamp: new Date().toISOString(),
          event: 'PAYMENT_FAILED_WEBHOOK',
          agentDecision: 'Ingested custom webhook failure payload into telemetry stream.',
          guardrailChecked: 'INGESTION_FORMAT_CHECK',
          passed: true
        }
      ]
    };

    onInject(newTx);
    onClose();
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '6px',
    background: '#000000',
    border: '1px solid #27272a',
    color: '#ffffff',
    fontSize: '14px',
    marginTop: '6px',
    outline: 'none',
    fontFamily: "'JetBrains Mono', monospace",
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 60,
      padding: '20px'
    }}>
      <div style={{ width: '100%', maxWidth: '540px', background: '#09090b', border: '1px solid #27272a', padding: '24px', borderRadius: '10px', position: 'relative' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid #27272a', paddingBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <PlusCircle size={20} color="#34d399" />
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.04em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Inject Simulated Payment Failure
            </h3>
          </div>
          <button onClick={onClose} style={{ background: '#18181b', border: '1px solid #27272a', color: '#a1a1aa', borderRadius: '6px', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={18} color="#a1a1aa" />
          </button>
        </div>

        {/* Preset Selector */}
        <div style={{ marginBottom: '18px' }}>
          <label className="font-mono" style={{ fontSize: '13px', color: '#a1a1aa', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
            QUICK FAILURE ARCHETYPE PRESETS:
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { label: 'UPI Timeout (U30)', code: 'U30' },
              { label: 'Mandate Low Balance (U16)', code: 'U16' },
              { label: 'Expired Token', code: 'TOKEN_EXPIRY' },
              { label: 'DND Rule Test', code: 'CUSTOMER_OPT_OUT' },
              { label: 'B2B Invoice', code: 'HIGH_VALUE_B2B' }
            ].map(p => (
              <button
                key={p.code}
                type="button"
                onClick={() => handlePresetChange(p.code)}
                className="font-mono"
                style={{
                  background: failureCode === p.code ? '#10b981' : '#040405',
                  color: failureCode === p.code ? '#000000' : '#e4e4e7',
                  border: `1px solid ${failureCode === p.code ? '#34d399' : '#27272a'}`,
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: failureCode === p.code ? 800 : 500,
                  cursor: 'pointer'
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '13px', color: '#a1a1aa', fontWeight: 600 }} className="font-mono">CUSTOMER NAME</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                style={inputStyle}
                required
              />
            </div>
            <div>
              <label style={{ fontSize: '13px', color: '#a1a1aa', fontWeight: 600 }} className="font-mono">AMOUNT (₹ INR)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                style={inputStyle}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '13px', color: '#a1a1aa', fontWeight: 600 }} className="font-mono">PAYMENT METHOD</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                style={inputStyle}
              >
                <option value="UPI">UPI AutoPay</option>
                <option value="E_MANDATE">Recurring e-Mandate</option>
                <option value="CARD">Credit / Debit Card</option>
                <option value="NETBANKING">Netbanking</option>
                <option value="B2B_INVOICE">B2B Invoice</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '13px', color: '#a1a1aa', fontWeight: 600 }} className="font-mono">ISSUING BANK</label>
              <input
                type="text"
                value={issuingBank}
                onChange={(e) => setIssuingBank(e.target.value)}
                style={inputStyle}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '13px', color: '#a1a1aa', fontWeight: 600 }} className="font-mono">RAW BANK ERROR / NPCI TRACE</label>
            <textarea
              rows={2}
              value={rawErrorMessage}
              onChange={(e) => setRawErrorMessage(e.target.value)}
              style={inputStyle}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={onClose} className="btn-secondary" style={{ padding: '10px 18px', fontSize: '14px' }}>
              CANCEL
            </button>
            <button type="submit" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px', fontWeight: 800 }}>
              INJECT FAILURE
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
