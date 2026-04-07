import React, { useState, useEffect, useRef } from 'react';

export default function AnimCounter({ target, suffix = '', prefix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start;
        const dur = 1800;
        const step = ts => {
          if (!start) start = ts;
          const p    = Math.min((ts - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(ease * target));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,6vw,90px)', fontWeight: 900, color: 'var(--gold)', lineHeight: 1 }}>
      {prefix}{val.toLocaleString()}{suffix}
    </span>
  );
}
