const fssaiLogo = '/images/fssai.png'
const veganLogo = '/images/vegan.png'
const crueltyFreeLogo = '/images/cruelty-free.png'

const GCMSIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="64" height="64">
    <circle cx="40" cy="40" r="38" fill="#f0f7ee" stroke="#2d5a27" strokeWidth="2" />
    <path d="M32 20h16M32 20v16l-8 18h32l-8-18V20" stroke="#2d5a27" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="36" cy="46" r="2" fill="#2d5a27" opacity="0.5" />
    <circle cx="44" cy="50" r="1.5" fill="#2d5a27" opacity="0.4" />
    <circle cx="40" cy="44" r="1" fill="#2d5a27" opacity="0.6" />
    <circle cx="56" cy="24" r="9" fill="#2d5a27" />
    <path d="M51 24l3.5 3.5L61 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const certificates = [
  {
    name: 'FSSAI Certified',
    caption: 'Food Safety & Standards Authority of India',
    type: 'image',
    src: fssaiLogo,
  },
  {
    name: 'GC/MS Tested',
    caption: 'Lab Verified Purity & Potency',
    type: 'svg',
  },
  {
    name: 'Cruelty Free',
    caption: 'Leaping Bunny Certified',
    type: 'image',
    src: crueltyFreeLogo,
  },
  {
    name: '100% Vegan',
    caption: 'Vegan Society Certified',
    type: 'image',
    src: veganLogo,
  },
]

const allCerts = [...certificates, ...certificates, ...certificates]

export default function CertificationCarousel() {
  return (
    <section className="container-page mt-10">
      <div className="card p-6 sm:p-8 overflow-hidden">
        <h2 className="font-heading text-2xl sm:text-3xl text-center">Our Certifications</h2>
        <p className="mt-2 text-sm text-charcoal/70 text-center">
          Quality you can trust — certified, tested, and verified.
        </p>

        <div className="mt-8 relative">
          {/* Fade edges */}
          <div
            className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10"
            style={{ background: 'linear-gradient(to right, white, transparent)' }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10"
            style={{ background: 'linear-gradient(to left, white, transparent)' }}
          />

          {/* Marquee track */}
          <div className="flex" style={{ animation: 'marquee 20s linear infinite' }}>
            {allCerts.map((item, i) => (
              <div key={i} className="flex-shrink-0 mx-4" style={{ width: '200px' }}>
                <div className="rounded-2xl bg-white ring-1 ring-forest/10 shadow-soft p-5 flex flex-col items-center text-center">
                  <div className="h-16 flex items-center justify-center mb-3">
                    {item.type === 'image' ? (
                      <img
                        src={item.src}
                        alt={item.name}
                        className="max-h-16 max-w-full object-contain"
                      />
                    ) : (
                      <GCMSIcon />
                    )}
                  </div>
                  <h3 className="font-heading text-base font-semibold text-charcoal">{item.name}</h3>
                  <p className="mt-1 text-xs text-charcoal/60 leading-snug">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-${(200 + 32) * certificates.length}px); }
          }
        `}</style>
      </div>
    </section>
  )
}