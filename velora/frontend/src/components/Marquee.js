import React from 'react';

export function Marquee({ items, speed = 18, gold = false }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ padding: '18px 0', background: gold ? 'var(--gold)' : 'transparent', overflow: 'hidden', display: 'flex', borderTop: gold ? 'none' : '1px solid var(--mid)', borderBottom: gold ? 'none' : '1px solid var(--mid)' }}>
      <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: `marquee ${speed}s linear infinite` }}>
        {doubled.map((t, i) => (
          <span key={i} style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, fontStyle: 'italic', color: gold ? 'var(--black)' : 'var(--muted)', padding: '0 36px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

export function Ticker({ items }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ padding: '11px 0', background: 'var(--mid)', overflow: 'hidden', display: 'flex' }}>
      <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marquee 28s linear infinite' }}>
        {doubled.map(([k, v], i) => (
          <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--muted)', padding: '0 28px', textTransform: 'uppercase' }}>
            {k}: <span style={{ color: 'var(--gold)' }}>{v}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
