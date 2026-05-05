import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { spices } from '../data/spices.js'

/* ─── THEME ─── */
const T = {
  white: '#FFFFFF',
  offWhite: '#F8F6F0',
  cream: '#FDF9F0',
  greenDark: '#1B4332',
  green: '#2D6A4F',
  greenMid: '#40916C',
  greenLight: '#B7E4C7',
  greenTint: '#F0FAF4',
  gold: '#C9961A',
  goldLight: '#F0C84A',
  goldTint: '#FFF8E1',
  goldBorder: 'rgba(201,150,26,0.25)',
  charcoal: '#1A1A1A',
  muted: '#5C6B5E',
}

/* ─── IMAGES ─── */
const IMG = {
  heroBanner: '/images/spicesimage.jpg',
  heritage1: '/images/spices-banner-image.jpg',
  heritage2: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=85',
  band: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1600&q=85',
}

/* ─── DATA ─── */

const certifications = [
  { icon: '🛡️', label: 'FSSAI Licensed', sub: 'India Food Safety' },
  { icon: '🌾', label: 'APEDA Registered', sub: 'Agricultural Export' },
  { icon: '☪️', label: 'Kosher / Halal', sub: 'Certified on Request' },
]

const whyUs = [
  { icon: '🌾', title: 'Traceable Sourcing', body: 'Every batch is traced to its farm of origin, providing full transparency for EU and US importer compliance requirements.' },
  { icon: '🔬', title: 'Lab Certified Quality', body: 'Third-party testing for moisture, essential oil content, microbiological safety, and pesticide residue levels.' },
  { icon: '📦', title: 'Flexible Packaging', body: 'Custom bulk private label, vacuum-sealed retail packs, and full OEM packaging solutions.' },
  { icon: '🚢', title: 'Port-Ready Export', body: 'Dispatch from Chennai & Kochi with complete docs: COA, phytosanitary, fumigation certificates.' },
]

/* ─── GLOBAL CSS ─── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .container-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
  .spice-marquee { animation: marquee 28s linear infinite; display: flex; gap: 2.5rem; white-space: nowrap; }

  .why-card { transition: all 0.3s ease; }
  .why-card:hover { background: #F0FAF4 !important; border-color: #40916C !important; }

  .cert-pill { transition: all 0.3s ease; cursor: default; }
  .cert-pill:hover { background: #1B4332 !important; }
  .cert-pill:hover .cl { color: #fff !important; }
  .cert-pill:hover .cs { color: rgba(255,255,255,0.6) !important; }

  .spice-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  .why-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
  }
`

/* ─── COMPONENTS ─── */

