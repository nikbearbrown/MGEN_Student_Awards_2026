import React from 'react';
import { AbsoluteFill } from 'remotion';
import { StudentCard, NeuOverlay, type StudentCardData, RED } from '../scaffold/neu-primitives';

const DATA: StudentCardData = {
  num: '03', dark: true,
  eyebrow: 'STUDENT 03 OF 19 · MGEN AWARDS 2026',
  names: ['Paramjeet', 'Singh'],
  projectNode: <>Coach<span style={{ color: RED }}> Me</span></>,
  tagline: 'Real-time AI sports coaching — Voxel51 & Twelve Labs Grand Prize winner',
  stats: [
    { value: '1st',       label: 'Grand Prize — Voxel51 & Twelve Labs' },
    { value: 'CV',        label: 'Computer vision' },
    { value: 'LLM',       label: 'Coaching feedback' },
    { value: 'Real-time', label: 'Performance analysis' },
  ],
};

export const Scene03Paramjeet: React.FC = () => (
  <AbsoluteFill style={{ overflow: 'hidden' }}>
    <StudentCard data={DATA} hl={50} />
    <NeuOverlay
      eyebrow="STUDENT 03 OF 19 · MGEN AWARDS 2026 · NORTHEASTERN UNIVERSITY"
      firstName="Paramjeet"
      lastName="Singh"
      project={<strong style={{ fontWeight: 700, color: RED }}>Coach Me</strong>}
      desc="real-time AI sports coaching · Grand Prize — Voxel51 & Twelve Labs"
      num="03"
      showFrame={5}
      hideFrame={140}
    />
  </AbsoluteFill>
);
