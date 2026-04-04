import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const { addToCart }   = useCart();
  const [hovered, setHovered] = useState(false);
  const img0 = product.images?.[0]?.url;
  const img1 = product.images?.[1]?.url || img0;

  const quickAdd = (e) => {
    e.preventDefault();
    addToCart(product, product.sizes?.[0] || 'M', product.colors?.[0]?.name || 'Default', 1);
    toast.success(`${product.name} added to cart`, {
      style: { background: 'var(--charcoal)', color: 'var(--white)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.1em', border: '1px solid var(--mid)' },
      iconTheme: { primary: 'var(--gold)', secondary: 'var(--black)' },
    });
  };

  return (
    <Link to={`/products/${product._id}`} style={{ display: 'block', textDecoration: 'none' }}>
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{ background: 'var(--charcoal)', transition: 'transform 0.35s cubic-bezier(.16,1,.3,1)', transform: hovered ? 'translateY(-6px)' : 'translateY(0)' }}>

        {/* Image */}
        <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: '#111' }}>
          {img0 && (
            <img src={hovered && img1 ? img1 : img0} alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.4s, transform 0.6s cubic-bezier(.16,1,.3,1)', transform: hovered ? 'scale(1.04)' : 'scale(1)' }} />
          )}
          {!img0 && (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '5rem', color: 'transparent', WebkitTextStroke: '1px var(--gold)', opacity: 0.3 }}>V</span>
            </div>
          )}

          {/* Badge */}
          {product.badge && (
            <div style={{ position: 'absolute', top: 16, left: 16, background: 'var(--gold)', color: 'var(--black)', fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.2em', padding: '4px 10px', fontWeight: 700 }}>
              {product.badge}
            </div>
          )}

          {/* Quick add on hover */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px', transform: hovered ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.35s cubic-bezier(.16,1,.3,1)' }}>
            <button onClick={quickAdd}
              style={{ width: '100%', padding: '14px', background: 'var(--gold)', color: 'var(--black)', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', fontWeight: 700, border: 'none', textTransform: 'uppercase', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--gold-light)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--gold)'}
            >Quick Add</button>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: '20px 16px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 6 }}>{product.category}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.25, color: 'var(--white)' }}>{product.name}</div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              {product.comparePrice && (
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', textDecoration: 'line-through', marginBottom: 2 }}>${product.comparePrice}</div>
              )}
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--gold)' }}>${product.price}</div>
            </div>
          </div>

          {/* Color swatches */}
          {product.colors?.length > 0 && (
            <div style={{ display: 'flex', gap: 6, marginTop: 14 }}>
              {product.colors.slice(0, 4).map(c => (
                <div key={c.name} title={c.name}
                  style={{ width: 14, height: 14, borderRadius: '50%', background: c.hex, border: '1px solid rgba(255,255,255,0.15)' }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
