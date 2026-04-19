import React from 'react';
import { AbsoluteFill } from 'remotion';
import { StudentCard, NeuOverlay, type StudentCardData, RED } from '../scaffold/neu-primitives';

const DATA: StudentCardData = {
  num: '15', dark: true,
  eyebrow: 'STUDENT 15 OF 19 · MGEN AWARDS 2026',
  names: ['Yeshwanth', 'Balaji'],
  projectNode: <span style={{ color: RED }}>SAGE</span>,
  tagline: 'Secure AI Governance Engine — policy-aware LLM monitoring and compliance',
  stats: [
    { value: 'Policy',    label: 'Compliance framework' },
    { value: 'LLM',       label: 'Monitoring target' },
    { value: 'Real-time', label: 'Threat detection' },
    { value: 'Zero',      label: 'Trust model' },
  ],
};

export const Scene15Yeshwanth: React.FC = () => (
  <AbsoluteFill style={{ overflow: 'hidden' }}>
    <StudentCard data={DATA} hl={50} />
    <NeuOverlay
      eyebrow="STUDENT 15 OF 19 · MGEN AWARDS 2026 · NORTHEASTERN UNIVERSITY"
      firstName="Yeshwanth"
      lastName="Balaji"
      project={<strong style={{ fontWeight: 700, color: RED }}>SAGE</strong>}
      desc="Secure AI Governance Engine · policy-aware LLM monitoring and compliance"
      num="15"
      showFrame={5}
      hideFrame={140}
    />
  </AbsoluteFill>
);
