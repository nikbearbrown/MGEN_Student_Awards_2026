import React from 'react';
import { AbsoluteFill, interpolate, staticFile, useCurrentFrame, Video } from 'remotion';
import { LATO, MONO, RED, GOLD, C } from '../scaffold/neu-primitives';

// 5.208 s @ 30 fps
export const NIDHI_FRAMES = 156;

export const Scene18NidhiDemo: React.FC = () => {
  const frame = useCurrentFrame();

  const overlayOp = interpolate(frame, [0, 10, 60, 80], [0, 1, 1, 0], C);

  return (
    <AbsoluteFill style={{ background: '#000' }}>

      <Video
        src={staticFile('nidhi.mp4')}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        opacity: overlayOp,
        background: 'linear-gradient(transparent, rgba(0,0,0,0.75))',
        padding: '56px 64px 32px',
        display: 'flex', alignItems: 'flex-end', gap: 20,
      }}>
        <div style={{ width: 4, height: 56, background: RED, flexShrink: 0 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', color: GOLD, textTransform: 'uppercase' }}>
            Student 18 of 19 · MGEN Awards 2026
          </div>
          <div style={{ fontFamily: LATO, fontSize: 42, fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1, color: '#fff' }}>
            <span style={{ color: RED }}>Edu</span>Verse
          </div>
          <div style={{ fontFamily: LATO, fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>
            Nidhi Nityanand Uchil · Original children's educational video with composed score
          </div>
        </div>
      </div>

    </AbsoluteFill>
  );
};
