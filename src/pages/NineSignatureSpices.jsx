import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { spices } from '../data/spices.js'

const T = {
    white: '#FFFFFF',
    offWhite: '#F8F6F0',
    greenDark: '#1B4332',
    green: '#2D6A4F',
    greenMid: '#40916C',
    greenLight: '#B7E4C7',
    greenTint: '#F0FAF4',
    gold: '#C9961A',
    goldLight: '#F0C84A',
    goldBorder: 'rgba(201,150,26,0.25)',
    charcoal: '#1A1A1A',
    muted: '#5C6B5E',
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .container-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;  /* reduce to 1rem if needed */
  }

  .spice-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
`

function GoldDivider() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
            <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, transparent, ${T.gold}60)` }} />
            <svg viewBox="0 0 32 32" style={{ width: '1.5rem', flexShrink: 0, fill: T.gold, opacity: 0.8 }}>
                <path d="M16 2l2.8 8.6H28l-7.4 5.4 2.8 8.6L16 19.2l-7.4 5.4 2.8-8.6L4 10.6h9.2z" />
            </svg>
            <div style={{ flex: 1, height: '1px', background: `linear-gradient(to left, transparent, ${T.gold}60)` }} />
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
                boxShadow: hov ? `0 20px 50px rgba(45,106,79,0.15)` : '0 2px 16px rgba(0,0,0,0.06)',
                transform: hov ? 'translateY(-6px)' : 'translateY(0)',
                transition: 'all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div style={{ position: 'relative', height: '210px', overflow: 'hidden', background: T.greenTint }}>
                <img
                    src={spice.img}
                    alt={spice.name}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transform: hov ? 'scale(1.08)' : 'scale(1)',
                        transition: 'transform 0.6s ease',
                    }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(27,67,50,0.65) 0%, transparent 55%)' }} />
                <span style={{
                    position: 'absolute',
                    top: '0.75rem',
                    right: '0.75rem',
                    background: T.gold,
                    color: T.white,
                    fontSize: '0.55rem',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    padding: '0.25rem 0.7rem',
                    borderRadius: '999px',
                    fontFamily: 'sans-serif',
                }}>
                    {spice.grade}
                </span>
                <p style={{
                    position: 'absolute',
                    bottom: '0.75rem',
                    left: '1rem',
                    margin: 0,
                    fontFamily: "'Cormorant Garamond',Georgia,serif",
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: T.white,
                    lineHeight: 1,
                }}>
                    {spice.name}
                </p>
            </div>
            <div style={{ padding: '1.1rem 1.4rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <p style={{ fontFamily: 'sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: T.greenMid, marginBottom: '0.5rem' }}>
                    📍 {spice.origin}
                </p>
                <p style={{ fontFamily: "'Lora',Georgia,serif", fontSize: '0.82rem', color: T.muted, lineHeight: 1.75, flex: 1 }}>
                    {spice.desc}
                </p>
            </div>
        </div>
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

export default function NineSignatureSpices() {
    useEffect(() => {
        document.title = 'Nine Signature Spices | Velmora Spices'
        const meta = document.querySelector('meta[name="description"]')
        if (meta) meta.setAttribute('content', 'Explore our nine signature Indian spices with premium export quality and consistent supply. Full documentation available for bulk buyers.')
    }, [])

    return (
        <div style={{ background: T.offWhite, minHeight: '100vh', color: T.charcoal }}>
            <style>{css}</style>
            <SpicesNavbar />

            <section style={{ background: T.offWhite, padding: '6rem 0' }}>
                <div className="container-page">
                    <GoldDivider />
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <p style={{ fontFamily: 'sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: T.gold, marginBottom: '0.75rem' }}>
                            Our Export Portfolio
                        </p>
                        <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: T.greenDark, marginBottom: '0.75rem' }}>
                            Nine Signature Spices
                        </h2>
                        <p style={{ fontFamily: "'Lora',Georgia,serif", fontSize: '0.9rem', color: T.muted, maxWidth: '30rem', margin: '0 auto' }}>
                            Available in whole, ground, and custom-blended formats. MOQ from 100 kg per SKU. Private label welcome.
                        </p>
                    </div>
                    <div className="spice-grid">
                        {spices.map(spice => <SpiceCard key={spice.name} spice={spice} />)}
                    </div>
                </div>
            </section>
        </div>
    )
}
