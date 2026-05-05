import { Link } from 'react-router-dom'

const T = {
  white: '#FFFFFF',
  greenDark: '#1B4332',
  green: '#2D6A4F',
  gold: '#C9961A',
  muted: '#5c5c5c'
}

const IMG = {
  collage1: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&q=80',
  collage2: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=80',
  collage3: 'https://images.unsplash.com/photo-1573556784604-6ff3f856ef5b?w=800&q=80',
}

export default function SpicesHeritageSection() {
  return (
    <section style={{ background: T.white, padding: '6rem 0' }}>
      <div style={{ width: '90%', maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px,1fr))',
          gap: '4rem',
          alignItems: 'center'
        }}>

          {/* Images */}
          <div style={{ position: 'relative' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem'
            }}>
              <img
                src={IMG.collage1}
                alt="Cloves"
                style={{
                  width: '100%',
                  height: '320px',
                  objectFit: 'cover',
                  borderRadius: '20px',
                  gridRow: 'span 2',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
                }}
              />
              <img
                src={IMG.collage2}
                alt="Turmeric"
                style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '20px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
                }}
              />
              <img
                src={IMG.collage3}
                alt="Black Pepper"
                style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '20px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
                }}
              />
            </div>

            {/* Gold Badge */}
            <div style={{
              position: 'absolute',
              top: '-25px',
              left: '-25px',
              width: '110px',
              height: '110px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${T.gold}, #a87a0f)`,
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(201,150,26,0.4)',
              fontFamily: 'serif'
            }}>
              <div style={{ fontSize: '28px', fontWeight: 'bold' }}>40+</div>
              <div style={{ fontSize: '10px', letterSpacing: '2px' }}>NATIONS</div>
            </div>
          </div>

          {/* Text Content */}
          <div>
            <p style={{
              letterSpacing: '4px',
              textTransform: 'uppercase',
              fontWeight: 700,
              color: T.gold,
              fontSize: '12px',
              marginBottom: '1rem'
            }}>
              Our Heritage
            </p>

            <h2 style={{
              fontSize: '42px',
              lineHeight: 1.2,
              color: T.greenDark,
              marginBottom: '1.5rem',
              fontFamily: 'Georgia, serif'
            }}>
              From India’s Spice Belt<br />
              <span style={{ color: T.green }}>to the World’s Tables</span>
            </h2>

            <p style={{
              color: T.muted,
              lineHeight: 1.9,
              marginBottom: '1.5rem',
              fontSize: '16px'
            }}>
              For generations, India has supplied the world with its most prized culinary treasures.
              Velmora carries this legacy forward — partnering directly with farmers across Kerala,
              Rajasthan, Tamil Nadu, and Erode to bring you spices of unrivalled purity and character.
            </p>

            <p style={{
              color: T.muted,
              lineHeight: 1.9,
              marginBottom: '2rem',
              fontSize: '16px'
            }}>
              Every batch is third-party tested, traceably sourced, and delivered with the documentation
              your market demands — COA, phytosanitary certificates, and customs-ready HS codes.
            </p>

            <Link to="/contact" style={{
              display: 'inline-block',
              padding: '16px 36px',
              background: T.greenDark,
              color: '#fff',
              borderRadius: '40px',
              textDecoration: 'none',
              fontWeight: 'bold',
              letterSpacing: '2px',
              fontSize: '13px'
            }}>
              ENQUIRE NOW →
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}