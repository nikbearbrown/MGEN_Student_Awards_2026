import React from 'react';
import { AbsoluteFill } from 'remotion';
import { StudentCard, NeuOverlay, type StudentCardData, RED } from '../scaffold/neu-primitives';

const DATA: StudentCardData = {
  num: '07', dark: true,
  eyebrow: 'STUDENT 07 OF 19 · MGEN AWARDS 2026',
  names: ['Zekun Li ·', 'Haolei Zhou ·', 'Risa Tori'],
  smallName: true,
  projectNode: <><span style={{ color: RED }}>Smart</span>Sight</>,
  tagline: 'Voice + vision assistive app — real-time scene description for low-vision users',
  stats: [
    { value: 3,        label: 'Team members' },
    { value: 'Voice',  label: 'Primary interface' },
    { value: 'Vision', label: 'Detection modality' },
    { value: 'A11y',   label: 'Accessibility focus' },
  ],
};

export const Scene07Zekun: React.FC = () => (
  <AbsoluteFill style={{ overflow: 'hidden' }}>
    <StudentCard data={DATA} hl={50} />
    <NeuOverlay
      eyebrow="STUDENT 07 OF 19 · MGEN AWARDS 2026 · NORTHEASTERN UNIVERSITY"
      firstName="Zekun · Haolei"
      lastName="· Risa Tori"
      project={<strong style={{ fontWeight: 700, color: RED }}>SmartSight</strong>}
      desc="voice + vision assistive app · real-time scene description for low-vision users"
      num="07"
      showFrame={5}
      hideFrame={140}
    />
  </AbsoluteFill>
);
