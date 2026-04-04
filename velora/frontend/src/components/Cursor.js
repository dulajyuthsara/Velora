import { useEffect } from 'react';

export default function Cursor() {
  useEffect(() => {
    const dot  = document.getElementById('v-cursor');
    const ring = document.getElementById('v-cursor-ring');
    if (!dot || !ring) return;
    let rx = 0, ry = 0, mx = 0, my = 0, raf;
    const move = e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    };
    const anim = () => {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      raf = requestAnimationFrame(anim);
    };
    window.addEventListener('mousemove', move);
    raf = requestAnimationFrame(anim);
    // Grow ring on hoverable elements
    const grow = () => { ring.style.width = '60px'; ring.style.height = '60px'; ring.style.opacity = '0.3'; };
    const shrink = () => { ring.style.width = '40px'; ring.style.height = '40px'; ring.style.opacity = '0.6'; };
    document.querySelectorAll('button, a, input, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', grow);
      el.addEventListener('mouseleave', shrink);
    });
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf); };
  }, []);
  return null;
}
