import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { LATO, MONO, C, SPR } from '../scaffold/neu-primitives';

export const TENOVIO_DEMO_FRAMES = 210;

const BG     = '#0f172a';
const TEAL   = '#14b8a6';
const BLUE   = '#38bdf8';
const WHITE  = '#ffffff';
const DIM    = 'rgba(255,255,255,0.50)';
const CARD   = 'rgba(255,255,255,0.05)';
const BORDER = 'rgba(255,255,255,0.08)';

const FEATURES = [
  { icon: '🏠', title: 'Properties',  desc: 'Manage units, leases, and occupancy across your entire portfolio.' },
  { icon: '🔧', title: 'Maintenance', desc: 'Track work orders from tenant request to vendor completion.' },
  { icon: '💳', title: 'Payments',    desc: 'Automated rent collection, late fee tracking, and expense reporting.' },
  { icon: '📋', title: 'Documents',   desc: 'Leases, inspection reports, and vendor contracts in one secure place.' },
];

const DASH_STATS = [
  { value: '145',   label: 'Units' },
  { value: '94%',   label: 'Occupancy' },
  { value: '7',     label: 'Vendors' },
  { value: '$2.4k', label: 'Avg rent' },
];

export const Scene13BrianDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyeP  = spring({ frame, fps, config: SPR });
  const eyeOp = interpolate(eyeP, [0, .4], [0, 1], C);

  const h1P  = spring({ frame: frame - 12, fps, config: { damping: 200, stiffness: 260 } });
  const h1Y  = interpolate(h1P, [0, 1], [50, 0], C);
  const h1Op = interpolate(h1P, [0, .3], [0, 1], C);

  const h2P  = spring({ frame: frame - 22, fps, config: { damping: 200, stiffness: 260 } });
  const h2Y  = interpolate(h2P, [0, 1], [50, 0], C);
  const h2Op = interpolate(h2P, [0, .3], [0, 1], C);

  const dashOp = interpolate(frame, [36, 54], [0, 1], C);
  const dashY  = interpolate(frame, [36, 54], [16, 0], C);

  const cardOp = (i: number) => {
    const p = spring({ frame: frame - (62 + i * 10), fps, config: SPR });
    return interpolate(p, [0, .5], [0, 1], C);
  };

  return (
    <AbsoluteFill style={{ background: BG }}>

      {/* Eyebrow */}
      <div style={{
        position: 'absolute', top: 70, left: 120,
        display: 'flex', alignItems: 'center', gap: 14, opacity: eyeOp,
      }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: TEAL, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 14 }}>🏠</span>
        </div>
        <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.20em', color: TEAL, textTransform: 'uppercase' }}>
          Property Management Platform
        </span>
      </div>

      {/* Headline */}
      <div style={{ position: 'absolute', top: 168, left: 120, right: 260 }}>
        <div style={{
          fontFamily: LATO, fontSize: 88, fontWeight: 900,
          color: WHITE, letterSpacing: '-0.03em', lineHeight: 1.0,
          opacity: h1Op, transform: `translateY(${h1Y}px)`,
        }}>
          Run your properties
        </div>
        <div style={{
          fontFamily: LATO, fontSize: 88, fontWeight: 900,
          letterSpacing: '-0.03em', lineHeight: 1.0,
          opacity: h2Op, transform: `translateY(${h2Y}px)`,
        }}>
          from <span style={{ color: TEAL }}>one screen</span>
        </div>
      </div>

      {/* Dashboard stats strip */}
      <div style={{
        position: 'absolute', top: 418, left: 120, right: 120,
        display: 'flex', gap: 0,
        opacity: dashOp, transform: `translateY(${dashY}px)`,
      }}>
        {DASH_STATS.map((s, i) => (
          <div key={i} style={{
            flex: 1, background: CARD, border: `1px solid ${BORDER}`,
            borderLeft: i === 0 ? `1px solid ${BORDER}` : 'none',
            borderRadius: i === 0 ? '8px 0 0 8px' : i === 3 ? '0 8px 8px 0' : 0,
            padding: '16px 20px',
          }}>
            <div style={{ fontFamily: LATO, fontSize: 38, fontWeight: 900, color: TEAL, letterSpacing: '-0.02em', lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontFamily: MONO, fontSize: 10, color: DIM, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Feature cards */}
      <div style={{
        position: 'absolute', bottom: 64, left: 120, right: 120,
        display: 'flex', gap: 20,
      }}>
        {FEATURES.map((f, i) => (
          <div key={i} style={{
            flex: 1, background: CARD, border: `1px solid ${BORDER}`,
            borderTop: `3px solid ${TEAL}`, borderRadius: 8, padding: '18px 16px',
            opacity: cardOp(i),
          }}>
            <div style={{ fontSize: 22, marginBottom: 10 }}>{f.icon}</div>
            <div style={{ fontFamily: LATO, fontSize: 15, fontWeight: 700, color: WHITE, marginBottom: 8 }}>{f.title}</div>
            <div style={{ fontFamily: LATO, fontSize: 13, fontWeight: 300, color: DIM, lineHeight: 1.6 }}>{f.desc}</div>
          </div>
        ))}
      </div>

    </AbsoluteFill>
  );
};
