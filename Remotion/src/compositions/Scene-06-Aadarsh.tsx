import React from 'react';
import { AbsoluteFill } from 'remotion';
import { StudentCard, NeuOverlay, type StudentCardData, RED } from '../scaffold/neu-primitives';

const DATA: StudentCardData = {
  num: '06', dark: false,
  eyebrow: 'STUDENT 06 OF 19 · MGEN AWARDS 2026',
  names: ['Aadarsh', 'Ravi'],
  projectNode: <>Podcast<span style={{ color: RED }}>IQ</span></>,
  tagline: 'Audio to knowledge graphs — intelligent episode navigation and retrieval',
  stats: [
    { value: 'Audio', label: 'Input format' },
    { value: 'KG',    label: 'Knowledge graph output' },
    { value: 'NLP',   label: 'Processing pipeline' },
    { value: 'RAG',   label: 'Retrieval engine' },
  ],
};

export const Scene06Aadarsh: React.FC = () => (
  <AbsoluteFill style={{ overflow: 'hidden' }}>
    <StudentCard data={DATA} hl={50} />
    <NeuOverlay
      eyebrow="STUDENT 06 OF 19 · MGEN AWARDS 2026 · NORTHEASTERN UNIVERSITY"
      firstName="Aadarsh"
      lastName="Ravi"
      project={<strong style={{ fontWeight: 700, color: RED }}>PodcastIQ</strong>}
      desc="audio to knowledge graphs · intelligent episode navigation and retrieval"
      num="06"
      showFrame={5}
      hideFrame={140}
    />
  </AbsoluteFill>
);
