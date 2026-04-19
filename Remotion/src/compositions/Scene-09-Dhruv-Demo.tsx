import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { LATO, MONO, C, SPR } from '../scaffold/neu-primitives';

export const DEVPROOF_DEMO_FRAMES = 210;

const BG      = '#0d0d0d';
const GREEN   = '#22c55e';
const AMBER   = '#f59e0b';
const WHITE   = '#ffffff';
const DIM     = 'rgba(255,255,255,0.45)';
const BORDER  = 'rgba(255,255,255,0.10)';

const SCORE_ROWS = [
  { label: 'Features',     score: '40/40',  color: GREEN },
  { label: 'Architecture', score: '11/15',  color: GREEN },
  { label: 'Intent',       score: '11/25',  color: AMBER },
  { label: 'Forensics',    score: '5/20',   color: AMBER },
];

export const Scene09DhruvDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const h1P  = spring({ frame, fps, config: { damping: 200, stiffness: 260 } });
  const h1Op = interpolate(h1P, [0, .3], [0, 1], C);
  const h1Y  = interpolate(h1P, [0,  1], [48, 0], C);

  const h2P  = spring({ frame: frame - 12, fps, config: { damping: 200, stiffness: 260 } });
  const h2Op = interpolate(h2P, [0, .3], [0, 1], C);
  const h2Y  = interpolate(h2P, [0,  1], [48, 0], C);

  const subOp = interpolate(frame, [20, 36], [0, 1], C);
  const badgeOp = interpolate(frame, [24, 38], [0, 1], C);
  const termOp = interpolate(frame, [36, 52], [0, 1], C);

  const rowOp = (i: number) => {
    const p = spring({ frame: frame - (60 + i * 8), fps, config: SPR });
    return interpolate(p, [0, .5], [0, 1], C);
  };
  const scoreP  = spring({ frame: frame - 100, fps, config: SPR });
  const scoreOp = interpolate(scoreP, [0, .5], [0, 1], C);

  return (
    <AbsoluteFill style={{ background: BG }}>

      {/* Left: Headline */}
      <div style={{ position: 'absolute', top: 180, left: 120, right: 820 }}>
        <div style={{
          fontFamily: LATO, fontSize: 76, fontWeight: 900,
          color: WHITE, letterSpacing: '-0.03em', lineHeight: 1.05,
          opacity: h1Op, transform: `translateY(${h1Y}px)`,
        }}>
          Prove What You Build.
        </div>
        <div style={{
          fontFamily: LATO, fontSize: 76, fontWeight: 900,
          color: GREEN, letterSpacing: '-0.03em', lineHeight: 1.05,
          opacity: h2Op, transform: `translateY(${h2Y}px)`,
        }}>
          Land The Job.
        </div>
        <div style={{
          fontFamily: LATO, fontSize: 18, fontWeight: 300, color: DIM,
          lineHeight: 1.65, marginTop: 24, opacity: subOp,
        }}>
          AI-verified portfolio that recruiters actually trust.
          Score repos, prove your skills, stand out in every application.
        </div>

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 32,
          background: 'rgba(34,197,94,0.12)', border: `1px solid rgba(34,197,94,0.3)`,
          borderRadius: 20, padding: '6px 16px', opacity: badgeOp,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: GREEN }} />
          <span style={{ fontFamily: MONO, fontSize: 12, color: GREEN, letterSpacing: '0.08em' }}>
            521,033 issues indexed
          </span>
        </div>
      </div>

      {/* Right: Terminal window */}
      <div style={{
        position: 'absolute', top: 140, right: 100,
        width: 680, opacity: termOp,
      }}>
        {/* Window chrome */}
        <div style={{
          background: '#1c1c1c', borderRadius: '8px 8px 0 0',
          padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 8,
        }}>
          {['#ef4444','#f59e0b','#22c55e'].map(c => (
            <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
          ))}
          <span style={{ fontFamily: MONO, fontSize: 11, color: 'rgba(255,255,255,0.35)', marginLeft: 12, letterSpacing: '0.06em' }}>
            devproof — zsh
          </span>
        </div>

        {/* Terminal body */}
        <div style={{
          background: '#111', border: `1px solid ${BORDER}`,
          borderTop: 'none', borderRadius: '0 0 8px 8px',
          padding: '24px 28px',
          fontFamily: MONO, fontSize: 14,
        }}>
          <div style={{ color: GREEN, marginBottom: 6 }}>
            {'>'} <span style={{ color: WHITE }}>devproof score dhruv0206/Clawkathon</span>
          </div>
          <div style={{ color: DIM, marginBottom: 14 }}>Scanning dhruv0206/Clawkathon...</div>
          <div style={{ color: GREEN, marginBottom: 20 }}>
            ✓ Stack detected: Python, TypeScript, FastAPI, Next.js, React
          </div>

          {/* Score rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
            {SCORE_ROWS.map((r, i) => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', opacity: rowOp(i) }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', minWidth: 130 }}>{r.label}</span>
                <span style={{ color: r.color }}>{r.score}</span>
              </div>
            ))}
          </div>

          {/* Final score */}
          <div style={{
            borderTop: `1px solid ${BORDER}`, paddingTop: 16,
            display: 'flex', alignItems: 'baseline', gap: 12,
            opacity: scoreOp,
          }}>
            <span style={{ color: DIM }}>Score:</span>
            <span style={{ color: WHITE, fontSize: 22, fontWeight: 700 }}>67/100</span>
            <span style={{ color: AMBER, fontSize: 12, letterSpacing: '0.1em' }}>INTERMEDIATE</span>
          </div>
        </div>
      </div>

    </AbsoluteFill>
  );
};
