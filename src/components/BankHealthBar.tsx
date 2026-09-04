import React from 'react';
import { RotateCcw, Zap, RefreshCw } from 'lucide-react';

interface BankHealthBarProps {
  onSimulateOutage: () => void;
  simulationSpeed: number;
  setSimulationSpeed: (speed: number) => void;
  activeProcessingMsg?: string | null;
  onStepSingleSimulation?: () => void;
  isSimulating?: boolean;
  unprocessedCount?: number;
}

export const BankHealthBar: React.FC<BankHealthBarProps> = ({
  onSimulateOutage,
  simulationSpeed,
  setSimulationSpeed,
  activeProcessingMsg,
  onStepSingleSimulation,
  isSimulating,
  unprocessedCount,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      
      {/* Streamlined Control & Status Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
          background: '#09090b',
          border: '1px solid #27272a',
          padding: '16px 22px',
          borderRadius: '10px',
        }}
      >
        {/* Left: Quick Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#34d399' }} className="pulse-indicator"></span>
            <span style={{ fontWeight: 800, fontSize: '17px', color: '#ffffff', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Live Telemetry Stream
            </span>
          </div>
          <span style={{ color: '#52525b', fontSize: '15px' }}>|</span>
          <span style={{ fontSize: '15px', color: '#a1a1aa' }}>
            50+ Ingested Payment Failures
          </span>
        </div>

        {/* Right: Speed Controller + Step Button + Outage Spike Trigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          
          {/* Pacing Controller */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '14px', color: '#a1a1aa', fontWeight: 700 }} className="font-mono">Pace:</span>
            {[
              { label: 'Fast (200ms)', value: 200 },
              { label: 'Normal (700ms)', value: 700 },
              { label: 'Paced (1.6s)', value: 1600 },
            ].map(s => (
              <button
                key={s.value}
                onClick={() => setSimulationSpeed(s.value)}
                style={{
                  background: simulationSpeed === s.value ? '#ffffff' : '#18181b',
                  color: simulationSpeed === s.value ? '#000000' : '#e4e4e7',
                  border: `1px solid ${simulationSpeed === s.value ? '#ffffff' : '#27272a'}`,
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '13px',
                  fontWeight: simulationSpeed === s.value ? 800 : 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Step Single Transaction */}
          {onStepSingleSimulation && (
            <button
              onClick={onStepSingleSimulation}
              disabled={isSimulating || (unprocessedCount !== undefined && unprocessedCount === 0)}
              style={{
                background: '#18181b',
                color: '#ffffff',
                border: '1px solid #3f3f46',
                borderRadius: '6px',
                padding: '7px 14px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: isSimulating || (unprocessedCount !== undefined && unprocessedCount === 0) ? 'not-allowed' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                opacity: isSimulating || (unprocessedCount !== undefined && unprocessedCount === 0) ? 0.6 : 1,
                transition: 'all 0.15s',
              }}
              title="Process single transaction"
            >
              <RotateCcw size={15} color="#ffffff" />
              Step Next
            </button>
          )}

          {/* Simulate HDFC Spike */}
          <button
            onClick={onSimulateOutage}
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#fca5a5',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              borderRadius: '6px',
              padding: '7px 14px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              transition: 'all 0.2s',
            }}
          >
            <Zap size={15} color="#ef4444" />
            Simulate HDFC Spike
          </button>
        </div>
      </div>

      {/* Active Processing Live Status Banner */}
      {activeProcessingMsg && (
        <div
          className="fade-in"
          style={{
            padding: '14px 20px',
            borderRadius: '8px',
            background: '#040405',
            border: '1px solid #3f3f46',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            fontSize: '16px',
            color: '#ffffff',
          }}
        >
          <RefreshCw size={18} color="#10b981" className="pulse-indicator" />
          <span style={{ fontWeight: 800, color: '#ffffff' }}>Engine Activity:</span>
          <span style={{ color: '#e4e4e7', fontWeight: 600 }}>{activeProcessingMsg}</span>
        </div>
      )}
    </div>
  );
};
