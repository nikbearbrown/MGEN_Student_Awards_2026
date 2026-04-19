import React from "react";
import { Composition } from "remotion";
import { Scene19Anvitha } from "./compositions/Scene-19-Anvitha";
import { Scene19AnvithaDemo, ANVITHA_DEMO_FRAMES } from "./compositions/Scene-19-Anvitha-Demo";
import { SceneOutro, OUTRO_FRAMES } from "./compositions/SceneOutro";
import { MGENFullReel, FULL_REEL_FRAMES } from "./compositions/MGENFullReel";

import { Scene00Countdown, COUNTDOWN_FRAMES } from "./compositions/Scene-00-Countdown";
import { Scene01Naimisha } from "./compositions/Scene-01-Naimisha";
import { Scene01NaimishaArch } from "./compositions/Scene-01-Naimisha-Arch";
import { Scene02Bhavya } from "./compositions/Scene-02-Bhavya";
import { Scene02BhavyaArch } from "./compositions/Scene-02-Bhavya-Arch";
import { Scene03Paramjeet } from "./compositions/Scene-03-Paramjeet";
import { Scene03ParamjeetDemo, COACH_ME_FRAMES } from "./compositions/Scene-03-Paramjeet-Demo";
import { Scene04Kavin } from "./compositions/Scene-04-Kavin";
import { Scene04KavinDemo, AXIS_FRAMES } from "./compositions/Scene-04-Kavin-Demo";
import { Scene05Anusha } from "./compositions/Scene-05-Anusha";
import { Scene05AnushaDemo, AUTOINSIGHT_DEMO_FRAMES } from "./compositions/Scene-05-Anusha-Demo";
import { Scene06Aadarsh } from "./compositions/Scene-06-Aadarsh";
import { Scene06AadarshDemo, PODCASTIQ_DEMO_FRAMES } from "./compositions/Scene-06-Aadarsh-Demo";
import { Scene07Zekun } from "./compositions/Scene-07-Zekun";
import { Scene07ZekunDemo, SMARTSIGHT_DEMO_FRAMES } from "./compositions/Scene-07-Zekun-Demo";
import { Scene08Aravind } from "./compositions/Scene-08-Aravind";
import { Scene08AravindDemo, QEMAG_DEMO_FRAMES } from "./compositions/Scene-08-Aravind-Demo";
import { Scene09Dhruv } from "./compositions/Scene-09-Dhruv";
import { Scene09DhruvDemo, DEVPROOF_DEMO_FRAMES } from "./compositions/Scene-09-Dhruv-Demo";
import { Scene10Abhinav } from "./compositions/Scene-10-Abhinav";
import { Scene10AbhinavDemo, JOBSEKR_DEMO_FRAMES } from "./compositions/Scene-10-Abhinav-Demo";
import { Scene11Bo } from "./compositions/Scene-11-Bo";
import { Scene11BoDemo, LEETREVIEWER_DEMO_FRAMES } from "./compositions/Scene-11-Bo-Demo";
import { Scene12Abisha } from "./compositions/Scene-12-Abisha";
import { Scene12AbishaDemo, JUNG_FRAMES } from "./compositions/Scene-12-Abisha-Demo";
import { Scene13Brian } from "./compositions/Scene-13-Brian";
import { Scene13BrianDemo, TENOVIO_DEMO_FRAMES } from "./compositions/Scene-13-Brian-Demo";
import { Scene14Vrushti } from "./compositions/Scene-14-Vrushti";
import { Scene14VrushtiDemo, SCANMATE_DEMO_FRAMES } from "./compositions/Scene-14-Vrushti-Demo";
import { Scene15Yeshwanth } from "./compositions/Scene-15-Yeshwanth";
import { Scene15YeshwanthDemo, SAGE_DEMO_FRAMES } from "./compositions/Scene-15-Yeshwanth-Demo";
import { Scene16Jaimit } from "./compositions/Scene-16-Jaimit";
import { Scene16JaimitDemo, BUGWISE_DEMO_FRAMES } from "./compositions/Scene-16-Jaimit-Demo";
import { Scene17Aditi } from "./compositions/Scene-17-Aditi";
import { Scene17AditiDemo, ADITI_ISE_FRAMES } from "./compositions/Scene-17-Aditi-Demo";
import { Scene18Nidhi } from "./compositions/Scene-18-Nidhi";
import { Scene18NidhiDemo, NIDHI_FRAMES } from "./compositions/Scene-18-Nidhi-Demo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ── Individual scenes (renderable in isolation) ────────── */}
      <Composition id="Scene00Countdown"    component={Scene00Countdown}    durationInFrames={COUNTDOWN_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="Scene01Naimisha"     component={Scene01Naimisha}     durationInFrames={160}              fps={30} width={1920} height={1080} />
      <Composition id="Scene01NaimishaArch" component={Scene01NaimishaArch} durationInFrames={210} fps={30} width={1920} height={1080} />
      <Composition id="Scene02Bhavya"     component={Scene02Bhavya}     durationInFrames={170} fps={30} width={1920} height={1080} />
      <Composition id="Scene02BhavyaArch" component={Scene02BhavyaArch} durationInFrames={270} fps={30} width={1920} height={1080} />
      <Composition id="Scene03Paramjeet"     component={Scene03Paramjeet}     durationInFrames={170}            fps={30} width={1920} height={1080} />
      <Composition id="Scene03ParamjeetDemo" component={Scene03ParamjeetDemo} durationInFrames={COACH_ME_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="Scene04Kavin"     component={Scene04Kavin}     durationInFrames={170}        fps={30} width={1920} height={1080} />
      <Composition id="Scene04KavinDemo" component={Scene04KavinDemo} durationInFrames={AXIS_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="Scene05Anusha"     component={Scene05Anusha}     durationInFrames={170}                   fps={30} width={1920} height={1080} />
      <Composition id="Scene05AnushaDemo" component={Scene05AnushaDemo} durationInFrames={AUTOINSIGHT_DEMO_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="Scene06Aadarsh"     component={Scene06Aadarsh}     durationInFrames={170}                  fps={30} width={1920} height={1080} />
      <Composition id="Scene06AadarshDemo" component={Scene06AadarshDemo} durationInFrames={PODCASTIQ_DEMO_FRAMES}  fps={30} width={1920} height={1080} />
      <Composition id="Scene07Zekun"       component={Scene07Zekun}       durationInFrames={170}                  fps={30} width={1920} height={1080} />
      <Composition id="Scene07ZekunDemo"   component={Scene07ZekunDemo}   durationInFrames={SMARTSIGHT_DEMO_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="Scene08Aravind"     component={Scene08Aravind}     durationInFrames={170}                  fps={30} width={1920} height={1080} />
      <Composition id="Scene08AravindDemo" component={Scene08AravindDemo} durationInFrames={QEMAG_DEMO_FRAMES}    fps={30} width={1920} height={1080} />
      <Composition id="Scene09Dhruv"       component={Scene09Dhruv}       durationInFrames={170}                  fps={30} width={1920} height={1080} />
      <Composition id="Scene09DhruvDemo"   component={Scene09DhruvDemo}   durationInFrames={DEVPROOF_DEMO_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="Scene10Abhinav"     component={Scene10Abhinav}     durationInFrames={170}                  fps={30} width={1920} height={1080} />
      <Composition id="Scene10AbhinavDemo" component={Scene10AbhinavDemo} durationInFrames={JOBSEKR_DEMO_FRAMES}  fps={30} width={1920} height={1080} />
      <Composition id="Scene11Bo"          component={Scene11Bo}          durationInFrames={170}                  fps={30} width={1920} height={1080} />
      <Composition id="Scene11BoDemo"      component={Scene11BoDemo}      durationInFrames={LEETREVIEWER_DEMO_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="Scene12Abisha"      component={Scene12Abisha}      durationInFrames={170}                  fps={30} width={1920} height={1080} />
      <Composition id="Scene12AbishaDemo"  component={Scene12AbishaDemo}  durationInFrames={JUNG_FRAMES}          fps={30} width={1920} height={1080} />
      <Composition id="Scene13Brian"       component={Scene13Brian}       durationInFrames={170}                  fps={30} width={1920} height={1080} />
      <Composition id="Scene13BrianDemo"   component={Scene13BrianDemo}   durationInFrames={TENOVIO_DEMO_FRAMES}  fps={30} width={1920} height={1080} />
      <Composition id="Scene14Vrushti"     component={Scene14Vrushti}     durationInFrames={170}                  fps={30} width={1920} height={1080} />
      <Composition id="Scene14VrushtiDemo" component={Scene14VrushtiDemo} durationInFrames={SCANMATE_DEMO_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="Scene15Yeshwanth"   component={Scene15Yeshwanth}   durationInFrames={170}                  fps={30} width={1920} height={1080} />
      <Composition id="Scene15YeshwanthDemo" component={Scene15YeshwanthDemo} durationInFrames={SAGE_DEMO_FRAMES}  fps={30} width={1920} height={1080} />
      <Composition id="Scene16Jaimit"     component={Scene16Jaimit}     durationInFrames={170}               fps={30} width={1920} height={1080} />
      <Composition id="Scene16JaimitDemo" component={Scene16JaimitDemo} durationInFrames={BUGWISE_DEMO_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="Scene17Aditi"     component={Scene17Aditi}     durationInFrames={170}             fps={30} width={1920} height={1080} />
      <Composition id="Scene17AditiDemo" component={Scene17AditiDemo} durationInFrames={ADITI_ISE_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="Scene18Nidhi"     component={Scene18Nidhi}     durationInFrames={170}         fps={30} width={1920} height={1080} />
      <Composition id="Scene18NidhiDemo" component={Scene18NidhiDemo} durationInFrames={NIDHI_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="Scene19Anvitha"     component={Scene19Anvitha}     durationInFrames={200}               fps={30} width={1920} height={1080} />
      <Composition id="Scene19AnvithaDemo" component={Scene19AnvithaDemo} durationInFrames={ANVITHA_DEMO_FRAMES} fps={30} width={1920} height={1080} />
      <Composition id="SceneOutro"        component={SceneOutro}        durationInFrames={OUTRO_FRAMES} fps={30} width={1920} height={1080} />

      {/* ── Full reel sequencer ───────────────────────────────── */}
      <Composition id="MGENFullReel" component={MGENFullReel} durationInFrames={FULL_REEL_FRAMES} fps={30} width={1920} height={1080} />
    </>
  );
};
