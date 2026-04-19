import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { LATO, MONO, C, SPR } from '../scaffold/neu-primitives';

export const QEMAG_DEMO_FRAMES = 210;

const BG      = '#f8f8f8';
const DARK    = '#111827';
const BLUE    = '#1d4ed8';
const PURPLE  = '#7c3aed';
const MUTED   = '#6b7280';
const BORDER  = '#e5e7eb';

const KEYWORDS = [
  'Artificial Intelligence', 'Quantum Computing', 'Graph Neural Networks',
  'QRAM', 'Quantum Memory', 'Hopfield Networks', 'Feasibility Analysis',
];

export const Scene08AravindDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerP  = spring({ frame, fps, config: SPR });
  const headerOp = interpolate(headerP, [0, .4], [0, 1], C);
  const headerY  = interpolate(headerP, [0,  1], [-24, 0], C);

  const titleP  = spring({ frame: frame - 14, fps, config: { damping: 200, stiffness: 240 } });
  const titleOp = interpolate(titleP, [0, .3], [0, 1], C);
  const titleY  = interpolate(titleP, [0,  1], [30, 0], C);

  const abstractP  = spring({ frame: frame - 32, fps, config: SPR });
  const abstractOp = interpolate(abstractP, [0, .4], [0, 1], C);

  const kwOp = (i: number) => {
    const p = spring({ frame: frame - (80 + i * 7), fps, config: SPR });
    return interpolate(p, [0, .5], [0, 1], C);
  };

  return (
    <AbsoluteFill style={{ background: BG }}>

      {/* Paper header bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 6,
        background: `linear-gradient(90deg, ${BLUE} 0%, ${PURPLE} 100%)`,
      }} />

      {/* arXiv / publication badge */}
      <div style={{
        position: 'absolute', top: 56, left: 120,
        opacity: headerOp, transform: `translateY(${headerY}px)`,
        display: 'flex', alignItems: 'center', gap: 20,
      }}>
        <div style={{
          background: '#b91c1c', borderRadius: 4, padding: '4px 12px',
          fontFamily: MONO, fontSize: 13, fontWeight: 600, color: '#fff', letterSpacing: '0.08em',
        }}>arXiv</div>
        <span style={{ fontFamily: MONO, fontSize: 12, color: MUTED, letterSpacing: '0.08em' }}>
          NORTHEASTERN UNIVERSITY · MSIS 2026 · Nik Bear Brown (Researcher)
        </span>
      </div>

      {/* Paper title */}
      <div style={{
        position: 'absolute', top: 150, left: 120, right: 120,
        opacity: titleOp, transform: `translateY(${titleY}px)`,
      }}>
        <div style={{
          fontFamily: LATO, fontSize: 48, fontWeight: 900,
          color: DARK, letterSpacing: '-0.02em', lineHeight: 1.18,
        }}>
          Quantum-Enhanced Memory Architectures<br />
          for Graph-Based AI Systems
        </div>
        <div style={{
          fontFamily: LATO, fontSize: 24, fontWeight: 300,
          color: MUTED, letterSpacing: '-0.01em', lineHeight: 1.4, marginTop: 12,
        }}>
          A Theoretical Framework with Feasibility Analysis
        </div>
        <div style={{
          fontFamily: MONO, fontSize: 13, color: BLUE, letterSpacing: '0.04em', marginTop: 20,
        }}>
          Aravind Balaji · Northeastern University · February 2026
        </div>
      </div>

      {/* Divider */}
      <div style={{ position: 'absolute', top: 370, left: 120, right: 120, height: 1, background: BORDER, opacity: titleOp }} />

      {/* Abstract excerpt */}
      <div style={{
        position: 'absolute', top: 398, left: 120, right: 120,
        opacity: abstractOp,
      }}>
        <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 600, color: MUTED, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 14 }}>
          Abstract
        </div>
        <div style={{
          fontFamily: LATO, fontSize: 17, fontWeight: 300,
          color: '#374151', lineHeight: 1.75,
          maxWidth: 960,
        }}>
          Graph Neural Networks (GNNs) face critical computational and memory bottlenecks
          when scaling to large graphs. This paper proposes QEMA-G — a theoretical framework
          integrating quantum-enhanced computational memory architectures for graph-based AI.
          We provide a QRAM-backed graph store, a quantum message-passing mechanism, and a
          hybrid attention module addressing performance constraints over two regimes.
        </div>
      </div>

      {/* Keywords */}
      <div style={{
        position: 'absolute', bottom: 80, left: 120, right: 120,
        display: 'flex', flexWrap: 'wrap', gap: 10,
      }}>
        {KEYWORDS.map((kw, i) => (
          <div key={kw} style={{
            fontFamily: MONO, fontSize: 11, letterSpacing: '0.06em',
            color: BLUE, border: `1px solid ${BORDER}`,
            background: '#fff', borderRadius: 4, padding: '5px 12px',
            opacity: kwOp(i),
          }}>
            {kw}
          </div>
        ))}
      </div>

    </AbsoluteFill>
  );
};
