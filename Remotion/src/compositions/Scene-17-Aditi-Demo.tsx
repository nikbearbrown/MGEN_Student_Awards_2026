import React from 'react';
import { AbsoluteFill, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Video } from 'remotion';
import { LATO, MONO, C, SPR } from '../scaffold/neu-primitives';

// 11.3 s video @ 30 fps = 339 frames + 45 buffer
export const ADITI_ISE_FRAMES = 384;

const SUB_ORANGE = '#FF6719';
const SUB_BG     = '#ffffff';
const SUB_BORDER = '#e5e7eb';
const SUB_TEXT   = '#111827';
const SUB_MUTED  = '#6b7280';

const NAV_ITEMS  = ['Home', 'Notes', 'Husky Living', 'Reviews', 'AI', 'Skunkworks', 'Insights', 'Dana Hub', 'People', 'Archive', 'About'];

const RECENT = [
  { title: 'I Built a RAG Pipeline from Scratch — Here\'s What Nobody Tells You', meta: '15 MIN READ · ADITI SHINDE' },
  { title: 'What Happens When an AI Escapes Its Own Sandbox?',                    meta: '10 MIN READ · ADITI SHINDE' },
];

export const Scene17AditiDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const winP  = spring({ frame, fps, config: { damping: 180, stiffness: 190, mass: 1.1 } });
  const winY  = interpolate(winP, [0, 1], [56, 0], C);
  const winOp = interpolate(winP, [0, .25], [0, 1], C);

  const hdrOp = interpolate(frame, [18, 32], [0, 1], C);
  const navOp = interpolate(frame, [26, 40], [0, 1], C);
  const ctxOp = interpolate(frame, [34, 50], [0, 1], C);

  return (
    <AbsoluteFill style={{ background: '#d1d5db' }}>

      {/* Browser window */}
      <div style={{
        position: 'absolute', left: 80, right: 80, top: 44, bottom: 36,
        borderRadius: 10, overflow: 'hidden',
        boxShadow: '0 28px 88px rgba(0,0,0,0.26), 0 4px 16px rgba(0,0,0,0.12)',
        background: SUB_BG,
        opacity: winOp, transform: `translateY(${winY}px)`,
        display: 'flex', flexDirection: 'column',
      }}>

        {/* Chrome bar */}
        <div style={{
          height: 44, background: '#f1f3f5', flexShrink: 0,
          borderBottom: '1px solid #d1d5db',
          display: 'flex', alignItems: 'center', paddingLeft: 16, paddingRight: 16, gap: 14,
        }}>
          <div style={{ display: 'flex', gap: 7 }}>
            {['#ff5f56', '#ffbd2e', '#27c93f'].map((c, i) => (
              <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
            ))}
          </div>
          <div style={{
            flex: 1, maxWidth: 480, margin: '0 auto',
            background: '#e5e7eb', borderRadius: 6, padding: '5px 16px',
            fontFamily: MONO, fontSize: 11, color: '#4b5563', letterSpacing: '0.01em',
          }}>
            northeasternise.substack.com
          </div>
        </div>

        {/* Site header */}
        <div style={{
          borderBottom: `1px solid ${SUB_BORDER}`, padding: '12px 40px',
          display: 'flex', alignItems: 'center', flexShrink: 0,
          opacity: hdrOp,
        }}>
          <div style={{ flex: 1, textAlign: 'center', fontFamily: LATO, fontSize: 17, fontWeight: 700, color: SUB_TEXT, letterSpacing: '-0.01em' }}>
            NortheasternISE's Substack
          </div>
          <div style={{ position: 'absolute', right: 120, display: 'flex', alignItems: 'center', gap: 18 }}>
            <span style={{ fontSize: 15, color: SUB_MUTED }}>🔍</span>
            <span style={{ fontSize: 15, color: SUB_MUTED }}>🔔</span>
            <span style={{ fontSize: 15, color: SUB_MUTED }}>💬</span>
            <div style={{
              background: SUB_ORANGE, borderRadius: 6, padding: '5px 14px',
              fontFamily: LATO, fontSize: 12, fontWeight: 700, color: '#fff',
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              Dashboard <span style={{ fontSize: 9 }}>▾</span>
            </div>
          </div>
        </div>

        {/* Nav strip */}
        <div style={{
          borderBottom: `1px solid ${SUB_BORDER}`,
          padding: '0 40px', display: 'flex', flexShrink: 0,
          opacity: navOp,
        }}>
          {NAV_ITEMS.map((item, i) => (
            <div key={i} style={{
              fontFamily: LATO, fontSize: 12, fontWeight: i === 0 ? 700 : 400,
              color: i === 0 ? SUB_TEXT : SUB_MUTED,
              padding: '9px 12px', whiteSpace: 'nowrap',
              borderBottom: i === 0 ? `2px solid ${SUB_TEXT}` : '2px solid transparent',
            }}>
              {item}
            </div>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden', opacity: ctxOp }}>

          {/* Main column */}
          <div style={{ flex: 1, padding: '28px 40px', borderRight: `1px solid ${SUB_BORDER}`, overflow: 'hidden' }}>

            {/* Featured: text + video */}
            <div style={{ display: 'flex', gap: 28, marginBottom: 24, alignItems: 'flex-start' }}>

              {/* Article text */}
              <div style={{ flex: '0 0 340px' }}>
                <div style={{ fontFamily: MONO, fontSize: 9, color: SUB_ORANGE, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>
                  Featured
                </div>
                <div style={{ fontFamily: LATO, fontSize: 20, fontWeight: 800, color: SUB_TEXT, lineHeight: 1.32, marginBottom: 10, letterSpacing: '-0.01em' }}>
                  The Algorithm as Gatekeeper: What It Means When Machines Decide…
                </div>
                <div style={{ fontFamily: LATO, fontSize: 13, color: SUB_MUTED, lineHeight: 1.55, marginBottom: 12 }}>
                  How AI hiring systems don't just automate bias — they make it permanent, invisible, and legally defensible.
                </div>
                <div style={{ fontFamily: MONO, fontSize: 9, color: SUB_MUTED, letterSpacing: '0.10em', textTransform: 'uppercase' }}>
                  2 Days ago · Aditi Shinde
                </div>
              </div>

              {/* Video — featured image slot */}
              <div style={{ flex: 1, borderRadius: 8, overflow: 'hidden', background: '#000', minWidth: 0 }}>
                <Video
                  src={staticFile('aditi-ise.mp4')}
                  style={{ width: '100%', display: 'block', aspectRatio: '16/9', objectFit: 'cover' }}
                  startFrom={0}
                  muted
                />
              </div>
            </div>

            {/* Tabs */}
            <div style={{ borderTop: `1px solid ${SUB_BORDER}`, paddingTop: 14, marginBottom: 14, display: 'flex', gap: 0 }}>
              {['Latest', 'Top', 'Discussions'].map((t, i) => (
                <span key={t} style={{
                  fontFamily: LATO, fontSize: 13, fontWeight: i === 0 ? 700 : 400,
                  color: i === 0 ? SUB_TEXT : SUB_MUTED,
                  paddingBottom: 8, marginRight: 24,
                  borderBottom: i === 0 ? `2px solid ${SUB_TEXT}` : '2px solid transparent',
                }}>
                  {t}
                </span>
              ))}
            </div>

            {/* Recent posts */}
            {RECENT.map((post, i) => (
              <div key={i} style={{
                display: 'flex', gap: 16, paddingBottom: 18, marginBottom: 18,
                borderBottom: `1px solid ${SUB_BORDER}`,
              }}>
                <div style={{ width: 80, height: 58, borderRadius: 6, background: '#e5e7eb', flexShrink: 0 }} />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 5 }}>
                  <div style={{ fontFamily: LATO, fontSize: 14, fontWeight: 600, color: SUB_TEXT, lineHeight: 1.38 }}>
                    {post.title}
                  </div>
                  <div style={{ fontFamily: MONO, fontSize: 9, color: SUB_MUTED, letterSpacing: '0.08em' }}>
                    {post.meta}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div style={{ width: 280, padding: '28px 24px', flexShrink: 0 }}>
            <div style={{ border: `1px solid ${SUB_BORDER}`, borderRadius: 10, padding: '20px 18px' }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 700, color: '#fff' }}>ISE</span>
              </div>
              <div style={{ fontFamily: LATO, fontSize: 13, fontWeight: 700, color: SUB_TEXT, marginBottom: 6 }}>
                NortheasternISE's Substack
              </div>
              <div style={{ fontFamily: LATO, fontSize: 12, color: SUB_MUTED, lineHeight: 1.55, marginBottom: 16 }}>
                Official Substack for Northeastern's Information and Software Engineering department.
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: '#f0fdf4', border: '1px solid #86efac',
                borderRadius: 6, padding: '8px 14px',
              }}>
                <span style={{ color: '#16a34a', fontSize: 14, fontWeight: 700 }}>✓</span>
                <span style={{ fontFamily: LATO, fontSize: 13, fontWeight: 600, color: '#16a34a' }}>Subscribed</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </AbsoluteFill>
  );
};
