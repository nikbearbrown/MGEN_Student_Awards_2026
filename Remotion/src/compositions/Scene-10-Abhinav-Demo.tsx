import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { LATO, MONO, C, SPR } from '../scaffold/neu-primitives';

export const JOBSEKR_DEMO_FRAMES = 210;

const BG     = '#ffffff';
const PURPLE = '#6366f1';
const DARK   = '#0f172a';
const MUTED  = '#64748b';
const BORDER = '#e2e8f0';
const LIGHT  = '#f8fafc';

const FEATURES = [
  { icon: '⚡', title: 'Fresh postings',         desc: 'Jobs pulled directly from company career pages the moment they go live.' },
  { icon: '🔍', title: 'One search, all sources', desc: 'Jobs from hundreds of companies across multiple career platforms in one feed.' },
  { icon: '📊', title: 'Track your progress',     desc: 'Save jobs, track applications, update statuses and visualize your pipeline.' },
];

export const Scene10AbhinavDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerP  = spring({ frame, fps, config: SPR });
  const headerOp = interpolate(headerP, [0, .4], [0, 1], C);

  const h1P  = spring({ frame: frame - 10, fps, config: { damping: 200, stiffness: 260 } });
  const h1Y  = interpolate(h1P, [0, 1], [50, 0], C);
  const h1Op = interpolate(h1P, [0, .3], [0, 1], C);

  const h2P  = spring({ frame: frame - 20, fps, config: { damping: 200, stiffness: 260 } });
  const h2Y  = interpolate(h2P, [0, 1], [50, 0], C);
  const h2Op = interpolate(h2P, [0, .3], [0, 1], C);

  const statsOp = interpolate(frame, [38, 52], [0, 1], C);

  const cardOp = (i: number) => {
    const p = spring({ frame: frame - (62 + i * 12), fps, config: SPR });
    return interpolate(p, [0, .5], [0, 1], C);
  };
  const cardY = (i: number) => {
    const p = spring({ frame: frame - (62 + i * 12), fps, config: SPR });
    return interpolate(p, [0, 1], [20, 0], C);
  };

  return (
    <AbsoluteFill style={{ background: BG }}>

      {/* Top nav bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 60,
        background: BG, borderBottom: `1px solid ${BORDER}`,
        display: 'flex', alignItems: 'center', paddingLeft: 120, paddingRight: 120,
        opacity: headerOp,
      }}>
        <div style={{ fontFamily: LATO, fontSize: 22, fontWeight: 900, color: PURPLE, letterSpacing: '-0.01em' }}>
          Jobsekr
        </div>
        <div style={{
          marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(34,197,94,0.10)', borderRadius: 20, padding: '5px 14px',
        }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e' }} />
          <span style={{ fontFamily: MONO, fontSize: 11, color: '#22c55e', letterSpacing: '0.08em' }}>
            126,158 jobs live from 1,651 companies
          </span>
        </div>
      </div>

      {/* Headline */}
      <div style={{ position: 'absolute', top: 140, left: 120, right: 200 }}>
        <div style={{
          fontFamily: LATO, fontSize: 88, fontWeight: 900,
          color: DARK, letterSpacing: '-0.03em', lineHeight: 1.0,
          opacity: h1Op, transform: `translateY(${h1Y}px)`,
        }}>
          Every new job posting,
        </div>
        <div style={{
          fontFamily: LATO, fontSize: 88, fontWeight: 900,
          letterSpacing: '-0.03em', lineHeight: 1.0,
          opacity: h2Op, transform: `translateY(${h2Y}px)`,
        }}>
          <span style={{ color: PURPLE }}>in one</span>
          <span style={{ color: DARK }}> place</span>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        position: 'absolute', top: 390, left: 120,
        display: 'flex', gap: 64, opacity: statsOp,
      }}>
        {[{ v: '126,158', l: 'Active jobs' }, { v: '1,651', l: 'Companies' }].map(s => (
          <div key={s.l}>
            <div style={{ fontFamily: LATO, fontSize: 48, fontWeight: 900, color: PURPLE, letterSpacing: '-0.02em', lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontFamily: MONO, fontSize: 11, color: MUTED, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 6 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Feature cards */}
      <div style={{
        position: 'absolute', bottom: 72, left: 120, right: 120,
        display: 'flex', gap: 24,
      }}>
        {FEATURES.map((f, i) => (
          <div key={i} style={{
            flex: 1, background: LIGHT, border: `1px solid ${BORDER}`,
            borderTop: `3px solid ${PURPLE}`, borderRadius: 10,
            padding: '24px 22px',
            opacity: cardOp(i), transform: `translateY(${cardY(i)}px)`,
          }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
            <div style={{ fontFamily: LATO, fontSize: 16, fontWeight: 700, color: DARK, marginBottom: 8 }}>{f.title}</div>
            <div style={{ fontFamily: LATO, fontSize: 14, fontWeight: 300, color: MUTED, lineHeight: 1.6 }}>{f.desc}</div>
          </div>
        ))}
      </div>

    </AbsoluteFill>
  );
};
