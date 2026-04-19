import React from 'react';
import { AbsoluteFill } from 'remotion';
import { StudentCard, NeuOverlay, type StudentCardData, RED } from '../scaffold/neu-primitives';

const DATA: StudentCardData = {
  num: '13', dark: true,
  eyebrow: 'STUDENT 13 OF 19 · MGEN AWARDS 2026',
  names: ['Brian', 'Mwesigwa'],
  projectNode: <>Ten<span style={{ color: RED }}>ovio</span></>,
  tagline: 'End-to-end AI property management — tenants, maintenance, rent collection',
  stats: [
    { value: 'AI',    label: 'Tenant screening' },
    { value: 'Auto',  label: 'Rent collection' },
    { value: 'Multi', label: 'Unit management' },
    { value: 'Portal',label: 'Tenant self-service' },
  ],
};

export const Scene13Brian: React.FC = () => (
  <AbsoluteFill style={{ overflow: 'hidden' }}>
    <StudentCard data={DATA} hl={50} />
    <NeuOverlay
      eyebrow="STUDENT 13 OF 19 · MGEN AWARDS 2026 · NORTHEASTERN UNIVERSITY"
      firstName="Brian"
      lastName="Mwesigwa"
      project={<strong style={{ fontWeight: 700, color: RED }}>Tenovio</strong>}
      desc="end-to-end AI property management · tenants · maintenance · rent collection"
      num="13"
      showFrame={5}
      hideFrame={140}
    />
  </AbsoluteFill>
);
