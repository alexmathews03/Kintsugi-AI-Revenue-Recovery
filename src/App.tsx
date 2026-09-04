import React, { useState, useMemo, useRef } from 'react';
import { INITIAL_DATASET } from './data/syntheticData';
import { FailedTransaction, ComplianceConfig } from './types';
import { ComplianceEngine, DEFAULT_COMPLIANCE_CONFIG } from './engine/complianceEngine';
import { RecoveryEngine } from './engine/recoveryEngine';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { BankHealthBar } from './components/BankHealthBar';
import { MetricCards } from './components/MetricCards';
import { RecoveryChart } from './components/RecoveryChart';
import { TransactionFeed } from './components/TransactionFeed';
import { AgentDrawer } from './components/AgentDrawer';
import { ArchitectureView } from './components/ArchitectureView';
import { ComplianceMatrixView } from './components/ComplianceMatrixView';
import { ManualInjectModal } from './components/ManualInjectModal';

export const App: React.FC = () => {
  const [transactions, setTransactions] = useState<FailedTransaction[]>(INITIAL_DATASET);
  const [complianceConfig, setComplianceConfig] = useState<ComplianceConfig>(DEFAULT_COMPLIANCE_CONFIG);
  const [selectedTx, setSelectedTx] = useState<FailedTransaction | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'architecture' | 'compliance'>('dashboard');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [isInjectModalOpen, setIsInjectModalOpen] = useState<boolean>(false);
  const [simulationSpeed, setSimulationSpeed] = useState<number>(700);
  const [activeProcessingMsg, setActiveProcessingMsg] = useState<string | null>(null);

  // Ref to cancel/pause running simulation immediately
  const stopSimulationRef = useRef<boolean>(false);

  // Initialize engines with current config
  const complianceEngine = useMemo(() => new ComplianceEngine(complianceConfig), [complianceConfig]);
  const recoveryEngine = useMemo(() => new RecoveryEngine(complianceEngine), [complianceEngine]);

  const unprocessedCount = transactions.filter(t => t.status === 'at_risk').length;
  const stoppedCount = transactions.filter(t => t.status === 'stopped_by_policy').length;
  const escalatedCount = transactions.filter(t => t.status === 'escalated_to_human').length;
  const activeSelectedTx = selectedTx ? (transactions.find(t => t.id === selectedTx.id) || selectedTx) : null;

  // Pause simulation immediately
  const pauseSimulation = () => {
    stopSimulationRef.current = true;
    setIsSimulating(false);
    setActiveProcessingMsg('Simulation paused.');
  };

  // Step through exactly ONE transaction at a time (ideal for recording a 5-min demo video)
  const handleStepSingleSimulation = async () => {
    if (isSimulating) return;

    const targetIdx = transactions.findIndex(t => t.status === 'at_risk');
    if (targetIdx === -1) {
      setActiveProcessingMsg('All transactions have been processed. Click "Reset Demo" to restart.');
      return;
    }

    const target = transactions[targetIdx];
    setActiveProcessingMsg(`Diagnosing ${target.orderId} (${target.customerName}) — Code ${target.failureCode}...`);

    const updated = [...transactions];
    updated[targetIdx] = { ...target, status: 'diagnosing' };
    setTransactions(updated);
    setSelectedTx(updated[targetIdx]);

    await new Promise(r => setTimeout(r, 700));

    const processed = recoveryEngine.processTransaction(updated[targetIdx]);
    updated[targetIdx] = processed;
    setTransactions([...updated]);
    setSelectedTx(processed);

    if (processed.status === 'recovered') {
      setActiveProcessingMsg(`Recovered ₹${processed.amount.toLocaleString('en-IN')} via ${processed.recoveryAction?.actionType || 'Rail Failover'}`);
    } else if (processed.status === 'stopped_by_policy') {
      setActiveProcessingMsg(`Halted by Guardrail: ${processed.recoveryAction?.auditReason || 'Policy limit'}`);
    } else {
      setActiveProcessingMsg(`Escalated to FinOps: High-value transaction requires dual approval.`);
    }
  };

  // Single transaction manual diagnosis from inspector
  const handleDiagnoseSingle = (tx: FailedTransaction) => {
    const processed = recoveryEngine.processTransaction(tx);
    setTransactions(prev => prev.map(t => t.id === tx.id ? processed : t));
    setSelectedTx(processed);
    if (processed.status === 'recovered') {
      setActiveProcessingMsg(`Recovered ₹${processed.amount.toLocaleString('en-IN')} via ${processed.recoveryAction?.actionType || 'Rail Failover'}`);
    } else if (processed.status === 'stopped_by_policy') {
      setActiveProcessingMsg(`Halted by Guardrail: ${processed.recoveryAction?.auditReason || 'Policy limit'}`);
    } else {
      setActiveProcessingMsg(`Escalated to FinOps: High-value transaction requires dual approval.`);
    }
  };

  // Run autonomous batch recovery simulation with presentation-friendly pacing
  const handleRunBatchSimulation = async () => {
    if (isSimulating) {
      pauseSimulation();
      return;
    }

    stopSimulationRef.current = false;
    setIsSimulating(true);

    const currentList = [...transactions];
    
    for (let i = 0; i < currentList.length; i++) {
      if (stopSimulationRef.current) break;

      if (currentList[i].status === 'at_risk') {
        const item = currentList[i];
        
        setActiveProcessingMsg(`Diagnosing ${item.orderId} (${item.customerName}) — Code ${item.failureCode}...`);
        currentList[i] = { ...currentList[i], status: 'diagnosing' };
        setTransactions([...currentList]);
        
        await new Promise(r => setTimeout(r, simulationSpeed / 2));

        if (stopSimulationRef.current) break;

        const processed = recoveryEngine.processTransaction(currentList[i]);
        currentList[i] = processed;
        setTransactions([...currentList]);

        if (processed.status === 'recovered') {
          setActiveProcessingMsg(`Recovered ₹${processed.amount.toLocaleString('en-IN')} via ${processed.recoveryAction?.actionType || 'Rail Failover'}`);
        } else if (processed.status === 'stopped_by_policy') {
          setActiveProcessingMsg(`Halted by Guardrail: ${processed.recoveryAction?.auditReason || 'Policy limit'}`);
        }

        // If the user already opened this specific transaction in inspector, keep it updated
        if (selectedTx && selectedTx.id === processed.id) {
          setSelectedTx(processed);
        }

        await new Promise(r => setTimeout(r, simulationSpeed / 2));
      }
    }

    if (!stopSimulationRef.current) {
      setActiveProcessingMsg(null);
    }
    setIsSimulating(false);
  };

  // Simulate HDFC Downtime Spike (Pauses simulator so user can inspect)
  const handleSimulateOutageSpike = () => {
    pauseSimulation();

    const spikeItems: FailedTransaction[] = [
      {
        id: `tx_spike_${Date.now()}_1`,
        orderId: `ORD_HDFC_${Math.floor(Math.random() * 8999 + 1000)}`,
        timestamp: new Date().toISOString(),
        customerName: 'Aakash Verma',
        customerPhone: '+91 98765 43210',
        customerEmail: 'aakash.verma@example.in',
        merchantName: 'Flipkart Wholesale',
        amount: 28400,
        paymentMethod: 'UPI',
        issuingBank: 'HDFC Bank',
        gateway: 'HDFC_PG_01',
        failureCode: 'U30_GATEWAY_TIMEOUT',
        rawErrorMessage: 'NPCI U30: Connection pool saturated at HDFC MPI switch. Latency > 14,000ms.',
        status: 'at_risk',
        riskAmount: 28400,
        attemptsCount: 1,
        auditTrail: [{ id: `aud_init_${Date.now()}`, timestamp: new Date().toISOString(), event: 'FAILURE_INGESTED', agentDecision: 'High-severity bank switch degradation detected on HDFC rail.', guardrailChecked: 'INGESTION_TELEMETRY', passed: true }]
      },
      {
        id: `tx_spike_${Date.now()}_2`,
        orderId: `ORD_HDFC_${Math.floor(Math.random() * 8999 + 1000)}`,
        timestamp: new Date().toISOString(),
        customerName: 'Pooja Hegde',
        customerPhone: '+91 99887 76655',
        customerEmail: 'pooja.h@enterprise.in',
        merchantName: 'Swiggy Instamart',
        amount: 4950,
        paymentMethod: 'UPI',
        issuingBank: 'HDFC Bank',
        gateway: 'HDFC_PG_01',
        failureCode: '504_GATEWAY_TIMEOUT',
        rawErrorMessage: '504 Gateway Timeout: Bank switch unresponsive.',
        status: 'at_risk',
        riskAmount: 4950,
        attemptsCount: 1,
        auditTrail: []
      },
      {
        id: `tx_spike_${Date.now()}_3`,
        orderId: `ORD_HDFC_${Math.floor(Math.random() * 8999 + 1000)}`,
        timestamp: new Date().toISOString(),
        customerName: 'Deepak Singhania',
        customerPhone: '+91 91234 56789',
        customerEmail: 'deepak.s@corp.in',
        merchantName: 'Razorpay X Payroll',
        amount: 42000,
        paymentMethod: 'E_MANDATE',
        issuingBank: 'HDFC Bank',
        gateway: 'HDFC_PG_02',
        failureCode: 'U69_SWITCH_DEGRADED',
        rawErrorMessage: 'NPCI U69: Central switch degraded at issuing bank.',
        status: 'at_risk',
        riskAmount: 42000,
        attemptsCount: 1,
        auditTrail: []
      }
    ];

    setTransactions(prev => [...spikeItems, ...prev]);
    setActiveProcessingMsg(`Injected 3 live HDFC U30 spike failures (₹75,350 at risk). Simulator paused for inspection.`);
  };

  const handleResetData = () => {
    pauseSimulation();
    setTransactions(INITIAL_DATASET);
    setActiveProcessingMsg(null);
    if (selectedTx) {
      const match = INITIAL_DATASET.find(t => t.id === selectedTx.id);
      setSelectedTx(match || null);
    }
  };

  const handleInjectTransaction = (newTx: FailedTransaction) => {
    pauseSimulation();
    setTransactions(prev => [newTx, ...prev]);
    setSelectedTx(newTx);
    setActiveProcessingMsg(`Injected order ${newTx.orderId}. Simulator paused for inspection.`);
  };

  const handleUpdateComplianceConfig = (newConfig: Partial<ComplianceConfig>) => {
    setComplianceConfig(prev => ({ ...prev, ...newConfig }));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#000000' }}>
      
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Top Header (offset by sidebar) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSimulating={isSimulating}
        onRunBatchSimulation={handleRunBatchSimulation}
        onResetData={handleResetData}
        onOpenInjectModal={() => setIsInjectModalOpen(true)}
        unprocessedCount={unprocessedCount}
      />

      {/* Main Content (offset by sidebar + header) */}
      <div style={{ paddingLeft: '330px', paddingTop: '84px' }}>
        <main style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '1760px', margin: '0 auto' }}>

          {activeTab === 'dashboard' && (
            <>
              {/* Status Ticker */}
              <BankHealthBar
                onSimulateOutage={handleSimulateOutageSpike}
                simulationSpeed={simulationSpeed}
                setSimulationSpeed={setSimulationSpeed}
                activeProcessingMsg={activeProcessingMsg}
                onStepSingleSimulation={handleStepSingleSimulation}
                isSimulating={isSimulating}
                unprocessedCount={unprocessedCount}
              />

              {/* KPI Scoreboard */}
              <MetricCards transactions={transactions} />

              {/* Full-Width Chart & Live Telemetry Feed */}
              <RecoveryChart transactions={transactions} />
              <TransactionFeed
                transactions={transactions}
                onSelectTransaction={(tx) => setSelectedTx(tx)}
                selectedTxId={activeSelectedTx?.id}
              />

              {/* Inspector Modal Drawer */}
              <AgentDrawer
                transaction={activeSelectedTx}
                onClose={() => setSelectedTx(null)}
                onDiagnose={handleDiagnoseSingle}
              />
            </>
          )}

          {activeTab === 'architecture' && (
            <ArchitectureView />
          )}

          {activeTab === 'compliance' && (
            <ComplianceMatrixView
              config={complianceConfig}
              onUpdateConfig={handleUpdateComplianceConfig}
              stoppedCount={stoppedCount}
              escalatedCount={escalatedCount}
            />
          )}

        </main>

        {/* Footer */}
        <footer className="font-mono" style={{ padding: '16px 24px', borderTop: '1px solid #1e293b', textAlign: 'center', fontSize: '11px', color: '#6b7280', letterSpacing: '0.04em' }}>
          KINTSUGI • AUTONOMOUS REVENUE RECOVERY FOR RAZORPAY
        </footer>
      </div>

      {/* Manual Inject Modal */}
      <ManualInjectModal
        isOpen={isInjectModalOpen}
        onClose={() => setIsInjectModalOpen(false)}
        onInject={handleInjectTransaction}
      />
    </div>
  );
};
