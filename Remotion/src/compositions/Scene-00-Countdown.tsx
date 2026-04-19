import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { LATO, MONO, RED, GOLD, C, SPR } from '../scaffold/neu-primitives';

export const COUNTDOWN_FRAMES = 120;

export const Scene00Countdown: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title entrance
  const titleP  = spring({ frame, fps, config: SPR });
  const titleY  = interpolate(titleP, [0, 1], [-44, 0], C);
  const titleOp = interpolate(titleP, [0, .4], [0, 1], C);

  // Red rule + subtitle stagger after title
  const ruleW  = interpolate(frame, [18, 34], [0, 90], C);
  const subOp  = interpolate(frame, [22, 36], [0, 1], C);

  // Per-number: 30-frame slot each — punch in, hold, fade out
  const num = (startAt: number) => {
    const rel  = frame - startAt;
    const inP  = spring({ frame: rel, fps, config: { damping: 32, stiffness: 560, mass: 0.6 } });
    const scale = interpolate(inP, [0, 1], [1.72, 1.0], C);
    const op    = Math.min(
      interpolate(rel, [0, 4],   [0, 1], C),
      interpolate(rel, [22, 30], [1, 0], C),
    );
    return { scale, op };
  };

  const n3 = num(24);   // frames 24–54
  const n2 = num(54);   // frames 54–84
  const n1 = num(84);   // frames 84–114  →  6 frames black before cut

  return (
    <AbsoluteFill style={{ background: '#000000' }}>

      {/* ── Title + rule + subtitle ────────────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        top: 194, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        transform: `translateY(${titleY}px)`, opacity: titleOp,
      }}>
        <div style={{
          fontFamily: LATO, fontSize: 76, fontWeight: 900,
          color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.08,
          textAlign: 'center',
        }}>
          MGEN AWARDS<br />
          <span style={{ color: RED }}>2026</span>
        </div>

        <div style={{ width: ruleW, height: 3, background: RED, marginTop: 28, marginBottom: 22 }} />

        <div style={{
          fontFamily: MONO, fontSize: 13, fontWeight: 400,
          letterSpacing: '0.28em', color: GOLD, textTransform: 'uppercase',
          opacity: subOp,
        }}>
          Northeastern University · Student Showcase
        </div>
      </div>

      {/* ── Countdown number (3 → 2 → 1) ─────────────────────────────────── */}
      {[{ n: '3', p: n3 }, { n: '2', p: n2 }, { n: '1', p: n1 }].map(({ n, p }) => (
        <div key={n} style={{
          position: 'absolute',
          top: 676, left: 960,
          transform: `translate(-50%, -50%) scale(${p.scale})`,
          opacity: p.op,
          fontFamily: LATO, fontSize: 248, fontWeight: 900,
          color: RED, letterSpacing: '-0.04em', lineHeight: 1,
        }}>
          {n}
        </div>
      ))}

    </AbsoluteFill>
  );
};
