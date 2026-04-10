import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Marquee, Ticker } from '../components/Marquee';
import AnimCounter from '../components/AnimCounter';
import ProductCard from '../components/ProductCard';
import { useReveal } from '../hooks/useReveal';
import api from '../hooks/useApi';

const MARQUEE_ITEMS = ['Free Shipping Worldwide', '✦', 'New SS26 Collection', '✦', 'Sustainably Made', '✦', 'Limited Drops', '✦', 'Designed for Every Version of You', '✦'];
const TICKER_ITEMS  = [['VELORA-1 MODEL','OPEN WEIGHT'],['COLLECTION DROP','SS26'],['COMFORT INDEX','99.4%'],['STYLE SCORE','∞'],['AESTHETIC TEMP','T=0.1'],['DRIP RATING','CERTIFIED']];

const FEATURES = [
  { num:'01', title:'Fabric Intelligence', desc:"Our textile algorithms have processed 4.2 million garment failures so you don't have to wear any of them.", stat:'99.4%', statLabel:'Comfort Rating', img:'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80' },
  { num:'02', title:'Thermodynamic Fit', desc:"Body temperature modulation so advanced your wardrobe might file a patent. Stays breathable in conditions we'd rather not name.", stat:'37.9%', statLabel:'More Comfortable', img:'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80' },
  { num:'03', title:'Anti-Crease Matrix', desc:"Micro-woven precision engineering. Wrinkles considered our problem, not yours. Gravity has officially been notified.", stat:'∞', statLabel:'Crease Resistance', img:'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80' },
];

const TESTIMONIALS = [
  { stars:5, quote:"I wore Velora to a gallery opening. Three people asked if I was the exhibit.", name:'Zara K.', role:'Art Director, part-time aesthetic' },
  { stars:5, quote:"The AI styling engine told me to wear all black. I was already wearing all black. It knows me.", name:'Marcus T.', role:'Software Engineer, dark mode enthusiast' },
  { stars:5, quote:"My closet used to have opinions. Now it just has Velora.", name:'Priya N.', role:'Minimalist, recovered maximalist' },
  { stars:4, quote:"Gave it 4 stars because 5 felt too predictable. The fit is genuinely absurd though.", name:'Tom W.', role:'Design critic, professional contrarian' },
  { stars:5, quote:"Airport security asked me to slow down so they could look at the jacket.", name:'Leila M.', role:'Frequent flyer, infrequent compromiser' },
  { stars:5, quote:"My cat respects me more now. Correlation isn't causation. But it is correlation.", name:'Finn O.', role:'Cat owner, empiricist' },
];

