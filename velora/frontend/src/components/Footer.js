import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const handleJoin = (e) => {
    e.preventDefault();
    if (email) { setJoined(true); setEmail(''); }
  };

  return (
    <footer style={{ background: 'var(--charcoal)', borderTop: '1px solid var(--mid)', padding: '80px 64px 48px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 60, paddingBottom: 60, borderBottom: '1px solid var(--mid)' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, letterSpacing: '0.15em', color: 'var(--gold)' }}>VELORA</div>
          <p style={{ fontSize: '0.875rem', color: 'var(--muted)', marginTop: 16, lineHeight: 1.8 }}>
            We caught your attention with exceptional style.<br />Imagine what we can do for your wardrobe.
          </p>
          <div style={{ display: 'flex', gap: 20, marginTop: 28 }}>
            {['X', 'Instagram', 'Pinterest'].map(s => (
              <a key={s} href="#" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--muted)', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                onMouseLeave={e => e.target.style.color = 'var(--muted)'}
              >{s}</a>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.3em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 24 }}>Collection</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[['All Products', '/products'], ['New Arrivals', '/products?isNew=true'], ['Tops', '/products?category=tops'], ['Bottoms', '/products?category=bottoms'], ['Dresses', '/products?category=dresses'], ['Accessories', '/products?category=accessories']].map(([label, path]) => (
              <li key={label}>
                <Link to={path} style={{ fontSize: '0.875rem', color: 'var(--muted)', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--white)'}
                  onMouseLeave={e => e.target.style.color = 'var(--muted)'}
                >{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.3em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 24 }}>Stay in Style</div>
          <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.8, marginBottom: 16 }}>
            Early access to drops, styling notes, and the occasional piece of unsolicited advice.
          </p>
          {joined ? (
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--gold)', letterSpacing: '0.15em' }}>✓ YOU'RE IN. STYLE IS LOADING.</p>
          ) : (
            <form onSubmit={handleJoin} style={{ display: 'flex' }}>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" type="email"
                style={{ flex: 1, background: 'var(--mid)', border: '1px solid var(--mid)', borderRight: 'none', color: 'var(--white)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', padding: '14px 18px', outline: 'none' }} />
              <button type="submit" style={{ padding: '14px 22px', background: 'var(--gold)', color: 'var(--black)', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 700, border: 'none', letterSpacing: '0.15em', whiteSpace: 'nowrap', transition: 'background 0.2s' }}
                onMouseEnter={e => e.target.style.background = 'var(--gold-light)'}
                onMouseLeave={e => e.target.style.background = 'var(--gold)'}
              >Join</button>
            </form>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 36 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--muted)' }}>
          © 2026 VELORA · All rights reserved · Powered by taste
        </span>
        <div style={{ display: 'flex', gap: 24 }}>
          {[['Privacy', '/privacy'], ['Terms', '/terms'], ['Returns', '/returns']].map(([l, p]) => (
            <Link key={l} to={p} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', color: 'var(--muted)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--white)'}
              onMouseLeave={e => e.target.style.color = 'var(--muted)'}
            >{l}</Link>
          ))}
        </div>
      </div>

      <style>{`@media(max-width:768px){footer>div:first-child{grid-template-columns:1fr !important;}}`}</style>
    </footer>
  );
}
