import React from 'react';
import { AbsoluteFill } from 'remotion';
import { StudentCard, NeuOverlay, type StudentCardData, RED } from '../scaffold/neu-primitives';

const DATA: StudentCardData = {
  num: '02', dark: false,
  eyebrow: 'STUDENT 02 OF 19 · MGEN AWARDS 2026',
  names: ['Bhavya', 'Raghunatha Reddy'],
  projectNode: <>Chest<span style={{ color: RED }}>AI</span></>,
  tagline: 'Deep learning chest X-ray diagnostics — 98% accuracy in under 10 seconds',
  stats: [
    { value: 98,     unit: '%', label: 'Diagnostic accuracy' },
    { value: 10,     unit: 's', label: 'Time to result' },
    { value: 'CNN',             label: 'Model architecture' },
    { value: 'Multi',           label: 'Condition detection' },
  ],
};

export const Scene02Bhavya: React.FC = () => (
  <AbsoluteFill style={{ overflow: 'hidden' }}>
    <StudentCard data={DATA} hl={50} />
    <NeuOverlay
      eyebrow="STUDENT 02 OF 19 · MGEN AWARDS 2026 · NORTHEASTERN UNIVERSITY"
      firstName="Bhavya"
      lastName="Raghunatha Reddy"
      project={<strong style={{ fontWeight: 700, color: RED }}>ChestAI</strong>}
      desc="deep learning chest X-ray diagnostics · 98% accuracy · under 10 seconds"
      num="02"
      showFrame={5}
      hideFrame={140}
    />
  </AbsoluteFill>
);