const LOOKBOOK = [
  { label:'The Everyday', img:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=80', tag:'ESSENTIALS' },
  { label:'The Statement', img:'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=80', tag:'PRO TIER' },
  { label:'The Archive',  img:'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=80', tag:'MAX TIER' },
];

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  useReveal();

  useEffect(() => {
    api.get('/products/featured').then(r => setFeatured(r.data)).catch(() => {});
  }, []);

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{ height:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden' }}>
        {/* Background image */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=80)', backgroundSize:'cover', backgroundPosition:'center', filter:'brightness(0.22)' }} />
        {/* Ghost text */}
        <div style={{ position:'absolute', fontFamily:'var(--font-display)', fontSize:'clamp(80px,18vw,260px)', fontWeight:900, color:'transparent', WebkitTextStroke:'1px rgba(201,169,110,0.1)', letterSpacing:'-0.02em', userSelect:'none', pointerEvents:'none', whiteSpace:'nowrap', animation:'driftBg 20s ease-in-out infinite alternate' }}>VELORA</div>
        {/* Rings */}
        {[300,500,200].map((s,i) => (
          <div key={i} style={{ position:'absolute', width:s, height:s, border:'1px solid rgba(201,169,110,0.12)', borderRadius:'50%', animation:`spin ${[30,50,20][i]}s linear infinite ${i===2?'reverse':''}`, borderStyle: i===2?'dashed':'solid' }} />
        ))}
        {/* Content */}
        <div style={{ position:'relative', textAlign:'center', zIndex:2 }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem', letterSpacing:'0.35em', color:'var(--gold)', textTransform:'uppercase', marginBottom:28, opacity:0, animation:'fadeUp 0.9s 0.3s forwards' }}>SS26 Collection — Now Available</div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(52px,9vw,130px)', fontWeight:900, lineHeight:0.92, letterSpacing:'-0.02em', opacity:0, animation:'fadeUp 0.9s 0.55s forwards' }}>
            Dressed for<br/><em style={{fontStyle:'italic', color:'var(--gold)'}}>every version</em><br/>of you.
          </h1>
          <p style={{ marginTop:32, fontSize:'1rem', color:'rgba(245,240,235,0.6)', textAlign:'center', maxWidth:400, lineHeight:1.75, opacity:0, animation:'fadeUp 0.9s 0.8s forwards', margin:'32px auto 0' }}>
            Designed to move, built to last. Velora makes the simplest outfit feel inevitable.
          </p>
          <div style={{ marginTop:52, display:'flex', gap:16, justifyContent:'center', opacity:0, animation:'fadeUp 0.9s 1.05s forwards' }}>
            <Link to="/products" className="btn-primary">Shop Collection</Link>
            <a href="#lookbook" className="btn-ghost">Explore Lookbook</a>
          </div>
        </div>
        {/* Scroll hint */}
        <div style={{ position:'absolute', bottom:40, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:10, opacity:0, animation:'fadeIn 1s 1.8s forwards' }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.55rem', letterSpacing:'0.3em', color:'var(--muted)', textTransform:'uppercase' }}>Scroll to continue</span>
          <div style={{ width:1, height:50, background:'linear-gradient(to bottom, var(--gold), transparent)', animation:'scrollLine 2s ease-in-out infinite' }} />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <Marquee items={MARQUEE_ITEMS} gold />
      <Ticker items={TICKER_ITEMS} />

      {/* ── FEATURES ── */}
      <section className="section-pad">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:20 }}>
          <div className="tag reveal">Powered by AI*</div>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:'var(--muted)', letterSpacing:'0.15em' }} className="reveal">* Adobe Illustrator</span>
        </div>
        <div className="statement reveal reveal-delay-1">
          Velora isn't just<br/>clothing. It's the result<br/>of <em>unprecedented</em><br/>style breakthroughs.
        </div>
        {/* Feature grid with images */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:2, marginTop:80 }}>
          {FEATURES.map((f,i) => (
            <div key={i} className={`reveal reveal-delay-${i+2}`}
              style={{ background:'var(--charcoal)', overflow:'hidden', position:'relative', transition:'transform 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.transform='translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
            >
              {/* Feature image */}
              <div style={{ height:240, overflow:'hidden' }}>
                <img src={f.img} alt={f.title} style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.55)', transition:'transform 0.6s cubic-bezier(.16,1,.3,1)' }}
                  onMouseEnter={e => e.target.style.transform='scale(1.06)'}
                  onMouseLeave={e => e.target.style.transform='scale(1)'}
                />
              </div>
              <div style={{ padding:'40px 36px 48px' }}>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:'var(--gold)', letterSpacing:'0.2em', marginBottom:20 }}>{f.num} — VELORA TECH</div>
                <div style={{ fontFamily:'var(--font-display)', fontSize:'1.55rem', fontWeight:700, lineHeight:1.2, marginBottom:14 }}>{f.title}</div>
                <div style={{ fontSize:'0.875rem', color:'var(--muted)', lineHeight:1.75 }}>{f.desc}</div>
                <div style={{ marginTop:28, fontFamily:'var(--font-display)', fontSize:'2.4rem', fontWeight:900, color:'var(--gold)' }}>{f.stat}</div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', letterSpacing:'0.2em', color:'var(--muted)', marginTop:4 }}>{f.statLabel}</div>
              </div>
              {/* Bottom gold line on hover */}
              <div style={{ position:'absolute', bottom:0, left:0, right:0, height:2, background:'var(--gold)', transform:'scaleX(0)', transformOrigin:'left', transition:'transform 0.4s cubic-bezier(.16,1,.3,1)' }}
                className="feature-line" />
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={{ background:'var(--charcoal)', display:'grid', gridTemplateColumns:'repeat(4,1fr)', borderTop:'1px solid var(--mid)', borderBottom:'1px solid var(--mid)' }}>
        {[{target:182000,suffix:'+',label:'Items Delivered'},{target:4.9,suffix:'',label:'Average Rating',isFloat:true},{target:98,suffix:'%',label:'Satisfaction Rate'},{label:'Zero. Regrets. Ever.',raw:'0'}].map((s,i) => (
          <div key={i} className="reveal" style={{ padding:'60px 48px', borderRight: i<3?'1px solid var(--mid)':'none' }}>
            {s.raw !== undefined
              ? <span style={{ fontFamily:'var(--font-display)', fontSize:'clamp(40px,6vw,90px)', fontWeight:900, color:'var(--gold)', lineHeight:1 }}>{s.raw}</span>
              : <AnimCounter target={s.target} suffix={s.suffix} />
            }
            <span style={{ display:'block', fontFamily:'var(--font-mono)', fontSize:'0.6rem', letterSpacing:'0.25em', color:'var(--muted)', marginTop:10, textTransform:'uppercase' }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── LOOKBOOK ── */}
      <section className="section-pad" id="lookbook">
        <div className="reveal">
          <div className="tag">Lookbook SS26</div>
          <div className="statement">Not just <em>garments.</em><br/>Wearable architecture.</div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:2, marginTop:72 }}>
          {LOOKBOOK.map((item,i) => (
            <div key={i} className={`reveal reveal-delay-${i+1}`}
              style={{ position:'relative', aspectRatio:'3/4', overflow:'hidden', cursor:'none' }}
              onMouseEnter={e => { e.currentTarget.querySelector('img').style.transform='scale(1.07)'; e.currentTarget.querySelector('.lb-overlay').style.opacity='1'; }}
              onMouseLeave={e => { e.currentTarget.querySelector('img').style.transform='scale(1)'; e.currentTarget.querySelector('.lb-overlay').style.opacity='0'; }}
            >
              <img src={item.img} alt={item.label} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.7s cubic-bezier(.16,1,.3,1)' }} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(10,10,10,0.75) 0%, transparent 60%)' }} />
              <div className="lb-overlay" style={{ position:'absolute', inset:0, background:'rgba(201,169,110,0.12)', transition:'opacity 0.4s', opacity:0 }} />
              <div style={{ position:'absolute', bottom:32, left:32 }}>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.58rem', letterSpacing:'0.3em', color:'var(--gold)', textTransform:'uppercase', marginBottom:8 }}>{item.tag}</div>
                <div style={{ fontFamily:'var(--font-display)', fontSize:'1.6rem', fontWeight:700 }}>{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      {featured.length > 0 && (
        <section className="section-pad" style={{ background:'var(--charcoal)' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:64 }}>
            <div>
              <div className="tag reveal">The Edit</div>
              <div className="statement reveal reveal-delay-1">Featured <em>pieces.</em></div>
            </div>
            <Link to="/products" className="btn-ghost reveal" style={{ display:'inline-block' }}>View All</Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:2 }}>
            {featured.slice(0,6).map((p,i) => (
              <div key={p._id} className={`reveal reveal-delay-${(i%3)+1}`}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── SPLIT — About section with large image ── */}
      <section className="section-pad" id="about">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center' }}>
          <div className="reveal" style={{ position:'relative' }}>
            <div style={{ aspectRatio:'4/5', overflow:'hidden' }}>
              <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=900&q=80" alt="Velora craftsmanship"
                style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.7s cubic-bezier(.16,1,.3,1)' }}
                onMouseEnter={e => e.target.style.transform='scale(1.04)'}
                onMouseLeave={e => e.target.style.transform='scale(1)'}
              />
            </div>
            {/* Floating stat card */}
            <div style={{ position:'absolute', bottom:-24, right:-24, background:'var(--gold)', color:'var(--black)', padding:'28px 32px', minWidth:180 }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'2.5rem', fontWeight:900 }}>25</div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', letterSpacing:'0.2em', textTransform:'uppercase', marginTop:4, opacity:0.7 }}>Artisans behind<br/>every piece</div>
            </div>
          </div>
          <div className="reveal reveal-delay-2">
            <div className="tag">Our Philosophy</div>
            <div className="statement" style={{ fontSize:'clamp(28px,4vw,58px)' }}>
              Crafted with <em>intention.</em><br/>Worn with confidence.
            </div>
            <p style={{ color:'var(--muted)', lineHeight:1.9, marginTop:28, fontSize:'0.95rem' }}>
              Every Velora piece begins not with fabric, but with a question: <em style={{color:'var(--cream)'}}>what does the person wearing this actually need?</em> We work with small ateliers across Portugal and Japan, spending an unreasonable amount of time on details that most people will never notice — but will always feel.
            </p>
            <p style={{ color:'var(--muted)', lineHeight:1.9, marginTop:20, fontSize:'0.95rem' }}>
              The result is clothing that doesn't demand attention. It just commands it.
            </p>
            <div style={{ display:'flex', gap:48, marginTop:48 }}>
              {[['100%','Sustainable Sourcing'],['9yr','Avg Fabric Research'],['Zero','Seasonal Waste']].map(([val,label]) => (
                <div key={label}>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:'1.8rem', fontWeight:900, color:'var(--gold)' }}>{val}</div>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.58rem', letterSpacing:'0.2em', color:'var(--muted)', marginTop:6, textTransform:'uppercase' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section-pad" style={{ background:'var(--black)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:20 }}>
          <div className="tag reveal">Testimonials</div>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:'var(--muted)' }} className="reveal">Reviews [364] · [4.9/5]</span>
        </div>
        <div className="statement reveal reveal-delay-1">People <em>everywhere</em><br/>love Velora.</div>

        {/* Featured testimonial with image */}
        <div className="reveal" style={{ marginTop:72, display:'grid', gridTemplateColumns:'1fr 1fr', gap:2 }}>
          <div style={{ background:'var(--charcoal)', padding:'64px 56px', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
            <div style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.3rem,2.5vw,2rem)', fontStyle:'italic', lineHeight:1.55, color:'var(--white)' }}>
              "I wore Velora to a gallery opening. Three people asked if I was the exhibit. I told them I was. Nobody questioned it."
            </div>
            <div style={{ borderTop:'1px solid var(--mid)', paddingTop:28, marginTop:40 }}>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.72rem', letterSpacing:'0.12em', color:'var(--gold)', textTransform:'uppercase' }}>Zara K.</div>
              <div style={{ fontSize:'0.8rem', color:'var(--muted)', marginTop:4 }}>Art Director · London</div>
              <div style={{ display:'flex', gap:3, marginTop:12 }}>{'★★★★★'.split('').map((s,i) => <span key={i} style={{color:'var(--gold)',fontSize:'0.9rem'}}>{s}</span>)}</div>
            </div>
          </div>
          <div style={{ overflow:'hidden' }}>
            <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=80" alt="Customer" style={{ width:'100%', height:'100%', objectFit:'cover', minHeight:420 }} />
          </div>
        </div>

        {/* Grid testimonials */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:2, marginTop:2 }}>
          {TESTIMONIALS.slice(1).map((r,i) => (
            <div key={i} className={`reveal reveal-delay-${(i%3)+1}`}
              style={{ background:'var(--charcoal)', padding:'40px 32px', display:'flex', flexDirection:'column', gap:18, transition:'transform 0.3s cubic-bezier(.16,1,.3,1)' }}
              onMouseEnter={e => e.currentTarget.style.transform='translateY(-6px)'}
              onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
            >
              <div style={{ color:'var(--gold)', fontSize:'0.85rem', letterSpacing:3 }}>{'★'.repeat(r.stars)}{'☆'.repeat(5-r.stars)}</div>
              <div style={{ fontFamily:'var(--font-display)', fontStyle:'italic', fontSize:'1rem', lineHeight:1.65, flex:1 }}>"{r.quote}"</div>
              <div style={{ borderTop:'1px solid var(--mid)', paddingTop:18 }}>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.68rem', letterSpacing:'0.12em', color:'var(--gold)', textTransform:'uppercase' }}>{r.name}</div>
                <div style={{ fontSize:'0.75rem', color:'var(--muted)', marginTop:3 }}>{r.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── VELORA-1 MODEL PAPER ── */}
      <section className="section-pad" style={{ background:'var(--charcoal)', borderTop:'1px solid var(--mid)' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center' }}>
          <div className="reveal">
            <div className="tag">Our SOTA Open-Weight Model</div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:'clamp(48px,7vw,100px)', fontWeight:900, letterSpacing:'-0.02em', lineHeight:0.9, color:'var(--gold)' }}>VELORA<br/><em style={{fontSize:'0.6em', color:'var(--white)'}}>one</em></div>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.7rem', color:'var(--muted)', lineHeight:2, marginTop:36, letterSpacing:'0.04em' }}>
              <strong style={{ color:'var(--gold)', display:'block', marginBottom:12, letterSpacing:'0.2em', fontSize:'0.58rem' }}>ABSTRACT —</strong>
              We present Velora-1, an open-weight fashion intelligence model for styling, fit prediction, and gloriously unnecessary wardrobe optimization. Released with baseline results on our own ClosetBench™. Limitations include heavy dependency on mirrors, opinions, and human deployment.
            </p>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:'var(--muted)', marginTop:28, lineHeight:1.9, borderTop:'1px solid var(--mid)', paddingTop:24 }}>
              <strong style={{ color:'var(--gold)', letterSpacing:'0.15em' }}>PEER REVIEW — </strong>"Velora-1 is the best style model I've evaluated. I'm wearing it right now." — Anonymous, FashionBERT
            </p>
          </div>
          <div className="reveal reveal-delay-2" style={{ position:'relative' }}>
            <div style={{ aspectRatio:'1', overflow:'hidden', background:'#111' }}>
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80" alt="Velora-1" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.5) sepia(0.4)' }} />
            </div>
            <div style={{ position:'absolute', top:24, right:24, background:'var(--gold)', color:'var(--black)', fontFamily:'var(--font-mono)', fontSize:'0.6rem', letterSpacing:'0.2em', padding:'6px 14px', fontWeight:700 }}>VELORA-1 · SS26</div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA SECTION ── */}
      <section style={{ padding:'160px 64px', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1800&q=80)', backgroundSize:'cover', backgroundPosition:'center', filter:'brightness(0.18)' }} />
        <div style={{ position:'relative', zIndex:2 }}>
          <div className="tag reveal" style={{ margin:'0 auto 24px' }}>The Velora Promise</div>
          <div className="statement reveal reveal-delay-1" style={{ maxWidth:700, margin:'0 auto' }}>
            We caught your <em>attention.</em><br/>Now let us dress you.
          </div>
          <p className="reveal reveal-delay-2" style={{ color:'rgba(245,240,235,0.55)', marginTop:28, fontSize:'1rem', maxWidth:420, margin:'28px auto 0', lineHeight:1.8 }}>
            If we can describe a coaster as a SOTA open-weight model, imagine what we can do for your wardrobe.
          </p>
          <div className="reveal reveal-delay-3" style={{ marginTop:52, display:'flex', gap:16, justifyContent:'center' }}>
            <Link to="/products" className="btn-primary">Shop All Collections</Link>
            <Link to="/register" className="btn-ghost">Create Account</Link>
          </div>
        </div>
      </section>

      <style>{`
        .reveal { opacity:0; transform:translateY(40px); transition: opacity 0.85s cubic-bezier(.16,1,.3,1), transform 0.85s cubic-bezier(.16,1,.3,1); }
        .reveal.visible { opacity:1; transform:translateY(0); }
        .reveal-delay-1 { transition-delay:0.1s; }
        .reveal-delay-2 { transition-delay:0.22s; }
        .reveal-delay-3 { transition-delay:0.34s; }
        .reveal-delay-4 { transition-delay:0.46s; }
        @media(max-width:768px) {
          section > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns:1fr !important; }
          div[style*="repeat(3,1fr)"] { grid-template-columns:1fr !important; }
          div[style*="repeat(4,1fr)"] { grid-template-columns:1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
