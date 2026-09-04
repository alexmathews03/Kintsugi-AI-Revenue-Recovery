import React from 'react';
import { Plus, RotateCcw, Play, Pause } from 'lucide-react';

interface NavbarProps {
  activeTab: 'dashboard' | 'architecture' | 'compliance';
  setActiveTab: (tab: 'dashboard' | 'architecture' | 'compliance') => void;
  isSimulating: boolean;
  onRunBatchSimulation: () => void;
  onResetData: () => void;
  onOpenInjectModal: () => void;
  unprocessedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  isSimulating,
  onRunBatchSimulation,
  onResetData,
  onOpenInjectModal,
  unprocessedCount
}) => {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: '330px',
        right: 0,
        height: '84px',
        background: '#000000',
        borderBottom: '1px solid #1e1e24',
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        userSelect: 'none',
      }}
    >
      {/* Left: Engine Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 16px',
            background: '#09090b',
            border: '1px solid #27272a',
            borderRadius: '6px',
          }}
        >
          <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#10b981' }} className="pulse-indicator"></span>
          <span className="font-mono" style={{ fontSize: '14px', color: '#e4e4e7', fontWeight: 800, letterSpacing: '0.04em' }}>
            Recovery Engine Active & Ingesting
          </span>
        </div>
      </div>

      {/* Center: Live Bank Health Telemetry */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }} className="font-mono">
        <span style={{ fontSize: '15px', color: '#a1a1aa', fontWeight: 800 }}>Bank Gateway Health:</span>
        
        {/* HDFC - Degraded */}
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '7px 14px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.35)',
            borderRadius: '6px', fontSize: '14px',
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></span>
          <span style={{ color: '#fca5a5', fontWeight: 800 }}>HDFC: Latency Spike (U30)</span>
        </div>

        {/* SBI */}
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '7px 14px',
            background: '#09090b',
            border: '1px solid #27272a',
            borderRadius: '6px', fontSize: '14px',
          }}
        >
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981' }}></span>
          <span style={{ color: '#ffffff', fontWeight: 700 }}>SBI: 99.2%</span>
        </div>

        {/* ICICI */}
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '7px 14px',
            background: '#09090b',
            border: '1px solid #27272a',
            borderRadius: '6px', fontSize: '14px',
          }}
        >
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981' }}></span>
          <span style={{ color: '#ffffff', fontWeight: 700 }}>ICICI: 98.9%</span>
        </div>
      </div>

      {/* Right: Action Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <button 
          onClick={onOpenInjectModal} 
          className="btn-secondary font-mono" 
          style={{ padding: '11px 16px', fontSize: '14px', borderRadius: '6px', gap: '8px', display: 'flex', alignItems: 'center' }}
        >
          <Plus size={16} color="#a1a1aa" />
          Test Custom Failure
        </button>

        <button 
          onClick={onResetData} 
          className="btn-secondary font-mono" 
          style={{ padding: '11px 16px', fontSize: '14px', borderRadius: '6px', gap: '8px', display: 'flex', alignItems: 'center' }}
        >
          <RotateCcw size={16} color="#a1a1aa" />
          Reset Demo
        </button>

        {/* Primary Action Button */}
        <button
          onClick={onRunBatchSimulation}
          disabled={unprocessedCount === 0 && !isSimulating}
          style={{
            padding: '13px 24px',
            fontSize: '15px',
            fontWeight: 800,
            letterSpacing: '0.03em',
            borderRadius: '6px',
            background: isSimulating ? '#18181b' : '#ffffff',
            color: isSimulating ? '#e4e4e7' : '#000000',
            border: isSimulating ? '1px solid #3f3f46' : '1px solid #ffffff',
            boxShadow: isSimulating ? 'none' : '0 2px 14px rgba(255, 255, 255, 0.15)',
            opacity: unprocessedCount === 0 && !isSimulating ? 0.6 : 1,
            cursor: unprocessedCount === 0 && !isSimulating ? 'not-allowed' : 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            transition: 'all 0.15s',
          }}
        >
          {isSimulating ? <Pause size={18} color="#e4e4e7" /> : <Play size={18} color="#000000" fill="#000000" />}
          {isSimulating ? 'Pause Batch' : `Run Batch Recovery (${unprocessedCount} At Risk)`}
        </button>
      </div>
    </header>
  );
};
