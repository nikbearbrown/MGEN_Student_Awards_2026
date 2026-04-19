import React from 'react';
import { AbsoluteFill } from 'remotion';
import { StudentCard, NeuOverlay, type StudentCardData, RED } from '../scaffold/neu-primitives';

const DATA: StudentCardData = {
  num: '16', dark: false,
  eyebrow: 'STUDENT 16 OF 19 · MGEN AWARDS 2026',
  names: ['Jaimit', 'Joshi'],
  projectNode: <>Bug<span style={{ color: RED }}>-Wise</span></>,
  tagline: 'AI QA co-pilot — automated bug detection, root-cause analysis, CI/CD integration',
  stats: [
    { value: 'AI',    label: 'QA co-pilot engine' },
    { value: 'Auto',  label: 'Bug detection' },
    { value: 'LLM',   label: 'Root cause analysis' },
    { value: 'CI/CD', label: 'Pipeline integration' },
  ],
};

export const Scene16Jaimit: React.FC = () => (
  <AbsoluteFill style={{ overflow: 'hidden' }}>
    <StudentCard data={DATA} hl={50} />
    <NeuOverlay
      eyebrow="STUDENT 16 OF 19 · MGEN AWARDS 2026 · NORTHEASTERN UNIVERSITY"
      firstName="Jaimit"
      lastName="Joshi"
      project={<strong style={{ fontWeight: 700, color: RED }}>Bug-Wise</strong>}
      desc="AI QA co-pilot · automated bug detection · root-cause analysis · CI/CD integration"
      num="16"
      showFrame={5}
      hideFrame={140}
    />
  </AbsoluteFill>
);
