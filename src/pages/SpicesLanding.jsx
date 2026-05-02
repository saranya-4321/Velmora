import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

/* ─────────────────────────────────────────────
   THEME TOKENS
   White base · Forest green · Rich gold
───────────────────────────────────────────── */
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
   DATA
───────────────────────────────────────────── */
const spices = [
  { name: 'Black Pepper', origin: 'Kerala, India', grade: 'ASTA Grade', emoji: '🫙', img: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&q=80', desc: 'Bold, pungent and deeply aromatic — the King of Spices preferred by Michelin-starred kitchens worldwide.' },
  { name: 'Cardamom', origin: 'Idukki, India', grade: 'Premium Bold', emoji: '🌿', img: 'https://images.unsplash.com/photo-1607189721093-2b5b3f74d536?w=400&q=80', desc: 'Intensely fragrant pods with complex floral notes, benchmark for Nordic bakers and Middle Eastern confectioners.' },
  { name: 'Cloves', origin: 'Tamil Nadu, India', grade: 'Hand-Picked', emoji: '🌱', img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80', desc: 'Warm, rich and intensely aromatic. Essential in European charcuterie and Southeast Asian cuisine blends.' },
  { name: 'Cinnamon', origin: 'Sri Lanka / India', grade: 'Ceylon True', emoji: '🪵', img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80', desc: 'Delicate sweet bark with subtle heat — the preferred choice of European pastry houses and specialty roasters.' },
  { name: 'Turmeric', origin: 'Erode, India', grade: 'High Curcumin', emoji: '✨', img: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&q=80', desc: 'Brilliant golden hue with 5%+ curcumin content. The world\'s fastest-growing wellness superfood ingredient.' },
  { name: 'Cumin', origin: 'Rajasthan, India', grade: 'Export Select', emoji: '🌾', img: 'https://images.unsplash.com/photo-1599909533731-60cb6b24acef?w=400&q=80', desc: 'Earthy, nutty warmth forming the backbone of global spice blends from Tex-Mex to North African tagine.' },
  { name: 'Star Anise', origin: 'Northeast India', grade: 'Whole Star', emoji: '⭐', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80', desc: 'Architectural beauty with deep licorice intensity. Critical in Chinese five-spice and French bouillabaisse.' },
  { name: 'Nutmeg', origin: 'Kerala, India', grade: 'Whole Select', emoji: '🥜', img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80', desc: 'Warm, intoxicating spice with nutty depth. Prized by Dutch and German confectionery exporters globally.' },
  { name: 'Coriander', origin: 'Madhya Pradesh', grade: 'Eagle Grade', emoji: '🌿', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80', desc: 'Bright, citrusy warmth in seed and powder form — cornerstone of curry blends shipped across six continents.' },
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
  { icon: '🚢', title: 'Port-Ready Export', body: 'Dispatch from Chennai & Kochi with complete documentation: COA, phytosanitary, fumigation certificates.' },
]

/* ─────────────────────────────────────────────
   SVG DECORATIONS
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
      <svg viewBox="0 0 32 16" style={{ width: '2rem', fill: T.gold, opacity: 0.7 }}>
        <path d="M16 1l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z" transform="scale(0.85)" />
      </svg>
      <div style={{ flex: 1, height: '1px', background: `linear-gradient(to left, transparent, ${T.gold}50)` }} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   SPICE CARD
───────────────────────────────────────────── */
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
      <div style={{ position: 'relative', height: '180px', overflow: 'hidden', background: T.greenTint }}>
        <img
          src={spice.img}
          alt={spice.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hov ? 'scale(1.07)' : 'scale(1)', transition: 'transform 0.5s ease' }}
          onError={e => { e.target.style.display = 'none' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(27,67,50,0.55) 0%, transparent 60%)' }} />
        {/* Grade badge */}
        <span style={{
          position: 'absolute', top: '0.75rem', right: '0.75rem',
          background: T.gold, color: T.white,
          fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
          padding: '0.25rem 0.65rem', borderRadius: '999px', fontFamily: 'sans-serif'
        }}>{spice.grade}</span>
      </div>

      {/* Content */}
      <div style={{ padding: '1.25rem 1.4rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontFamily: 'sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: T.greenMid, marginBottom: '0.35rem' }}>
          {spice.origin}
        </p>
        <h3 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: '1.3rem', fontWeight: 700, color: T.greenDark, lineHeight: 1.2, marginBottom: '0.6rem' }}>
          {spice.name}
        </h3>
        <p style={{ fontFamily: "'Lora',Georgia,serif", fontSize: '0.78rem', color: T.muted, lineHeight: 1.65, flex: 1 }}>
          {spice.desc}
        </p>
      </div>
    </div>
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
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');
    @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    .spice-marquee { animation: marquee 26s linear infinite; display:flex; gap:2.5rem; white-space:nowrap; }
    .stat-card:hover { transform:translateY(-4px); box-shadow:0 12px 32px rgba(45,106,79,0.15); }
    .stat-card { transition:all 0.3s ease; }
    .why-card:hover { background:${T.greenTint} !important; border-color:${T.greenMid} !important; }
    .why-card { transition:all 0.3s ease; }
    .cert-pill:hover { background:${T.greenDark} !important; color:${T.white} !important; }
    .cert-pill:hover span { color:${T.white} !important; }
    .cert-pill { transition:all 0.3s ease; }
  `

  return (
    <div style={{ background: T.offWhite, minHeight: '100vh', color: T.charcoal }}>
      <style>{css}</style>

      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section style={{ background: `linear-gradient(135deg, ${T.greenDark} 0%, ${T.green} 60%, #1e5c40 100%)`, position: 'relative', overflow: 'hidden' }}>
        {/* Leaf watermarks */}
        <LeafWatermark style={{ position: 'absolute', top: '-3rem', right: '-3rem', width: '22rem', height: '22rem', color: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} className="absolute -top-12 -right-12 w-80 h-80 text-white/[0.07]" />
        <LeafWatermark className="absolute -bottom-16 -left-16 w-72 h-72 text-white/[0.05] rotate-180" />

        {/* Gold top accent line */}
        <div style={{ height: '4px', background: `linear-gradient(to right, ${T.gold}, ${T.goldLight}, ${T.gold})` }} />

        <div className="container-page" style={{ padding: '4rem 0 5rem' }}>
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{ height: '1px', width: '3rem', background: T.goldLight }} />
            <p style={{ fontFamily: 'sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', color: T.goldLight }}>
              Velmora Exports · India's Spice Heritage
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'center' }} className="lg:grid-cols-2-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* LEFT COPY */}
              <div>
                <h1 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(3.5rem,7vw,5.5rem)', fontWeight: 700, lineHeight: 0.95, color: T.white, letterSpacing: '-0.02em', marginBottom: '1.75rem' }}>
                  India's<br />
                  <em style={{ color: T.goldLight, fontStyle: 'normal' }}>Finest</em><br />
                  Spices
                </h1>

                <p style={{ fontFamily: "'Lora',Georgia,serif", fontSize: '1.05rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, maxWidth: '30rem', marginBottom: '1.5rem' }}>
                  Sourced from the most prolific spice-growing regions of the Indian subcontinent, our export portfolio delivers{' '}
                  <strong style={{ color: T.goldLight, fontWeight: 600 }}>consistent quality, certified compliance, and scalable volume</strong>{' '}
                  to importers and food manufacturers across six continents.
                </p>

                {/* Market flags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                  {markets.map(m => (
                    <span key={m} style={{ fontFamily: 'sans-serif', fontSize: '0.68rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '999px', padding: '0.3rem 0.75rem' }}>
                      {m}
                    </span>
                  ))}
                </div>

                {/* Stat pills */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.75rem', marginBottom: '2.25rem' }}>
                  {[{ val: '40+', sub: 'Countries' }, { val: '9', sub: 'Spice Lines' }, { val: 'ISO', sub: 'Certified' }].map(s => (
                    <div key={s.sub} className="stat-card" style={{ background: 'rgba(255,255,255,0.1)', border: `1px solid rgba(255,255,255,0.2)`, borderRadius: '1rem', padding: '1rem 0.5rem', textAlign: 'center' }}>
                      <p style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: '2rem', fontWeight: 700, color: T.goldLight, lineHeight: 1 }}>{s.val}</p>
                      <p style={{ fontFamily: 'sans-serif', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.55)', marginTop: '0.4rem' }}>{s.sub}</p>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                  <Link to="/contact" style={{ background: `linear-gradient(135deg,${T.gold},#a87a0f)`, color: T.white, fontFamily: 'sans-serif', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', padding: '1rem 2rem', borderRadius: '999px', textDecoration: 'none', boxShadow: '0 8px 24px rgba(201,150,26,0.4)' }}>
                    Request Export Quote
                  </Link>
                  <Link to="/shop" style={{ background: 'rgba(255,255,255,0.1)', color: T.white, fontFamily: 'sans-serif', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', padding: '1rem 2rem', borderRadius: '999px', textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.35)' }}>
                    Download Catalogue
                  </Link>
                </div>
              </div>

              {/* RIGHT — hero image */}
              <div style={{ position: 'relative' }}>
                {/* Gold glow behind image */}
                <div style={{ position: 'absolute', inset: '-1rem', borderRadius: '2rem', background: `radial-gradient(ellipse, ${T.gold}30 0%, transparent 70%)`, filter: 'blur(2rem)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', borderRadius: '2rem', overflow: 'hidden', border: `2px solid rgba(201,150,26,0.4)`, boxShadow: '0 32px 80px rgba(0,0,0,0.3)' }}>
                  <img src="/images/spices-banner-image.jpg" alt="Premium Indian export spices"
                    style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(27,67,50,0.65) 0%, transparent 55%)' }} />

                  {/* Floating badge */}
                  <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', right: '1.25rem', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', borderRadius: '1rem', padding: '0.9rem 1.1rem', border: `1px solid ${T.goldBorder}`, display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: T.greenTint, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>✅</div>
                    <div>
                      <p style={{ fontFamily: 'sans-serif', fontSize: '0.65rem', fontWeight: 800, color: T.greenDark, textTransform: 'uppercase', letterSpacing: '0.18em' }}>Certified Export Partner</p>
                      <p style={{ fontFamily: 'sans-serif', fontSize: '0.65rem', color: T.muted, marginTop: '0.15rem' }}>FSSAI · ISO 22000 · APEDA · EU Compliant</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gold bottom border */}
        <div style={{ height: '3px', background: `linear-gradient(to right, ${T.gold}, ${T.goldLight}, ${T.gold})` }} />
      </section>

      {/* ══════════════════════════════════
          MARQUEE
      ══════════════════════════════════ */}
      <div style={{ overflow: 'hidden', padding: '1rem 0', background: T.goldTint, borderBottom: `1px solid ${T.goldBorder}` }}>
        <div className="spice-marquee">
          {[...spices, ...spices].map((s, i) => (
            <span key={i} style={{ fontFamily: 'sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.gold, flexShrink: 0 }}>
              ✦ {s.name}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════
          SPLIT SECTION — image + copy
      ══════════════════════════════════ */}
      <section style={{ background: T.white }}>
        <div className="container-page" style={{ padding: '5rem 0' }}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image collage */}
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80" alt="Cloves"
                  style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '1.25rem', gridRow: 'span 2' }} />
                <img src="https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=500&q=80" alt="Turmeric"
                  style={{ width: '100%', height: '112px', objectFit: 'cover', borderRadius: '1.25rem' }} />
                <img src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&q=80" alt="Pepper"
                  style={{ width: '100%', height: '112px', objectFit: 'cover', borderRadius: '1.25rem' }} />
              </div>
              {/* Gold badge floating */}
              <div style={{ position: 'absolute', top: '-1rem', left: '-1rem', background: `linear-gradient(135deg,${T.gold},#a87a0f)`, color: T.white, borderRadius: '50%', width: '5.5rem', height: '5.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(201,150,26,0.5)' }}>
                <p style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: '1.6rem', fontWeight: 700, lineHeight: 1 }}>40+</p>
                <p style={{ fontFamily: 'sans-serif', fontSize: '0.5rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '0.2rem', opacity: 0.9 }}>Nations</p>
              </div>
            </div>

            {/* Copy */}
            <div>
              <p style={{ fontFamily: 'sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.gold, marginBottom: '1rem' }}>
                Our Heritage
              </p>
              <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(2.2rem,4vw,3.2rem)', fontWeight: 700, color: T.greenDark, lineHeight: 1.1, marginBottom: '1.25rem' }}>
                From India's Spice Belt<br />
                <em style={{ fontStyle: 'normal', color: T.green }}>to the World's Tables</em>
              </h2>
              <p style={{ fontFamily: "'Lora',Georgia,serif", fontSize: '0.95rem', color: T.muted, lineHeight: 1.8, marginBottom: '1.5rem' }}>
                For generations, India has supplied the world with its most prized culinary treasures. Velmora carries this legacy forward — partnering directly with farmers across Kerala, Rajasthan, Tamil Nadu, and Erode to bring you spices of unrivalled purity and character.
              </p>
              <p style={{ fontFamily: "'Lora',Georgia,serif", fontSize: '0.95rem', color: T.muted, lineHeight: 1.8, marginBottom: '2rem' }}>
                Every batch is third-party tested, traceably sourced, and delivered with the documentation your market demands — COA, phytosanitary certificates, and customs-ready HS codes.
              </p>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: T.greenDark, color: T.white, fontFamily: 'sans-serif', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', padding: '1rem 2rem', borderRadius: '999px', textDecoration: 'none' }}>
                Enquire Now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          WHY VELMORA
      ══════════════════════════════════ */}
      <section style={{ background: T.greenTint, borderTop: `1px solid rgba(45,106,79,0.12)`, borderBottom: `1px solid rgba(45,106,79,0.12)` }}>
        <div className="container-page" style={{ padding: '5rem 0' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ fontFamily: 'sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.gold, marginBottom: '0.75rem' }}>
              Why Global Importers Choose Velmora
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: T.greenDark }}>
              Built for International Trade
            </h2>
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

      {/* ══════════════════════════════════
          SPICE CATALOGUE
      ══════════════════════════════════ */}
      <section style={{ background: T.offWhite }}>
        <div className="container-page" style={{ padding: '5rem 0' }}>
          <GoldDivider />
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontFamily: 'sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.gold, marginBottom: '0.75rem' }}>
              Our Export Portfolio
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: T.greenDark }}>
              Nine Signature Spices
            </h2>
            <p style={{ fontFamily: "'Lora',Georgia,serif", fontSize: '0.9rem', color: T.muted, maxWidth: '30rem', margin: '0.75rem auto 0' }}>
              Available in whole, ground, and custom-blended formats. MOQ from 100 kg per SKU. Private label welcome.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {spices.map((spice, i) => <SpiceCard key={spice.name} spice={spice} index={i} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          FULL-WIDTH IMAGE BAND
      ══════════════════════════════════ */}
      <section style={{ position: 'relative', height: '360px', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80" alt="Spice farm landscape"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 60%', display: 'block' }}
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1400&q=80' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(27,67,50,0.88) 0%, rgba(27,67,50,0.5) 50%, transparent 100%)' }} />
        <div className="container-page" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
          <div style={{ maxWidth: '28rem' }}>
            <p style={{ fontFamily: 'sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.goldLight, marginBottom: '0.75rem' }}>
              Sustainability Promise
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: '2.4rem', fontWeight: 700, color: T.white, lineHeight: 1.15, marginBottom: '1rem' }}>
              Grown with Integrity,<br />Exported with Pride
            </h2>
            <p style={{ fontFamily: "'Lora',Georgia,serif", fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
              We work directly with farming communities, ensuring fair wages, sustainable practices, and zero intermediaries — so quality and ethics are never compromised.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          CERTIFICATIONS
      ══════════════════════════════════ */}
      <section style={{ background: T.white, borderTop: `3px solid ${T.gold}` }}>
        <div className="container-page" style={{ padding: '4rem 0' }}>
          <p style={{ fontFamily: 'sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.gold, textAlign: 'center', marginBottom: '2rem' }}>
            Certifications & Compliance
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', justifyContent: 'center' }}>
            {certifications.map(cert => (
              <div key={cert.label} className="cert-pill" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: T.greenTint, border: `1.5px solid rgba(45,106,79,0.2)`, borderRadius: '1rem', padding: '0.85rem 1.4rem', cursor: 'default' }}>
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

      {/* ══════════════════════════════════
          FINAL CTA
      ══════════════════════════════════ */}
      <section style={{ background: `linear-gradient(135deg,${T.greenDark} 0%,${T.green} 100%)`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ height: '4px', background: `linear-gradient(to right,${T.gold},${T.goldLight},${T.gold})` }} />
        <LeafWatermark className="absolute top-0 right-0 w-96 h-96 text-white/[0.06] rotate-45" />
        <LeafWatermark className="absolute bottom-0 left-0 w-72 h-72 text-white/[0.04] -rotate-45" />

        <div className="container-page" style={{ padding: '5rem 0', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          {/* Corner stars */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            {['✦', '✦', '✦'].map((s, i) => <span key={i} style={{ color: T.goldLight, fontSize: '0.85rem', opacity: 0.7 }}>{s}</span>)}
          </div>

          <p style={{ fontFamily: 'sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', color: T.goldLight, marginBottom: '1.25rem' }}>
            Ready to Source?
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: 700, color: T.white, lineHeight: 1.1, marginBottom: '1.25rem' }}>
            Partner with India's Premier<br />Spice Export House
          </h2>
          <p style={{ fontFamily: "'Lora',Georgia,serif", fontSize: '1rem', color: 'rgba(255,255,255,0.65)', maxWidth: '34rem', margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
            Whether you are a first-time importer or scaling an established supply chain,
            our team provides end-to-end support — from sample dispatch to containerised export.
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