import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { LATO, MONO, C, SPR } from '../scaffold/neu-primitives';

export const PODCASTIQ_DEMO_FRAMES = 210;

const BG     = '#09090f';
const ORANGE = '#f97316';
const PURPLE = '#a855f7';
const WHITE  = '#ffffff';

const STATS = [
  { value: '100+', label: 'Episodes covered' },
  { value: '12K+', label: 'Searchable segments' },
  { value: '6',    label: 'Agents' },
  { value: '768',  label: 'Embedding dimensions' },
];

export const Scene06AadarshDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyeP  = spring({ frame, fps, config: SPR });
  const eyeOp = interpolate(eyeP, [0, .4], [0, 1], C);
  const eyeY  = interpolate(eyeP, [0,  1], [-16, 0], C);

  const h1P  = spring({ frame: frame - 12, fps, config: { damping: 200, stiffness: 260 } });
  const h1Y  = interpolate(h1P, [0, 1], [60, 0], C);
  const h1Op = interpolate(h1P, [0, .3], [0, 1], C);

  const h2P  = spring({ frame: frame - 22, fps, config: { damping: 200, stiffness: 260 } });
  const h2Y  = interpolate(h2P, [0, 1], [60, 0], C);
  const h2Op = interpolate(h2P, [0, .3], [0, 1], C);

  const bodyOp = interpolate(frame, [36, 52], [0, 1], C);

  const statOp = (i: number) => {
    const p = spring({ frame: frame - (60 + i * 10), fps, config: SPR });
    return interpolate(p, [0, .5], [0, 1], C);
  };

  return (
    <AbsoluteFill style={{ background: BG }}>

      {/* Eyebrow */}
      <div style={{
        position: 'absolute', top: 80, left: 120,
        fontFamily: MONO, fontSize: 12, letterSpacing: '0.22em',
        color: ORANGE, textTransform: 'uppercase',
        opacity: eyeOp, transform: `translateY(${eyeY}px)`,
      }}>
        — AI Podcast Intelligence Platform
      </div>

      {/* Headline */}
      <div style={{ position: 'absolute', top: 260, left: 120, right: 200 }}>
        <div style={{
          fontFamily: LATO, fontSize: 92, fontWeight: 900,
          color: WHITE, letterSpacing: '-0.03em', lineHeight: 1.0,
          opacity: h1Op, transform: `translateY(${h1Y}px)`,
        }}>
          Audio content as
        </div>
        <div style={{
          fontFamily: LATO, fontSize: 92, fontWeight: 900,
          letterSpacing: '-0.03em', lineHeight: 1.0,
          background: `linear-gradient(90deg, ${ORANGE} 0%, ${PURPLE} 100%)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          opacity: h2Op, transform: `translateY(${h2Y}px)`,
        }}>
          searchable as the web
        </div>
      </div>

      {/* Body copy */}
      <div style={{
        position: 'absolute', top: 530, left: 120, right: 640,
        fontFamily: LATO, fontSize: 20, fontWeight: 300,
        color: 'rgba(255,255,255,0.55)', lineHeight: 1.7,
        opacity: bodyOp,
      }}>
        PodcastIQ uses semantic search, multi-agent AI, and RAG architecture to
        transform thousands of hours of unstructured audio into a queryable knowledge graph.
      </div>

      {/* Stats row */}
      <div style={{
        position: 'absolute', bottom: 120, left: 120, right: 120,
        display: 'flex', gap: 0,
      }}>
        {STATS.map((s, i) => (
          <div key={i} style={{
            flex: 1,
            borderTop: `2px solid ${i === 0 ? ORANGE : 'rgba(255,255,255,0.12)'}`,
            paddingTop: 20, paddingRight: 32,
            opacity: statOp(i),
          }}>
            <div style={{ fontFamily: LATO, fontSize: 52, fontWeight: 900, color: i === 0 ? ORANGE : WHITE, letterSpacing: '-0.02em', lineHeight: 1 }}>
              {s.value}
            </div>
            <div style={{ fontFamily: MONO, fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 8 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

    </AbsoluteFill>
  );
};
