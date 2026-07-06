import React from 'react';
import {AbsoluteFill, useCurrentFrame, spring, useVideoConfig, interpolate} from 'remotion';

const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const C = {bg: '#0d1117', panel: '#161b22', border: '#30363d', text: '#e6edf3', dim: '#8b949e', accent: '#6ee7f9', green: '#3fb950'};

type Row = {label: string; pct: number; value: string; badge: string; color?: string};

const ROWS: Row[] = [
  {label: 'MetricsBus · p95 latency', pct: 0.67, value: '758ms → 247ms', badge: '−67%'},
  {label: 'Unisala feed · p95 latency', pct: 0.99, value: '4.1s → 40ms', badge: '100×'},
  {label: 'Graph RBAC · throughput', pct: 1, value: '200K+ checks/sec', badge: 'O(1)'},
  {label: 'AT&T · total blocking time', pct: 0.51, value: '49.8s → 24.0s', badge: '−51%'},
  {label: 'Astro migration · build size', pct: 0.88, value: '6MB → 700KB', badge: '−88%'},
  {label: 'Neo4j checkout · oversells', pct: 1, value: '~3/week → 0', badge: 'TOCTOU-safe', color: C.green},
];

export const Metrics: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill style={{background: C.bg, fontFamily: MONO, border: `1px solid ${C.border}`, borderRadius: 12, padding: '26px 36px'}}>
      <div style={{color: C.dim, fontSize: 13, marginBottom: 18}}>{'// measured impact — production systems'}</div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
        {ROWS.map((row, i) => {
          const delay = 8 + i * 6;
          const grow = spring({frame: frame - delay, fps, config: {damping: 200}});
          const vo = interpolate(frame, [delay + 22, delay + 34], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          return (
            <div key={row.label} style={{display: 'grid', gridTemplateColumns: '294px 400px 1fr', alignItems: 'center', gap: 18}}>
              <div style={{color: C.text, fontSize: 13.5}}>{row.label}</div>
              <div style={{height: 10, borderRadius: 5, background: C.panel, overflow: 'hidden'}}>
                <div style={{height: '100%', borderRadius: 5, width: `${row.pct * 100 * grow}%`, background: row.color ?? C.accent}} />
              </div>
              <div style={{fontSize: 13, opacity: vo, display: 'flex', gap: 8}}>
                <span style={{color: C.dim}}>{row.value}</span>
                <span style={{color: C.green}}>{row.badge}</span>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
