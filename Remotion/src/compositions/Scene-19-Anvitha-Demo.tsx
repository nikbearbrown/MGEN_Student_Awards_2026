import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { LATO, MONO, C, SPR } from '../scaffold/neu-primitives';

export const ANVITHA_DEMO_FRAMES = 240;

const BG     = '#06060e';
const PURPLE = '#a78bfa';
const BLUE   = '#60a5fa';
const GREEN  = '#22c55e';
const AMBER  = '#f59e0b';
const WHITE  = '#ffffff';
const DIM    = 'rgba(255,255,255,0.50)';
const CARD   = 'rgba(255,255,255,0.05)';
const BORDER = 'rgba(255,255,255,0.10)';

const PIPELINE = [
  { step: '01', label: 'Sample',     desc: '8 candidates\nper problem',  color: BLUE   },
  { step: '02', label: 'Reward',     desc: 'Verify\ncorrectness',        color: PURPLE },
  { step: '03', label: 'V* Estimate',desc: 'Critic-free\nvalue',         color: AMBER  },
  { step: '04', label: 'Advantage',  desc: 'Compare vs\naverage',        color: GREEN  },
];

const BAR_MAX_PX = 500;

export const Scene19AnvithaDemo: React.FC = () => {
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

  const bar1P = spring({ frame: frame - 56, fps, config: { damping: 180, stiffness: 140 } });
  const bar1W = interpolate(bar1P, [0, 1], [0, BAR_MAX_PX * 0.33], C);

  const bar2P = spring({ frame: frame - 70, fps, config: { damping: 180, stiffness: 140 } });
  const bar2W = interpolate(bar2P, [0, 1], [0, BAR_MAX_PX * 0.70], C);

  const labelsOp = interpolate(frame, [74, 90], [0, 1], C);
  const gapOp    = interpolate(frame, [90, 108], [0, 1], C);

  const cardOp = (i: number) => {
    const p = spring({ frame: frame - (118 + i * 14), fps, config: SPR });
    return interpolate(p, [0, .5], [0, 1], C);
  };
  const cardY = (i: number) => {
    const p = spring({ frame: frame - (118 + i * 14), fps, config: SPR });
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
          background: PURPLE, borderRadius: 4, padding: '3px 10px',
          fontFamily: MONO, fontSize: 11, fontWeight: 700, color: WHITE, letterSpacing: '0.12em',
        }}>
          MEDIUM
        </div>
        <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.20em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
          ML Research · A*-PO · LLM Self-Correction
        </span>
      </div>

      {/* Headline */}
      <div style={{ position: 'absolute', top: 148, left: 120, right: 120 }}>
        <div style={{
          fontFamily: LATO, fontSize: 96, fontWeight: 900,
          color: WHITE, letterSpacing: '-0.03em', lineHeight: 1.0,
          opacity: h1Op, transform: `translateY(${h1Y}px)`,
        }}>
          Rethinking
        </div>
        <div style={{
          fontFamily: LATO, fontSize: 96, fontWeight: 900,
          letterSpacing: '-0.03em', lineHeight: 1.0,
          opacity: h2Op, transform: `translateY(${h2Y}px)`,
        }}>
          <span style={{ color: PURPLE }}>PPO</span>
          <span style={{ color: WHITE }}> with A*-PO</span>
        </div>
        <div style={{
          fontFamily: LATO, fontSize: 19, fontWeight: 300, color: DIM,
          lineHeight: 1.65, marginTop: 18, opacity: subOp,
        }}>
          Critic-free value estimation closes the gap between what a model knows and what it reliably produces.
        </div>
      </div>

      {/* Accuracy bars */}
      <div style={{ position: 'absolute', top: 450, left: 120, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Direct */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 120, fontFamily: MONO, fontSize: 10, color: DIM, letterSpacing: '0.12em', textTransform: 'uppercase', textAlign: 'right' }}>
            Direct
          </div>
          <div style={{ width: BAR_MAX_PX, height: 34, background: 'rgba(255,255,255,0.06)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{
              width: bar1W, height: '100%',
              background: `linear-gradient(90deg, ${BLUE}, ${PURPLE})`,
              borderRadius: 4,
            }} />
          </div>
          <div style={{ fontFamily: LATO, fontSize: 30, fontWeight: 900, color: BLUE, width: 70, opacity: labelsOp }}>33%</div>
        </div>

        {/* Potential */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 120, fontFamily: MONO, fontSize: 10, color: DIM, letterSpacing: '0.12em', textTransform: 'uppercase', textAlign: 'right' }}>
            Potential
          </div>
          <div style={{ width: BAR_MAX_PX, height: 34, background: 'rgba(255,255,255,0.06)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{
              width: bar2W, height: '100%',
              background: `linear-gradient(90deg, ${GREEN}, #34d399)`,
              borderRadius: 4,
            }} />
          </div>
          <div style={{ fontFamily: LATO, fontSize: 30, fontWeight: 900, color: GREEN, width: 70, opacity: labelsOp }}>70%</div>
        </div>

        <div style={{
          marginLeft: 140, fontFamily: LATO, fontSize: 13, fontWeight: 300,
          color: 'rgba(255,255,255,0.32)', opacity: gapOp, marginTop: 2,
        }}>
          The 37-point gap is the hidden capability A*-PO is designed to unlock
        </div>
      </div>

      {/* Pipeline cards */}
      <div style={{
        position: 'absolute', bottom: 60, left: 120, right: 120,
        display: 'flex', gap: 20,
      }}>
        {PIPELINE.map((p, i) => (
          <div key={i} style={{
            flex: 1, background: CARD,
            border: `1px solid ${BORDER}`,
            borderTop: `3px solid ${p.color}`,
            borderRadius: 8, padding: '18px 16px',
            opacity: cardOp(i), transform: `translateY(${cardY(i)}px)`,
          }}>
            <div style={{ fontFamily: MONO, fontSize: 10, color: p.color, letterSpacing: '0.14em', marginBottom: 8 }}>
              {p.step}
            </div>
            <div style={{ fontFamily: LATO, fontSize: 15, fontWeight: 700, color: WHITE, marginBottom: 6 }}>
              {p.label}
            </div>
            <div style={{ fontFamily: LATO, fontSize: 13, fontWeight: 300, color: DIM, lineHeight: 1.55, whiteSpace: 'pre-line' }}>
              {p.desc}
            </div>
          </div>
        ))}
      </div>

    </AbsoluteFill>
  );
};
