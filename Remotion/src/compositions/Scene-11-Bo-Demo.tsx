import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { LATO, MONO, C, SPR } from '../scaffold/neu-primitives';

export const LEETREVIEWER_DEMO_FRAMES = 210;

const BG     = '#ffffff';
const ORANGE = '#f89f1b';
const DARK   = '#1a1a1a';
const MUTED  = '#64748b';
const BORDER = '#e5e7eb';
const LIGHT  = '#fafafa';

const FEATURES = [
  {
    tag: 'Adaptive',
    title: 'Smart Review Engine',
    desc: 'Powered by memory algorithms to automatically schedule the next best time to revisit each problem.',
    color: '#dbeafe',
    tag_color: '#3b82f6',
  },
  {
    tag: 'Insightful',
    title: 'Progress Intelligence',
    desc: 'Daily dashboards, completion heatmaps, and overdue alerts keep you honest and consistent with your prep plan.',
    color: '#dcfce7',
    tag_color: '#16a34a',
  },
  {
    tag: 'Organised',
    title: 'Personal Knowledge Base',
    desc: 'Attach notes, difficulty tags, and learning milestones so you know exactly what to focus on.',
    color: '#fef9c3',
    tag_color: '#ca8a04',
  },
];

export const Scene11BoDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyeP  = spring({ frame, fps, config: SPR });
  const eyeOp = interpolate(eyeP, [0, .4], [0, 1], C);

  const h1P  = spring({ frame: frame - 10, fps, config: { damping: 200, stiffness: 260 } });
  const h1Y  = interpolate(h1P, [0, 1], [50, 0], C);
  const h1Op = interpolate(h1P, [0, .3], [0, 1], C);

  const h2P  = spring({ frame: frame - 22, fps, config: { damping: 200, stiffness: 260 } });
  const h2Y  = interpolate(h2P, [0, 1], [50, 0], C);
  const h2Op = interpolate(h2P, [0, .3], [0, 1], C);

  const subOp = interpolate(frame, [34, 50], [0, 1], C);

  const cardOp = (i: number) => {
    const p = spring({ frame: frame - (60 + i * 14), fps, config: SPR });
    return interpolate(p, [0, .5], [0, 1], C);
  };
  const cardY = (i: number) => {
    const p = spring({ frame: frame - (60 + i * 14), fps, config: SPR });
    return interpolate(p, [0, 1], [22, 0], C);
  };

  return (
    <AbsoluteFill style={{ background: BG }}>

      {/* Logo row */}
      <div style={{
        position: 'absolute', top: 64, left: 120,
        display: 'flex', alignItems: 'center', gap: 12, opacity: eyeOp,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 6,
          background: ORANGE,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 700, color: '#fff' }}>LR</span>
        </div>
        <span style={{ fontFamily: LATO, fontSize: 16, fontWeight: 700, color: DARK, letterSpacing: '-0.01em' }}>LeetReviewer</span>
      </div>

      {/* Headline */}
      <div style={{ position: 'absolute', top: 170, left: 120, right: 300 }}>
        <div style={{
          fontFamily: LATO, fontSize: 86, fontWeight: 900,
          color: DARK, letterSpacing: '-0.03em', lineHeight: 1.0,
          opacity: h1Op, transform: `translateY(${h1Y}px)`,
        }}>
          Master LeetCode
        </div>
        <div style={{
          fontFamily: LATO, fontSize: 86, fontWeight: 900,
          letterSpacing: '-0.03em', lineHeight: 1.0,
          opacity: h2Op, transform: `translateY(${h2Y}px)`,
        }}>
          with{' '}
          <span style={{ color: ORANGE }}>Memory Algorithm</span>
        </div>
        <div style={{
          fontFamily: LATO, fontSize: 20, fontWeight: 300, color: MUTED,
          marginTop: 22, lineHeight: 1.6, opacity: subOp,
        }}>
          Stop forgetting solutions. Our system plans your review rhythm so problems stay in your long-term memory.
        </div>
      </div>

      {/* Feature cards */}
      <div style={{
        position: 'absolute', bottom: 64, left: 120, right: 120,
        display: 'flex', gap: 24,
      }}>
        {FEATURES.map((f, i) => (
          <div key={i} style={{
            flex: 1, border: `1px solid ${BORDER}`,
            borderRadius: 10, padding: '22px 20px', background: LIGHT,
            opacity: cardOp(i), transform: `translateY(${cardY(i)}px)`,
          }}>
            <div style={{
              display: 'inline-block', fontFamily: MONO, fontSize: 10,
              letterSpacing: '0.10em', color: f.tag_color,
              background: f.color, borderRadius: 4, padding: '3px 10px',
              textTransform: 'uppercase', marginBottom: 14,
            }}>
              {f.tag}
            </div>
            <div style={{ fontFamily: LATO, fontSize: 16, fontWeight: 700, color: DARK, marginBottom: 10 }}>
              {f.title}
            </div>
            <div style={{ fontFamily: LATO, fontSize: 14, fontWeight: 300, color: MUTED, lineHeight: 1.65 }}>
              {f.desc}
            </div>
          </div>
        ))}
      </div>

    </AbsoluteFill>
  );
};
