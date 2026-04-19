import React from 'react';
import { AbsoluteFill, Series } from 'remotion';

import { Scene00Countdown, COUNTDOWN_FRAMES } from './Scene-00-Countdown';
import { Scene01Naimisha } from './Scene-01-Naimisha';
import { Scene01NaimishaArch } from './Scene-01-Naimisha-Arch';
import { Scene02Bhavya } from './Scene-02-Bhavya';
import { Scene02BhavyaArch } from './Scene-02-Bhavya-Arch';
import { Scene03Paramjeet } from './Scene-03-Paramjeet';
import { Scene03ParamjeetDemo, COACH_ME_FRAMES } from './Scene-03-Paramjeet-Demo';
import { Scene04Kavin } from './Scene-04-Kavin';
import { Scene04KavinDemo, AXIS_FRAMES } from './Scene-04-Kavin-Demo';
import { Scene05Anusha } from './Scene-05-Anusha';
import { Scene05AnushaDemo, AUTOINSIGHT_DEMO_FRAMES } from './Scene-05-Anusha-Demo';
import { Scene06Aadarsh } from './Scene-06-Aadarsh';
import { Scene06AadarshDemo, PODCASTIQ_DEMO_FRAMES } from './Scene-06-Aadarsh-Demo';
import { Scene07Zekun } from './Scene-07-Zekun';
import { Scene07ZekunDemo, SMARTSIGHT_DEMO_FRAMES } from './Scene-07-Zekun-Demo';
import { Scene08Aravind } from './Scene-08-Aravind';
import { Scene08AravindDemo, QEMAG_DEMO_FRAMES } from './Scene-08-Aravind-Demo';
import { Scene09Dhruv } from './Scene-09-Dhruv';
import { Scene09DhruvDemo, DEVPROOF_DEMO_FRAMES } from './Scene-09-Dhruv-Demo';
import { Scene10Abhinav } from './Scene-10-Abhinav';
import { Scene10AbhinavDemo, JOBSEKR_DEMO_FRAMES } from './Scene-10-Abhinav-Demo';
import { Scene11Bo } from './Scene-11-Bo';
import { Scene11BoDemo, LEETREVIEWER_DEMO_FRAMES } from './Scene-11-Bo-Demo';
import { Scene12Abisha } from './Scene-12-Abisha';
import { Scene12AbishaDemo, JUNG_FRAMES } from './Scene-12-Abisha-Demo';
import { Scene13Brian } from './Scene-13-Brian';
import { Scene13BrianDemo, TENOVIO_DEMO_FRAMES } from './Scene-13-Brian-Demo';
import { Scene14Vrushti } from './Scene-14-Vrushti';
import { Scene14VrushtiDemo, SCANMATE_DEMO_FRAMES } from './Scene-14-Vrushti-Demo';
import { Scene15Yeshwanth } from './Scene-15-Yeshwanth';
import { Scene15YeshwanthDemo, SAGE_DEMO_FRAMES } from './Scene-15-Yeshwanth-Demo';
import { Scene16Jaimit } from './Scene-16-Jaimit';
import { Scene16JaimitDemo, BUGWISE_DEMO_FRAMES } from './Scene-16-Jaimit-Demo';
import { Scene17Aditi } from './Scene-17-Aditi';
import { Scene17AditiDemo, ADITI_ISE_FRAMES } from './Scene-17-Aditi-Demo';
import { Scene18Nidhi } from './Scene-18-Nidhi';
import { Scene18NidhiDemo, NIDHI_FRAMES } from './Scene-18-Nidhi-Demo';
import { Scene19Anvitha } from './Scene-19-Anvitha';
import { Scene19AnvithaDemo, ANVITHA_DEMO_FRAMES } from './Scene-19-Anvitha-Demo';
import { SceneOutro, OUTRO_FRAMES } from './SceneOutro';

const DEMO_FRAMES =
  PODCASTIQ_DEMO_FRAMES + SMARTSIGHT_DEMO_FRAMES + QEMAG_DEMO_FRAMES +
  DEVPROOF_DEMO_FRAMES  + JOBSEKR_DEMO_FRAMES    + LEETREVIEWER_DEMO_FRAMES +
  TENOVIO_DEMO_FRAMES   + SCANMATE_DEMO_FRAMES   + SAGE_DEMO_FRAMES +
  BUGWISE_DEMO_FRAMES   + ADITI_ISE_FRAMES +
  NIDHI_FRAMES;

export const FULL_REEL_FRAMES =
  COUNTDOWN_FRAMES + 160 + 210 +           // countdown, card 1, Naimisha arch
  17 * 170 + 270 +                          // cards 2–18, Bhavya arch
  COACH_ME_FRAMES + AXIS_FRAMES +           // video demos
  AUTOINSIGHT_DEMO_FRAMES + JUNG_FRAMES +   // Anusha & Abisha extras
  DEMO_FRAMES +                             // 9 new project demos
  200 + ANVITHA_DEMO_FRAMES +               // card 19, Anvitha research demo
  OUTRO_FRAMES;                             // outro

