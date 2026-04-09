import { useEffect } from 'react';

export const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
};
