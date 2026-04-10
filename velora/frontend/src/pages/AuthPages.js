import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const toastStyle = { style:{ background:'var(--charcoal)', color:'var(--white)', fontFamily:'var(--font-mono)', fontSize:'0.72rem', letterSpacing:'0.1em', border:'1px solid var(--mid)' }, iconTheme:{ primary:'var(--gold)', secondary:'var(--black)' } };

function AuthLayout({ children, title, sub }) {
  return (
    <div style={{ minHeight:'100vh', display:'grid', gridTemplateColumns:'1fr 1fr' }}>
      {/* Left — Image */}
      <div style={{ position:'relative', overflow:'hidden', background:'#111' }}>
        <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80" alt=""
          style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.35)' }} />
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:64 }}>
          <Link to="/" style={{ fontFamily:'var(--font-display)', fontSize:'2rem', fontWeight:900, letterSpacing:'0.3em', color:'var(--gold)', textTransform:'uppercase', textDecoration:'none' }}>Velora</Link>
          <p style={{ fontFamily:'var(--font-display)', fontStyle:'italic', fontSize:'1.3rem', color:'rgba(245,240,235,0.7)', marginTop:16, lineHeight:1.6, maxWidth:360 }}>
            "Dressed for every version of you."
          </p>
          <div style={{ marginTop:32, display:'flex', gap:16 }}>
            {['Free Shipping','Easy Returns','Sustainable'].map(t => (
              <span key={t} style={{ fontFamily:'var(--font-mono)', fontSize:'0.55rem', letterSpacing:'0.2em', color:'var(--muted)', textTransform:'uppercase', border:'1px solid rgba(255,255,255,0.15)', padding:'6px 12px' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:64, background:'var(--charcoal)' }}>
        <div style={{ width:'100%', maxWidth:420 }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', letterSpacing:'0.35em', color:'var(--gold)', textTransform:'uppercase', marginBottom:20 }}>Velora Account</div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,5vw,56px)', fontWeight:900, lineHeight:1, letterSpacing:'-0.01em', marginBottom:8 }}>{title}</h1>
          {sub && <p style={{ color:'var(--muted)', fontSize:'0.875rem', marginBottom:40, lineHeight:1.7 }}>{sub}</p>}
          {children}
        </div>
      </div>
      <style>{`@media(max-width:768px){div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important;}div[style*="position: relative"]{display:none!important;}}`}</style>
    </div>
  );
}

function InputField({ label, type='text', value, onChange, placeholder }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom:20 }}>
      <label style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', letterSpacing:'0.25em', color:'var(--muted)', textTransform:'uppercase', display:'block', marginBottom:10 }}>{label}</label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ width:'100%', background:'var(--mid)', border:`1px solid ${focused?'var(--gold)':'rgba(255,255,255,0.08)'}`, color:'var(--white)', fontFamily:'var(--font-body)', fontSize:'0.9rem', padding:'16px 20px', outline:'none', transition:'border-color 0.2s' }} />
    </div>
  );
}

export function LoginPage() {
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login }             = useAuth();
  const navigate              = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back.', toastStyle);
      navigate('/');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Login failed', toastStyle);
    } finally { setLoading(false); }
  };

  return (
    <AuthLayout title="Welcome back." sub="Login to access your wardrobe and orders.">
      <form onSubmit={handleSubmit}>
        <InputField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" />
        <InputField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
        <button type="submit" disabled={loading}
          style={{ width:'100%', padding:'18px', background:'var(--gold)', color:'var(--black)', fontFamily:'var(--font-mono)', fontSize:'0.72rem', letterSpacing:'0.2em', fontWeight:700, border:'none', textTransform:'uppercase', marginTop:8, opacity: loading?0.7:1, transition:'background 0.2s' }}
          onMouseEnter={e=>!loading&&(e.target.style.background='var(--gold-light)')}
          onMouseLeave={e=>e.target.style.background='var(--gold)'}
        >{loading ? 'Logging in...' : 'Login'}</button>
        <p style={{ textAlign:'center', marginTop:24, fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'var(--muted)', letterSpacing:'0.1em' }}>
          No account?{' '}
          <Link to="/register" style={{ color:'var(--gold)', textDecoration:'none', transition:'opacity 0.2s' }}>Register here</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export function RegisterPage() {
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register }          = useAuth();
  const navigate              = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) return toast.error('Password must be at least 6 characters', toastStyle);
    setLoading(true);
    try {
      await register(name, email, password);
      toast.success('Account created. Welcome to Velora.', toastStyle);
      navigate('/');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Registration failed', toastStyle);
    } finally { setLoading(false); }
  };

  return (
    <AuthLayout title={<>Create your <em style={{fontStyle:'italic',color:'var(--gold)'}}>account.</em></>} sub="Join Velora and dress for every version of yourself.">
      <form onSubmit={handleSubmit}>
        <InputField label="Full Name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
        <InputField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" />
        <InputField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 6 characters" />
        <button type="submit" disabled={loading}
          style={{ width:'100%', padding:'18px', background:'var(--gold)', color:'var(--black)', fontFamily:'var(--font-mono)', fontSize:'0.72rem', letterSpacing:'0.2em', fontWeight:700, border:'none', textTransform:'uppercase', marginTop:8, opacity:loading?0.7:1, transition:'background 0.2s' }}
          onMouseEnter={e=>!loading&&(e.target.style.background='var(--gold-light)')}
          onMouseLeave={e=>e.target.style.background='var(--gold)'}
        >{loading ? 'Creating account...' : 'Create Account'}</button>
        <p style={{ textAlign:'center', marginTop:24, fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'var(--muted)', letterSpacing:'0.1em' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color:'var(--gold)', textDecoration:'none' }}>Login</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
