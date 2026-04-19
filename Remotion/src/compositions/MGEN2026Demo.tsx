import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { loadFont as loadLato } from '@remotion/google-fonts/Lato';
import { loadFont as loadMono } from '@remotion/google-fonts/JetBrainsMono';

const { fontFamily: LATO } = loadLato('normal', { weights: ['300', '400', '700', '900'] });
loadLato('italic', { weights: ['400', '900'] }); // italic 900 needed for BrandArchetype
const { fontFamily: MONO } = loadMono('normal', { weights: ['400', '500', '600'] });

const RED  = '#C8102E';
const GOLD = '#A4804A';
const SPR  = { damping: 200 };
const C    = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

// ── Timeline ──────────────────────────────────────────────────────────────────
const TRANS1_S  = 160;  // card 1 exits / card 2 enters
const TRANS2_S  = 330;  // card 2 exits / card 3 enters
const OVL1_SHOW = 165;  // Abisha overlay slides up
const OVL1_HIDE = 300;  // Abisha overlay slides down
const OVL2_SHOW = 335;  // Anusha overlay slides up
const OVL2_HIDE = 520;  // Anusha overlay slides down

// ── Shared primitives ─────────────────────────────────────────────────────────

const Grid: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundColor: '#000',
      backgroundImage: [
        'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)',
        'linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
      ].join(', '),
      backgroundSize: '48px 48px',
    }}
  />
);

const EyebrowBar: React.FC<{ text: string; lf: number; fps: number }> = ({ text, lf, fps }) => {
  const p    = spring({ frame: lf - 6, fps, config: SPR });
  const barW = interpolate(p, [0, 1], [0, 22], C);
  const tOp  = interpolate(lf, [12, 20], [0, 1], C);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
      <div style={{ width: barW, height: 2, backgroundColor: GOLD, flexShrink: 0 }} />
      <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: GOLD, opacity: tOp, whiteSpace: 'nowrap' }}>
        {text}
      </div>
    </div>
  );
};

const Word: React.FC<{ word: string; lf: number; fps: number; at: number }> = ({ word, lf, fps, at }) => {
  const ty = interpolate(spring({ frame: lf - at, fps, config: SPR }), [0, 1], [110, 0], C);
  return (
    <span style={{ overflow: 'hidden', display: 'inline-block', marginRight: '0.22em' }}>
      <span style={{ display: 'inline-block', transform: `translateY(${ty}%)` }}>{word}</span>
    </span>
  );
};

const RedBar: React.FC<{ lf: number; at: number; end: number }> = ({ lf, at, end }) => (
  <div style={{
    width: interpolate(lf, [at, end], [0, 72], { ...C, easing: (t: number) => 1 - Math.pow(1 - t, 3) }),
    height: 3, backgroundColor: RED, marginTop: 14,
  }} />
);

interface StatCellProps {
  value: number | string;
  suffix?: string;  // white, always shown (e.g. 'K')
  unit?: string;    // red, appears after count (e.g. '×', '%', 'GB', 's')
  label: string;
  lf: number;
  fps: number;
  at: number;
  last?: boolean;
}

