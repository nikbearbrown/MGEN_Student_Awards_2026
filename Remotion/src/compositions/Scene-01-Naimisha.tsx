import React from 'react';
import { AbsoluteFill } from 'remotion';
import { StudentCard, type StudentCardData, RED } from '../scaffold/neu-primitives';

const DATA: StudentCardData = {
  num: '01', dark: true,
  eyebrow: 'STUDENT 01 OF 19 · MGEN AWARDS 2026',
  names: ['Naimisha', 'Kaza'],
  projectNode: <>Fit<span style={{ color: RED }}>Path</span></>,
  tagline: 'AI health platform — AR coaching, meal scanning & telehealth',
  stats: [
    { value: 4,      label: 'Platform features' },
    { value: 'AR',   label: 'Coaching modality' },
    { value: 'AI',   label: 'Meal recognition' },
    { value: '24/7', label: 'Health assistant' },
  ],
};

export const Scene01Naimisha: React.FC = () => (
  <AbsoluteFill style={{ overflow: 'hidden' }}>
    <StudentCard data={DATA} hl={0} />
  </AbsoluteFill>
);
