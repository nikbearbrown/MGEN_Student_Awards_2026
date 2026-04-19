import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Series,
} from "remotion";
import { Circle, Rect, Triangle } from "@remotion/shapes";

const FPS = 30;
const ENTRY_DURATION = 30; // 1 second slide-in

// Background: lerps through three colors over 10 seconds
const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Three color stops: deep blue → violet → warm orange
  const r = interpolate(
    frame,
    [0, durationInFrames * 0.5, durationInFrames],
    [15, 80, 220],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const g = interpolate(
    frame,
    [0, durationInFrames * 0.5, durationInFrames],
    [20, 10, 90],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const b = interpolate(
    frame,
    [0, durationInFrames * 0.5, durationInFrames],
    [80, 120, 30],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{ backgroundColor: `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})` }}
    />
  );
};

// Circle — enters from the left, then slowly rotates
const AnimatedCircle: React.FC<{ globalFrame: number; startFrame: number }> = ({
  globalFrame,
  startFrame,
}) => {
  const localFrame = globalFrame - startFrame;

  const slideIn = spring({
    frame: localFrame,
    fps: FPS,
    config: { damping: 18, stiffness: 100, mass: 1 },
  });

  const entryX = interpolate(slideIn, [0, 1], [-300, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rotation = interpolate(
    localFrame,
    [ENTRY_DURATION, ENTRY_DURATION + 270],
    [0, 360],
    { extrapolateLeft: "clamp", extrapolateRight: "extend" }
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: 200,
        transform: `translateX(${entryX}px)`,
      }}
    >
      <div style={{ transform: `rotate(${rotation}deg)` }}>
        <Circle radius={100} fill="rgba(255,210,60,0.9)" />
      </div>
    </AbsoluteFill>
  );
};

// Rect — enters from the top, then scales pulse
const AnimatedRect: React.FC<{ globalFrame: number; startFrame: number }> = ({
  globalFrame,
  startFrame,
}) => {
  const localFrame = globalFrame - startFrame;

  const slideIn = spring({
    frame: localFrame,
    fps: FPS,
    config: { damping: 18, stiffness: 100, mass: 1 },
  });

  const entryY = interpolate(slideIn, [0, 1], [-300, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scaleOscillation = interpolate(
    localFrame % 60,
    [0, 30, 60],
    [1, 1.12, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const scale = localFrame < ENTRY_DURATION ? 1 : scaleOscillation;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 200,
        transform: `translateY(${entryY}px)`,
      }}
    >
      <div style={{ transform: `scale(${scale})` }}>
        <Rect width={180} height={180} fill="rgba(80,200,160,0.9)" />
      </div>
    </AbsoluteFill>
  );
};

// Triangle — enters from the right, then drifts vertically
const AnimatedTriangle: React.FC<{ globalFrame: number; startFrame: number }> = ({
  globalFrame,
  startFrame,
}) => {
  const localFrame = globalFrame - startFrame;

  const slideIn = spring({
    frame: localFrame,
    fps: FPS,
    config: { damping: 18, stiffness: 100, mass: 1 },
  });

  const entryX = interpolate(slideIn, [0, 1], [300, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const drift = interpolate(
    localFrame % 90,
    [0, 45, 90],
    [0, 40, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const driftY = localFrame < ENTRY_DURATION ? 0 : drift;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingRight: 200,
        transform: `translateX(${entryX}px)`,
      }}
    >
      <div style={{ transform: `translateY(${driftY}px)` }}>
        <Triangle length={200} fill="rgba(220,90,140,0.9)" direction="up" />
      </div>
    </AbsoluteFill>
  );
};

// Text label fades in at 8 seconds (frame 240)
const TextLabel: React.FC = () => {
  const frame = useCurrentFrame();
  const FADE_START = 240;

  const opacity = interpolate(frame, [FADE_START, FADE_START + 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <div
        style={{
          fontSize: 96,
          fontWeight: 700,
          color: "white",
          fontFamily: "sans-serif",
          textShadow: "0 4px 24px rgba(0,0,0,0.6)",
          letterSpacing: 8,
        }}
      >
        Test One
      </div>
    </AbsoluteFill>
  );
};

export const TestOne: React.FC = () => {
  const frame = useCurrentFrame();

  // Staggered start frames: shape 1 at 0s, shape 2 at 1.5s, shape 3 at 3s
  const CIRCLE_START = 0;
  const RECT_START = 45;     // 1.5s × 30fps
  const TRIANGLE_START = 90; // 3s × 30fps

  return (
    <AbsoluteFill>
      <Background />

      {frame >= CIRCLE_START && (
        <AnimatedCircle globalFrame={frame} startFrame={CIRCLE_START} />
      )}
      {frame >= RECT_START && (
        <AnimatedRect globalFrame={frame} startFrame={RECT_START} />
      )}
      {frame >= TRIANGLE_START && (
        <AnimatedTriangle globalFrame={frame} startFrame={TRIANGLE_START} />
      )}

      <TextLabel />
    </AbsoluteFill>
  );
};
