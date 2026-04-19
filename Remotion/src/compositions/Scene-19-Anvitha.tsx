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

// Font loading — module level, Remotion's delayRender/continueRender pattern
const { fontFamily: LATO } = loadLato('normal', { weights: ['300', '400', '700', '900'] });
loadLato('italic', { weights: ['400'] }); // italic variant used for tagline
const { fontFamily: MONO } = loadMono('normal', { weights: ['400', '500', '600'] });

// NEU brand palette
const RED = '#C8102E';
const GOLD = '#A4804A';

// Every spring: damping 200 — controlled, no bounce (NEU spec)
const SPR = { damping: 200 };

// Every interpolate: extrapolate clamp (NEU spec)
const C = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

// Frame timeline constants
const EYEBROW_START   = 6;
const HEADLINE_W1     = 20;
const HEADLINE_W2     = 28;   // 8-frame stagger
const PROJECT_START   = 60;
const BAR_START       = 75;
const BAR_END         = 95;
const SUBTITLE_START  = 90;
const SUBTITLE_END    = 110;
const STATS_START     = 105;
const TAGLINE_START   = 170;
const TAGLINE_END     = 185;
const DRIFT_START     = 200;
const DRIFT_END       = 260;

// ─── Grid background with subtle drift ───────────────────────────────────────

const GridBg: React.FC = () => {
  const frame = useCurrentFrame();
  const dx = interpolate(frame, [DRIFT_START, DRIFT_END], [0, 20], C);
  const dy = interpolate(frame, [DRIFT_START, DRIFT_END], [0, -20], C);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000000',
        backgroundImage: [
          'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: '48px 48px',
        backgroundPosition: `${dx}px ${dy}px`,
      }}
    />
  );
};

// ─── Gold eyebrow bar + label ─────────────────────────────────────────────────

const Eyebrow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const barProgress = spring({ frame: frame - EYEBROW_START, fps, config: SPR });
  const barWidth = interpolate(barProgress, [0, 1], [0, 22], C);
  const textOpacity = interpolate(frame, [EYEBROW_START + 6, EYEBROW_START + 14], [0, 1], C);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
      <div
        style={{
          width: barWidth,
          height: 2,
          backgroundColor: GOLD,
          flexShrink: 0,
        }}
      />
      <div
        style={{
          fontFamily: MONO,
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: GOLD,
          opacity: textOpacity,
          whiteSpace: 'nowrap',
        }}
      >
        STUDENT 19 OF 19 · MGEN AWARDS 2026
      </div>
    </div>
  );
};

// ─── Headline word reveal ─────────────────────────────────────────────────────

const WordReveal: React.FC<{ word: string; startFrame: number }> = ({ word, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({ frame: frame - startFrame, fps, config: SPR });
  const ty = interpolate(progress, [0, 1], [110, 0], C);

  return (
    // overflow-hidden clip: hides the word until it slides up into view
    <span style={{ overflow: 'hidden', display: 'inline-block', marginRight: '0.22em' }}>
      <span style={{ display: 'inline-block', transform: `translateY(${ty}%)` }}>
        {word}
      </span>
    </span>
  );
};

const Headline: React.FC = () => (
  <div
    style={{
      fontFamily: LATO,
      fontSize: 'clamp(38px, 6vw, 88px)',
      fontWeight: 900,
      letterSpacing: '-0.03em',
      lineHeight: 1.0,
      color: '#FFFFFF',
      marginBottom: 28,
      display: 'flex',
      flexWrap: 'wrap',
    }}
  >
    <WordReveal word="Anvitha"  startFrame={HEADLINE_W1} />
    <WordReveal word="Hiriadka" startFrame={HEADLINE_W2} />
  </div>
);

// ─── A*-PO project name (hero moment) + red accent bar ───────────────────────

const ProjectName: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({ frame: frame - PROJECT_START, fps, config: SPR });
  const opacity = interpolate(progress, [0, 0.4], [0, 1], C);
  const scale   = interpolate(progress, [0, 1],   [0.88, 1], C);

  // ease-out cubic via inline easing function
  const barWidth = interpolate(frame, [BAR_START, BAR_END], [0, 72], {
    ...C,
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
  });

  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          fontFamily: LATO,
          fontSize: 'clamp(60px, 8vw, 120px)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          color: '#FFFFFF',
          opacity,
          transform: `scale(${scale})`,
          transformOrigin: 'left center',
        }}
      >
        A<span style={{ color: RED }}>*</span>-PO
      </div>
      <div
        style={{
          width: barWidth,
          height: 3,
          backgroundColor: RED,
          marginTop: 14,
        }}
      />
    </div>
  );
};

