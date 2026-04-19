import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { LATO, MONO, C, SPR } from '../scaffold/neu-primitives';

export const SAGE_DEMO_FRAMES = 210;

const BG     = '#0a0a0a';
const RED    = '#c8102e';
const GREEN  = '#22c55e';
const BLUE   = '#3b82f6';
const AMBER  = '#f59e0b';
const WHITE  = '#ffffff';
const DIM    = 'rgba(255,255,255,0.45)';
const CARD   = 'rgba(255,255,255,0.04)';
const BORDER = 'rgba(255,255,255,0.10)';

const ARTIFACTS = [
  { label: 'Test Plan',    color: BLUE,  items: ['Risk Assessment', 'Priority Matrix', 'Scope Definition'] },
  { label: 'Manual Cases', color: AMBER, items: ['Happy Path', 'Edge Cases', 'Error Scenarios'] },
  { label: 'Automation',   color: GREEN, items: ['Pytest Scripts', 'CI/CD Ready', 'Coverage Report'] },
];

export const Scene15YeshwanthDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyeP  = spring({ frame, fps, config: SPR });
  const eyeOp = interpolate(eyeP, [0, .4], [0, 1], C);

  const h1P  = spring({ frame: frame - 10, fps, config: { damping: 200, stiffness: 260 } });
  const h1Y  = interpolate(h1P, [0, 1], [50, 0], C);
  const h1Op = interpolate(h1P, [0, .3], [0, 1], C);

  const h2P  = spring({ frame: frame - 20, fps, config: { damping: 200, stiffness: 260 } });
  const h2Y  = interpolate(h2P, [0, 1], [50, 0], C);
  const h2Op = interpolate(h2P, [0, .3], [0, 1], C);

  const subOp = interpolate(frame, [32, 48], [0, 1], C);

  // Arrow + code line
  const codeP  = spring({ frame: frame - 46, fps, config: SPR });
  const codeOp = interpolate(codeP, [0, .5], [0, 1], C);

  const cardOp = (i: number) => {
    const p = spring({ frame: frame - (68 + i * 14), fps, config: SPR });
    return interpolate(p, [0, .5], [0, 1], C);
  };
  const cardY = (i: number) => {
    const p = spring({ frame: frame - (68 + i * 14), fps, config: SPR });
    return interpolate(p, [0, 1], [24, 0], C);
  };

  return (
    <AbsoluteFill style={{ background: BG }}>

      {/* Eyebrow */}
      <div style={{
        position: 'absolute', top: 64, left: 120,
        display: 'flex', alignItems: 'center', gap: 14, opacity: eyeOp,
      }}>
        <div style={{
          background: RED, borderRadius: 4, padding: '3px 10px',
          fontFamily: MONO, fontSize: 11, fontWeight: 700, color: WHITE, letterSpacing: '0.12em',
        }}>
          NU
        </div>
        <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.20em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
          AI Governance Engine · SAGE
        </span>
      </div>

      {/* Headline */}
      <div style={{ position: 'absolute', top: 168, left: 120, right: 200 }}>
        <div style={{
          fontFamily: LATO, fontSize: 100, fontWeight: 900,
          color: WHITE, letterSpacing: '-0.03em', lineHeight: 1.0,
          opacity: h1Op, transform: `translateY(${h1Y}px)`,
        }}>
          Code in.
        </div>
        <div style={{
          fontFamily: LATO, fontSize: 100, fontWeight: 900,
          color: WHITE, letterSpacing: '-0.03em', lineHeight: 1.0,
          opacity: h2Op, transform: `translateY(${h2Y}px)`,
        }}>
          Three test artifacts <span style={{ color: GREEN }}>out.</span>
        </div>
        <div style={{
          fontFamily: LATO, fontSize: 20, fontWeight: 300, color: DIM,
          lineHeight: 1.65, marginTop: 22, opacity: subOp,
        }}>
          One LangChain pipeline. Structured JSON output. Zero hallucinated test syntax.
        </div>
      </div>

      {/* Code input line */}
      <div style={{
        position: 'absolute', top: 460, left: 120,
        display: 'flex', alignItems: 'center', gap: 16,
        opacity: codeOp,
      }}>
        <div style={{
          background: CARD, border: `1px solid ${BORDER}`,
          borderRadius: 6, padding: '10px 20px',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ fontFamily: MONO, fontSize: 14, color: GREEN }}>{'>'}</span>
          <span style={{ fontFamily: MONO, fontSize: 14, color: WHITE }}>sage generate --from function.py</span>
          <span style={{ fontFamily: MONO, fontSize: 14, color: DIM, marginLeft: 8 }}>→ test_plan.json</span>
        </div>
      </div>

      {/* Artifact cards */}
      <div style={{
        position: 'absolute', bottom: 72, left: 120, right: 120,
        display: 'flex', gap: 24,
      }}>
        {ARTIFACTS.map((a, i) => (
          <div key={i} style={{
            flex: 1, background: CARD,
            border: `1px solid ${BORDER}`,
            borderTop: `3px solid ${a.color}`,
            borderRadius: 8, padding: '22px 20px',
            opacity: cardOp(i), transform: `translateY(${cardY(i)}px)`,
          }}>
            <div style={{
              fontFamily: MONO, fontSize: 11, letterSpacing: '0.14em',
              color: a.color, textTransform: 'uppercase', marginBottom: 16,
            }}>
              {a.label}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {a.items.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: a.color, flexShrink: 0 }} />
                  <span style={{ fontFamily: LATO, fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.70)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </AbsoluteFill>
  );
};
