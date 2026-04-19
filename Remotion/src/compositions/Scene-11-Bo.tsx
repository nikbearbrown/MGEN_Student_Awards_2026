import React from 'react';
import { AbsoluteFill } from 'remotion';
import { StudentCard, NeuOverlay, type StudentCardData, RED } from '../scaffold/neu-primitives';

const DATA: StudentCardData = {
  num: '11', dark: true,
  eyebrow: 'STUDENT 11 OF 19 · MGEN AWARDS 2026',
  names: ['Bo', 'Li'],
  projectNode: <>Leet<span style={{ color: RED }}>Reviewer</span></>,
  tagline: 'Spaced-repetition system for LeetCode mastery — AI-guided daily reviews',
  stats: [
    { value: 'SRS',      label: 'Repetition algorithm' },
    { value: 'LeetCode', label: 'Problem platform' },
    { value: 'AI',       label: 'Hint engine' },
    { value: 'Daily',    label: 'Review cadence' },
  ],
};

export const Scene11Bo: React.FC = () => (
  <AbsoluteFill style={{ overflow: 'hidden' }}>
    <StudentCard data={DATA} hl={50} />
    <NeuOverlay
      eyebrow="STUDENT 11 OF 19 · MGEN AWARDS 2026 · NORTHEASTERN UNIVERSITY"
      firstName="Bo"
      lastName="Li"
      project={<strong style={{ fontWeight: 700, color: RED }}>LeetReviewer</strong>}
      desc="spaced-repetition system for LeetCode mastery · AI-guided daily reviews"
      num="11"
      showFrame={5}
      hideFrame={140}
    />
  </AbsoluteFill>
);