export const MGENFullReel: React.FC = () => (
  <AbsoluteFill style={{ overflow: 'hidden', background: '#000' }}>
    <Series>
      <Series.Sequence durationInFrames={COUNTDOWN_FRAMES}><Scene00Countdown /></Series.Sequence>
      <Series.Sequence durationInFrames={160}><Scene01Naimisha /></Series.Sequence>
      <Series.Sequence durationInFrames={210}><Scene01NaimishaArch /></Series.Sequence>
      <Series.Sequence durationInFrames={170}><Scene02Bhavya /></Series.Sequence>
      <Series.Sequence durationInFrames={270}><Scene02BhavyaArch /></Series.Sequence>
      <Series.Sequence durationInFrames={170}><Scene03Paramjeet /></Series.Sequence>
      <Series.Sequence durationInFrames={COACH_ME_FRAMES}><Scene03ParamjeetDemo /></Series.Sequence>
      <Series.Sequence durationInFrames={170}><Scene04Kavin /></Series.Sequence>
      <Series.Sequence durationInFrames={AXIS_FRAMES}><Scene04KavinDemo /></Series.Sequence>
      <Series.Sequence durationInFrames={170}><Scene05Anusha /></Series.Sequence>
      <Series.Sequence durationInFrames={AUTOINSIGHT_DEMO_FRAMES}><Scene05AnushaDemo /></Series.Sequence>
      <Series.Sequence durationInFrames={170}><Scene06Aadarsh /></Series.Sequence>
      <Series.Sequence durationInFrames={PODCASTIQ_DEMO_FRAMES}><Scene06AadarshDemo /></Series.Sequence>
      <Series.Sequence durationInFrames={170}><Scene07Zekun /></Series.Sequence>
      <Series.Sequence durationInFrames={SMARTSIGHT_DEMO_FRAMES}><Scene07ZekunDemo /></Series.Sequence>
      <Series.Sequence durationInFrames={170}><Scene08Aravind /></Series.Sequence>
      <Series.Sequence durationInFrames={QEMAG_DEMO_FRAMES}><Scene08AravindDemo /></Series.Sequence>
      <Series.Sequence durationInFrames={170}><Scene09Dhruv /></Series.Sequence>
      <Series.Sequence durationInFrames={DEVPROOF_DEMO_FRAMES}><Scene09DhruvDemo /></Series.Sequence>
      <Series.Sequence durationInFrames={170}><Scene10Abhinav /></Series.Sequence>
      <Series.Sequence durationInFrames={JOBSEKR_DEMO_FRAMES}><Scene10AbhinavDemo /></Series.Sequence>
      <Series.Sequence durationInFrames={170}><Scene11Bo /></Series.Sequence>
      <Series.Sequence durationInFrames={LEETREVIEWER_DEMO_FRAMES}><Scene11BoDemo /></Series.Sequence>
      <Series.Sequence durationInFrames={170}><Scene12Abisha /></Series.Sequence>
      <Series.Sequence durationInFrames={JUNG_FRAMES}><Scene12AbishaDemo /></Series.Sequence>
      <Series.Sequence durationInFrames={170}><Scene13Brian /></Series.Sequence>
      <Series.Sequence durationInFrames={TENOVIO_DEMO_FRAMES}><Scene13BrianDemo /></Series.Sequence>
      <Series.Sequence durationInFrames={170}><Scene14Vrushti /></Series.Sequence>
      <Series.Sequence durationInFrames={SCANMATE_DEMO_FRAMES}><Scene14VrushtiDemo /></Series.Sequence>
      <Series.Sequence durationInFrames={170}><Scene15Yeshwanth /></Series.Sequence>
      <Series.Sequence durationInFrames={SAGE_DEMO_FRAMES}><Scene15YeshwanthDemo /></Series.Sequence>
      <Series.Sequence durationInFrames={170}><Scene16Jaimit /></Series.Sequence>
      <Series.Sequence durationInFrames={BUGWISE_DEMO_FRAMES}><Scene16JaimitDemo /></Series.Sequence>
      <Series.Sequence durationInFrames={170}><Scene17Aditi /></Series.Sequence>
      <Series.Sequence durationInFrames={ADITI_ISE_FRAMES}><Scene17AditiDemo /></Series.Sequence>
      <Series.Sequence durationInFrames={170}><Scene18Nidhi /></Series.Sequence>
      <Series.Sequence durationInFrames={NIDHI_FRAMES}><Scene18NidhiDemo /></Series.Sequence>
      <Series.Sequence durationInFrames={200}><Scene19Anvitha /></Series.Sequence>
      <Series.Sequence durationInFrames={ANVITHA_DEMO_FRAMES}><Scene19AnvithaDemo /></Series.Sequence>
      <Series.Sequence durationInFrames={OUTRO_FRAMES}><SceneOutro /></Series.Sequence>
    </Series>
  </AbsoluteFill>
);
