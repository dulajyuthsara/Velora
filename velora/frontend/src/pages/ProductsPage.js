import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useReveal } from '../hooks/useReveal';
import api from '../hooks/useApi';

const CATEGORIES = ['all','tops','bottoms','dresses','outerwear','footwear','accessories'];
const SORT_OPTIONS = [
  { label:'Newest', val:'-createdAt' },
  { label:'Price: Low', val:'price' },
  { label:'Price: High', val:'-price' },
  { label:'Top Rated', val:'-rating' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [total, setTotal]       = useState(0);
  const [page, setPage]         = useState(1);
  const [pages, setPages]       = useState(1);
  const [category, setCategory] = useState('all');
  const [sort, setSort]         = useState('-createdAt');
  const [search, setSearch]     = useState('');
  useReveal();

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ sort, page, limit: 9 });
    if (category !== 'all') params.set('category', category);
    if (search) params.set('search', search);
    api.get(`/products?${params}`)
      .then(r => { setProducts(r.data.products); setTotal(r.data.total); setPages(r.data.pages); })
      .finally(() => setLoading(false));
  }, [category, sort, page, search]);

  return (
    <div style={{ paddingTop: 100 }}>
      {/* Header */}
      <div style={{ padding:'80px 64px 60px', borderBottom:'1px solid var(--mid)', background:'var(--charcoal)' }}>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:32 }}>
          <div>
            <div className="tag reveal">SS26 Collection</div>
            <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(36px,6vw,80px)', fontWeight:900, lineHeight:0.95, letterSpacing:'-0.02em' }} className="reveal reveal-delay-1">
              All <em style={{fontStyle:'italic', color:'var(--gold)'}}>Pieces.</em>
            </h1>
            <p style={{ color:'var(--muted)', marginTop:20, fontSize:'0.875rem' }} className="reveal reveal-delay-2">{total} items available</p>
          </div>
          {/* Search */}
          <div className="reveal" style={{ display:'flex', gap:0, maxWidth:320, flex:1 }}>
            <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search collection..."
              style={{ flex:1, background:'var(--mid)', border:'1px solid rgba(255,255,255,0.08)', color:'var(--white)', fontFamily:'var(--font-mono)', fontSize:'0.75rem', padding:'14px 18px', outline:'none', letterSpacing:'0.05em' }} />
          </div>
        </div>

        {/* Filters */}
        <div style={{ display:'flex', gap:0, marginTop:48, flexWrap:'wrap', gap:2 }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => { setCategory(cat); setPage(1); }}
              style={{ padding:'12px 28px', fontFamily:'var(--font-mono)', fontSize:'0.62rem', letterSpacing:'0.2em', textTransform:'uppercase', background: category===cat ? 'var(--gold)' : 'var(--mid)', color: category===cat ? 'var(--black)' : 'var(--muted)', border:'none', fontWeight: category===cat ? 700 : 400, transition:'all 0.2s' }}>
              {cat}
            </button>
          ))}
          <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:12 }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', letterSpacing:'0.2em', color:'var(--muted)', textTransform:'uppercase' }}>Sort</span>
            <select value={sort} onChange={e => { setSort(e.target.value); setPage(1); }}
              style={{ background:'var(--mid)', border:'1px solid rgba(255,255,255,0.08)', color:'var(--white)', fontFamily:'var(--font-mono)', fontSize:'0.65rem', padding:'12px 16px', outline:'none', letterSpacing:'0.1em' }}>
              {SORT_OPTIONS.map(o => <option key={o.val} value={o.val}>{o.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ padding:'64px', background:'var(--black)' }}>
        {loading ? (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:2 }}>
            {[...Array(9)].map((_,i) => (
              <div key={i} style={{ background:'var(--charcoal)', aspectRatio:'3/4', animation:'pulse 1.5s ease-in-out infinite' }} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign:'center', padding:'120px 0' }}>
            <div style={{ fontFamily:'var(--font-display)', fontSize:'3rem', color:'var(--muted)', fontStyle:'italic' }}>Nothing here.</div>
            <p style={{ color:'var(--muted)', marginTop:16, fontFamily:'var(--font-mono)', fontSize:'0.7rem', letterSpacing:'0.2em' }}>TRY A DIFFERENT FILTER OR SEARCH TERM</p>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:2 }}>
            {products.map((p,i) => (
              <div key={p._id} className={`reveal reveal-delay-${(i%3)+1}`}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div style={{ display:'flex', justifyContent:'center', gap:2, marginTop:80 }}>
            {[...Array(pages)].map((_,i) => (
              <button key={i} onClick={() => setPage(i+1)}
                style={{ width:48, height:48, fontFamily:'var(--font-mono)', fontSize:'0.7rem', background: page===i+1 ? 'var(--gold)' : 'var(--charcoal)', color: page===i+1 ? 'var(--black)' : 'var(--muted)', border:'none', fontWeight: page===i+1 ? 700 : 400, transition:'all 0.2s' }}>
                {i+1}
              </button>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .reveal{opacity:0;transform:translateY(40px);transition:opacity 0.85s cubic-bezier(.16,1,.3,1),transform 0.85s cubic-bezier(.16,1,.3,1)}
        .reveal.visible{opacity:1;transform:translateY(0)}
        .reveal-delay-1{transition-delay:.1s}.reveal-delay-2{transition-delay:.22s}.reveal-delay-3{transition-delay:.34s}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @media(max-width:768px){div[style*="repeat(3,1fr)"]{grid-template-columns:1fr 1fr !important;}section{padding:80px 24px !important;}}
      `}</style>
    </div>
  );
}
