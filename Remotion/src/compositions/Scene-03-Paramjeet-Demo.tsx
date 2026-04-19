import React from 'react';
import { AbsoluteFill, interpolate, staticFile, useCurrentFrame, Video } from 'remotion';
import { LATO, MONO, RED, GOLD, C } from '../scaffold/neu-primitives';

// video is 7.367 s @ 30 fps
export const COACH_ME_FRAMES = 221;

export const Scene03ParamjeetDemo: React.FC = () => {
  const frame = useCurrentFrame();

  // Lower-third fades in over 10 frames, holds to frame 70, then fades out to frame 90
  const overlayOp = interpolate(frame, [0, 10, 70, 90], [0, 1, 1, 0], C);

  return (
    <AbsoluteFill style={{ background: '#000' }}>

      {/* Full-frame video — 1906×1080 source, cover fills 1920×1080 cleanly */}
      <Video
        src={staticFile('coach-me.mp4')}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />

      {/* NEU lower-third — appears briefly then fades, leaving clean video */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        opacity: overlayOp,
        background: 'linear-gradient(transparent, rgba(0,0,0,0.72))',
        padding: '56px 64px 32px',
        display: 'flex', alignItems: 'flex-end', gap: 20,
      }}>
        <div style={{ width: 4, height: 56, background: RED, flexShrink: 0 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', color: GOLD, textTransform: 'uppercase' }}>
            Student 03 of 19 · MGEN Awards 2026
          </div>
          <div style={{ fontFamily: LATO, fontSize: 42, fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1, color: '#fff' }}>
            Coach<span style={{ color: RED }}> Me</span>
          </div>
          <div style={{ fontFamily: LATO, fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>
            Paramjeet Singh · Real-time AI sports coaching
          </div>
        </div>
      </div>

    </AbsoluteFill>
  );
};
