import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { LATO, C, SPR } from '../scaffold/neu-primitives';

export const JUNG_FRAMES = 240;

// ── Wheel geometry ────────────────────────────────────────────────────────────
const CX   = 960;
const CY   = 578;
const R_C   = 115;   // center circle
const R_MID = 252;   // inner-band / outer-band boundary
const R_OUT = 398;   // outer edge of wheel
const R_LBL = 460;   // archetype name label radius

const toRad = (d: number) => (d * Math.PI) / 180;
const px = (a: number, r: number) => CX + r * Math.sin(toRad(a));
const py = (a: number, r: number) => CY - r * Math.cos(toRad(a));

function slice(a1: number, a2: number, r1: number, r2: number) {
  const lg = a2 - a1 > 180 ? 1 : 0;
  return (
    `M${px(a1,r1).toFixed(1)},${py(a1,r1).toFixed(1)}` +
    ` L${px(a1,r2).toFixed(1)},${py(a1,r2).toFixed(1)}` +
    ` A${r2},${r2},0,${lg},1,${px(a2,r2).toFixed(1)},${py(a2,r2).toFixed(1)}` +
    ` L${px(a2,r1).toFixed(1)},${py(a2,r1).toFixed(1)}` +
    ` A${r1},${r1},0,${lg},0,${px(a1,r1).toFixed(1)},${py(a1,r1).toFixed(1)}Z`
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
interface Arch { name: string; inner: string; color: string; s: number }

const ARCHES: Arch[] = [
  { name: 'INNOCENT',  inner: 'SAFETY',     color: '#3EC9C0', s: 0   },
  { name: 'SAGE',      inner: 'KNOWLEDGE',  color: '#2DBF5A', s: 30  },
  { name: 'EXPLORER',  inner: 'FREEDOM',    color: '#7DC73A', s: 60  },
  { name: 'OUTLAW',    inner: 'LIBERATION', color: '#F5CC00', s: 90  },
  { name: 'MAGICIAN',  inner: 'POWER',      color: '#F5A622', s: 120 },
  { name: 'HERO',      inner: 'MASTERY',    color: '#F46820', s: 150 },
  { name: 'LOVER',     inner: 'INTIMACY',   color: '#E83D6A', s: 180 },
  { name: 'JESTER',    inner: 'PLEASURE',   color: '#D81B8A', s: 210 },
  { name: 'EVERYMAN',  inner: 'BELONGING',  color: '#9E42B5', s: 240 },
  { name: 'CAREGIVER', inner: 'SERVICE',    color: '#4E5AC5', s: 270 },
  { name: 'RULER',     inner: 'CONTROL',    color: '#1B7ED6', s: 300 },
  { name: 'ARTIST',    inner: 'INNOVATION', color: '#00ACC1', s: 330 },
];

const CENTER_Q: { lines: string[]; qa: number }[] = [
  { lines: ['PROVIDE', 'STRUCTURE'],  qa: 315 },
  { lines: ['ESPIRITUAL', 'JOURNEY'], qa: 45  },
  { lines: ['LEAVE', 'A MARK'],       qa: 135 },
  { lines: ['CONNECT', 'TO OTHERS'],  qa: 225 },
];

// ── Scene ─────────────────────────────────────────────────────────────────────
export const Scene12AbishaDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleP  = spring({ frame: frame - 0, fps, config: SPR });
  const titleY  = interpolate(titleP, [0, 1], [-50, 0], C);
  const titleOp = interpolate(titleP, [0, .4], [0, 1], C);

  const ctrOp = interpolate(frame, [12, 28], [0, 1], C);

  const segOp = (i: number) => {
    const p = spring({ frame: frame - (20 + i * 6), fps, config: SPR });
    return interpolate(p, [0, 0.5], [0, 1], C);
  };

  const lblOp = interpolate(frame, [98, 118], [0, 1], C);

  const MID_R = (R_MID + R_OUT) / 2;

  return (
    <AbsoluteFill style={{ background: '#ffffff' }}>

      {/* Title */}
      <div style={{
        position: 'absolute', top: 52, left: 0, right: 0,
        textAlign: 'center',
        fontFamily: LATO, fontSize: 46, fontWeight: 900,
        letterSpacing: '0.22em', color: '#1a1a1a',
        transform: `translateY(${titleY}px)`, opacity: titleOp,
      }}>
        JUNG'S 12 ARCHETYPES
      </div>

      <svg style={{ position: 'absolute', inset: 0 }} width={1920} height={1080}>

        {/* ── Segments ──────────────────────────────────────────────────────── */}
        {ARCHES.map((arch, i) => {
          const mid = arch.s + 15;
          const lx  = px(mid, MID_R);
          const ly  = py(mid, MID_R);
          return (
            <g key={i} opacity={segOp(i)}>
              {/* outer band */}
              <path d={slice(arch.s, arch.s + 30, R_MID, R_OUT)} fill={arch.color}              stroke="#fff" strokeWidth={2.5} />
              {/* inner band */}
              <path d={slice(arch.s, arch.s + 30, R_C,   R_MID)} fill={arch.color} fillOpacity={0.36} stroke="#fff" strokeWidth={2.5} />
              {/* trait word */}
              <text
                x={lx.toFixed(1)} y={ly.toFixed(1)}
                textAnchor="middle" dominantBaseline="middle"
                fill="#fff" fontFamily={LATO} fontWeight="700"
                fontSize={16} letterSpacing="0.05em"
                transform={`rotate(${mid},${lx.toFixed(1)},${ly.toFixed(1)})`}
              >
                {arch.inner}
              </text>
            </g>
          );
        })}

        {/* ── Center circle ─────────────────────────────────────────────────── */}
        <g opacity={ctrOp}>
          <circle cx={CX} cy={CY} r={R_C} fill="#d9d9d9" />
          {/* cross dividers */}
          <line x1={CX} y1={CY - R_C} x2={CX} y2={CY + R_C} stroke="#fff" strokeWidth={3} />
          <line x1={CX - R_C} y1={CY} x2={CX + R_C} y2={CY} stroke="#fff" strokeWidth={3} />
          {/* quadrant labels */}
          {CENTER_Q.map((q, i) => {
            const qx = (CX + Math.sin(toRad(q.qa)) * R_C * 0.54).toFixed(1);
            const qy = (CY - Math.cos(toRad(q.qa)) * R_C * 0.54).toFixed(1);
            return (
              <text key={i} textAnchor="middle" fontFamily={LATO} fontWeight="700"
                fontSize={11} fill="#444" letterSpacing="0.04em">
                <tspan x={qx} y={(parseFloat(qy) - 7).toFixed(1)}>{q.lines[0]}</tspan>
                <tspan x={qx} dy="14">{q.lines[1]}</tspan>
              </text>
            );
          })}
        </g>

        {/* ── Quadrant dashed extend-lines ──────────────────────────────────── */}
        <g opacity={lblOp} stroke="#ccc" strokeWidth={1} strokeDasharray="5 6">
          {[0, 90, 180, 270].map(a => (
            <line key={a}
              x1={px(a, R_C   ).toFixed(1)} y1={py(a, R_C   ).toFixed(1)}
              x2={px(a, R_OUT + 72).toFixed(1)} y2={py(a, R_OUT + 72).toFixed(1)}
            />
          ))}
        </g>

        {/* ── Outer archetype names ─────────────────────────────────────────── */}
        <g opacity={lblOp}>
          {ARCHES.map((arch, i) => {
            const mid = arch.s + 15;
            const lx  = px(mid, R_LBL).toFixed(1);
            const ly  = py(mid, R_LBL).toFixed(1);
            return (
              <text key={i}
                x={lx} y={ly}
                textAnchor="middle" dominantBaseline="middle"
                fill="#1a1a1a" fontFamily={LATO} fontWeight="900"
                fontSize={20} letterSpacing="0.13em"
                transform={`rotate(${mid},${lx},${ly})`}
              >
                {arch.name}
              </text>
            );
          })}
        </g>

      </svg>
    </AbsoluteFill>
  );
};