function LeafWatermark() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      style={{ position: 'absolute', top: 0, right: 0, width: '22rem', opacity: 0.05, pointerEvents: 'none' }}
    >
      <path d="M160 30c-40 8-72 36-86 72-8 20-11 42-12 63 18-3 36-10 54-20 48-26 72-72 44-115Z"
        stroke="white" strokeWidth="2" strokeLinejoin="round" />
      <path d="M76 165c14-24 36-44 62-58" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function SpicesNavbar() {
  const linkStyle = {
    color: '#000',
    textDecoration: 'none',
    fontFamily: 'sans-serif',
    fontWeight: 700,
    fontSize: '0.72rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    padding: '0.6rem 1rem',
    borderRadius: '999px',
  }
  return (
    <nav style={{ background: T.goldLight, padding: '0.9rem 0', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container-page" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo + brand name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img
            src="/images/velmora-logo.png"
            alt="Velmora logo"
            style={{ width: '42px', height: '42px', objectFit: 'contain', flexShrink: 0 }}
          />
          <p style={{ color: T.greenDark, fontFamily: "'Cormorant Garamond',serif", fontSize: '1.45rem', fontWeight: 700, margin: 0 }}>
            Velmora Spices
          </p>
        </div>
        {/* Nav links */}
        <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
          <Link to="/spices-range" style={linkStyle}>Home</Link>
          <Link to="/ninesignaturespices" style={linkStyle}>Range of Spices</Link>
          <Link to="/" style={linkStyle}>Range of Oils</Link>
          <Link to="/contact" style={linkStyle}>Contact</Link>
        </div>
      </div>
    </nav>
  )
}

/* ─── PAGE ─── */
export default function SpicesLanding() {
  const revealRef = useRef(null)

  useEffect(() => {
    document.title = 'Premium Indian Spice Exports | Global B2B Sourcing | Velmora'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Velmora exports premium-grade Indian spices to 40+ countries. FSSAI certified. Bulk B2B supply of black pepper, cardamom, turmeric, cinnamon, cloves. EU & US compliant.')
  }, [])

  useEffect(() => {
    const el = revealRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div style={{ background: T.offWhite, minHeight: '100vh', color: T.charcoal }}>
      <style>{css}</style>
      <SpicesNavbar />

      {/* ══ HERO ══ */}
      <section style={{ position: 'relative', height: '92vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#000' }}>
        <img
          src={IMG.heroBanner}
          alt="Premium Indian spices"
          style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(40%) contrast(110%)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg, rgba(0,0,0,0.88) 20%, rgba(0,0,0,0.18) 100%)' }} />
        <div className="container-page" style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ fontFamily: 'sans-serif', color: T.goldLight, letterSpacing: '0.4em', fontSize: '0.68rem', marginBottom: '1.2rem', fontWeight: 700, textTransform: 'uppercase' }}>
            Velmora Exports · India
          </p>
          <h1 style={{ fontSize: 'clamp(3rem,6vw,5.2rem)', color: '#fff', fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.08, marginBottom: '1.25rem' }}>
            Global Standard<br />Indian Spices
          </h1>
          <p style={{ maxWidth: '30rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.85, marginBottom: '2.25rem', fontFamily: "'Lora', serif", fontSize: '1rem' }}>
            Export-grade spices sourced, tested, and delivered to international markets with full compliance and scalable supply.
          </p>
          <div style={{ display: 'flex', gap: '3rem', marginBottom: '2.5rem' }}>
            {[{ val: '40+', label: 'Countries' }, { val: '9', label: 'Spice Lines' },].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.4rem', color: T.goldLight, lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontFamily: 'sans-serif', fontSize: '0.62rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginTop: '0.35rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
          <Link to="/contact" style={{
            padding: '1rem 2.4rem',
            border: `1.5px solid ${T.goldLight}`,
            color: T.goldLight,
            borderRadius: '999px',
            textDecoration: 'none',
            letterSpacing: '0.15em',
            fontFamily: 'sans-serif',
            fontWeight: 700,
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            display: 'inline-block',
          }}>
            Request Quote
          </Link>
        </div>
      </section>

      {/* ══ MARQUEE ══ */}
      <div style={{ overflow: 'hidden', padding: '1.5rem 0', background: T.goldTint, borderBottom: `1px solid ${T.goldBorder}` }}>
        <div className="spice-marquee">
          {[...spices, ...spices].map((s, i) => (
            <span key={i} style={{ fontFamily: 'sans-serif', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.gold, flexShrink: 0 }}>
              ✦ {s.name}
            </span>
          ))}
        </div>
      </div>

      {/* ══ HERITAGE SPLIT ══ */}
      <section style={{ background: T.white, padding: '7rem 0' }}>
        <div
          ref={revealRef}
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 2rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '5rem',
            alignItems: 'center',
            opacity: 0,
            transform: 'translateY(40px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          {/* LEFT — structured image grid, no absolute positioning */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '300px 170px', gap: '12px' }}>

            {/* Row 1: full-width hero photo */}
            <div style={{ gridColumn: '1 / -1', borderRadius: '1rem', overflow: 'hidden', position: 'relative' }}>
              <img
                src={IMG.heritage1}
                alt="Colorful Indian spice bowls"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(27,67,50,0.5) 0%, transparent 55%)' }} />
              <p style={{ position: 'absolute', bottom: '0.85rem', left: '1rem', margin: 0, fontFamily: 'sans-serif', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: T.goldLight }}>
                Sourced farm to table
              </p>
            </div>

            {/* Row 2 left: market photo */}
            <div style={{ borderRadius: '1rem', overflow: 'hidden' }}>
              <img
                src={IMG.heritage2}
                alt="Indian spice market"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Row 2 right: stats tile */}
            <div style={{ borderRadius: '1rem', background: T.greenDark, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem', gap: 0 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.4rem', fontWeight: 700, color: T.goldLight, lineHeight: 1 }}>40+</div>
              <div style={{ fontFamily: 'sans-serif', fontSize: '0.56rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', margin: '0.2rem 0 0.65rem' }}>Export Markets</div>
              <div style={{ width: '1.5rem', height: '1px', background: T.gold, marginBottom: '0.65rem' }} />
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.4rem', fontWeight: 700, color: T.goldLight, lineHeight: 1 }}>9</div>
              <div style={{ fontFamily: 'sans-serif', fontSize: '0.56rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginTop: '0.2rem' }}>Spice Lines</div>
            </div>
          </div>

          {/* RIGHT — text content */}
          <div>
            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '2rem', height: '2px', background: T.gold, flexShrink: 0 }} />
              <p style={{ fontFamily: 'sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.gold, margin: 0 }}>Our Heritage</p>
            </div>

            {/* Heading */}
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,3.5vw,2.8rem)', lineHeight: 1.15, color: T.greenDark, margin: '0 0 1.25rem', fontWeight: 700 }}>
              From India's Spice Belt<br />to the World's Tables
            </h2>

            {/* Gold accent bar */}
            <div style={{ width: '3rem', height: '3px', background: `linear-gradient(to right, ${T.gold}, ${T.goldLight})`, borderRadius: '2px', marginBottom: '1.5rem' }} />

            {/* Body */}
            <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '0.98rem', lineHeight: 1.85, color: T.muted, margin: '0 0 1rem' }}>
              For generations, India has supplied the world with its most prized culinary treasures — grown in soils shaped by monsoon, altitude, and centuries of agricultural mastery.
            </p>
            <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '0.98rem', lineHeight: 1.85, color: T.muted, margin: '0 0 2rem' }}>
              Every batch is third-party tested, traceably sourced, and delivered with the documentation your market demands.
            </p>

            {/* Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
              {['Farm Traceable', 'Lab Certified'].map(tag => (
                <span key={tag} style={{ fontFamily: 'sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.35rem 0.85rem', borderRadius: '999px', border: `1.5px solid rgba(45,106,79,0.25)`, color: T.green, background: T.greenTint }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <Link to="/contact" style={{ background: T.greenDark, color: T.white, padding: '0.9rem 2.2rem', borderRadius: '999px', fontFamily: 'sans-serif', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', boxShadow: '0 8px 24px rgba(27,67,50,0.25)', display: 'inline-block' }}>
                Enquire Now →
              </Link>
              <Link to="/ninesignaturespices" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'sans-serif', fontSize: '0.72rem', fontWeight: 700, color: T.green, textDecoration: 'none', letterSpacing: '0.08em' }}>
                View Spice Range
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2 6.5h9M7.5 2.5l4 4-4 4" stroke={T.green} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHY VELMORA ══ */}
      <section style={{ background: T.greenTint, borderTop: `1px solid rgba(45,106,79,0.12)`, borderBottom: `1px solid rgba(45,106,79,0.12)`, padding: '6rem 0' }}>
        <div className="container-page">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ fontFamily: 'sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.gold, marginBottom: '0.75rem' }}>Why Global Importers Choose Velmora</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: T.greenDark, marginBottom: '0.75rem' }}>Built for International Trade</h2>
            <p style={{ fontFamily: "'Lora',Georgia,serif", fontSize: '0.9rem', color: T.muted, maxWidth: '32rem', margin: '0 auto' }}>
              End-to-end supply chain partnership — from farm traceability to customs-ready documentation.
            </p>
          </div>
          <div className="why-grid">
            {whyUs.map(item => (
              <div key={item.title} className="why-card" style={{ background: T.white, border: `1.5px solid rgba(45,106,79,0.12)`, borderRadius: '1.25rem', padding: '1.75rem' }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: '1.2rem', fontWeight: 700, color: T.greenDark, marginBottom: '0.6rem' }}>{item.title}</h3>
                <p style={{ fontFamily: "'Lora',Georgia,serif", fontSize: '0.8rem', color: T.muted, lineHeight: 1.7 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FULL-WIDTH BAND ══ */}
      <section style={{ position: 'relative', height: '380px', overflow: 'hidden' }}>
        <img
          src={IMG.band}
          alt="Indian spice market"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
          onError={e => { e.target.src = IMG.heroBanner }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(27,67,50,0.92) 0%, rgba(27,67,50,0.55) 50%, transparent 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
          <div className="container-page">
            <div style={{ maxWidth: '30rem' }}>
              <p style={{ fontFamily: 'sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.goldLight, marginBottom: '0.75rem' }}>Sustainability Promise</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: '2.5rem', fontWeight: 700, color: T.white, lineHeight: 1.15, marginBottom: '1rem' }}>
                Grown with Integrity,<br />Exported with Pride
              </h2>
              <p style={{ fontFamily: "'Lora',Georgia,serif", fontSize: '0.95rem', color: 'rgba(255,255,255,0.78)', lineHeight: 1.75 }}>
                We work directly with farming communities, ensuring fair wages, sustainable practices, and zero intermediaries — so quality and ethics are never compromised.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CERTIFICATIONS ══ */}
      <section style={{ background: T.white, borderTop: `3px solid ${T.gold}`, padding: '4rem 0' }}>
        <div className="container-page">
          <p style={{ fontFamily: 'sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.gold, textAlign: 'center', marginBottom: '2rem' }}>
            Certifications & Compliance
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', justifyContent: 'center' }}>
            {certifications.map(cert => (
              <div key={cert.label} className="cert-pill" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: T.greenTint, border: `1.5px solid rgba(45,106,79,0.2)`, borderRadius: '1rem', padding: '0.85rem 1.4rem' }}>
                <span style={{ fontSize: '1.2rem' }}>{cert.icon}</span>
                <div>
                  <p className="cl" style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontWeight: 700, fontSize: '1rem', color: T.greenDark, margin: 0, transition: 'color 0.3s' }}>{cert.label}</p>
                  <p className="cs" style={{ fontFamily: 'sans-serif', fontSize: '0.6rem', color: T.muted, margin: '0.1rem 0 0', transition: 'color 0.3s' }}>{cert.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section style={{ background: `linear-gradient(135deg, ${T.greenDark} 0%, ${T.green} 100%)`, position: 'relative', overflow: 'hidden' }}>
        <LeafWatermark />
        <div style={{ height: '4px', background: `linear-gradient(to right, ${T.gold}, ${T.goldLight}, ${T.gold})` }} />
        <div className="container-page" style={{ padding: '6rem 0', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {['✦', '✦', '✦'].map((s, i) => <span key={i} style={{ color: T.goldLight, fontSize: '0.85rem', opacity: 0.7 }}>{s}</span>)}
          </div>
          <p style={{ fontFamily: 'sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', color: T.goldLight, marginBottom: '1.25rem' }}>Ready to Source?</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: 700, color: T.white, lineHeight: 1.1, marginBottom: '1.25rem' }}>
            Partner with India's Premier<br />Spice Export House
          </h2>
          <p style={{ fontFamily: "'Lora',Georgia,serif", fontSize: '1rem', color: 'rgba(255,255,255,0.65)', maxWidth: '34rem', margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
            Whether you are a first-time importer or scaling an established supply chain, our team provides end-to-end support — from sample dispatch to containerised export.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{ background: `linear-gradient(135deg, ${T.gold}, #a87a0f)`, color: T.white, fontFamily: 'sans-serif', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', padding: '1.1rem 2.5rem', borderRadius: '999px', textDecoration: 'none', display: 'inline-block' }}>
              Get a Free Sample Pack
            </Link>
            <Link to="/contact" style={{ background: 'rgba(255,255,255,0.1)', color: T.white, fontFamily: 'sans-serif', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', padding: '1.1rem 2.5rem', borderRadius: '999px', textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.35)', display: 'inline-block' }}>
              Talk to Our Export Team
            </Link>
          </div>
        </div>
        <div style={{ height: '3px', background: `linear-gradient(to right, ${T.gold}, ${T.goldLight}, ${T.gold})` }} />
      </section>
    </div>
  )
}