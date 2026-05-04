import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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

/* ─────────────────────────────────────────────
   ALL IMAGES — SPICE SPECIFIC
───────────────────────────────────────────── */
const IMG = {
  // Hero banner — colorful spice bowls overhead shot
  heroBanner: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=900&q=85',

  // Collage section — 3 individual spice close-ups
  collage1: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600&q=85', // cloves close-up
  collage2: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=85', // turmeric powder
  collage3: 'https://images.unsplash.com/photo-1573556784604-6ff3f856ef5b?w=600&q=85', // black pepper

  // Full-width band — spice market / farm
  band: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1600&q=85',
}

/* ─────────────────────────────────────────────
   SPICE CARDS — each with its own real image
───────────────────────────────────────────── */
const spices = [
  {
    name: 'Black Pepper',
    origin: 'Kerala, India',
    grade: 'ASTA Grade',
    img: 'https://images.unsplash.com/photo-1573556784604-6ff3f856ef5b?w=500&q=85',
    desc: 'Bold, pungent and deeply aromatic — the King of Spices preferred by Michelin-starred kitchens worldwide.',
  },
  {
    name: 'Cardamom',
    origin: 'Idukki, India',
    grade: 'Premium Bold',
    img: 'https://images.unsplash.com/photo-1638007862542-f8f25feae3a3?w=500&q=85',
    desc: 'Intensely fragrant pods with complex floral notes — the benchmark for Nordic bakers and Middle Eastern confectioners.',
  },
  {
    name: 'Cloves',
    origin: 'Tamil Nadu, India',
    grade: 'Hand-Picked',
    img: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=500&q=85',
    desc: 'Warm, rich and intensely aromatic. Essential in European charcuterie and Southeast Asian cuisine blends.',
  },
  {
    name: 'Cinnamon',
    origin: 'Sri Lanka / India',
    grade: 'Ceylon True',
    img: 'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?w=500&q=85',
    desc: 'Delicate sweet bark with subtle heat — the preferred choice of European pastry houses and specialty roasters.',
  },
  {
    name: 'Turmeric',
    origin: 'Erode, India',
    grade: 'High Curcumin',
    img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&q=85',
    desc: 'Brilliant golden hue with 5%+ curcumin content. The world\'s fastest-growing wellness superfood ingredient.',
  },
  {
    name: 'Cumin',
    origin: 'Rajasthan, India',
    grade: 'Export Select',
    img: 'https://images.unsplash.com/photo-1605635077693-b6d3cc576f61?w=500&q=85',
    desc: 'Earthy, nutty warmth forming the backbone of global spice blends — from Tex-Mex to North African tagine.',
  },
  {
    name: 'Star Anise',
    origin: 'Northeast India',
    grade: 'Whole Star',
    img: 'https://images.unsplash.com/photo-1608032364895-84e10fd75d74?w=500&q=85',
    desc: 'Architectural beauty with deep licorice intensity. Critical in Chinese five-spice and French bouillabaisse.',
  },
  {
    name: 'Nutmeg',
    origin: 'Kerala, India',
    grade: 'Whole Select',
    img: 'https://images.unsplash.com/photo-1599909533731-60cb6b24acef?w=500&q=85',
    desc: 'Warm, intoxicating spice with nutty depth. Prized by Dutch and German confectionery exporters globally.',
  },
  {
    name: 'Coriander',
    origin: 'Madhya Pradesh',
    grade: 'Eagle Grade',
    img: 'https://images.unsplash.com/photo-1521945974507-f980a359e9cc?w=500&q=85',
    desc: 'Bright, citrusy warmth in seed and powder form — cornerstone of curry blends shipped across six continents.',
  },
]

const certifications = [
  { icon: '🛡️', label: 'FSSAI Licensed', sub: 'India Food Safety' },
  { icon: '📋', label: 'ISO 22000', sub: 'Food Safety Management' },
  { icon: '🌾', label: 'APEDA Registered', sub: 'Agricultural Export' },
  { icon: '🇪🇺', label: 'EU Compliant', sub: 'European Market Ready' },
  { icon: '☪️', label: 'Kosher / Halal', sub: 'Certified on Request' },
]

const markets = ['🇩🇪 Germany', '🇬🇧 UK', '🇦🇪 UAE', '🇺🇸 USA', '🇯🇵 Japan', '🇳🇱 Netherlands', '🇸🇦 Saudi Arabia', '🇦🇺 Australia']

