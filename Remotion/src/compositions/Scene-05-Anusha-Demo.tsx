import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { LATO, MONO, C } from '../scaffold/neu-primitives';

export const AUTOINSIGHT_DEMO_FRAMES = 210;

const YELLOW = '#f5c400';
const BG     = '#ffffff';
const GLASS  = '#18182e';
const TIRE   = '#1c1c1c';

// ── CSS top-down car silhouette ───────────────────────────────────────────────
const TopDownCar: React.FC = () => {
  const W = 260;
  const H = 500;
  return (
    <div style={{ position: 'relative', width: W, height: H }}>
      {/* drop shadow */}
      <div style={{
        position: 'absolute', left: '10%', right: '10%', top: '4%', bottom: '4%',
        background: 'rgba(0,0,0,0.20)',
        borderRadius: 80,
        filter: 'blur(22px)',
        transform: 'translate(6px, 10px)',
      }} />

      {/* rear-left wheel */}
      <div style={{ position: 'absolute', left: -18, top: 72, width: 36, height: 100, background: TIRE, borderRadius: 8 }} />
      {/* rear-right wheel */}
      <div style={{ position: 'absolute', right: -18, top: 72, width: 36, height: 100, background: TIRE, borderRadius: 8 }} />
      {/* front-left wheel */}
      <div style={{ position: 'absolute', left: -18, bottom: 72, width: 36, height: 100, background: TIRE, borderRadius: 8 }} />
      {/* front-right wheel */}
      <div style={{ position: 'absolute', right: -18, bottom: 72, width: 36, height: 100, background: TIRE, borderRadius: 8 }} />

      {/* main body */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
        background: `linear-gradient(155deg, #ffe033 0%, ${YELLOW} 45%, #d4a800 100%)`,
        borderRadius: '70px 70px 58px 58px',
      }} />

      {/* rear windshield */}
      <div style={{
        position: 'absolute',
        left: 38, right: 38, top: 76, height: 108,
        background: `linear-gradient(175deg, ${GLASS} 0%, #2a2a50 100%)`,
        borderRadius: '12px 12px 6px 6px',
        opacity: 0.9,
      }} />

      {/* roof highlight strip */}
      <div style={{
        position: 'absolute',
        left: '44%', width: 6,
        top: 190, height: 120,
        background: 'rgba(255,255,255,0.14)',
        borderRadius: 3,
      }} />

      {/* front windshield */}
      <div style={{
        position: 'absolute',
        left: 38, right: 38, bottom: 76, height: 100,
        background: `linear-gradient(5deg, ${GLASS} 0%, #2a2a50 100%)`,
        borderRadius: '6px 6px 12px 12px',
        opacity: 0.86,
      }} />

      {/* side mirror left */}
      <div style={{
        position: 'absolute',
        left: -6, bottom: 196, width: 20, height: 16,
        background: YELLOW,
        borderRadius: '3px 0 0 5px',
        boxShadow: '-3px 2px 6px rgba(0,0,0,0.25)',
      }} />
      {/* side mirror right */}
      <div style={{
        position: 'absolute',
        right: -6, bottom: 196, width: 20, height: 16,
        background: YELLOW,
        borderRadius: '0 3px 5px 0',
        boxShadow: '3px 2px 6px rgba(0,0,0,0.25)',
      }} />

      {/* front hood crease line */}
      <div style={{
        position: 'absolute',
        left: 22, right: 22, bottom: 36, height: 2,
        background: 'rgba(0,0,0,0.10)',
        borderRadius: 2,
      }} />
    </div>
  );
};

// ── Main scene ────────────────────────────────────────────────────────────────
export const Scene05AnushaDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Road dashes scroll upward
  const dashScroll = (frame * 6) % 140;

  // Car drives in from bottom
  const carP  = spring({ frame: frame - 0, fps, config: { damping: 70, stiffness: 260, mass: 1.3 } });
  const carY  = interpolate(carP, [0, 1], [640, 0], C);
  const carOp = interpolate(carP, [0, 0.1], [0, 1], C);

  // "DESIGN" — slams in from right
  const w1P  = spring({ frame: frame - 20, fps, config: { damping: 200, stiffness: 300 } });
  const w1X  = interpolate(w1P, [0, 1], [340, 0], C);
  const w1Op = interpolate(w1P, [0, 0.25], [0, 1], C);

  // "BETTER" — staggered
  const w2P  = spring({ frame: frame - 38, fps, config: { damping: 200, stiffness: 300 } });
  const w2X  = interpolate(w2P, [0, 1], [340, 0], C);
  const w2Op = interpolate(w2P, [0, 0.25], [0, 1], C);

  // subtitle fade
  const subOp = interpolate(frame, [68, 88], [0, 1], C);

  const ROAD_CX = 430;
  const ROAD_W  = 200;
  const ROAD_L  = ROAD_CX - ROAD_W / 2;

  const CAR_W = 260;
  const CAR_H = 500;

  const DASH_COUNT   = 9;
  const DASH_SPACING = 140;
  const DASH_H       = 96;
  const DASH_W       = 18;

  const TEXT_LEFT = ROAD_L + ROAD_W + 96;

  return (
    <AbsoluteFill style={{ background: BG, overflow: 'hidden' }}>

      {/* ── Road stripe ──────────────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        left: ROAD_L, top: 0,
        width: ROAD_W, height: 1080,
        background: YELLOW,
        overflow: 'hidden',
      }}>
        {Array.from({ length: DASH_COUNT }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: i * DASH_SPACING - dashScroll,
            width: DASH_W,
            height: DASH_H,
            background: BG,
            borderRadius: 3,
          }} />
        ))}
      </div>

      {/* ── Car ──────────────────────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        left: ROAD_CX - CAR_W / 2,
        top: 540 - CAR_H / 2,
        opacity: carOp,
        transform: `translateY(${carY}px)`,
      }}>
        <TopDownCar />
      </div>

      {/* ── Text ─────────────────────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        left: TEXT_LEFT,
        top: 0,
        right: 0,
        height: 1080,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingRight: 96,
      }}>
        <div style={{
          fontFamily: LATO,
          fontWeight: 900,
          fontSize: 230,
          lineHeight: 0.88,
          letterSpacing: '-0.03em',
          color: YELLOW,
          textTransform: 'uppercase',
          transform: `translateX(${w1X}px)`,
          opacity: w1Op,
        }}>
          DESIGN
        </div>
        <div style={{
          fontFamily: LATO,
          fontWeight: 900,
          fontSize: 230,
          lineHeight: 0.88,
          letterSpacing: '-0.03em',
          color: YELLOW,
          textTransform: 'uppercase',
          transform: `translateX(${w2X}px)`,
          opacity: w2Op,
        }}>
          BETTER
        </div>
        <div style={{
          fontFamily: MONO,
          fontWeight: 400,
          fontSize: 52,
          letterSpacing: '0.10em',
          color: '#444',
          textTransform: 'uppercase',
          marginTop: 32,
          opacity: subOp,
        }}>
          by thinking better
        </div>
      </div>

    </AbsoluteFill>
  );
};
