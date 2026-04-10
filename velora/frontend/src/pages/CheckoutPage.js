import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../hooks/useApi';
import toast from 'react-hot-toast';

const toastStyle = { style:{ background:'var(--charcoal)', color:'var(--white)', fontFamily:'var(--font-mono)', fontSize:'0.72rem', letterSpacing:'0.1em', border:'1px solid var(--mid)' }, iconTheme:{ primary:'var(--gold)', secondary:'var(--black)' } };

function Field({ label, value, onChange, type='text', placeholder }) {
  const [f, setF] = useState(false);
  return (
    <div style={{ marginBottom:16 }}>
      <label style={{ fontFamily:'var(--font-mono)', fontSize:'0.58rem', letterSpacing:'0.25em', color:'var(--muted)', textTransform:'uppercase', display:'block', marginBottom:8 }}>{label}</label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        onFocus={()=>setF(true)} onBlur={()=>setF(false)}
        style={{ width:'100%', background:'var(--mid)', border:`1px solid ${f?'var(--gold)':'rgba(255,255,255,0.08)'}`, color:'var(--white)', fontFamily:'var(--font-body)', fontSize:'0.875rem', padding:'14px 18px', outline:'none', transition:'border-color 0.2s' }} />
    </div>
  );
}

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart();
  const { user }                   = useAuth();
  const navigate                   = useNavigate();
  const [step, setStep]            = useState(1); // 1=shipping, 2=payment, 3=confirm
  const [loading, setLoading]      = useState(false);
  const [addr, setAddr] = useState({ name:'', street:'', city:'', state:'', zip:'', country:'' });
  const [card, setCard] = useState({ number:'', expiry:'', cvv:'' });

  const shipping = total > 100 ? 0 : 12;
  const tax      = +(total * 0.08).toFixed(2);
  const grand    = +(total + shipping + tax).toFixed(2);

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const { data } = await api.post('/orders', {
        items: cart.map(i => ({ product: i._id, name: i.name, image: i.images?.[0]?.url, price: i.price, size: i.size, color: i.color, quantity: i.qty })),
        shippingAddress: addr,
        paymentMethod: 'Card',
        itemsPrice: total,
        shippingPrice: shipping,
        taxPrice: tax,
        totalPrice: grand,
      });
      clearCart();
      toast.success('Order placed! Welcome to the next level of dressed.', toastStyle);
      navigate(`/account`);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Order failed', toastStyle);
    } finally { setLoading(false); }
  };

  const steps = ['Shipping', 'Payment', 'Confirm'];

  return (
    <div style={{ paddingTop:80, minHeight:'100vh' }}>
      {/* Header */}
      <div style={{ padding:'48px 64px', borderBottom:'1px solid var(--mid)', background:'var(--charcoal)' }}>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,4vw,56px)', fontWeight:900, lineHeight:0.95, letterSpacing:'-0.02em' }}>
          Checkout <em style={{ fontStyle:'italic', color:'var(--gold)' }}>({cart.length} items)</em>
        </h1>
        {/* Step indicator */}
        <div style={{ display:'flex', gap:0, marginTop:32 }}>
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:28, height:28, borderRadius:'50%', background: step>i+1?'var(--gold)':step===i+1?'var(--gold)':'var(--mid)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-mono)', fontSize:'0.6rem', fontWeight:700, color: step>=i+1?'var(--black)':'var(--muted)', transition:'all 0.3s' }}>{step>i+1?'✓':i+1}</div>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem', letterSpacing:'0.2em', textTransform:'uppercase', color: step===i+1?'var(--white)':'var(--muted)' }}>{s}</span>
              </div>
              {i < 2 && <div style={{ flex:1, height:1, background:'var(--mid)', margin:'0 16px', alignSelf:'center', maxWidth:60 }} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 380px', gap:0 }}>
        {/* Form area */}
        <div style={{ padding:'48px 64px', borderRight:'1px solid var(--mid)' }}>
          {step === 1 && (
            <>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', letterSpacing:'0.3em', color:'var(--gold)', textTransform:'uppercase', marginBottom:32 }}>Shipping Address</div>
              <Field label="Full Name" value={addr.name} onChange={e=>setAddr({...addr,name:e.target.value})} placeholder="Your full name" />
              <Field label="Street Address" value={addr.street} onChange={e=>setAddr({...addr,street:e.target.value})} placeholder="123 Fashion St" />
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <Field label="City" value={addr.city} onChange={e=>setAddr({...addr,city:e.target.value})} placeholder="London" />
                <Field label="State / Region" value={addr.state} onChange={e=>setAddr({...addr,state:e.target.value})} placeholder="England" />
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <Field label="Postcode / ZIP" value={addr.zip} onChange={e=>setAddr({...addr,zip:e.target.value})} placeholder="SW1A 1AA" />
                <Field label="Country" value={addr.country} onChange={e=>setAddr({...addr,country:e.target.value})} placeholder="United Kingdom" />
              </div>
              <button onClick={() => setStep(2)}
                style={{ marginTop:24, padding:'18px 48px', background:'var(--gold)', color:'var(--black)', fontFamily:'var(--font-mono)', fontSize:'0.72rem', letterSpacing:'0.2em', fontWeight:700, border:'none', textTransform:'uppercase', transition:'background 0.2s' }}
                onMouseEnter={e=>e.target.style.background='var(--gold-light)'}
                onMouseLeave={e=>e.target.style.background='var(--gold)'}
              >Continue to Payment →</button>
            </>
          )}

          {step === 2 && (
            <>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', letterSpacing:'0.3em', color:'var(--gold)', textTransform:'uppercase', marginBottom:32 }}>Payment Details</div>
              <div style={{ padding:'20px', background:'var(--mid)', marginBottom:28, fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'var(--muted)', letterSpacing:'0.1em', lineHeight:1.8 }}>
                🔒 DEMO MODE — No real payment will be processed. For Stripe integration, add your key to <code style={{color:'var(--gold)'}}>REACT_APP_STRIPE_PUBLIC_KEY</code> in .env
              </div>
              <Field label="Card Number" value={card.number} onChange={e=>setCard({...card,number:e.target.value})} placeholder="4242 4242 4242 4242" />
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <Field label="Expiry" value={card.expiry} onChange={e=>setCard({...card,expiry:e.target.value})} placeholder="MM/YY" />
                <Field label="CVV" value={card.cvv} onChange={e=>setCard({...card,cvv:e.target.value})} placeholder="123" />
              </div>
              <div style={{ display:'flex', gap:12, marginTop:24 }}>
                <button onClick={()=>setStep(1)}
                  style={{ padding:'18px 32px', background:'var(--mid)', color:'var(--muted)', fontFamily:'var(--font-mono)', fontSize:'0.68rem', letterSpacing:'0.15em', border:'none', textTransform:'uppercase', transition:'all 0.2s' }}>
                  ← Back
                </button>
                <button onClick={() => setStep(3)}
                  style={{ flex:1, padding:'18px', background:'var(--gold)', color:'var(--black)', fontFamily:'var(--font-mono)', fontSize:'0.72rem', letterSpacing:'0.2em', fontWeight:700, border:'none', textTransform:'uppercase', transition:'background 0.2s' }}
                  onMouseEnter={e=>e.target.style.background='var(--gold-light)'}
                  onMouseLeave={e=>e.target.style.background='var(--gold)'}
                >Review Order →</button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', letterSpacing:'0.3em', color:'var(--gold)', textTransform:'uppercase', marginBottom:32 }}>Confirm Order</div>
              <div style={{ background:'var(--charcoal)', padding:'28px 32px', marginBottom:24 }}>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.58rem', letterSpacing:'0.2em', color:'var(--muted)', marginBottom:12, textTransform:'uppercase' }}>Shipping to</div>
                <div style={{ fontSize:'0.9rem', lineHeight:1.7 }}>{addr.name}<br />{addr.street}<br />{addr.city}, {addr.state} {addr.zip}<br />{addr.country}</div>
              </div>
              <div style={{ display:'flex', gap:12 }}>
                <button onClick={()=>setStep(2)}
                  style={{ padding:'18px 32px', background:'var(--mid)', color:'var(--muted)', fontFamily:'var(--font-mono)', fontSize:'0.68rem', letterSpacing:'0.15em', border:'none', textTransform:'uppercase' }}>
                  ← Back
                </button>
                <button onClick={handlePlaceOrder} disabled={loading}
                  style={{ flex:1, padding:'18px', background:'var(--gold)', color:'var(--black)', fontFamily:'var(--font-mono)', fontSize:'0.72rem', letterSpacing:'0.2em', fontWeight:700, border:'none', textTransform:'uppercase', opacity:loading?0.7:1, transition:'background 0.2s' }}
                  onMouseEnter={e=>!loading&&(e.target.style.background='var(--gold-light)')}
                  onMouseLeave={e=>e.target.style.background='var(--gold)'}
                >{loading ? 'Placing Order...' : `Place Order — $${grand}`}</button>
              </div>
            </>
          )}
        </div>

        {/* Summary sidebar */}
        <div style={{ padding:'48px 40px', background:'var(--charcoal)', borderLeft:'none' }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', letterSpacing:'0.3em', color:'var(--gold)', textTransform:'uppercase', marginBottom:28 }}>Order Summary</div>
          <div style={{ display:'flex', flexDirection:'column', gap:16, marginBottom:28 }}>
            {cart.map(item => (
              <div key={`${item._id}-${item.size}`} style={{ display:'flex', gap:14, alignItems:'center' }}>
                <div style={{ width:52, height:68, background:'var(--mid)', overflow:'hidden', flexShrink:0 }}>
                  {item.images?.[0] && <img src={item.images[0].url} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem', letterSpacing:'0.06em', color:'var(--white)', lineHeight:1.4 }}>{item.name}</div>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.55rem', color:'var(--muted)', marginTop:3 }}>{item.size} · {item.color} · x{item.qty}</div>
                </div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem', color:'var(--gold)', flexShrink:0 }}>${(item.price*item.qty).toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div style={{ borderTop:'1px solid var(--mid)', paddingTop:20, display:'flex', flexDirection:'column', gap:12 }}>
            {[['Subtotal',`$${total.toFixed(2)}`],['Shipping',shipping===0?'Free':`$${shipping}`],['Tax',`$${tax}`]].map(([k,v])=>(
              <div key={k} style={{ display:'flex', justifyContent:'space-between' }}>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'var(--muted)', letterSpacing:'0.1em' }}>{k}</span>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.68rem', color: v==='Free'?'var(--gold)':'var(--white)' }}>{v}</span>
              </div>
            ))}
            <div style={{ borderTop:'1px solid var(--mid)', paddingTop:16, display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.68rem', textTransform:'uppercase', letterSpacing:'0.15em' }}>Total</span>
              <span style={{ fontFamily:'var(--font-display)', fontSize:'1.6rem', fontWeight:900, color:'var(--gold)' }}>${grand}</span>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){div[style*="grid-template-columns: 1fr 380px"]{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}
