import React from 'react';
import { AbsoluteFill } from 'remotion';
import { StudentCard, NeuOverlay, type StudentCardData, RED } from '../scaffold/neu-primitives';

const DATA: StudentCardData = {
  num: '05', dark: true,
  eyebrow: 'STUDENT 05 OF 19 · MGEN AWARDS 2026',
  names: ['Anusha', 'Prakash'],
  projectNode: <>Auto<span style={{ color: RED }}>Insight</span></>,
  tagline: <>Real answers from real government data. <em style={{ fontStyle: 'italic' }}>In seconds.</em></>,
  stats: [
    { value: 25, suffix: 'K', unit: '×', label: 'Faster time-to-insight' },
    { value: 114,              unit: 'GB', label: 'Real automotive data' },
    { value: 4,                            label: 'AI agents' },
    { value: 10,               unit: 's',  label: 'Seconds to answer' },
  ],
};

export const Scene05Anusha: React.FC = () => (
  <AbsoluteFill style={{ overflow: 'hidden' }}>
    <StudentCard data={DATA} hl={50} />
    <NeuOverlay
      eyebrow="STUDENT 05 OF 19 · MGEN AWARDS 2026 · NORTHEASTERN UNIVERSITY"
      firstName="Anusha"
      lastName="Prakash"
      project={<strong style={{ fontWeight: 700, color: RED }}>AutoInsight</strong>}
      desc="multi-agent AI · 114 GB government data · 224K+ records · 10 seconds"
      num="05"
      showFrame={5}
      hideFrame={140}
    />
  </AbsoluteFill>
);
