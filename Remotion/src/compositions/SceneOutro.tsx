import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { LATO, MONO, RED, GOLD, C, SPR } from '../scaffold/neu-primitives';

export const OUTRO_FRAMES = 210;

const FS    = 96;    // title font-size
const CH    = 118;   // clip-container height  (FS × 1.23)
const LEFT  = 92;    // content left edge
const CTOP  = 318;   // eyebrow top

// Word that reveals by sliding up from an overflow:hidden clip
const Word: React.FC<{
  text: string;
  color: string;
  italic?: boolean;
  ty: number;
}> = ({ text, color, italic, ty }) => (
  <div style={{ overflow: 'hidden', height: CH, flexShrink: 0 }}>
    <div style={{
      fontFamily: LATO, fontSize: FS, fontWeight: 900,
      color, fontStyle: italic ? 'italic' : 'normal',
      letterSpacing: '-0.02em', lineHeight: CH / FS,
      whiteSpace: 'nowrap',
      transform: `translateY(${ty}px)`,
    }}>
      {text}
    </div>
  </div>
);

export const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Gold left bar ──────────────────────────────────────────────────────────
  const barP  = spring({ frame, fps, config: SPR });
  const barSY = interpolate(barP, [0, 1], [0, 1], C);

  // ── Header (top) ──────────────────────────────────────────────────────────
  const hdrOp = interpolate(frame, [0, 18], [0, 1], C);

  // ── Eyebrow ───────────────────────────────────────────────────────────────
  const eyeP  = spring({ frame: frame - 8, fps, config: SPR });
  const eyeOp = interpolate(eyeP, [0, .4], [0, 1], C);
  const eyeY  = interpolate(eyeP, [0,  1], [10, 0], C);

  // ── Title words (staggered reveal from clip) ──────────────────────────────
  const wordTY = (delay: number) => {
    const p = spring({ frame: frame - delay, fps, config: { damping: 200, stiffness: 280 } });
    return interpolate(p, [0, 1], [CH, 0], C);
  };
  const ty1 = wordTY(18);   // MGEN
  const ty2 = wordTY(26);   // Awards
  const ty3 = wordTY(34);   // 2026

  // ── Gold rule ─────────────────────────────────────────────────────────────
  const ruleW = interpolate(frame, [52, 72], [0, 154], C);

  // ── Tagline ───────────────────────────────────────────────────────────────
  const tagP  = spring({ frame: frame - 70, fps, config: SPR });
  const tagOp = interpolate(tagP, [0, .4], [0, 1], C);
  const tagY  = interpolate(tagP, [0,  1], [12, 0], C);

  // ── Fade to black at end ──────────────────────────────────────────────────
  const sceneOp = interpolate(frame, [185, 210], [1, 0], C);

  return (
    <AbsoluteFill style={{ background: '#000000', opacity: sceneOp }}>

      {/* ── Left gold accent bar ─────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', left: 0, top: 0,
        width: 14, height: 1080,
        background: GOLD,
        transformOrigin: 'top',
        transform: `scaleY(${barSY})`,
      }} />

      {/* ── Header bar ───────────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 54,
        display: 'flex', alignItems: 'center',
        paddingLeft: LEFT, paddingRight: 64,
        opacity: hdrOp,
      }}>
        <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.24em', color: 'rgba(255,255,255,0.42)', textTransform: 'uppercase' }}>
          Northeastern University
        </span>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: RED, margin: '0 14px', flexShrink: 0 }} />
        <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.24em', color: 'rgba(255,255,255,0.80)', textTransform: 'uppercase' }}>
          MGEN · MSIS
        </span>
        <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.24em', color: 'rgba(255,255,255,0.90)', textTransform: 'uppercase', marginLeft: 'auto' }}>
          Awards 2026
        </span>
      </div>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        top: CTOP, left: LEFT,
        display: 'flex', flexDirection: 'column',
      }}>

        {/* Eyebrow */}
        <div style={{
          fontFamily: MONO, fontSize: 13, fontWeight: 400,
          letterSpacing: '0.20em', color: GOLD, textTransform: 'uppercase',
          marginBottom: 18,
          opacity: eyeOp, transform: `translateY(${eyeY}px)`,
        }}>
          Northeastern University · College of Engineering
        </div>

        {/* Title word-reveal row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 26 }}>
          <Word text="MGEN"   color="#ffffff"  ty={ty1} />
          <Word text="Awards" color={RED}      ty={ty2} italic />
          <Word text="2026"   color="#ffffff"  ty={ty3} />
        </div>

        {/* Gold rule */}
        <div style={{ width: ruleW, height: 3, background: GOLD, marginTop: 24 }} />

        {/* Tagline */}
        <div style={{
          fontFamily: LATO, fontSize: 24, fontWeight: 300,
          color: 'rgba(255,255,255,0.60)',
          letterSpacing: '0.01em', marginTop: 22,
          opacity: tagOp, transform: `translateY(${tagY}px)`,
        }}>
          Builders. Shippers. Evidence over permission.
        </div>

      </div>

    </AbsoluteFill>
  );
};
