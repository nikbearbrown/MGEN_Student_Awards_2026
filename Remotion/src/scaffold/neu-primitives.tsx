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

// ── Font family constants ─────────────────────────────────────────────────────

export const { fontFamily: LATO } = loadLato('normal', { weights: ['300', '400', '700', '900'] });
loadLato('italic', { weights: ['400', '900'] });
export const { fontFamily: MONO } = loadMono('normal', { weights: ['400', '500', '600'] });

// ── Color / spring constants ──────────────────────────────────────────────────

export const RED  = '#C8102E';
export const GOLD = '#A4804A';
export const SPR  = { damping: 200 };
export const C    = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

// ── Types ─────────────────────────────────────────────────────────────────────

export interface StatData { value: number | string; suffix?: string; unit?: string; label: string }

export interface StudentCardData {
  num: string;
  eyebrow: string;
  names: string[];
  smallName?: boolean;
  projectNode: React.ReactNode;
  tagline: React.ReactNode;
  stats: StatData[];
  dark: boolean;
}

// ── Primitives ────────────────────────────────────────────────────────────────

export const EyebrowBar: React.FC<{ text: string; lf: number; fps: number; color?: string }> = ({ text, lf, fps, color = GOLD }) => {
  const p    = spring({ frame: lf - 6, fps, config: SPR });
  const barW = interpolate(p, [0, 1], [0, 22], C);
  const tOp  = interpolate(lf, [12, 20], [0, 1], C);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
      <div style={{ width: barW, height: 2, backgroundColor: color, flexShrink: 0 }} />
      <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color, opacity: tOp, whiteSpace: 'nowrap' }}>
        {text}
      </div>
    </div>
  );
};

export const Word: React.FC<{ word: string; lf: number; fps: number; at: number; color: string }> = ({ word, lf, fps, at, color }) => {
  const ty = interpolate(spring({ frame: lf - at, fps, config: SPR }), [0, 1], [110, 0], C);
  return (
    <span style={{ overflow: 'hidden', display: 'inline-block', marginRight: '0.22em' }}>
      <span style={{ display: 'inline-block', transform: `translateY(${ty}%)`, color }}>{word}</span>
    </span>
  );
};

export const RedBar: React.FC<{ lf: number; at: number; end: number }> = ({ lf, at, end }) => (
  <div style={{
    width: interpolate(lf, [at, end], [0, 72], { ...C, easing: (t: number) => 1 - Math.pow(1 - t, 3) }),
    height: 3, backgroundColor: RED, marginTop: 14,
  }} />
);

export const StatCell: React.FC<StatData & { lf: number; fps: number; at: number; last?: boolean; dark: boolean }> = ({
  value, suffix, unit, label, lf, fps, at, last, dark,
}) => {
  const isNum   = typeof value === 'number';
  const pop     = spring({ frame: lf - at, fps, config: SPR });
  const op      = interpolate(pop, [0, 0.5], [0, 1], C);
  const ty      = interpolate(pop, [0, 1], [12, 0], C);
  const counted = isNum ? Math.round(interpolate(lf, [at, at + 24], [0, value as number], C)) : 0;
  const display = isNum ? `${counted}${suffix || ''}` : '';
  const unitOp  = interpolate(lf, [at + 26, at + 32], [0, 1], C);
  const strOp   = isNum ? 1 : interpolate(lf, [at, at + 12], [0, 1], C);
  const border  = dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)';
  const numCol  = dark ? '#fff' : '#000';
  const lblCol  = dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';
  return (
    <div style={{ flex: 1, padding: '22px 20px 18px', borderTop: border, borderBottom: border, borderLeft: border, borderRight: last ? border : 'none', opacity: op, transform: `translateY(${ty}px)` }}>
      <div style={{ fontFamily: MONO, fontSize: 42, fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1, color: numCol, marginBottom: 8 }}>
        {isNum
          ? <>{display}{unit && <span style={{ color: RED, opacity: unitOp }}>{unit}</span>}</>
          : <span style={{ opacity: strOp }}>{value as string}</span>}
      </div>
      <div style={{ fontFamily: MONO, fontSize: 9, fontWeight: 400, color: lblCol, textTransform: 'uppercase', letterSpacing: '0.12em', lineHeight: 1.5 }}>{label}</div>
    </div>
  );
};

// ── NEU lower-third overlay ───────────────────────────────────────────────────

