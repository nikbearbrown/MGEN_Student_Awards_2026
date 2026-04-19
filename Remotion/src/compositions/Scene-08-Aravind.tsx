import React from 'react';
import { AbsoluteFill } from 'remotion';
import { StudentCard, NeuOverlay, type StudentCardData, RED } from '../scaffold/neu-primitives';

const DATA: StudentCardData = {
  num: '08', dark: false,
  eyebrow: 'STUDENT 08 OF 19 · MGEN AWARDS 2026',
  names: ['Aravind', 'Balaji'],
  projectNode: <>Quantum<span style={{ color: RED }}>Mem</span></>,
  tagline: 'Quantum-enhanced associative memory — novel architecture for AI retention',
  stats: [
    { value: 'Quantum',   label: 'Enhancement method' },
    { value: 'Memory',    label: 'Target function' },
    { value: '1st',       label: 'Novel architecture' },
    { value: 'Published', label: 'Research status' },
  ],
};

export const Scene08Aravind: React.FC = () => (
  <AbsoluteFill style={{ overflow: 'hidden' }}>
    <StudentCard data={DATA} hl={50} />
    <NeuOverlay
      eyebrow="STUDENT 08 OF 19 · MGEN AWARDS 2026 · NORTHEASTERN UNIVERSITY"
      firstName="Aravind"
      lastName="Balaji"
      project={<strong style={{ fontWeight: 700, color: RED }}>QuantumMem</strong>}
      desc="quantum-enhanced associative memory · novel architecture for AI retention"
      num="08"
      showFrame={5}
      hideFrame={140}
    />
  </AbsoluteFill>
);
