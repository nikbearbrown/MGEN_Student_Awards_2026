import React from 'react';
import { AbsoluteFill } from 'remotion';
import { StudentCard, NeuOverlay, type StudentCardData, RED } from '../scaffold/neu-primitives';

const DATA: StudentCardData = {
  num: '14', dark: false,
  eyebrow: 'STUDENT 14 OF 19 · MGEN AWARDS 2026',
  names: ['Vrushti', 'Shah'],
  projectNode: <>Scan<span style={{ color: RED }}>Mate</span></>,
  tagline: 'Privacy-first iOS document scanner — all processing on-device, zero cloud uploads',
  stats: [
    { value: '0',     label: 'Cloud uploads' },
    { value: 'iOS',   label: 'Native platform' },
    { value: 'OCR',   label: 'Text extraction' },
    { value: 'Local', label: 'On-device processing' },
  ],
};

export const Scene14Vrushti: React.FC = () => (
  <AbsoluteFill style={{ overflow: 'hidden' }}>
    <StudentCard data={DATA} hl={50} />
    <NeuOverlay
      eyebrow="STUDENT 14 OF 19 · MGEN AWARDS 2026 · NORTHEASTERN UNIVERSITY"
      firstName="Vrushti"
      lastName="Shah"
      project={<strong style={{ fontWeight: 700, color: RED }}>ScanMate</strong>}
      desc="privacy-first iOS document scanner · all processing on-device · zero cloud"
      num="14"
      showFrame={5}
      hideFrame={140}
    />
  </AbsoluteFill>
);
