import React from 'react';
import { AbsoluteFill } from 'remotion';
import { StudentCard, NeuOverlay, type StudentCardData, RED } from '../scaffold/neu-primitives';

const DATA: StudentCardData = {
  num: '04', dark: false,
  eyebrow: 'STUDENT 04 OF 19 · MGEN AWARDS 2026',
  names: ['Kavin', 'Jha'],
  projectNode: <span style={{ color: RED }}>Axis</span>,
  tagline: 'AR vision therapy for iOS — Apple Swift Student Challenge 2026 winner',
  stats: [
    { value: '2026', label: 'Apple Swift Challenge' },
    { value: 'AR',   label: 'Therapy modality' },
    { value: 'iOS',  label: 'Native platform' },
    { value: '0',    label: 'External aids required' },
  ],
};

export const Scene04Kavin: React.FC = () => (
  <AbsoluteFill style={{ overflow: 'hidden' }}>
    <StudentCard data={DATA} hl={50} />
    <NeuOverlay
      eyebrow="STUDENT 04 OF 19 · MGEN AWARDS 2026 · NORTHEASTERN UNIVERSITY"
      firstName="Kavin"
      lastName="Jha"
      project={<strong style={{ fontWeight: 700, color: RED }}>Axis</strong>}
      desc="AR vision therapy for iOS · Apple Swift Student Challenge 2026 winner"
      num="04"
      showFrame={5}
      hideFrame={140}
    />
  </AbsoluteFill>
);
