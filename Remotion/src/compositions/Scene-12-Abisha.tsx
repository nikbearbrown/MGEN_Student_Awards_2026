import React from 'react';
import { AbsoluteFill } from 'remotion';
import { StudentCard, NeuOverlay, type StudentCardData, RED } from '../scaffold/neu-primitives';

const DATA: StudentCardData = {
  num: '12', dark: false,
  eyebrow: 'STUDENT 12 OF 19 · MGEN AWARDS 2026',
  names: ['Abisha', 'Vadukoot'],
  projectNode: <>Brand<em style={{ color: RED, fontStyle: 'italic' }}>Archetype</em></>,
  tagline: 'The first expert-labeled Jungian brand archetype dataset',
  stats: [
    { value: 12,        label: 'Archetypes mapped' },
    { value: '1st',     label: 'Expert-labeled dataset' },
    { value: 'Say/Do',  label: 'Divergence detection' },
    { value: 'LLM',     label: 'Fine-tuning ready' },
  ],
};

export const Scene12Abisha: React.FC = () => (
  <AbsoluteFill style={{ overflow: 'hidden' }}>
    <StudentCard data={DATA} hl={50} />
    <NeuOverlay
      eyebrow="STUDENT 12 OF 19 · MGEN AWARDS 2026 · NORTHEASTERN UNIVERSITY"
      firstName="Abisha"
      lastName="Vadukoot"
      project={<strong style={{ fontWeight: 700, color: RED }}>BrandArchetype</strong>}
      desc="first expert-labeled Jungian brand archetype dataset · say/do divergence detection"
      num="12"
      showFrame={5}
      hideFrame={140}
    />
  </AbsoluteFill>
);