export const NeuOverlay: React.FC<{
  eyebrow: string; firstName: string; lastName: string;
  project: React.ReactNode; desc: string; num: string;
  showFrame: number; hideFrame: number;
}> = ({ eyebrow, firstName, lastName, project, desc, num, showFrame, hideFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const slideIn  = spring({ frame: frame - showFrame, fps, config: SPR });
  const slideOut = spring({ frame: frame - hideFrame, fps, config: SPR });
  const Y      = interpolate(slideIn, [0, 1], [200, 0], C) + interpolate(slideOut, [0, 1], [0, 200], C);
  const eyeOp  = interpolate(frame, [showFrame + 4,  showFrame + 14], [0, 1], C);
  const ruleW  = interpolate(spring({ frame: frame - (showFrame + 10), fps, config: SPR }), [0, 1], [0, 72], C);
  const descOp = interpolate(frame, [showFrame + 30, showFrame + 44], [0, 1], C);
  const numOp  = interpolate(frame, [showFrame + 36, showFrame + 48], [0, 1], C);
  const w1y    = interpolate(spring({ frame: frame - (showFrame + 6),  fps, config: SPR }), [0, 1], [110, 0], C);
  const w2y    = interpolate(spring({ frame: frame - (showFrame + 14), fps, config: SPR }), [0, 1], [110, 0], C);
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, transform: `translateY(${Y}px)`, zIndex: 100, display: 'flex', background: '#000', boxShadow: '0 -4px 32px rgba(0,0,0,0.7)' }}>
      <div style={{ width: 14, background: RED, flexShrink: 0 }} />
      <div style={{ padding: '18px 28px', display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
        <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: '0.28em', color: GOLD, textTransform: 'uppercase', opacity: eyeOp }}>{eyebrow}</div>
        <div style={{ fontFamily: LATO, fontSize: 46, fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.05, color: '#fff', display: 'flex', flexWrap: 'wrap' }}>
          <span style={{ overflow: 'hidden', display: 'inline-block', marginRight: '0.22em' }}>
            <span style={{ display: 'inline-block', transform: `translateY(${w1y}%)` }}>{firstName}</span>
          </span>
          {lastName && (
            <span style={{ overflow: 'hidden', display: 'inline-block' }}>
              <span style={{ display: 'inline-block', transform: `translateY(${w2y}%)` }}>{lastName}</span>
            </span>
          )}
        </div>
        <div style={{ width: ruleW, height: 2, background: RED }} />
        <div style={{ fontFamily: LATO, fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.65)', lineHeight: 1.4, opacity: descOp }}>{project} — {desc}</div>
      </div>
      <div style={{ padding: '18px 24px 18px 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', gap: 4, flexShrink: 0, opacity: numOp }}>
        <div style={{ fontFamily: MONO, fontSize: 48, fontWeight: 600, color: 'rgba(255,255,255,0.07)', letterSpacing: '-0.04em', lineHeight: 1 }}>{num}</div>
        <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', fontWeight: 600 }}>Northeastern</div>
      </div>
    </div>
  );
};

// ── Student card (theme-aware) ────────────────────────────────────────────────

export const StudentCard: React.FC<{ data: StudentCardData; hl?: number }> = ({ data, hl = 0 }) => {
  const lf = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { dark, names, eyebrow, projectNode, tagline, stats, smallName } = data;
  const textColor = dark ? '#fff' : '#000';
  const textMuted = dark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)';
  const gridLine  = dark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)';
  const bgColor   = dark ? '#000' : '#f5f5f5';
  const eyeColor  = dark ? GOLD : RED;
  const projP = spring({ frame: lf - (hl + 25), fps, config: SPR });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{
        backgroundColor: bgColor,
        backgroundImage: [`linear-gradient(${gridLine} 1px, transparent 1px)`, `linear-gradient(90deg, ${gridLine} 1px, transparent 1px)`].join(', '),
        backgroundSize: '48px 48px',
      }} />
      <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 1100 }}>
          <EyebrowBar text={eyebrow} lf={lf} fps={fps} color={eyeColor} />
          <div style={{ fontFamily: LATO, fontSize: smallName ? 'clamp(22px,3.5vw,56px)' : 'clamp(38px,6vw,88px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 28, display: 'flex', flexWrap: 'wrap', alignItems: 'baseline' }}>
            {names.map((w, i) => <Word key={i} word={w} lf={lf} fps={fps} at={hl + 20 + i * 8} color={textColor} />)}
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: LATO, fontSize: 'clamp(60px,8vw,120px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, color: textColor, opacity: interpolate(projP, [0, 0.4], [0, 1], C), transform: `scale(${interpolate(projP, [0, 1], [0.88, 1], C)})`, transformOrigin: 'left center' }}>
              {projectNode}
            </div>
            <RedBar lf={lf} at={hl + 40} end={hl + 58} />
          </div>
          <div style={{ fontFamily: LATO, fontSize: 18, fontWeight: 300, color: textMuted, lineHeight: 1.65, opacity: interpolate(lf, [hl + 55, hl + 70], [0, 1], C), marginBottom: 48 }}>
            {tagline}
          </div>
          <div style={{ display: 'flex' }}>
            {stats.map((s, i) => (
              <StatCell key={i} {...s} lf={lf} fps={fps} at={hl + 70 + i * 8} last={i === stats.length - 1} dark={dark} />
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
