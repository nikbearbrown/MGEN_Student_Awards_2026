import React from 'react';
import { AbsoluteFill } from 'remotion';
import { StudentCard, NeuOverlay, type StudentCardData, RED } from '../scaffold/neu-primitives';

const DATA: StudentCardData = {
  num: '18', dark: false,
  eyebrow: 'STUDENT 18 OF 19 · MGEN AWARDS 2026',
  names: ['Nidhi', 'Nityanand Uchil'],
  projectNode: <><span style={{ color: RED }}>Edu</span>Verse</>,
  tagline: "Original children's educational video — storytelling through composed music",
  stats: [
    { value: '1st',   label: 'Original composition' },
    { value: 'Music', label: 'Original score' },
    { value: 'K-3',   label: 'Target audience' },
    { value: 'Video', label: 'Education format' },
  ],
};

export const Scene18Nidhi: React.FC = () => (
  <AbsoluteFill style={{ overflow: 'hidden' }}>
    <StudentCard data={DATA} hl={50} />
    <NeuOverlay
      eyebrow="STUDENT 18 OF 19 · MGEN AWARDS 2026 · NORTHEASTERN UNIVERSITY"
      firstName="Nidhi"
      lastName="Nityanand Uchil"
      project={<strong style={{ fontWeight: 700, color: RED }}>EduVerse</strong>}
      desc="original children's educational video with composed musical score"
      num="18"
      showFrame={5}
      hideFrame={140}
    />
  </AbsoluteFill>
);
