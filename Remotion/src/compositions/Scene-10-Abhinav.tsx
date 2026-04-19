import React from 'react';
import { AbsoluteFill } from 'remotion';
import { StudentCard, NeuOverlay, type StudentCardData, RED } from '../scaffold/neu-primitives';

const DATA: StudentCardData = {
  num: '10', dark: false,
  eyebrow: 'STUDENT 10 OF 19 · MGEN AWARDS 2026',
  names: ['Abhinav', 'Pandey'],
  projectNode: <>Job<span style={{ color: RED }}>Seeker</span></>,
  tagline: 'Aggregates 1,600+ company career pages — AI-matched, daily-refreshed listings',
  stats: [
    { value: 1600,   label: 'Company career pages' },
    { value: 'AI',   label: 'Job matching engine' },
    { value: 'Daily',label: 'Listing refresh' },
    { value: 'Auto', label: 'Application tracking' },
  ],
};

export const Scene10Abhinav: React.FC = () => (
  <AbsoluteFill style={{ overflow: 'hidden' }}>
    <StudentCard data={DATA} hl={50} />
    <NeuOverlay
      eyebrow="STUDENT 10 OF 19 · MGEN AWARDS 2026 · NORTHEASTERN UNIVERSITY"
      firstName="Abhinav"
      lastName="Pandey"
      project={<strong style={{ fontWeight: 700, color: RED }}>JobSeeker</strong>}
      desc="1,600+ company career pages · AI-matched · daily-refreshed listings"
      num="10"
      showFrame={5}
      hideFrame={140}
    />
  </AbsoluteFill>
);
