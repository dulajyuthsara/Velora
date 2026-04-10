import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQty, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const shipping = total > 100 ? 0 : 12;
  const tax      = +(total * 0.08).toFixed(2);
  const grand    = +(total + shipping + tax).toFixed(2);

  if (cart.length === 0) return (
    <div style={{ paddingTop:80, minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:24 }}>
      <div style={{ fontFamily:'var(--font-display)', fontSize:'clamp(48px,8vw,100px)', fontWeight:900, color:'transparent', WebkitTextStroke:'1px var(--mid)', letterSpacing:'-0.02em' }}>Empty.</div>
      <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.7rem', letterSpacing:'0.25em', color:'var(--muted)', textTransform:'uppercase' }}>Your cart has opinions. They are: nothing.</p>
      <Link to="/products" className="btn-primary" style={{ marginTop:16 }}>Start Shopping</Link>
    </div>
  );

  return (
    <div style={{ paddingTop:80, minHeight:'100vh' }}>
      <div style={{ padding:'60px 64px 40px', borderBottom:'1px solid var(--mid)', background:'var(--charcoal)' }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', letterSpacing:'0.3em', color:'var(--gold)', textTransform:'uppercase', marginBottom:12 }}>Your Selection</div>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(36px,6vw,80px)', fontWeight:900, lineHeight:0.95, letterSpacing:'-0.02em' }}>
          Cart <em style={{ fontStyle:'italic', color:'var(--gold)' }}>({cart.length})</em>
        </h1>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 380px', gap:0 }}>
        {/* Items */}
        <div style={{ borderRight:'1px solid var(--mid)' }}>
          {cart.map((item, i) => (
            <div key={`${item._id}-${item.size}-${item.color}`}
              style={{ display:'grid', gridTemplateColumns:'140px 1fr auto', gap:24, padding:'32px 64px', borderBottom:'1px solid var(--mid)', alignItems:'center' }}>
              <div style={{ aspectRatio:'3/4', overflow:'hidden', background:'var(--charcoal)' }}>
                {item.images?.[0] ? (
                  <img src={item.images[0].url} alt={item.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                ) : (
                  <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <span style={{ fontFamily:'var(--font-display)', fontSize:'2rem', color:'var(--gold)', opacity:0.3 }}>V</span>
                  </div>
                )}
              </div>
              <div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.58rem', letterSpacing:'0.2em', color:'var(--gold)', textTransform:'uppercase', marginBottom:8 }}>{item.category}</div>
                <div style={{ fontFamily:'var(--font-display)', fontSize:'1.2rem', fontWeight:700, marginBottom:8 }}>{item.name}</div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'var(--muted)', letterSpacing:'0.1em', marginBottom:20 }}>
                  Size: {item.size} · Colour: {item.color}
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:0, background:'var(--mid)', width:'fit-content' }}>
                  <button onClick={() => updateQty(item._id, item.size, item.color, item.qty - 1)}
                    style={{ width:40, height:40, background:'none', border:'none', color:'var(--white)', fontSize:'1.1rem', fontFamily:'var(--font-mono)' }}>−</button>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.8rem', width:32, textAlign:'center', color:'var(--white)' }}>{item.qty}</span>
                  <button onClick={() => updateQty(item._id, item.size, item.color, item.qty + 1)}
                    style={{ width:40, height:40, background:'none', border:'none', color:'var(--white)', fontSize:'1.1rem', fontFamily:'var(--font-mono)' }}>+</button>
                </div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:'1.2rem', fontWeight:700, color:'var(--gold)', marginBottom:16 }}>
                  ${(item.price * item.qty).toFixed(2)}
                </div>
                <button onClick={() => removeFromCart(item._id, item.size, item.color)}
                  style={{ fontFamily:'var(--font-mono)', fontSize:'0.58rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--muted)', background:'none', border:'none', transition:'color 0.2s' }}
                  onMouseEnter={e=>e.target.style.color='var(--white)'}
                  onMouseLeave={e=>e.target.style.color='var(--muted)'}
                >Remove</button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div style={{ padding:'48px 40px', background:'var(--charcoal)', position:'sticky', top:80, height:'fit-content' }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', letterSpacing:'0.3em', color:'var(--gold)', textTransform:'uppercase', marginBottom:32 }}>Order Summary</div>
          {[['Subtotal', `$${total.toFixed(2)}`], ['Shipping', shipping===0?'Free':`$${shipping}`], ['Tax (8%)', `$${tax}`]].map(([k,v]) => (
            <div key={k} style={{ display:'flex', justifyContent:'space-between', marginBottom:16 }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.68rem', color:'var(--muted)', letterSpacing:'0.1em' }}>{k}</span>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem', color: v==='Free'?'var(--gold)':'var(--white)' }}>{v}</span>
            </div>
          ))}
          <div style={{ borderTop:'1px solid var(--mid)', paddingTop:20, marginTop:20, display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.7rem', letterSpacing:'0.15em', textTransform:'uppercase' }}>Total</span>
            <span style={{ fontFamily:'var(--font-display)', fontSize:'1.8rem', fontWeight:900, color:'var(--gold)' }}>${grand}</span>
          </div>
          {shipping === 0 && (
            <div style={{ marginTop:12, fontFamily:'var(--font-mono)', fontSize:'0.58rem', letterSpacing:'0.15em', color:'var(--gold)', textAlign:'center' }}>✓ FREE SHIPPING APPLIED</div>
          )}
          <button onClick={() => user ? navigate('/checkout') : navigate('/login')}
            style={{ width:'100%', marginTop:32, padding:'18px', background:'var(--gold)', color:'var(--black)', fontFamily:'var(--font-mono)', fontSize:'0.72rem', letterSpacing:'0.2em', fontWeight:700, border:'none', textTransform:'uppercase', transition:'background 0.2s' }}
            onMouseEnter={e=>e.target.style.background='var(--gold-light)'}
            onMouseLeave={e=>e.target.style.background='var(--gold)'}
          >{user ? 'Proceed to Checkout' : 'Login to Checkout'}</button>
          <Link to="/products" style={{ display:'block', textAlign:'center', marginTop:16, fontFamily:'var(--font-mono)', fontSize:'0.62rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--muted)', transition:'color 0.2s' }}
            onMouseEnter={e=>e.target.style.color='var(--white)'}
            onMouseLeave={e=>e.target.style.color='var(--muted)'}
          >← Continue Shopping</Link>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          div[style*="grid-template-columns: 1fr 380px"]{grid-template-columns:1fr !important;}
          div[style*="grid-template-columns: 140px 1fr auto"]{grid-template-columns:80px 1fr !important;}
        }
      `}</style>
    </div>
  );
}
