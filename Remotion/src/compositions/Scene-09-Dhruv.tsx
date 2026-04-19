import React from 'react';
import { AbsoluteFill } from 'remotion';
import { StudentCard, NeuOverlay, type StudentCardData, RED } from '../scaffold/neu-primitives';

const DATA: StudentCardData = {
  num: '09', dark: true,
  eyebrow: 'STUDENT 09 OF 19 · MGEN AWARDS 2026',
  names: ['Dhruv', 'Patel'],
  projectNode: <>Dev<span style={{ color: RED }}>Proof</span></>,
  tagline: 'AI-powered developer portfolio scoring — objective signal from real code',
  stats: [
    { value: 100,      unit: 'pt', label: 'Max portfolio score' },
    { value: 'GitHub',             label: 'Primary signal source' },
    { value: 'AI',                 label: 'Scoring engine' },
    { value: 'API',                label: 'Integration format' },
  ],
};

export const Scene09Dhruv: React.FC = () => (
  <AbsoluteFill style={{ overflow: 'hidden' }}>
    <StudentCard data={DATA} hl={50} />
    <NeuOverlay
      eyebrow="STUDENT 09 OF 19 · MGEN AWARDS 2026 · NORTHEASTERN UNIVERSITY"
      firstName="Dhruv"
      lastName="Patel"
      project={<strong style={{ fontWeight: 700, color: RED }}>DevProof</strong>}
      desc="AI-powered developer portfolio scoring · objective signal from real code"
      num="09"
      showFrame={5}
      hideFrame={140}
    />
  </AbsoluteFill>
);
