import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { LATO, MONO, C, SPR } from '../scaffold/neu-primitives';

export const SCANMATE_DEMO_FRAMES = 210;

const BG    = '#000000';
const GREEN = '#22c55e';
const WHITE = '#ffffff';
const DIM   = 'rgba(255,255,255,0.45)';

const TOOLBAR_ITEMS = [
  { icon: '✂️', label: 'Crop' },
  { icon: '✨', label: 'Enhance' },
  { icon: '↻',  label: 'Rotate' },
  { icon: '✏️', label: 'Draw' },
  { icon: '✍️', label: 'Sign' },
  { icon: '⊞',  label: 'Compare' },
];

const FILTERS = ['Original', 'Grayscale', 'B & W', 'Boost', 'Lighten'];

const FEATURES = [
  { label: 'Full-featured scanning',  desc: 'Complete scanning, editing, OCR, and file management in one powerful app.' },
  { label: 'On-device processing',    desc: 'Zero cloud uploads — all computation runs privately on your iPhone.' },
  { label: 'Intuitive experience',    desc: 'Smooth, intuitive interface designed for both casual and professional users.' },
];

export const Scene14VrushtiDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelP  = spring({ frame, fps, config: SPR });
  const labelOp = interpolate(labelP, [0, .4], [0, 1], C);
  const labelY  = interpolate(labelP, [0,  1], [-20, 0], C);

  const headP  = spring({ frame: frame - 10, fps, config: { damping: 200, stiffness: 260 } });
  const headOp = interpolate(headP, [0, .3], [0, 1], C);
  const headY  = interpolate(headP, [0,  1], [40, 0], C);

  const phoneP  = spring({ frame: frame - 20, fps, config: { damping: 60, stiffness: 200, mass: 1.2 } });
  const phoneY  = interpolate(phoneP, [0, 1], [80, 0], C);
  const phoneOp = interpolate(phoneP, [0, .2], [0, 1], C);

  const toolOp = interpolate(frame, [40, 58], [0, 1], C);
  const featOp = (i: number) => {
    const p = spring({ frame: frame - (68 + i * 12), fps, config: SPR });
    return interpolate(p, [0, .5], [0, 1], C);
  };

  return (
    <AbsoluteFill style={{ background: BG }}>

      {/* Left: Label + headline */}
      <div style={{ position: 'absolute', top: 200, left: 120, right: 780 }}>
        {/* Green label box */}
        <div style={{
          background: GREEN, borderRadius: 6,
          padding: '10px 20px', display: 'inline-block',
          marginBottom: 24,
          opacity: labelOp, transform: `translateY(${labelY}px)`,
        }}>
          <div style={{ fontFamily: LATO, fontSize: 28, fontWeight: 900, color: WHITE, letterSpacing: '-0.01em', lineHeight: 1 }}>
            Edit Toolbar
          </div>
        </div>

        <div style={{
          fontFamily: LATO, fontSize: 28, fontWeight: 300,
          color: DIM, letterSpacing: '0.02em',
          opacity: headOp, transform: `translateY(${headY}px)`,
        }}>
          Crop · Enhance · Rotate
        </div>

        {/* Feature list */}
        <div style={{ marginTop: 48 }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{
              marginBottom: 22, opacity: featOp(i),
            }}>
              <div style={{ fontFamily: LATO, fontSize: 15, fontWeight: 700, color: WHITE, marginBottom: 4 }}>{f.label}</div>
              <div style={{ fontFamily: LATO, fontSize: 13, fontWeight: 300, color: DIM, lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        {/* Privacy badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 8,
          border: '1px solid rgba(34,197,94,0.4)', borderRadius: 6, padding: '8px 16px',
          opacity: featOp(3),
        }}>
          <span style={{ fontSize: 14 }}>🔒</span>
          <span style={{ fontFamily: MONO, fontSize: 11, color: GREEN, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Privacy-first · Zero cloud
          </span>
        </div>
      </div>

      {/* Right: iOS phone mockup */}
      <div style={{
        position: 'absolute', top: 60, right: 100,
        width: 340, height: 680,
        opacity: phoneOp, transform: `translateY(${phoneY}px)`,
      }}>
        {/* Phone shell */}
        <div style={{
          width: '100%', height: '100%',
          background: '#1c1c1e', borderRadius: 44,
          border: '2px solid rgba(255,255,255,0.15)',
          overflow: 'hidden', position: 'relative',
        }}>
          {/* Status bar */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 48,
            background: '#000', display: 'flex', alignItems: 'center',
            paddingLeft: 20, paddingRight: 20,
          }}>
            <span style={{ fontFamily: MONO, fontSize: 12, color: WHITE }}>7:52</span>
            <div style={{ width: 80, height: 22, background: '#1c1c1e', borderRadius: 11, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#e11d48' }} />
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
              {['▲','▲','▲'].map((_, i) => <div key={i} style={{ width: 4, height: 8 + i * 2, background: WHITE, borderRadius: 1 }} />)}
            </div>
          </div>

          {/* Action bar */}
          <div style={{
            position: 'absolute', top: 48, left: 0, right: 0, height: 48,
            background: '#000',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingLeft: 16, paddingRight: 16,
          }}>
            <span style={{ fontFamily: LATO, fontSize: 14, color: GREEN }}>Cancel</span>
            <span style={{ fontFamily: LATO, fontSize: 14, fontWeight: 600, color: WHITE }}>Edit</span>
            <span style={{ fontFamily: LATO, fontSize: 14, color: GREEN, fontWeight: 600 }}>Done</span>
          </div>

          {/* Document preview */}
          <div style={{
            position: 'absolute', top: 96, left: 20, right: 20, height: 300,
            background: '#2c2c2e', borderRadius: 8, overflow: 'hidden',
          }}>
            <div style={{ padding: 12 }}>
              <div style={{ fontFamily: LATO, fontSize: 9, color: WHITE, fontWeight: 600, marginBottom: 6 }}>Project Overview</div>
              {[80, 70, 60, 55, 65].map((w, i) => (
                <div key={i} style={{ width: `${w}%`, height: 5, background: 'rgba(255,255,255,0.15)', borderRadius: 2, marginBottom: 4 }} />
              ))}
            </div>
          </div>

          {/* Filter strip */}
          <div style={{
            position: 'absolute', bottom: 120, left: 0, right: 0,
            display: 'flex', gap: 8, padding: '0 12px',
            opacity: toolOp,
          }}>
            {FILTERS.map((f, i) => (
              <div key={f} style={{
                flex: 1, background: i === 0 ? '#3a3a3c' : '#2c2c2e',
                borderRadius: 6, padding: '8px 4px', textAlign: 'center',
              }}>
                <div style={{ width: '80%', height: 40, background: '#4a4a4c', borderRadius: 4, margin: '0 auto 4px' }} />
                <span style={{ fontFamily: MONO, fontSize: 8, color: i === 0 ? WHITE : 'rgba(255,255,255,0.5)' }}>{f}</span>
              </div>
            ))}
          </div>

          {/* Toolbar icons */}
          <div style={{
            position: 'absolute', bottom: 12, left: 0, right: 0,
            display: 'flex', justifyContent: 'space-around', padding: '0 8px',
            opacity: toolOp,
          }}>
            {TOOLBAR_ITEMS.map(t => (
              <div key={t.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <span style={{ fontSize: 18, color: WHITE }}>{t.icon}</span>
                <span style={{ fontFamily: MONO, fontSize: 8, color: 'rgba(255,255,255,0.5)' }}>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </AbsoluteFill>
  );
};