const whyUs = [
  { icon: '🌾', title: 'Traceable Sourcing', body: 'Every batch is traced to its farm of origin, providing full transparency for EU and US importer compliance requirements.' },
  { icon: '🔬', title: 'Lab Certified Quality', body: 'Third-party testing for moisture, essential oil content, microbiological safety, and pesticide residue levels.' },
  { icon: '📦', title: 'Flexible Packaging', body: 'Custom bulk (5kg–50kg), private label, vacuum-sealed retail packs, and full OEM packaging solutions.' },
  { icon: '🚢', title: 'Port-Ready Export', body: 'Dispatch from Chennai & Kochi with complete docs: COA, phytosanitary, fumigation certificates.' },
]

/* ─────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────── */
function LeafWatermark({ className }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <path d="M160 30c-40 8-72 36-86 72-8 20-11 42-12 63 18-3 36-10 54-20 48-26 72-72 44-115Z"
        stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.5" />
      <path d="M76 165c14-24 36-44 62-58" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <circle cx="50" cy="60" r="6" fill="currentColor" opacity="0.2" />
      <circle cx="170" cy="90" r="4" fill="currentColor" opacity="0.15" />
    </svg>
  )
}

function GoldDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '3rem 0' }}>
      <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, transparent, ${T.gold}50)` }} />
      <svg viewBox="0 0 32 32" style={{ width: '1.75rem', fill: T.gold, opacity: 0.7 }}>
        <path d="M16 2l2.8 8.6H28l-7.4 5.4 2.8 8.6L16 19.2l-7.4 5.4 2.8-8.6L4 10.6h9.2z" />
      </svg>
      <div style={{ flex: 1, height: '1px', background: `linear-gradient(to left, transparent, ${T.gold}50)` }} />
    </div>
  )
}

function SpiceCard({ spice }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: T.white,
        border: `1.5px solid ${hov ? T.gold : 'rgba(45,106,79,0.12)'}`,
        borderRadius: '1.25rem',
        overflow: 'hidden',
        boxShadow: hov ? `0 20px 50px rgba(45,106,79,0.15), 0 0 0 1px ${T.goldBorder}` : '0 2px 16px rgba(0,0,0,0.06)',
        transform: hov ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden', background: T.greenTint }}>
        <img
          src={spice.img}
          alt={spice.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: hov ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
          onError={e => {
            e.target.src = `https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=400&q=80`
          }}
        />
        {/* Overlay gradient */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(27,67,50,0.6) 0%, transparent 55%)' }} />
        {/* Grade badge */}
        <span style={{
          position: 'absolute', top: '0.75rem', right: '0.75rem',
          background: T.gold, color: T.white,
          fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
          padding: '0.25rem 0.7rem', borderRadius: '999px', fontFamily: 'sans-serif',
          boxShadow: '0 2px 8px rgba(201,150,26,0.4)',
        }}>{spice.grade}</span>
        {/* Spice name on image bottom */}
        <p style={{
          position: 'absolute', bottom: '0.75rem', left: '1rem',
          fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: '1.15rem',
          fontWeight: 700, color: T.white, lineHeight: 1,
        }}>{spice.name}</p>
      </div>

      {/* Content */}
      <div style={{ padding: '1.1rem 1.4rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontFamily: 'sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: T.greenMid, marginBottom: '0.5rem' }}>
          📍 {spice.origin}
        </p>
        <p style={{ fontFamily: "'Lora',Georgia,serif", fontSize: '0.8rem', color: T.muted, lineHeight: 1.7, flex: 1 }}>
          {spice.desc}
        </p>
      </div>
    </div>
  )
}


function SpicesNavbar() {
  const navStyle = {
    background: '#F0C84A', // yellow-gold
    padding: '0.9rem 0',
    position: 'sticky',
    top: 0,
    zIndex: 50,

  }

  const linkStyle = {
    color: '#000000', // black text
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
    <nav style={navStyle}>
      <div className="container-page" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{
          color: '#1B4332',
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: '1.4rem',
          fontWeight: 700,
        }}>
          Velmora Spices
        </p>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link to="/spices" style={linkStyle}>Home</Link>
          <Link to="/ninesignaturespices" style={linkStyle}>Range of Spices</Link>
          <Link to="/" style={linkStyle}>Range of Oils</Link>
          <Link to="/contact" style={linkStyle}>Contact</Link>
        </div>
      </div>
    </nav>
  )
}


/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function SpicesLanding() {
  useEffect(() => {
    document.title = 'Premium Indian Spice Exports | Global B2B Sourcing | Velmora'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Velmora exports premium-grade Indian spices to 40+ countries. FSSAI & ISO certified. Bulk B2B supply of black pepper, cardamom, turmeric, cinnamon, cloves. EU & US compliant.')
  }, [])

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');
    @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    .spice-marquee { animation:marquee 26s linear infinite; display:flex; gap:2.5rem; white-space:nowrap; }
    .stat-card { transition:all 0.3s ease; }
    .stat-card:hover { transform:translateY(-4px); box-shadow:0 12px 32px rgba(45,106,79,0.15); }
    .why-card { transition:all 0.3s ease; }
    .why-card:hover { background:${T.greenTint} !important; border-color:${T.greenMid} !important; }
    .cert-pill { transition:all 0.3s ease; cursor:default; }
    .cert-pill:hover { background:${T.greenDark} !important; }
    .cert-pill:hover p { color:${T.white} !important; }
  `

  return (
    <div style={{ background: T.offWhite, minHeight: '100vh', color: T.charcoal }}>
      <style>{css}</style>
      <SpicesNavbar />

      {/* ══════════ HERO ══════════ */}
      <section
        style={{
          background: `linear-gradient(135deg, ${T.greenDark} 0%, ${T.green} 70%)`,
          padding: '3rem 0',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 0.9fr',
              gap: '5rem',
              alignItems: 'center',
            }}
          >
            {/* LEFT SIDE */}
            <div>
              <p
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: T.goldLight,
                  marginBottom: '0.8rem',
                  fontWeight: 700,
                }}
              >
                Velmora Exports · India’s Spice Heritage
              </p>

              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(3.8rem, 6vw, 5.5rem)',
                  lineHeight: 1.05,
                  color: '#fff',
                  marginBottom: '0.8rem',
                }}
              >
                India’s Finest Spices
              </h1>

              <p
                style={{
                  fontSize: '1.15rem',
                  lineHeight: 1.9,
                  color: 'rgba(255,255,255,0.78)',
                  maxWidth: '34rem',
                  marginBottom: '0.8rem',
                }}
              >
                Sourced from the most prolific spice-growing regions of the Indian
                subcontinent, delivering consistent quality, certified compliance,
                and scalable volume to global importers and food manufacturers.
              </p>

              {/* Stats in a row */}
              <div
                style={{
                  display: 'flex',
                  gap: '3rem',
                  marginBottom: '1.8rem',
                }}
              >
                {[
                  { val: '40+', sub: 'Countries' },
                  { val: '9', sub: 'Spice Lines' },
                  { val: 'ISO', sub: 'Certified' },
                ].map((s) => (
                  <div key={s.sub}>
                    <div
                      style={{
                        fontSize: '2.4rem',
                        color: T.goldLight,
                        fontFamily: "'Cormorant Garamond', serif",
                      }}
                    >
                      {s.val}
                    </div>
                    <div
                      style={{
                        fontSize: '0.7rem',
                        letterSpacing: '0.25em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.6)',
                        marginTop: '0.4rem',
                      }}
                    >
                      {s.sub}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div>
                <Link
                  to="/contact"
                  style={{
                    background: T.gold,
                    color: '#000',
                    padding: '1rem 1.1rem',
                    borderRadius: '999px',
                    fontWeight: 600,
                    letterSpacing: '0.10em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                  }}
                >
                  EXPLORE SPICES
                </Link>
              </div>
            </div>

            {/* RIGHT SIDE IMAGE */}
            <div>
              <img
                src={IMG.heroBanner}
                alt="Premium Indian spices"
                style={{
                  width: '100%',
                  height: '520px',
                  objectFit: 'cover',
                  borderRadius: '1.5rem',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ MARQUEE ══════════ */}
      <div style={{ overflow: 'hidden', padding: '2rem 0', background: T.goldTint, borderBottom: `1px solid ${T.goldBorder}` }}>
        <div className="spice-marquee">
          {[...spices, ...spices].map((s, i) => (
            <span key={i} style={{ fontFamily: 'sans-serif', fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.gold, flexShrink: 0 }}>
              ✦ {s.name}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════ HERITAGE SPLIT ══════════ */}
      const revealRef = useReveal()

      <section style={{ background: T.white, padding: '10rem 0', overflow: 'hidden' }}>
        <div
          ref={revealRef}
          className="reveal-up"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem',
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center',
          }}
        >

          {/* IMAGE STACK (modern overlapping) */}
          <div style={{ position: 'relative', height: '560px' }}>
            <img
              src={IMG.collage1}
              alt=""
              style={{
                position: 'absolute',
                width: '70%',
                height: '420px',
                objectFit: 'cover',
                borderRadius: '1.5rem',
                top: 0,
                left: 0,
                boxShadow: '0 40px 80px rgba(0,0,0,0.25)',
                zIndex: 3,
              }}
            />

            <img
              src={IMG.collage2}
              alt=""
              style={{
                position: 'absolute',
                width: '55%',
                height: '260px',
                objectFit: 'cover',
                borderRadius: '1.5rem',
                bottom: 0,
                left: '10%',
                boxShadow: '0 30px 60px rgba(0,0,0,0.2)',
                zIndex: 2,
              }}
            />

            <img
              src={IMG.collage3}
              alt=""
              style={{
                position: 'absolute',
                width: '55%',
                height: '260px',
                objectFit: 'cover',
                borderRadius: '1.5rem',
                top: '120px',
                right: 0,
                boxShadow: '0 30px 60px rgba(0,0,0,0.2)',
                zIndex: 1,
              }}
            />
          </div>

          {/* FLOATING TEXT CARD */}
          <div
            style={{
              background: '#fff',
              padding: '3.5rem',
              borderRadius: '1.8rem',
              boxShadow: '0 40px 100px rgba(0,0,0,0.12)',
              position: 'relative',
            }}
          >
            <p style={{
              fontSize: '0.7rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: T.gold,
              fontWeight: 700,
              marginBottom: '1.5rem',
            }}>
              Our Heritage
            </p>

            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '2.8rem',
              lineHeight: 1.2,
              color: T.greenDark,
              marginBottom: '1.5rem',
            }}>
              From India’s Spice Belt to the World’s Tables
            </h2>

            <p style={{
              fontSize: '1.05rem',
              lineHeight: 1.9,
              color: T.muted,
              marginBottom: '1.5rem',
            }}>
              For generations, India has supplied the world with its most prized culinary treasures...
            </p>

            <p style={{
              fontSize: '1.05rem',
              lineHeight: 1.9,
              color: T.muted,
              marginBottom: '2.5rem',
            }}>
              Every batch is third-party tested, traceably sourced, and delivered with the documentation your market demands.
            </p>

            <Link
              to="/contact"
              style={{
                background: T.greenDark,
                color: '#fff',
                padding: '1rem 2.6rem',
                borderRadius: '999px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontSize: '0.75rem',
              }}
            >
              Enquire Now →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ WHY VELMORA ══════════ */}
      <section style={{ background: T.greenTint, borderTop: `1px solid rgba(45,106,79,0.12)`, borderBottom: `1px solid rgba(45,106,79,0.12)` }}>
        <div className="container-page" style={{ padding: '5rem 0' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ fontFamily: 'sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.gold, marginBottom: '0.75rem' }}>Why Global Importers Choose Velmora</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: T.greenDark }}>Built for International Trade</h2>
            <p style={{ fontFamily: "'Lora',Georgia,serif", fontSize: '0.9rem', color: T.muted, maxWidth: '32rem', margin: '0.75rem auto 0' }}>
              End-to-end supply chain partnership — from farm traceability to customs-ready documentation.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyUs.map(item => (
              <div key={item.title} className="why-card" style={{ background: T.white, border: `1.5px solid rgba(45,106,79,0.12)`, borderRadius: '1.25rem', padding: '1.75rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: '1.2rem', fontWeight: 700, color: T.greenDark, marginBottom: '0.6rem' }}>{item.title}</h3>
                <p style={{ fontFamily: "'Lora',Georgia,serif", fontSize: '0.8rem', color: T.muted, lineHeight: 1.7 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SPICE CATALOGUE ══════════ */}
      <section style={{ background: T.offWhite }}>
        <div className="container-page" style={{ padding: '5rem 0' }}>
          <GoldDivider />
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontFamily: 'sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.gold, marginBottom: '0.75rem' }}>Our Export Portfolio</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: T.greenDark }}>Nine Signature Spices</h2>
            <p style={{ fontFamily: "'Lora',Georgia,serif", fontSize: '0.9rem', color: T.muted, maxWidth: '30rem', margin: '0.75rem auto 0' }}>
              Available in whole, ground, and custom-blended formats. MOQ from 100 kg per SKU. Private label welcome.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {spices.map((spice) => <SpiceCard key={spice.name} spice={spice} />)}
          </div>
        </div>
      </section>

      {/* ══════════ FULL-WIDTH BAND — spice market ══════════ */}
      <section style={{ position: 'relative', height: '380px', overflow: 'hidden' }}>
        <img
          src={IMG.band}
          alt="Indian spice market with colorful spice bowls"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block' }}
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=1600&q=85' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,rgba(27,67,50,0.92) 0%,rgba(27,67,50,0.55) 50%,transparent 100%)' }} />
        <div className="container-page" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
          <div style={{ maxWidth: '30rem' }}>
            <p style={{ fontFamily: 'sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.goldLight, marginBottom: '0.75rem' }}>Sustainability Promise</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: '2.5rem', fontWeight: 700, color: T.white, lineHeight: 1.15, marginBottom: '1rem' }}>
              Grown with Integrity,<br />Exported with Pride
            </h2>
            <p style={{ fontFamily: "'Lora',Georgia,serif", fontSize: '0.95rem', color: 'rgba(255,255,255,0.78)', lineHeight: 1.75 }}>
              We work directly with farming communities, ensuring fair wages, sustainable practices, and zero intermediaries — so quality and ethics are never compromised.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════ CERTIFICATIONS ══════════ */}
      <section style={{ background: T.white, borderTop: `3px solid ${T.gold}` }}>
        <div className="container-page" style={{ padding: '4rem 0' }}>
          <p style={{ fontFamily: 'sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.gold, textAlign: 'center', marginBottom: '2rem' }}>
            Certifications & Compliance
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', justifyContent: 'center' }}>
            {certifications.map(cert => (
              <div key={cert.label} className="cert-pill" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: T.greenTint, border: `1.5px solid rgba(45,106,79,0.2)`, borderRadius: '1rem', padding: '0.85rem 1.4rem' }}>
                <span style={{ fontSize: '1.25rem' }}>{cert.icon}</span>
                <div>
                  <p style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontWeight: 700, fontSize: '1rem', color: T.greenDark }}>{cert.label}</p>
                  <p style={{ fontFamily: 'sans-serif', fontSize: '0.62rem', color: T.muted, marginTop: '0.1rem' }}>{cert.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FINAL CTA ══════════ */}
      <section style={{ background: `linear-gradient(135deg,${T.greenDark} 0%,${T.green} 100%)`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ height: '4px', background: `linear-gradient(to right,${T.gold},${T.goldLight},${T.gold})` }} />
        <LeafWatermark className="absolute top-0 right-0 w-96 h-96 text-white/[0.06] rotate-45" />
        <LeafWatermark className="absolute bottom-0 left-0 w-72 h-72 text-white/[0.04] -rotate-45" />

        <div className="container-page" style={{ padding: '5rem 0', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            {['✦', '✦', '✦'].map((s, i) => <span key={i} style={{ color: T.goldLight, fontSize: '0.85rem', opacity: 0.7 }}>{s}</span>)}
          </div>
          <p style={{ fontFamily: 'sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', color: T.goldLight, marginBottom: '1.25rem' }}>Ready to Source?</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: 700, color: T.white, lineHeight: 1.1, marginBottom: '1.25rem' }}>
            Partner with India's Premier<br />Spice Export House
          </h2>
          <p style={{ fontFamily: "'Lora',Georgia,serif", fontSize: '1rem', color: 'rgba(255,255,255,0.65)', maxWidth: '34rem', margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
            Whether you are a first-time importer or scaling an established supply chain, our team provides end-to-end support — from sample dispatch to containerised export.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{ background: `linear-gradient(135deg,${T.gold},#a87a0f)`, color: T.white, fontFamily: 'sans-serif', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', padding: '1.1rem 2.5rem', borderRadius: '999px', textDecoration: 'none', boxShadow: '0 8px 32px rgba(201,150,26,0.45)' }}>
              Get a Free Sample Pack
            </Link>
            <Link to="/contact" style={{ background: 'rgba(255,255,255,0.1)', color: T.white, fontFamily: 'sans-serif', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', padding: '1.1rem 2.5rem', borderRadius: '999px', textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.35)' }}>
              Talk to Our Export Team
            </Link>
          </div>
        </div>
        <div style={{ height: '3px', background: `linear-gradient(to right,${T.gold},${T.goldLight},${T.gold})` }} />
      </section>
    </div>
  )
}