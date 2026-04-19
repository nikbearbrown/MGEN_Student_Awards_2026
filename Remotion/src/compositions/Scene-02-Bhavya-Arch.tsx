import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { LATO, MONO, SPR, C } from '../scaffold/neu-primitives';

// ── HTML reference palette (overrides NEU brand for this slide) ───────────────
const BG     = '#f0ede8';   // warm beige from reference HTML
const DARK   = '#1e293b';   // dark header strip
const CYAN   = '#22d3ee';   // title accent
const WHITE  = '#ffffff';
const BORDER = '#e2e8f0';
const TD     = '#0f172a';   // text dark
const TS     = '#475569';   // text secondary
const TL     = '#94a3b8';   // text light
const GREEN  = '#22c55e';

const METRICS = [
  { value: '98%', accent: GREEN,     label: 'L2 Classification Accuracy' },
  { value: '6',   accent: TD,        label: 'Pipeline Levels' },
  { value: '10s', accent: GREEN,     label: 'Full Report Generation' },
  { value: '53%', accent: '#64748b', label: 'L3 mAP50 Bounding Box' },
];

interface PipeStep {
  step: string; color: string; bg: string; border: string; badge: string;
  label: string; detail: string;
}

const PIPELINE: PipeStep[] = [
  {
    step: '1', color: '#7c3aed', bg: '#f5f3ff', border: '#a78bfa', badge: 'Class B',
    label: 'Level 1 — Normal vs Abnormal',
    detail: 'YOLOv8s-cls · 5M params · 320 px · Binary softmax · halts at 85% confidence · 96.1%',
  },
  {
    step: '2', color: '#7c3aed', bg: '#f5f3ff', border: '#a78bfa', badge: 'Class B',
    label: 'Level 2 — Disease Classification',
    detail: 'YOLOv8l-cls · 36.2M params · 640 px · Normal / COVID-19 / Opacity / Viral PNA · 98.0%',
  },
  {
    step: '3', color: '#7c3aed', bg: '#f5f3ff', border: '#a78bfa', badge: 'Class B',
    label: 'Level 3 — Opacity Detection & Localization',
    detail: 'YOLOv8m-det · 25.8M params · 640 px · Bounding boxes · Left / Right / Bilateral · 53.1% mAP50',
  },
  {
    step: '3.5', color: '#0d9488', bg: '#f0fdfa', border: '#2dd4bf', badge: 'Class A',
    label: 'Lung Segmentation — OpenCV (Classical CV)',
    detail: 'Grayscale · adaptive thresholding (60–140) · morphological CLOSE+OPEN · 2-contour lung mask',
  },
  {
    step: '4', color: '#d97706', bg: '#fffbeb', border: '#fcd34d', badge: 'Class B',
    label: 'Level 4 — Affected Area Calculation',
    detail: '(opacity mask ∩ lung mask).sum() ÷ lung mask.sum() × 100 · pixel-level percentage',
  },
  {
    step: '5', color: '#ea580c', bg: '#fff7ed', border: '#fb923c', badge: 'Class B',
    label: 'Level 5 — Severity Assessment',
    detail: '<25% → MILD · 25–50% → MODERATE · >50% → SEVERE · Bilateral MILD upgrades to MODERATE',
  },
  {
    step: '6', color: '#ef4444', bg: '#fef2f2', border: '#fca5a5', badge: 'Class B',
    label: 'Level 6 — Clinical Recommendation',
    detail: 'SEVERE → 🔴 Immediate 30 min · MODERATE → 🟠 Urgent 2–4 hrs · MILD → 🟡 Standard 24 hrs',
  },
];

export const Scene02BhavyaArch: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerP  = spring({ frame: frame - 5, fps, config: SPR });
  const headerY  = interpolate(headerP, [0, 1], [-80, 0], C);
  const headerOp = interpolate(headerP, [0, 0.3], [0, 1], C);

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '52px 0 40px' }}>
        <div style={{ width: 1440 }}>

          {/* ── Dark title bar ─────────────────────────────────────────────── */}
          <div style={{
            background: DARK, borderRadius: 8, padding: '18px 28px', marginBottom: 14,
            transform: `translateY(${headerY}px)`, opacity: headerOp,
          }}>
            <div style={{ fontFamily: LATO, fontSize: 22, fontWeight: 900, color: WHITE, letterSpacing: '-0.01em', lineHeight: 1.2 }}>
              AI Chest X-Ray Diagnostic System{' '}
              <span style={{ color: CYAN }}>· lung-opacity-detection-system.ai</span>
            </div>
            <div style={{ fontFamily: MONO, fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.10em', marginTop: 6 }}>
              SYSTEM ARCHITECTURE OVERVIEW · IEC 62304 · DECISION SUPPORT ONLY
            </div>
          </div>

          {/* ── Metrics row ────────────────────────────────────────────────── */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
            {METRICS.map((m, i) => {
              const p  = spring({ frame: frame - (20 + i * 10), fps, config: SPR });
              const op = interpolate(p, [0, 0.5], [0, 1], C);
              const ty = interpolate(p, [0, 1],   [14, 0], C);
              return (
                <div key={i} style={{
                  flex: 1, background: WHITE, borderRadius: 8, border: `1px solid ${BORDER}`,
                  padding: '14px 18px', opacity: op, transform: `translateY(${ty}px)`,
                }}>
                  <div style={{ fontFamily: MONO, fontSize: 30, fontWeight: 700, color: m.accent, letterSpacing: '-0.03em', lineHeight: 1 }}>{m.value}</div>
                  <div style={{ fontFamily: MONO, fontSize: 10, color: TL, fontWeight: 500, marginTop: 4, lineHeight: 1.4 }}>{m.label}</div>
                </div>
              );
            })}
          </div>

          {/* ── Pipeline section label ─────────────────────────────────────── */}
          <div style={{
            fontFamily: MONO, fontSize: 10, fontWeight: 700, color: TS,
            letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8,
            opacity: interpolate(frame, [58, 68], [0, 1], C),
          }}>
            Six-Level Diagnostic Pipeline
          </div>

          {/* ── Pipeline steps ─────────────────────────────────────────────── */}
          {PIPELINE.map((step, i) => {
            const at = 65 + i * 18;
            const p  = spring({ frame: frame - at, fps, config: SPR });
            const op = interpolate(p, [0, 0.4], [0, 1], C);
            const tx = interpolate(p, [0, 1],   [-24, 0], C);
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                background: step.bg,
                border: `1px solid ${step.border}`,
                borderLeft: `4px solid ${step.color}`,
                borderRadius: 6, padding: '10px 14px', marginBottom: 6,
                opacity: op, transform: `translateX(${tx}px)`,
              }}>
                {/* Step circle */}
                <div style={{
                  width: 26, height: 26, borderRadius: '50%',
                  background: step.color, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, color: WHITE }}>{step.step}</span>
                </div>

                {/* Step text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: LATO, fontSize: 13, fontWeight: 700, color: TD, lineHeight: 1.2, marginBottom: 2 }}>{step.label}</div>
                  <div style={{ fontFamily: LATO, fontSize: 11, fontWeight: 300, color: TS, lineHeight: 1.4, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{step.detail}</div>
                </div>

                {/* IEC badge */}
                <div style={{ fontFamily: MONO, fontSize: 9, fontWeight: 700, background: step.color, color: WHITE, borderRadius: 3, padding: '2px 7px', flexShrink: 0 }}>
                  {step.badge}
                </div>
              </div>
            );
          })}

        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
