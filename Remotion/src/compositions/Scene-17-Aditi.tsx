import React from 'react';
import { AbsoluteFill } from 'remotion';
import { StudentCard, NeuOverlay, type StudentCardData, RED } from '../scaffold/neu-primitives';

const DATA: StudentCardData = {
  num: '17', dark: true,
  eyebrow: 'STUDENT 17 OF 19 · MGEN AWARDS 2026',
  names: ['Aditi', 'Shinde'],
  projectNode: <>NEU ISE <span style={{ color: RED }}>Substack</span></>,
  tagline: 'Embedded systems & AI publication — Substack newsletter and technical book author',
  stats: [
    { value: 'Stack',  label: 'Publication platform' },
    { value: 'Book',   label: 'Embedded systems + AI' },
    { value: 'ISE',    label: 'Department focus' },
    { value: 'Open',   label: 'Access format' },
  ],
};

export const Scene17Aditi: React.FC = () => (
  <AbsoluteFill style={{ overflow: 'hidden' }}>
    <StudentCard data={DATA} hl={50} />
    <NeuOverlay
      eyebrow="STUDENT 17 OF 19 · MGEN AWARDS 2026 · NORTHEASTERN UNIVERSITY"
      firstName="Aditi"
      lastName="Shinde"
      project={<strong style={{ fontWeight: 700, color: RED }}>NEU ISE Substack</strong>}
      desc="embedded systems & AI publication · Substack newsletter + technical book"
      num="17"
      showFrame={5}
      hideFrame={140}
    />
  </AbsoluteFill>
);
