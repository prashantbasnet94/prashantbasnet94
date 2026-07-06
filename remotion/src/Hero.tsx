import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';

const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const C = {bg: '#0d1117', panel: '#161b22', border: '#30363d', text: '#e6edf3', dim: '#8b949e', accent: '#6ee7f9', green: '#3fb950'};

/** Types out `text` starting at frame `from`, `cps` chars per second. */
const useTyped = (text: string, from: number, cps = 28) => {
  const frame = useCurrentFrame();
  const chars = Math.max(0, Math.floor(((frame - from) / 30) * cps));
  return text.slice(0, chars);
};

const Fade: React.FC<{from: number; children: React.ReactNode; style?: React.CSSProperties}> = ({from, children, style}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [from, from + 15], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <div style={{opacity: o, ...style}}>{children}</div>;
};

export const Hero: React.FC = () => {
  const frame = useCurrentFrame();
  const cursorOn = frame > 195 && Math.floor(frame / 16) % 2 === 0;

  const l1 = useTyped('whoami', 12);
  const l2 = useTyped('prashant basnet', 40);
  const l3 = useTyped('systems engineer · 7+ years · MS CS · University of Louisiana', 63);
  const l4 = useTyped('cat ./principles', 102);
  const l5 = useTyped('correct · observable · fast — infrastructure that holds under real load', 129);

  const chips: Array<[string, string, number]> = [
    ['letstrade · integrity layer', C.text, 168],
    ['100+ articles', C.dim, 174],
    ['330+ leetcode', C.dim, 180],
    ['0 oversell incidents', C.green, 186],
  ];

  return (
    <AbsoluteFill style={{background: C.bg, fontFamily: MONO, border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden'}}>
      <div style={{height: 45, borderBottom: `1px solid #21262d`, display: 'flex', alignItems: 'center', padding: '0 22px', gap: 10}}>
        {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
          <div key={c} style={{width: 12, height: 12, borderRadius: 6, background: c}} />
        ))}
        <div style={{flex: 1, textAlign: 'center', color: C.dim, fontSize: 12}}>prashant@basnet — ~/systems</div>
        <div style={{width: 56}} />
      </div>

      <div style={{padding: '18px 36px', display: 'flex', flexDirection: 'column', gap: 6}}>
        <div style={{color: C.dim, fontSize: 15}}><span style={{color: C.green}}>~ $</span> {l1}</div>
        <div style={{color: C.text, fontSize: 34, fontWeight: 700, lineHeight: 1.2}}>{l2}</div>
        <div style={{color: C.dim, fontSize: 15}}>{l3}</div>
        <div style={{color: C.dim, fontSize: 15, marginTop: 12}}><span style={{color: C.green}}>~ $</span> {l4}</div>
        <div style={{color: C.accent, fontSize: 16}}>{l5}</div>

        <div style={{display: 'flex', gap: 12, marginTop: 14}}>
          {chips.map(([label, color, from]) => (
            <Fade key={label} from={from}>
              <div style={{background: C.panel, border: `1px solid ${C.border}`, borderRadius: 6, padding: '7px 14px', fontSize: 12.5, color}}>{label}</div>
            </Fade>
          ))}
        </div>

        <div style={{color: C.dim, fontSize: 14, marginTop: 10}}>
          <span style={{color: C.green}}>~ $</span>{' '}
          <span style={{color: C.accent, opacity: cursorOn ? 1 : 0}}>▊</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