// ─── Subtitle ─────────────────────────────────────────────────────────────────

const Subtitle: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [SUBTITLE_START, SUBTITLE_END], [0, 1], C);

  return (
    <div
      style={{
        fontFamily: LATO,
        fontSize: 18,
        fontWeight: 300,
        lineHeight: 1.65,
        color: 'rgba(255,255,255,0.55)',
        opacity,
        marginBottom: 52,
      }}
    >
      A lightweight alternative to PPO
    </div>
  );
};

// ─── Stats bar ────────────────────────────────────────────────────────────────

interface StatProps {
  value: number;
  unit: string;
  label: string;
  startFrame: number;
  last?: boolean;
}

const Stat: React.FC<StatProps> = ({ value, unit, label, startFrame, last }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({ frame: frame - startFrame, fps, config: SPR });
  const opacity = interpolate(progress, [0, 0.5], [0, 1], C);
  const ty      = interpolate(progress, [0, 1],   [14, 0], C);

  // Integer count-up; 0-value stats don't animate (starts and ends at 0)
  const counted = Math.round(
    interpolate(frame, [startFrame, startFrame + 24], [0, value], C)
  );

  // Red unit span appears 2 frames after count finishes
  const unitOpacity = interpolate(frame, [startFrame + 26, startFrame + 32], [0, 1], C);

  const border = '1px solid rgba(255,255,255,0.1)';

  return (
    <div
      style={{
        flex: 1,
        padding: '24px 24px 20px',
        borderTop: border,
        borderBottom: border,
        borderLeft: border,
        borderRight: last ? border : 'none',
        opacity,
        transform: `translateY(${ty}px)`,
      }}
    >
      {/* Number */}
      <div
        style={{
          fontFamily: MONO,
          fontSize: 48,
          fontWeight: 600,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          color: '#FFFFFF',
          marginBottom: 8,
        }}
      >
        {value === 0 ? '0' : counted}
        {unit ? (
          <span style={{ color: RED, opacity: unitOpacity }}>{unit}</span>
        ) : null}
      </div>
      {/* Label */}
      <div
        style={{
          fontFamily: MONO,
          fontSize: 9,
          fontWeight: 400,
          color: 'rgba(255,255,255,0.3)',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          lineHeight: 1.5,
        }}
      >
        {label}
      </div>
    </div>
  );
};

const StatsBar: React.FC = () => {
  const stats: StatProps[] = [
    { value: 33, unit: '%', label: 'Direct accuracy baseline',  startFrame: STATS_START },
    { value: 70, unit: '%', label: 'Potential accuracy',        startFrame: STATS_START + 8 },
    { value: 8,  unit: '',  label: 'Samples per problem',       startFrame: STATS_START + 16 },
    { value: 0,  unit: '',  label: 'Critic models required',    startFrame: STATS_START + 24, last: true },
  ];

  return (
    <div style={{ display: 'flex', marginBottom: 52 }}>
      {stats.map((s, i) => (
        <Stat key={i} {...s} />
      ))}
    </div>
  );
};

// ─── Closing tagline ──────────────────────────────────────────────────────────

const Tagline: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [TAGLINE_START, TAGLINE_END], [0, 1], C);

  return (
    <div
      style={{
        fontFamily: LATO,
        fontSize: 16,
        fontWeight: 300,
        lineHeight: 1.65,
        color: 'rgba(255,255,255,0.45)',
        fontStyle: 'italic',
        opacity,
        maxWidth: 640,
      }}
    >
      She found a simpler way to make the machines correct themselves.
    </div>
  );
};

// ─── Scene root ───────────────────────────────────────────────────────────────

export const Scene19Anvitha: React.FC = () => (
  <AbsoluteFill>
    <GridBg />
    {/* 1100px content block, centered in 1920px frame, left-aligned text within */}
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: 1100 }}>
        <Eyebrow />
        <Headline />
        <ProjectName />
        <Subtitle />
        <StatsBar />
        <Tagline />
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);
