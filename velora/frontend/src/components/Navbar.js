import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: '22px 64px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      transition: 'all 0.4s ease',
    }}>
      <Link to="/" style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 900, letterSpacing: '0.3em', color: 'var(--white)', textTransform: 'uppercase' }}>
        Velora
      </Link>

      {/* Desktop links */}
      <ul style={{ display: 'flex', gap: 40, listStyle: 'none', alignItems: 'center' }} className="nav-desktop">
        {[['Collection', '/products'], ['Lookbook', '/#lookbook'], ['About', '/#about']].map(([label, path]) => (
          <li key={label}>
            <Link to={path} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--white)', opacity: 0.7, transition: 'opacity 0.2s' }}
              onMouseEnter={e => e.target.style.opacity = 1}
              onMouseLeave={e => e.target.style.opacity = 0.7}
            >{label}</Link>
          </li>
        ))}
      </ul>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        {user ? (
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <Link to="/account" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--white)'}
              onMouseLeave={e => e.target.style.color = 'var(--muted)'}
            >{user.name.split(' ')[0]}</Link>
            <button onClick={logout} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', background: 'none', border: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--white)'}
              onMouseLeave={e => e.target.style.color = 'var(--muted)'}
            >Logout</button>
          </div>
        ) : (
          <Link to="/login" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = 'var(--white)'}
            onMouseLeave={e => e.target.style.color = 'var(--muted)'}
          >Login</Link>
        )}
        <Link to="/cart" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--white)" strokeWidth="1.5">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          {itemCount > 0 && (
            <span style={{ position: 'absolute', top: -8, right: -8, background: 'var(--gold)', color: 'var(--black)', borderRadius: '50%', width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.55rem', fontWeight: 700 }}>
              {itemCount}
            </span>
          )}
        </Link>
      </div>

      <style>{`
        @media (max-width: 768px) {
          nav { padding: 18px 24px !important; }
          .nav-desktop { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
