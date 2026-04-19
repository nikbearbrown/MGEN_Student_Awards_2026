import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { LATO, MONO, C, SPR } from '../scaffold/neu-primitives';

export const SMARTSIGHT_DEMO_FRAMES = 210;

const BG    = '#0d1b2a';
const GREEN = '#22c55e';
const WHITE = '#ffffff';

const STATS = [
  { value: '0',  label: 'Screens required' },
  { value: '0',  label: 'Taps required' },
  { value: '4',  label: 'Pipeline stages' },
  { value: '∞',  label: 'Accessibility' },
];

export const Scene07ZekunDemo: React.FC = () => {
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

  const h3P  = spring({ frame: frame - 30, fps, config: { damping: 200, stiffness: 260 } });
  const h3Y  = interpolate(h3P, [0, 1], [50, 0], C);
  const h3Op = interpolate(h3P, [0, .3], [0, 1], C);

  const bodyOp = interpolate(frame, [44, 60], [0, 1], C);
  const teamOp = interpolate(frame, [50, 66], [0, 1], C);

  const statOp = (i: number) => {
    const p = spring({ frame: frame - (72 + i * 10), fps, config: SPR });
    return interpolate(p, [0, .5], [0, 1], C);
  };

  return (
    <AbsoluteFill style={{ background: BG }}>

      {/* Top eyebrow */}
      <div style={{
        position: 'absolute', top: 72, left: 120,
        display: 'flex', alignItems: 'center', gap: 16,
        opacity: eyeOp,
      }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontFamily: MONO, fontSize: 13, fontWeight: 600, color: '#fff' }}>S</div>
        </div>
        <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 600, color: WHITE, letterSpacing: '0.04em' }}>SmartSight</span>
      </div>

      {/* Headline */}
      <div style={{ position: 'absolute', top: 220, left: 120, right: 280 }}>
        <div style={{ fontFamily: LATO, fontSize: 100, fontWeight: 900, color: WHITE, letterSpacing: '-0.03em', lineHeight: 1.0, opacity: h1Op, transform: `translateY(${h1Y}px)` }}>
          Voice &amp; Vision
        </div>
        <div style={{ fontFamily: LATO, fontSize: 100, fontWeight: 900, color: WHITE, letterSpacing: '-0.03em', lineHeight: 1.0, opacity: h2Op, transform: `translateY(${h2Y}px)` }}>
          for the{' '}
          <span style={{ color: GREEN }}>visually</span>
        </div>
        <div style={{ fontFamily: LATO, fontSize: 100, fontWeight: 900, color: GREEN, letterSpacing: '-0.03em', lineHeight: 1.0, opacity: h3Op, transform: `translateY(${h3Y}px)` }}>
          impaired
        </div>
      </div>

      {/* Body */}
      <div style={{
        position: 'absolute', top: 575, left: 120, right: 600,
        fontFamily: LATO, fontSize: 19, fontWeight: 300,
        color: 'rgba(255,255,255,0.55)', lineHeight: 1.7,
        opacity: bodyOp,
      }}>
        SmartSight turns everyday smartphones into eyes that listen — empowering
        visually impaired users to navigate their world without screens, taps, or touch.
      </div>

      {/* Team pills */}
      <div style={{
        position: 'absolute', top: 680, left: 120,
        display: 'flex', gap: 12, opacity: teamOp,
      }}>
        {['Zekun Li', 'Haolei Zhou', 'Risa Tori'].map(name => (
          <div key={name} style={{
            fontFamily: MONO, fontSize: 12, letterSpacing: '0.06em',
            color: WHITE, border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: 4, padding: '6px 14px',
          }}>
            {name}
          </div>
        ))}
      </div>

      {/* Stats row */}
      <div style={{ position: 'absolute', bottom: 100, left: 120, right: 120, display: 'flex', gap: 0 }}>
        {STATS.map((s, i) => (
          <div key={i} style={{
            flex: 1, borderTop: `2px solid ${i === 0 ? GREEN : 'rgba(255,255,255,0.12)'}`,
            paddingTop: 18, paddingRight: 28, opacity: statOp(i),
          }}>
            <div style={{ fontFamily: LATO, fontSize: 50, fontWeight: 900, color: i < 2 ? GREEN : WHITE, letterSpacing: '-0.02em', lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontFamily: MONO, fontSize: 10, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 7 }}>{s.label}</div>
          </div>
        ))}
      </div>

    </AbsoluteFill>
  );
};
