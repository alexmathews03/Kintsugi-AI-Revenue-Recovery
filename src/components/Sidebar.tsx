import React from 'react';
import { LayoutDashboard, Layers, Sliders, Activity } from 'lucide-react';

interface SidebarProps {
  activeTab: 'dashboard' | 'architecture' | 'compliance';
  setActiveTab: (tab: 'dashboard' | 'architecture' | 'compliance') => void;
}

const NAV_ITEMS: { id: 'dashboard' | 'architecture' | 'compliance'; label: string; subtext: string; Icon: React.ComponentType<{ size?: number; color?: string }> }[] = [
  { 
    id: 'dashboard', 
    label: 'Live Recovery Dashboard', 
    subtext: 'Real-time GMV yield & telemetry feed', 
    Icon: LayoutDashboard 
  },
  { 
    id: 'architecture', 
    label: 'Architecture & System Logic', 
    subtext: '4-Stage pipeline & system specs', 
    Icon: Layers 
  },
  { 
    id: 'compliance', 
    label: 'Stopping Rules & Guardrails', 
    subtext: 'RBI regulations & FinOps boundaries', 
    Icon: Sliders 
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100%',
        width: '330px',
        background: '#000000',
        borderRight: '1px solid #1e1e24',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '26px 0',
        userSelect: 'none',
      }}
    >
      {/* Top Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        
        {/* Brand Header */}
        <div
          style={{
            padding: '0 26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #1e1e24',
            paddingBottom: '22px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#18181b', border: '1px solid #27272a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity size={22} color="#10b981" />
            </div>
            <div>
              <div style={{ fontWeight: 900, fontSize: '22px', color: '#ffffff', letterSpacing: '0.01em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Kintsugi
              </div>
              <div className="font-mono" style={{ fontSize: '12px', color: '#71717a', letterSpacing: '0.06em' }}>RAZORPAY RECOVERY MESH</div>
            </div>
          </div>
          <span
            className="font-mono"
            style={{
              fontSize: '12px',
              background: '#18181b',
              border: '1px solid #27272a',
              padding: '4px 10px',
              color: '#34d399',
              fontWeight: 800,
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981' }}></span>
            ONLINE
          </span>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '0 16px' }}>
          <div className="font-mono" style={{ padding: '0 10px', fontSize: '13px', color: '#71717a', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            NAVIGATION
          </div>

          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            const ItemIcon = item.Icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  padding: '16px 18px',
                  background: isActive ? '#18181b' : 'transparent',
                  color: isActive ? '#ffffff' : '#a1a1aa',
                  borderRadius: '8px',
                  border: isActive ? '1px solid #3f3f46' : '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  textAlign: 'left',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#121214';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderColor = '#27272a';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#a1a1aa';
                    e.currentTarget.style.borderColor = 'transparent';
                  }
                }}
              >
                <div style={{ marginTop: '2px' }}>
                  <ItemIcon size={22} color={isActive ? '#ffffff' : '#71717a'} />
                </div>
                <div>
                  <div style={{ fontWeight: isActive ? 800 : 700, fontSize: '17px', lineHeight: 1.3, color: isActive ? '#ffffff' : '#d4d4d8' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '14px', color: '#71717a', marginTop: '4px', fontWeight: 500 }}>
                    {item.subtext}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section - System Status */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div
          style={{
            padding: '18px',
            background: '#09090b',
            border: '1px solid #27272a',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="font-mono" style={{ fontSize: '14px', color: '#a1a1aa', fontWeight: 700 }}>
              NPCI Telemetry Stream
            </span>
            <span className="font-mono" style={{ fontSize: '14px', color: '#34d399', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} className="pulse-indicator"></span>
              Connected
            </span>
          </div>
          <div style={{ fontSize: '14px', color: '#71717a', lineHeight: 1.45 }}>
            Real-time webhook ingestion and automatic rail failover logic.
          </div>
        </div>

        <div style={{ textAlign: 'center', fontSize: '13px', color: '#52525b', letterSpacing: '0.04em' }} className="font-mono">
          Enterprise Payment Resilience Engine
        </div>
      </div>
    </aside>
  );
};
