import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../hooks/useApi';
import toast from 'react-hot-toast';

const toastStyle = { style:{ background:'var(--charcoal)', color:'var(--white)', fontFamily:'var(--font-mono)', fontSize:'0.72rem', letterSpacing:'0.1em', border:'1px solid var(--mid)' } };

export default function AccountPage() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [tab, setTab] = useState('orders');
  const [name, setName]   = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  useEffect(() => {
    api.get('/orders/my').then(r => setOrders(r.data)).catch(()=>{});
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put('/auth/profile', { name, email });
      toast.success('Profile updated', toastStyle);
    } catch { toast.error('Update failed', toastStyle); }
  };

  const STATUS_COLOR = { pending:'var(--muted)', processing:'var(--gold)', shipped:'#6eb5c9', delivered:'#6ec98f', cancelled:'#c96e6e' };

  return (
    <div style={{ paddingTop:80, minHeight:'100vh' }}>
      <div style={{ padding:'60px 64px', borderBottom:'1px solid var(--mid)', background:'var(--charcoal)' }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', letterSpacing:'0.3em', color:'var(--gold)', textTransform:'uppercase', marginBottom:12 }}>My Account</div>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(32px,5vw,68px)', fontWeight:900, lineHeight:0.95, letterSpacing:'-0.02em' }}>
          Hello, <em style={{ fontStyle:'italic', color:'var(--gold)' }}>{user?.name?.split(' ')[0]}.</em>
        </h1>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'240px 1fr', gap:0 }}>
        {/* Sidebar */}
        <div style={{ borderRight:'1px solid var(--mid)', background:'var(--charcoal)', padding:'40px 0', display:'flex', flexDirection:'column', gap:2 }}>
          {[['orders','Orders'],['profile','Profile']].map(([val,label]) => (
            <button key={val} onClick={() => setTab(val)}
              style={{ textAlign:'left', padding:'18px 40px', fontFamily:'var(--font-mono)', fontSize:'0.68rem', letterSpacing:'0.2em', textTransform:'uppercase', background: tab===val?'var(--gold)':'transparent', color: tab===val?'var(--black)':'var(--muted)', border:'none', borderRight: tab===val?'none':'1px solid transparent', transition:'all 0.2s', cursor:'none' }}>
              {label}
            </button>
          ))}
          <button onClick={logout}
            style={{ textAlign:'left', padding:'18px 40px', fontFamily:'var(--font-mono)', fontSize:'0.68rem', letterSpacing:'0.2em', textTransform:'uppercase', background:'transparent', color:'var(--muted)', border:'none', cursor:'none', marginTop:'auto', transition:'color 0.2s' }}
            onMouseEnter={e=>e.target.style.color='var(--white)'}
            onMouseLeave={e=>e.target.style.color='var(--muted)'}
          >Logout</button>
        </div>

        {/* Content */}
        <div style={{ padding:'48px 64px' }}>
          {tab === 'orders' && (
            <>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', letterSpacing:'0.3em', color:'var(--gold)', textTransform:'uppercase', marginBottom:32 }}>Order History</div>
              {orders.length === 0 ? (
                <div style={{ textAlign:'center', padding:'80px 0' }}>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:'2rem', fontStyle:'italic', color:'var(--muted)' }}>No orders yet.</div>
                  <p style={{ color:'var(--muted)', marginTop:12, fontSize:'0.875rem' }}>Your impeccable taste hasn't been deployed yet.</p>
                </div>
              ) : (
                <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
                  {orders.map(o => (
                    <div key={o._id} style={{ background:'var(--charcoal)', padding:'28px 32px', display:'grid', gridTemplateColumns:'1fr auto', gap:20, alignItems:'center' }}>
                      <div>
                        <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', letterSpacing:'0.2em', color:'var(--muted)', marginBottom:8 }}>ORDER #{o._id.slice(-8).toUpperCase()}</div>
                        <div style={{ fontFamily:'var(--font-display)', fontSize:'1rem', fontWeight:700, marginBottom:4 }}>
                          {o.items.map(i => i.name).join(', ')}
                        </div>
                        <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem', color:'var(--muted)', letterSpacing:'0.1em' }}>
                          {new Date(o.createdAt).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' })}
                        </div>
                      </div>
                      <div style={{ textAlign:'right' }}>
                        <div style={{ fontFamily:'var(--font-display)', fontSize:'1.2rem', fontWeight:700, color:'var(--gold)', marginBottom:8 }}>${o.totalPrice.toFixed(2)}</div>
                        <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.58rem', letterSpacing:'0.2em', textTransform:'uppercase', color: STATUS_COLOR[o.status] || 'var(--muted)', border:`1px solid ${STATUS_COLOR[o.status] || 'var(--mid)'}`, padding:'4px 10px' }}>
                          {o.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {tab === 'profile' && (
            <>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', letterSpacing:'0.3em', color:'var(--gold)', textTransform:'uppercase', marginBottom:32 }}>Profile Details</div>
              <form onSubmit={handleUpdate} style={{ maxWidth:460 }}>
                {[['Full Name',name,setName,'text'],['Email',email,setEmail,'email']].map(([label,val,set,type]) => (
                  <div key={label} style={{ marginBottom:20 }}>
                    <label style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', letterSpacing:'0.25em', color:'var(--muted)', textTransform:'uppercase', display:'block', marginBottom:10 }}>{label}</label>
                    <input type={type} value={val} onChange={e=>set(e.target.value)}
                      style={{ width:'100%', background:'var(--mid)', border:'1px solid rgba(255,255,255,0.08)', color:'var(--white)', fontFamily:'var(--font-body)', fontSize:'0.9rem', padding:'16px 20px', outline:'none' }} />
                  </div>
                ))}
                <button type="submit"
                  style={{ padding:'16px 40px', background:'var(--gold)', color:'var(--black)', fontFamily:'var(--font-mono)', fontSize:'0.72rem', letterSpacing:'0.2em', fontWeight:700, border:'none', textTransform:'uppercase', transition:'background 0.2s' }}
                  onMouseEnter={e=>e.target.style.background='var(--gold-light)'}
                  onMouseLeave={e=>e.target.style.background='var(--gold)'}
                >Save Changes</button>
              </form>
            </>
          )}
        </div>
      </div>
      <style>{`@media(max-width:768px){div[style*="grid-template-columns: 240px 1fr"]{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}
