import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { LATO, MONO, C, SPR } from '../scaffold/neu-primitives';

export const BUGWISE_DEMO_FRAMES = 240;

const BG      = '#080d18';
const RED     = '#ef4444';
const GREEN   = '#22c55e';
const BLUE    = '#3b82f6';
const AMBER   = '#f59e0b';
const CYAN    = '#22d3ee';
const WHITE   = '#ffffff';
const DIM     = 'rgba(255,255,255,0.48)';
const CARD    = 'rgba(255,255,255,0.04)';
const BORDER  = 'rgba(255,255,255,0.09)';

const CODE_LINES = [
  { text: 'const client = new OpenAI({ apiKey: ', redacted: '[REDACTED_OPENAI_KEY]', suffix: ' });' },
  { text: 'mongoose.connect(', redacted: '[REDACTED_MONGODB_URI]', suffix: ');' },
  { text: 'user.email  = ', redacted: '[REDACTED_EMAIL]', suffix: '' },
  { text: 'Authorization: Bearer ', redacted: '[REDACTED_JWT_TOKEN]', suffix: '' },
];

const ARTIFACTS = [
  { label: 'Test Plan',      color: BLUE,  items: ['Risk Assessment', 'Priority Matrix', 'Scope Definition'] },
  { label: 'Manual Cases',   color: AMBER, items: ['Happy Path', 'Edge Cases', 'Security Scenarios (40%+)'] },
  { label: 'Gherkin Scripts',color: CYAN,  items: ['Given / When / Then', 'BDD-ready .feature', 'Cucumber / Behave'] },
];

const EXPORTS = ['PDF', 'CSV', '.feature'];

export const Scene16JaimitDemo: React.FC = () => {
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

  const subOp = interpolate(frame, [34, 50], [0, 1], C);

  // Code block
  const codeP  = spring({ frame: frame - 52, fps, config: { damping: 200, stiffness: 220 } });
  const codeOp = interpolate(codeP, [0, .4], [0, 1], C);
  const codeY  = interpolate(codeP, [0, 1], [16, 0], C);

  // Redaction tokens stagger in
  const redactOp = (i: number) => interpolate(frame, [68 + i * 6, 82 + i * 6], [0, 1], C);

  // Shield
  const shieldP  = spring({ frame: frame - 94, fps, config: { damping: 120, stiffness: 280, mass: 0.8 } });
  const shieldS  = interpolate(shieldP, [0, 1], [0.6, 1], C);
  const shieldOp = interpolate(shieldP, [0, .3], [0, 1], C);

  // Artifact cards
  const cardOp = (i: number) => {
    const p = spring({ frame: frame - (112 + i * 16), fps, config: SPR });
    return interpolate(p, [0, .5], [0, 1], C);
  };
  const cardY = (i: number) => {
    const p = spring({ frame: frame - (112 + i * 16), fps, config: SPR });
    return interpolate(p, [0, 1], [22, 0], C);
  };

  // Export badges
  const exportOp = (i: number) => interpolate(frame, [162 + i * 10, 178 + i * 10], [0, 1], C);

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
          BUG-WISE
        </div>
        <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.20em', color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase' }}>
          AI QA Co-Pilot · Enterprise
        </span>
      </div>

      {/* Headline */}
      <div style={{ position: 'absolute', top: 148, left: 120, right: 120 }}>
        <div style={{
          fontFamily: LATO, fontSize: 96, fontWeight: 900,
          color: WHITE, letterSpacing: '-0.03em', lineHeight: 1.0,
          opacity: h1Op, transform: `translateY(${h1Y}px)`,
        }}>
          Paste code.
        </div>
        <div style={{
          fontFamily: LATO, fontSize: 96, fontWeight: 900,
          letterSpacing: '-0.03em', lineHeight: 1.0,
          opacity: h2Op, transform: `translateY(${h2Y}px)`,
        }}>
          Ship with <span style={{ color: GREEN }}>confidence.</span>
        </div>
        <div style={{
          fontFamily: LATO, fontSize: 19, fontWeight: 300, color: DIM,
          lineHeight: 1.65, marginTop: 18, opacity: subOp,
        }}>
          AI-generated Test Plans, Manual Cases, and Gherkin Scripts — with a Privacy Shield that redacts secrets before they ever reach the LLM.
        </div>
      </div>

      {/* Code block with redactions */}
      <div style={{
        position: 'absolute', top: 446, left: 120,
        opacity: codeOp, transform: `translateY(${codeY}px)`,
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}`,
          borderLeft: `3px solid ${RED}`, borderRadius: 8,
          padding: '16px 20px', minWidth: 680,
        }}>
          <div style={{ fontFamily: MONO, fontSize: 10, color: RED, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
            🛡 Privacy Shield — input sanitised
          </div>
          {CODE_LINES.map((line, i) => (
            <div key={i} style={{ fontFamily: MONO, fontSize: 13, lineHeight: 2.0, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ color: DIM }}>{line.text}</span>
              <span style={{
                color: AMBER, background: 'rgba(245,158,11,0.15)',
                borderRadius: 3, padding: '1px 6px', margin: '0 2px',
                opacity: redactOp(i),
              }}>
                {line.redacted}
              </span>
              {line.suffix && <span style={{ color: DIM }}>{line.suffix}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Shield badge */}
      <div style={{
        position: 'absolute', top: 604, left: 120,
        display: 'flex', alignItems: 'center', gap: 10,
        border: `1px solid rgba(34,197,94,0.35)`, borderRadius: 6, padding: '8px 16px',
        opacity: shieldOp, transform: `scale(${shieldS})`, transformOrigin: 'left center',
      }}>
        <span style={{ fontSize: 14 }}>🔒</span>
        <span style={{ fontFamily: MONO, fontSize: 10, color: GREEN, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          20+ patterns · Zero secrets exposed
        </span>
      </div>

      {/* Artifact cards */}
      <div style={{
        position: 'absolute', bottom: 100, left: 120, right: 120,
        display: 'flex', gap: 20,
      }}>
        {ARTIFACTS.map((a, i) => (
          <div key={i} style={{
            flex: 1, background: CARD,
            border: `1px solid ${BORDER}`,
            borderTop: `3px solid ${a.color}`,
            borderRadius: 8, padding: '20px 18px',
            opacity: cardOp(i), transform: `translateY(${cardY(i)}px)`,
          }}>
            <div style={{
              fontFamily: MONO, fontSize: 10, letterSpacing: '0.14em',
              color: a.color, textTransform: 'uppercase', marginBottom: 14,
            }}>
              {a.label}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {a.items.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: a.color, flexShrink: 0 }} />
                  <span style={{ fontFamily: LATO, fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.70)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Export badges */}
      <div style={{
        position: 'absolute', bottom: 52, left: 120,
        display: 'flex', gap: 10, alignItems: 'center',
      }}>
        <span style={{ fontFamily: MONO, fontSize: 10, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.14em', textTransform: 'uppercase', marginRight: 4 }}>
          Export
        </span>
        {EXPORTS.map((fmt, i) => (
          <div key={fmt} style={{
            fontFamily: MONO, fontSize: 11, color: CYAN,
            border: `1px solid rgba(34,211,238,0.3)`, borderRadius: 4,
            padding: '3px 10px', letterSpacing: '0.08em',
            opacity: exportOp(i),
          }}>
            {fmt}
          </div>
        ))}
      </div>

    </AbsoluteFill>
  );
};
