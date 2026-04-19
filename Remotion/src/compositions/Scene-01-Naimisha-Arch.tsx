import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { LATO, MONO, SPR, C } from '../scaffold/neu-primitives';

// ── FitPath app palette (health/wellness consumer aesthetic) ──────────────────
// HTML reference uses Plus Jakarta Sans — substituted with Lato (already loaded)
const BG      = '#f8fdf9';    // near-white with very subtle green tint
const DARK    = '#14532d';    // deep green header strip
const PRIMARY = '#16a34a';    // green-600 — primary action/accent
const WHITE   = '#ffffff';
const BORDER  = '#bbf7d0';    // green-200
const TD      = '#0f172a';    // text dark
const TS      = '#475569';    // text secondary
const TL      = '#94a3b8';    // text light

interface Feature {
  icon: string;
  title: string;
  subtitle: string;
  desc: string;
  color: string;
  bg: string;
  border: string;
}

const FEATURES: Feature[] = [
  {
    icon: '🏃',
    title: 'AR Coaching',
    subtitle: 'Real-time motion feedback',
    desc: 'Augmented reality overlays guide movement and correct form in 3D — no equipment required.',
    color: PRIMARY,
    bg: '#dcfce7',   // green-100
    border: BORDER,
  },
  {
    icon: '📷',
    title: 'Meal Scanning',
    subtitle: 'AI-powered food recognition',
    desc: 'Point your camera at any meal for an instant calorie and macro breakdown.',
    color: '#0891b2',  // cyan-600
    bg: '#e0f2fe',    // sky-100
    border: '#bae6fd',
  },
  {
    icon: '🩺',
    title: 'Telehealth',
    subtitle: 'Connect with professionals',
    desc: 'Video or chat sessions with registered dietitians and wellness coaches.',
    color: '#7c3aed',  // violet-600
    bg: '#f5f3ff',    // violet-50
    border: '#ddd6fe',
  },
  {
    icon: '📊',
    title: 'Weight Management',
    subtitle: 'Smart progress tracking',
    desc: 'AI-calibrated targets, weekly check-ins, and personalized plan adjustments.',
    color: '#ea580c',  // orange-600
    bg: '#fff7ed',    // orange-50
    border: '#fed7aa',
  },
];

export const Scene01NaimishaArch: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerP  = spring({ frame: frame - 5, fps, config: SPR });
  const headerY  = interpolate(headerP, [0, 1], [-80, 0], C);
  const headerOp = interpolate(headerP, [0, 0.3], [0, 1], C);

  // tagline fades in just after header
  const taglineOp = interpolate(frame, [20, 34], [0, 1], C);

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '56px 0 48px' }}>
        <div style={{ width: 1440 }}>

          {/* ── Header strip ──────────────────────────────────────────────── */}
          <div style={{
            background: DARK, borderRadius: 10, padding: '20px 32px', marginBottom: 10,
            transform: `translateY(${headerY}px)`, opacity: headerOp,
          }}>
            <div style={{ fontFamily: LATO, fontSize: 24, fontWeight: 900, color: WHITE, letterSpacing: '-0.01em', lineHeight: 1.15 }}>
              FitPath{' '}
              <span style={{ color: '#4ade80', fontWeight: 400 }}>— Health &amp; Weight Management</span>
            </div>
            <div style={{ fontFamily: MONO, fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.10em', marginTop: 6 }}>
              AI HEALTH PLATFORM · AR COACHING · MEAL SCANNING · TELEHEALTH
            </div>
          </div>

          {/* ── Tagline ───────────────────────────────────────────────────── */}
          <div style={{
            fontFamily: LATO, fontSize: 15, fontWeight: 300, color: TS,
            letterSpacing: '0.01em', marginBottom: 24, paddingLeft: 4,
            opacity: taglineOp,
          }}>
            Your calm, reliable partner for weight management and healthy living.
          </div>

          {/* ── 2×2 Feature grid ──────────────────────────────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {FEATURES.map((f, i) => {
              const at = 30 + i * 14;
              const p  = spring({ frame: frame - at, fps, config: SPR });
              const op = interpolate(p, [0, 0.5], [0, 1], C);
              const ty = interpolate(p, [0, 1],   [18, 0], C);
              return (
                <div key={i} style={{
                  background: f.bg,
                  border: `1.5px solid ${f.border}`,
                  borderTop: `4px solid ${f.color}`,
                  borderRadius: 10, padding: '22px 24px',
                  opacity: op, transform: `translateY(${ty}px)`,
                  display: 'flex', flexDirection: 'column', gap: 10,
                }}>
                  {/* Icon + title row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ fontSize: 28, lineHeight: 1 }}>{f.icon}</div>
                    <div>
                      <div style={{ fontFamily: LATO, fontSize: 18, fontWeight: 900, color: TD, letterSpacing: '-0.01em', lineHeight: 1.1 }}>{f.title}</div>
                      <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, color: f.color, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>{f.subtitle}</div>
                    </div>
                  </div>
                  {/* Description */}
                  <div style={{ fontFamily: LATO, fontSize: 13, fontWeight: 300, color: TS, lineHeight: 1.65 }}>{f.desc}</div>
                </div>
              );
            })}
          </div>

          {/* ── Stats strip ───────────────────────────────────────────────── */}
          {(() => {
            const at = 76;
            const p  = spring({ frame: frame - at, fps, config: SPR });
            const op = interpolate(p, [0, 0.5], [0, 1], C);
            const ty = interpolate(p, [0, 1],   [12, 0], C);
            const stats = [
              { value: '4',    label: 'Platform features' },
              { value: 'AR',   label: 'Coaching modality' },
              { value: 'AI',   label: 'Meal recognition' },
              { value: '24/7', label: 'Health assistant' },
            ];
            return (
              <div style={{ display: 'flex', gap: 0, marginTop: 16, opacity: op, transform: `translateY(${ty}px)` }}>
                {stats.map((s, i) => {
                  const border = `1px solid ${BORDER}`;
                  return (
                    <div key={i} style={{
                      flex: 1, padding: '14px 20px',
                      borderTop: border, borderBottom: border, borderLeft: border,
                      borderRight: i === stats.length - 1 ? border : 'none',
                      background: WHITE, borderRadius: i === 0 ? '6px 0 0 6px' : i === stats.length - 1 ? '0 6px 6px 0' : 0,
                    }}>
                      <div style={{ fontFamily: MONO, fontSize: 26, fontWeight: 700, color: PRIMARY, letterSpacing: '-0.02em', lineHeight: 1 }}>{s.value}</div>
                      <div style={{ fontFamily: MONO, fontSize: 9, fontWeight: 500, color: TL, textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 4 }}>{s.label}</div>
                    </div>
                  );
                })}
              </div>
            );
          })()}

        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
