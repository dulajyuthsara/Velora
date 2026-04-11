import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useReveal } from '../hooks/useReveal';
import api from '../hooks/useApi';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('details');
  useReveal();

  useEffect(() => {
    api.get(`/products/${id}`).then(r => {
      setProduct(r.data);
      setSelectedSize(r.data.sizes?.[0] || '');
      setSelectedColor(r.data.colors?.[0]?.name || '');
    });
    api.get(`/reviews/${id}`).then(r => setReviews(r.data)).catch(()=>{});
  }, [id]);

  if (!product) return (
    <div style={{ height:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ fontFamily:'var(--font-display)', fontSize:'2rem', fontStyle:'italic', color:'var(--muted)' }}>Loading...</div>
    </div>
  );

  const handleAddToCart = () => {
    if (!selectedSize) return toast.error('Please select a size');
    addToCart(product, selectedSize, selectedColor, qty);
    toast.success(`${product.name} added to cart`, {
      style: { background:'var(--charcoal)', color:'var(--white)', fontFamily:'var(--font-mono)', fontSize:'0.72rem', letterSpacing:'0.1em', border:'1px solid var(--mid)' },
      iconTheme: { primary:'var(--gold)', secondary:'var(--black)' },
    });
  };

  return (
    <div style={{ paddingTop:80 }}>
      {/* Breadcrumb */}
      <div style={{ padding:'24px 64px', borderBottom:'1px solid var(--mid)', background:'var(--charcoal)' }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', letterSpacing:'0.2em', color:'var(--muted)', textTransform:'uppercase' }}>
          <Link to="/" style={{ color:'var(--muted)', transition:'color 0.2s' }}
            onMouseEnter={e=>e.target.style.color='var(--gold)'} onMouseLeave={e=>e.target.style.color='var(--muted)'}
          >Home</Link>
          {' → '}
          <Link to="/products" style={{ color:'var(--muted)', transition:'color 0.2s' }}
            onMouseEnter={e=>e.target.style.color='var(--gold)'} onMouseLeave={e=>e.target.style.color='var(--muted)'}
          >Collection</Link>
          {' → '}{product.name}
        </span>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:0, minHeight:'80vh' }}>
        {/* Images */}
        <div style={{ position:'sticky', top:80, height:'calc(100vh - 80px)', display:'flex', gap:2, background:'var(--charcoal)' }}>
          {/* Thumbnails */}
          {product.images?.length > 1 && (
            <div style={{ display:'flex', flexDirection:'column', gap:2, width:80, padding:16 }}>
              {product.images.map((img, i) => (
                <div key={i} onClick={() => setSelectedImg(i)}
                  style={{ width:64, height:80, overflow:'hidden', border:`1px solid ${selectedImg===i?'var(--gold)':'transparent'}`, cursor:'none', flexShrink:0 }}>
                  <img src={img.url} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', opacity: selectedImg===i?1:0.5, transition:'opacity 0.2s' }} />
                </div>
              ))}
            </div>
          )}
          {/* Main image */}
          <div style={{ flex:1, overflow:'hidden', position:'relative' }}>
            {product.images?.[selectedImg] && (
              <img src={product.images[selectedImg].url} alt={product.name}
                style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s cubic-bezier(.16,1,.3,1)' }}
                onMouseEnter={e=>e.target.style.transform='scale(1.04)'}
                onMouseLeave={e=>e.target.style.transform='scale(1)'}
              />
            )}
            {product.badge && (
              <div style={{ position:'absolute', top:24, left:24, background:'var(--gold)', color:'var(--black)', fontFamily:'var(--font-mono)', fontSize:'0.55rem', letterSpacing:'0.2em', padding:'5px 12px', fontWeight:700 }}>
                {product.badge}
              </div>
            )}
          </div>
        </div>

        {/* Product info */}
        <div style={{ padding:'64px', borderLeft:'1px solid var(--mid)' }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', letterSpacing:'0.3em', color:'var(--gold)', textTransform:'uppercase', marginBottom:12 }}>{product.category} · {product.tier}</div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,4vw,52px)', fontWeight:900, lineHeight:1.1, letterSpacing:'-0.01em' }}>{product.name}</h1>

          {/* Rating */}
          <div style={{ display:'flex', alignItems:'center', gap:12, marginTop:16 }}>
            <div style={{ color:'var(--gold)', fontSize:'0.8rem', letterSpacing:2 }}>
              {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5-Math.round(product.rating))}
            </div>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:'var(--muted)', letterSpacing:'0.15em' }}>
              ({product.numReviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div style={{ display:'flex', alignItems:'baseline', gap:12, marginTop:24 }}>
            <span style={{ fontFamily:'var(--font-display)', fontSize:'2.2rem', fontWeight:900, color:'var(--gold)' }}>${product.price}</span>
            {product.comparePrice && (
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.9rem', color:'var(--muted)', textDecoration:'line-through' }}>${product.comparePrice}</span>
            )}
            {product.comparePrice && (
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'var(--gold)', background:'rgba(201,169,110,0.15)', padding:'4px 10px', letterSpacing:'0.15em' }}>
                SAVE ${product.comparePrice - product.price}
              </span>
            )}
          </div>

          <div style={{ height:1, background:'var(--mid)', margin:'32px 0' }} />

          {/* Color */}
          {product.colors?.length > 0 && (
            <div style={{ marginBottom:28 }}>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', letterSpacing:'0.25em', color:'var(--muted)', textTransform:'uppercase', marginBottom:14 }}>
                Colour — <span style={{ color:'var(--white)' }}>{selectedColor}</span>
              </div>
              <div style={{ display:'flex', gap:10 }}>
                {product.colors.map(c => (
                  <button key={c.name} onClick={() => setSelectedColor(c.name)} title={c.name}
                    style={{ width:32, height:32, borderRadius:'50%', background:c.hex, border:`2px solid ${selectedColor===c.name?'var(--gold)':'transparent'}`, outline:'2px solid rgba(255,255,255,0.1)', transition:'border 0.2s', boxSizing:'border-box' }} />
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes?.length > 0 && (
            <div style={{ marginBottom:32 }}>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', letterSpacing:'0.25em', color:'var(--muted)', textTransform:'uppercase', marginBottom:14 }}>
                Size — <span style={{ color:'var(--white)' }}>{selectedSize}</span>
              </div>
              <div style={{ display:'flex', gap:2 }}>
                {product.sizes.map(s => (
                  <button key={s} onClick={() => setSelectedSize(s)}
                    style={{ minWidth:52, height:52, fontFamily:'var(--font-mono)', fontSize:'0.7rem', letterSpacing:'0.1em', background: selectedSize===s ? 'var(--gold)' : 'var(--mid)', color: selectedSize===s ? 'var(--black)' : 'var(--muted)', border:'none', fontWeight: selectedSize===s ? 700 : 400, transition:'all 0.2s' }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Qty + Add */}
          <div style={{ display:'flex', gap:2, marginBottom:16 }}>
            <div style={{ display:'flex', background:'var(--mid)', alignItems:'center' }}>
              <button onClick={() => setQty(q => Math.max(1,q-1))}
                style={{ width:48, height:56, background:'none', border:'none', color:'var(--white)', fontSize:'1.2rem', fontFamily:'var(--font-mono)' }}>−</button>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.8rem', width:36, textAlign:'center', color:'var(--white)' }}>{qty}</span>
              <button onClick={() => setQty(q => q+1)}
                style={{ width:48, height:56, background:'none', border:'none', color:'var(--white)', fontSize:'1.2rem', fontFamily:'var(--font-mono)' }}>+</button>
            </div>
            <button onClick={handleAddToCart}
              style={{ flex:1, height:56, background:'var(--gold)', color:'var(--black)', fontFamily:'var(--font-mono)', fontSize:'0.72rem', letterSpacing:'0.2em', fontWeight:700, border:'none', textTransform:'uppercase', transition:'background 0.2s' }}
              onMouseEnter={e=>e.target.style.background='var(--gold-light)'}
              onMouseLeave={e=>e.target.style.background='var(--gold)'}
            >Add to Cart</button>
          </div>

          <Link to="/cart" style={{ display:'block', textAlign:'center', padding:'16px', border:'1px solid var(--mid)', fontFamily:'var(--font-mono)', fontSize:'0.68rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--muted)', transition:'all 0.2s' }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor='var(--gold)'; e.currentTarget.style.color='var(--gold)'; }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor='var(--mid)'; e.currentTarget.style.color='var(--muted)'; }}
          >View Cart</Link>

          {/* Info tabs */}
          <div style={{ marginTop:48 }}>
            <div style={{ display:'flex', borderBottom:'1px solid var(--mid)', marginBottom:28 }}>
              {['details','material','shipping'].map(t => (
                <button key={t} onClick={() => setTab(t)}
                  style={{ padding:'12px 0', marginRight:32, fontFamily:'var(--font-mono)', fontSize:'0.62rem', letterSpacing:'0.2em', textTransform:'uppercase', background:'none', border:'none', color: tab===t ? 'var(--gold)' : 'var(--muted)', borderBottom:`2px solid ${tab===t?'var(--gold)':'transparent'}`, marginBottom:-1, transition:'all 0.2s' }}>
                  {t}
                </button>
              ))}
            </div>
            {tab==='details' && <p style={{ color:'var(--muted)', lineHeight:1.85, fontSize:'0.875rem' }}>{product.description}</p>}
            {tab==='material' && (
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                <div style={{ display:'flex', justifyContent:'space-between', padding:'12px 0', borderBottom:'1px solid var(--mid)' }}>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem', letterSpacing:'0.15em', color:'var(--muted)', textTransform:'uppercase' }}>Material</span>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem', color:'var(--white)' }}>{product.material || 'Premium Blend'}</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', padding:'12px 0', borderBottom:'1px solid var(--mid)' }}>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem', letterSpacing:'0.15em', color:'var(--muted)', textTransform:'uppercase' }}>Origin</span>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem', color:'var(--white)' }}>Portugal / Japan</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', padding:'12px 0' }}>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem', letterSpacing:'0.15em', color:'var(--muted)', textTransform:'uppercase' }}>Sustainability</span>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem', color:'var(--gold)' }}>✓ Certified</span>
                </div>
              </div>
            )}
            {tab==='shipping' && (
              <div style={{ color:'var(--muted)', lineHeight:1.85, fontSize:'0.875rem' }}>
                <p>Free standard shipping on orders over $100. Express available at checkout.</p>
                <p style={{ marginTop:12 }}>Returns accepted within 30 days (60 days for Pro tier, 90 days for Max tier).</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews section */}
      {reviews.length > 0 && (
        <section style={{ padding:'80px 64px', background:'var(--charcoal)', borderTop:'1px solid var(--mid)' }}>
          <div className="tag">Customer Reviews</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:2, marginTop:40 }}>
            {reviews.map(r => (
              <div key={r._id} style={{ background:'var(--black)', padding:'32px 28px' }}>
                <div style={{ color:'var(--gold)', fontSize:'0.8rem', letterSpacing:2, marginBottom:12 }}>{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</div>
                <div style={{ fontFamily:'var(--font-display)', fontStyle:'italic', fontSize:'1rem', marginBottom:12 }}>"{r.comment}"</div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem', color:'var(--gold)', letterSpacing:'0.12em', textTransform:'uppercase' }}>{r.name}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <style>{`
        .reveal{opacity:0;transform:translateY(40px);transition:opacity 0.85s cubic-bezier(.16,1,.3,1),transform 0.85s cubic-bezier(.16,1,.3,1)}
        .reveal.visible{opacity:1;transform:translateY(0)}
        @media(max-width:768px){
          div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr !important;}
          div[style*="position: sticky"]{position:relative !important;height:auto !important;}
        }
      `}</style>
    </div>
  );
}