const StatCell: React.FC<StatCellProps> = ({ value, suffix, unit, label, lf, fps, at, last }) => {
  const isNum = typeof value === 'number';
  const pop   = spring({ frame: lf - at, fps, config: SPR });
  const op    = interpolate(pop, [0, 0.5], [0, 1], C);
  const ty    = interpolate(pop, [0, 1], [12, 0], C);

  const counted  = isNum ? Math.round(interpolate(lf, [at, at + 24], [0, value as number], C)) : 0;
  const display  = isNum ? `${counted === 0 ? '0' : `${counted}${suffix || ''}`}` : '';
  const unitOp   = interpolate(lf, [at + 26, at + 32], [0, 1], C);
  const strOp    = isNum ? 1 : interpolate(lf, [at, at + 12], [0, 1], C);

  const border = '1px solid rgba(255,255,255,0.1)';
  return (
    <div style={{
      flex: 1, padding: '22px 20px 18px',
      borderTop: border, borderBottom: border, borderLeft: border,
      borderRight: last ? border : 'none',
      opacity: op, transform: `translateY(${ty}px)`,
    }}>
      <div style={{ fontFamily: MONO, fontSize: 42, fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1, color: '#fff', marginBottom: 8 }}>
        {isNum ? (
          <>
            {display}
            {unit && <span style={{ color: RED, opacity: unitOp }}>{unit}</span>}
          </>
        ) : (
          <span style={{ opacity: strOp }}>{value as string}</span>
        )}
      </div>
      <div style={{ fontFamily: MONO, fontSize: 9, fontWeight: 400, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.12em', lineHeight: 1.5 }}>
        {label}
      </div>
    </div>
  );
};

// ── NEU lower-third overlay ───────────────────────────────────────────────────

interface OverlayProps {
  eyebrow: string;
  firstName: string;
  lastName: string;
  project: React.ReactNode;
  desc: string;
  num: string;
  showFrame: number;
  hideFrame: number;
}

const NeuOverlay: React.FC<OverlayProps> = ({ eyebrow, firstName, lastName, project, desc, num, showFrame, hideFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn  = spring({ frame: frame - showFrame, fps, config: SPR });
  const slideOut = spring({ frame: frame - hideFrame, fps, config: SPR });
  const Y = interpolate(slideIn, [0, 1], [200, 0], C) + interpolate(slideOut, [0, 1], [0, 200], C);

  const eyeOp  = interpolate(frame, [showFrame + 4, showFrame + 14], [0, 1], C);
  const ruleW  = interpolate(spring({ frame: frame - (showFrame + 10), fps, config: SPR }), [0, 1], [0, 72], C);
  const descOp = interpolate(frame, [showFrame + 30, showFrame + 44], [0, 1], C);
  const numOp  = interpolate(frame, [showFrame + 36, showFrame + 48], [0, 1], C);
  const w1y    = interpolate(spring({ frame: frame - (showFrame + 6),  fps, config: SPR }), [0, 1], [110, 0], C);
  const w2y    = interpolate(spring({ frame: frame - (showFrame + 14), fps, config: SPR }), [0, 1], [110, 0], C);

  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      transform: `translateY(${Y}px)`, zIndex: 100,
      display: 'flex', background: '#000',
      boxShadow: '0 -4px 32px rgba(0,0,0,0.7)',
    }}>
      <div style={{ width: 14, background: RED, flexShrink: 0 }} />
      <div style={{ padding: '18px 28px', display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
        <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: '0.28em', color: GOLD, textTransform: 'uppercase', opacity: eyeOp }}>
          {eyebrow}
        </div>
        <div style={{ fontFamily: LATO, fontSize: 46, fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.05, color: '#fff', display: 'flex', flexWrap: 'wrap' }}>
          <span style={{ overflow: 'hidden', display: 'inline-block', marginRight: '0.22em' }}>
            <span style={{ display: 'inline-block', transform: `translateY(${w1y}%)` }}>{firstName}</span>
          </span>
          <span style={{ overflow: 'hidden', display: 'inline-block' }}>
            <span style={{ display: 'inline-block', transform: `translateY(${w2y}%)` }}>{lastName}</span>
          </span>
        </div>
        <div style={{ width: ruleW, height: 2, background: RED }} />
        <div style={{ fontFamily: LATO, fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.65)', lineHeight: 1.4, opacity: descOp }}>
          {project} — {desc}
        </div>
      </div>
      <div style={{ padding: '18px 24px 18px 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', gap: 4, flexShrink: 0, opacity: numOp }}>
        <div style={{ fontFamily: MONO, fontSize: 48, fontWeight: 600, color: 'rgba(255,255,255,0.07)', letterSpacing: '-0.04em', lineHeight: 1 }}>{num}</div>
        <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', fontWeight: 600 }}>Northeastern</div>
      </div>
    </div>
  );
};

// ── Card 1 — Anvitha / A*-PO ──────────────────────────────────────────────────

const CardAnvitha: React.FC<{ lf: number; fps: number }> = ({ lf, fps }) => {
  const projP = spring({ frame: lf - 55, fps, config: SPR });
  return (
    <AbsoluteFill>
      <Grid />
      <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 1100 }}>
          <EyebrowBar text="STUDENT 19 OF 19 · MGEN AWARDS 2026" lf={lf} fps={fps} />
          <div style={{ fontFamily: LATO, fontSize: 'clamp(38px,6vw,88px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1, color: '#fff', marginBottom: 28, display: 'flex', flexWrap: 'wrap' }}>
            <Word word="Anvitha"  lf={lf} fps={fps} at={20} />
            <Word word="Hiriadka" lf={lf} fps={fps} at={28} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: LATO, fontSize: 'clamp(60px,8vw,120px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, color: '#fff', opacity: interpolate(projP, [0, 0.4], [0, 1], C), transform: `scale(${interpolate(projP, [0, 1], [0.88, 1], C)})`, transformOrigin: 'left center' }}>
              A<span style={{ color: RED }}>*</span>-PO
            </div>
            <RedBar lf={lf} at={70} end={88} />
          </div>
          <div style={{ fontFamily: LATO, fontSize: 18, fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, opacity: interpolate(lf, [85, 100], [0, 1], C), marginBottom: 48 }}>
            A lightweight alternative to PPO
          </div>
          <div style={{ display: 'flex' }}>
            {([
              { value: 33, unit: '%', label: 'Direct accuracy baseline' },
              { value: 70, unit: '%', label: 'Potential accuracy' },
              { value: 8,            label: 'Samples per problem' },
              { value: 0,            label: 'Critic models required' },
            ] as StatCellProps[]).map((s, i) => (
              <StatCell key={i} {...s} lf={lf} fps={fps} at={100 + i * 8} last={i === 3} />
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Card 2 — Abisha / BrandArchetype ─────────────────────────────────────────
// Headline is delayed 50 local frames so the overlay introduces the name first

const CardAbisha: React.FC<{ lf: number; fps: number }> = ({ lf, fps }) => {
  const HL = 50; // headline delay
  const projP = spring({ frame: lf - (HL + 25), fps, config: SPR });
  return (
    <AbsoluteFill>
      <Grid />
      <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 1100 }}>
          <EyebrowBar text="STUDENT 12 OF 19 · MGEN AWARDS 2026" lf={lf} fps={fps} />
          <div style={{ fontFamily: LATO, fontSize: 'clamp(38px,6vw,88px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1, color: '#fff', marginBottom: 28, display: 'flex', flexWrap: 'wrap' }}>
            <Word word="Abisha"   lf={lf} fps={fps} at={HL} />
            <Word word="Vadukoot" lf={lf} fps={fps} at={HL + 8} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: LATO, fontSize: 'clamp(60px,8vw,120px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, color: '#fff', opacity: interpolate(projP, [0, 0.4], [0, 1], C), transform: `scale(${interpolate(projP, [0, 1], [0.88, 1], C)})`, transformOrigin: 'left center' }}>
              Brand<em style={{ color: RED, fontStyle: 'italic' }}>Archetype</em>
            </div>
            <RedBar lf={lf} at={HL + 40} end={HL + 58} />
          </div>
          <div style={{ fontFamily: LATO, fontSize: 18, fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, opacity: interpolate(lf, [HL + 55, HL + 70], [0, 1], C), marginBottom: 48 }}>
            The first expert-labeled Jungian brand archetype dataset
          </div>
          <div style={{ display: 'flex' }}>
            {([
              { value: 12,      label: 'Archetypes mapped' },
              { value: '1st',   label: 'Expert-labeled dataset' },
              { value: 'Say/Do',label: 'Divergence detection' },
              { value: 'LLM',   label: 'Fine-tuning ready' },
            ] as StatCellProps[]).map((s, i) => (
              <StatCell key={i} {...s} lf={lf} fps={fps} at={HL + 70 + i * 8} last={i === 3} />
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Card 3 — Anusha / AutoInsight ─────────────────────────────────────────────

const CardAnusha: React.FC<{ lf: number; fps: number }> = ({ lf, fps }) => {
  const HL = 50;
  const projP = spring({ frame: lf - (HL + 25), fps, config: SPR });
  return (
    <AbsoluteFill>
      <Grid />
      <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 1100 }}>
          <EyebrowBar text="STUDENT 05 OF 19 · MGEN AWARDS 2026" lf={lf} fps={fps} />
          <div style={{ fontFamily: LATO, fontSize: 'clamp(38px,6vw,88px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1, color: '#fff', marginBottom: 28, display: 'flex', flexWrap: 'wrap' }}>
            <Word word="Anusha"  lf={lf} fps={fps} at={HL} />
            <Word word="Prakash" lf={lf} fps={fps} at={HL + 8} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: LATO, fontSize: 'clamp(60px,8vw,120px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, color: '#fff', opacity: interpolate(projP, [0, 0.4], [0, 1], C), transform: `scale(${interpolate(projP, [0, 1], [0.88, 1], C)})`, transformOrigin: 'left center' }}>
              Auto<span style={{ color: RED }}>Insight</span>
            </div>
            <RedBar lf={lf} at={HL + 40} end={HL + 58} />
          </div>
          <div style={{ fontFamily: LATO, fontSize: 18, fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, opacity: interpolate(lf, [HL + 55, HL + 70], [0, 1], C), marginBottom: 48 }}>
            Real answers from real government data.{' '}
            <em style={{ fontStyle: 'italic' }}>In seconds.</em>
          </div>
          <div style={{ display: 'flex' }}>
            {([
              { value: 25, suffix: 'K', unit: '×', label: 'Faster time-to-insight' },
              { value: 114,              unit: 'GB', label: 'Real automotive data' },
              { value: 4,                            label: 'AI agents' },
              { value: 10,               unit: 's',  label: 'Seconds to answer' },
            ] as StatCellProps[]).map((s, i) => (
              <StatCell key={i} {...s} lf={lf} fps={fps} at={HL + 70 + i * 8} last={i === 3} />
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Root composition ──────────────────────────────────────────────────────────

export const MGEN2026Demo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Horizontal slide transitions — spring damping 200 per NEU spec
  const t1 = spring({ frame: frame - TRANS1_S, fps, config: SPR });
  const t2 = spring({ frame: frame - TRANS2_S, fps, config: SPR });

  const x1 = interpolate(t1, [0, 1], [0, -1920], C);
  const x2 = interpolate(t1, [0, 1], [1920, 0], C) + interpolate(t2, [0, 1], [0, -1920], C);
  const x3 = interpolate(t2, [0, 1], [1920, 0], C);

  return (
    <AbsoluteFill style={{ overflow: 'hidden', background: '#000' }}>

      <AbsoluteFill style={{ transform: `translateX(${x1}px)` }}>
        <CardAnvitha lf={frame} fps={fps} />
      </AbsoluteFill>

      <AbsoluteFill style={{ transform: `translateX(${x2}px)` }}>
        <CardAbisha lf={frame - TRANS1_S} fps={fps} />
      </AbsoluteFill>

      <AbsoluteFill style={{ transform: `translateX(${x3}px)` }}>
        <CardAnusha lf={frame - TRANS2_S} fps={fps} />
      </AbsoluteFill>

      {/* Overlay: introduces Abisha while card 2 name is still hidden */}
      <NeuOverlay
        eyebrow="STUDENT 12 OF 19 · MGEN AWARDS 2026 · NORTHEASTERN UNIVERSITY"
        firstName="Abisha"
        lastName="Vadukoot"
        project={<strong style={{ fontWeight: 700, color: RED }}>BrandArchetype</strong>}
        desc="first expert-labeled Jungian brand archetype dataset · say/do divergence detection"
        num="12"
        showFrame={OVL1_SHOW}
        hideFrame={OVL1_HIDE}
      />

      {/* Overlay: introduces Anusha while card 3 name is still hidden */}
      <NeuOverlay
        eyebrow="STUDENT 05 OF 19 · MGEN AWARDS 2026 · NORTHEASTERN UNIVERSITY"
        firstName="Anusha"
        lastName="Prakash"
        project={<strong style={{ fontWeight: 700, color: RED }}>AutoInsight</strong>}
        desc="multi-agent AI · 114 GB government data · 224K+ records · 10 seconds"
        num="05"
        showFrame={OVL2_SHOW}
        hideFrame={OVL2_HIDE}
      />

    </AbsoluteFill>
  );
};
