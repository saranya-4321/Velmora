import { useState } from 'react'

const fssaiLogo = '/images/fssai.jpg'
const veganLogo = '/images/vegan.png'
const crueltyFreeLogo = '/images/cruelty-free.png'
const GCMSIcon = '/images/GC-MSlogo.png'

const certificates = [
  { name: 'FSSAI Certified', caption: 'Food Safety & Standards Authority of India', type: 'image', src: fssaiLogo },
  { name: 'GC/MS Tested', caption: 'Lab Verified Purity & Potency', type: 'image', src: GCMSIcon },
  { name: 'Cruelty Free', caption: 'Leaping Bunny Certified', type: 'image', src: crueltyFreeLogo },
  { name: '100% Vegan', caption: 'Vegan Society Certified', type: 'image', src: veganLogo },
]

const allCerts = [...certificates, ...certificates, ...certificates]

function CertCard({ item }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: '200px',
        height: '230px',
        margin: '0 14px',
        background: hovered
          ? 'rgba(212,175,55,0.12)'
          : 'rgba(255,255,255,0.07)',
        border: `1px solid ${hovered ? '#D4AF37' : 'rgba(212,175,55,0.3)'}`,
        borderRadius: '20px',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered ? '0 16px 48px rgba(212,175,55,0.18)' : '0 2px 12px rgba(0,0,0,0.2)',
        transition: 'all 0.35s ease',
        cursor: 'default',
      }}
    >
      {/* Round icon circle - white bg for images */}
      <div style={{
        width: '88px',
        height: '88px',
        borderRadius: '50%',
        background: item.type === 'image' ? '#ffffff' : 'rgba(212,175,55,0.1)',
        border: `2px solid ${hovered ? '#D4AF37' : 'rgba(212,175,55,0.35)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px',
        overflow: 'hidden',
        flexShrink: 0,
        transition: 'border-color 0.35s ease',
      }}>
        {item.type === 'image' ? (
          <img
            src={item.src}
            alt={item.name}
            style={{
              width: '72px',
              height: '72px',
              objectFit: 'contain',
              borderRadius: '50%',
              padding: '6px',
            }}
          />
        ) : (
          <GCMSIcon />
        )}
      </div>

      {/* Gold divider */}
      <div style={{
        width: hovered ? '44px' : '28px',
        height: '1px',
        background: '#D4AF37',
        marginBottom: '10px',
        transition: 'width 0.35s ease',
        opacity: 0.8,
      }} />

      <h3 style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: '14px',
        fontWeight: 600,
        color: hovered ? '#D4AF37' : '#f5f0e8',
        marginBottom: '6px',
        transition: 'color 0.35s ease',
        lineHeight: 1.3,
      }}>
        {item.name}
      </h3>
      <p style={{
        fontSize: '11px',
        color: 'rgba(245,240,232,0.55)',
        lineHeight: 1.5,
        margin: 0,
      }}>
        {item.caption}
      </p>
    </div>
  )
}

export default function CertificationCarousel() {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #1a2e1a 0%, #0f1f0f 60%, #1a2e1a 100%)',
      padding: '64px 0',
      marginTop: '40px',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Dot pattern */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)',
        backgroundSize: '36px 36px',
        pointerEvents: 'none',
      }} />

      {/* Top gold border */}
      <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, #D4AF37, transparent)', marginBottom: '48px' }} />

      {/* Header */}
      <div style={{ textAlign: 'center', padding: '0 16px', marginBottom: '48px' }}>
        <p style={{
          color: '#D4AF37',
          letterSpacing: '0.25em',
          fontSize: '10px',
          fontWeight: 700,
          textTransform: 'uppercase',
          marginBottom: '14px',
        }}>
          ✦ &nbsp; Trusted Quality &nbsp; ✦
        </p>

        <p style={{ color: 'rgba(245,240,232,0.5)', fontSize: '14px', margin: 0 }}>
          Every drop verified — certified, tested, and trusted.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
          <div style={{ height: '1px', width: '50px', background: 'linear-gradient(to right, transparent, #D4AF37)' }} />
          <div style={{ width: '5px', height: '5px', background: '#D4AF37', transform: 'rotate(45deg)' }} />
          <div style={{ height: '1px', width: '50px', background: 'linear-gradient(to left, transparent, #D4AF37)' }} />
        </div>
      </div>

      {/* Marquee */}
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, height: '100%', width: '80px', zIndex: 10,
          background: 'linear-gradient(to right, #0f1f0f, transparent)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, height: '100%', width: '80px', zIndex: 10,
          background: 'linear-gradient(to left, #0f1f0f, transparent)',
          pointerEvents: 'none',
        }} />

        <div style={{ display: 'flex', animation: 'certmarquee 24s linear infinite' }}>
          {allCerts.map((item, i) => (
            <CertCard key={i} item={item} />
          ))}
        </div>
      </div>

      {/* Bottom gold border */}
      <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, #D4AF37, transparent)', marginTop: '48px' }} />

      <style>{`
        @keyframes certmarquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${(200 + 28) * certificates.length}px); }
        }
      `}</style>
    </section>
  )
}