import { useNavigate } from 'react-router-dom'
import { GiftIcon, SparklesIcon, ArrowLongRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

const FOREST = '#3f7719'
const GOLD = '#B8960C'
const CREAM = '#faf7f2'
const CHARCOAL = '#1a1a1a'


const giftBoxes = [
  {
    id: 1,
    name: 'Gift Box 1',
    subtitle: 'Eucalyptus + Rosemary',
    description: 'A curated duo of our finest therapeutic oils — crafted for clarity, calm, and everyday wellness rituals.',
    tags: ['Eucalyptus', 'Rosemary'],
    Icon: GiftIcon,
    popular: false,
  },
  {
    id: 2,
    name: 'Gift Box 2',
    subtitle: 'Select 2 or 3 Products',
    description: 'Design your own wellness experience. Mix and match any 2 or 3 oils from our premium collection.',
    tags: ['Customisable', 'Mix & Match'],
    Icon: SparklesIcon,
    popular: true,
  },
]

const perks = ['Premium gift packaging', 'Personalised message card', 'Free gift wrap']

export default function ProductHighlights() {
  const navigate = useNavigate()

  const handleSelect = (box) => {
    navigate('/explore-oils', {
      state: {
        selectedGiftBox: box.name,
        message: `You have chosen ${box.name} — ${box.subtitle}! Browse and add your oils below.`,
      },
    })
  }

  return (
    <section style={{ padding: '40px 0', position: 'relative' }}>
      <div className="container-page">

        {/* ── Section Header ── */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            border: `1px solid ${GOLD}55`, background: `${GOLD}18`,
            borderRadius: '999px', padding: '6px 18px',
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: `${CHARCOAL}99`,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: GOLD, display: 'inline-block' }} />
            Exclusive Gifting Collection
          </span>

          <h2 className="font-heading" style={{
            marginTop: '20px', fontSize: 'clamp(36px, 5vw, 56px)',
            lineHeight: 1.05, color: CHARCOAL, letterSpacing: '-0.02em',
          }}>
            Make Your Own<br />
            <span style={{ color: FOREST, fontStyle: 'italic' }}>Gift Box</span>
          </h2>

          <p style={{
            marginTop: '16px', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto',
            fontSize: '15px', lineHeight: 1.7, color: `${CHARCOAL}80`,
          }}>
            Handpick Velmora's finest essential oils and craft a personalised wellness gift — for yourself or someone you love.
          </p>
        </div>

        {/* ── Cards ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          maxWidth: '760px',
          margin: '0 auto',
        }}>
          {giftBoxes.map((box) => {
            const { Icon } = box
            const bg = box.popular ? FOREST : '#FFFFFF'
            const textPrimary = box.popular ? '#FFFFFF' : CHARCOAL
            const textMuted = box.popular ? 'rgba(255,255,255,0.55)' : `${CHARCOAL}66`
            const iconBg = box.popular ? 'rgba(255,255,255,0.12)' : `${FOREST}12`
            const iconColor = box.popular ? '#FFFFFF' : FOREST
            const tagBg = box.popular ? 'rgba(255,255,255,0.12)' : `${FOREST}10`
            const tagColor = box.popular ? '#FFFFFF' : FOREST
            const tagBorder = box.popular ? 'rgba(255,255,255,0.2)' : `${FOREST}25`
            const dividerColor = box.popular ? 'rgba(255,255,255,0.12)' : `${CHARCOAL}10`
            const ctaColor = box.popular ? GOLD : FOREST
            const boxShadow = box.popular
              ? `0 20px 60px -10px ${FOREST}55, 0 4px 16px -4px ${FOREST}30`
              : `0 4px 24px -4px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)`

            return (
              <button
                key={box.id}
                type="button"
                onClick={() => handleSelect(box)}
                style={{
                  position: 'relative',
                  textAlign: 'left',
                  background: bg,
                  borderRadius: '24px',
                  border: box.popular ? 'none' : `1px solid ${CHARCOAL}10`,
                  boxShadow,
                  padding: '36px',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)'
                  e.currentTarget.style.boxShadow = box.popular
                    ? `0 32px 72px -10px ${FOREST}60, 0 8px 24px -4px ${FOREST}35`
                    : `0 20px 48px -8px rgba(0,0,0,0.14), 0 4px 12px rgba(0,0,0,0.06)`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = boxShadow
                }}
              >
                {/* Decorative circle top-right */}
                <div style={{
                  position: 'absolute', top: -40, right: -40,
                  width: 140, height: 140, borderRadius: '50%',
                  background: box.popular ? 'rgba(255,255,255,0.06)' : `${GOLD}15`,
                  pointerEvents: 'none',
                }} />
                <div style={{
                  position: 'absolute', bottom: -20, left: -20,
                  width: 80, height: 80, borderRadius: '50%',
                  background: box.popular ? 'rgba(255,255,255,0.04)' : `${FOREST}08`,
                  pointerEvents: 'none',
                }} />

                {/* Popular badge */}
                {box.popular && (
                  <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center',
                      background: GOLD, color: CHARCOAL,
                      borderRadius: '999px', padding: '4px 12px',
                      fontSize: '10px', fontWeight: 800,
                      letterSpacing: '0.14em', textTransform: 'uppercase',
                    }}>
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div style={{
                  width: '56px', height: '56px', borderRadius: '16px',
                  background: iconBg,
                  border: `1px solid ${box.popular ? 'rgba(183, 167, 23, 0.82)' : `${FOREST}20`}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon style={{ width: 26, height: 26, color: iconColor }} strokeWidth={1.5} />
                </div>

                {/* Text */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <p style={{
                    margin: 0, fontSize: '11px', fontWeight: 700,
                    letterSpacing: '0.16em', textTransform: 'uppercase', color: textMuted,
                  }}>
                    {box.subtitle}
                  </p>
                  <h3 className="font-heading" style={{
                    margin: 0, fontSize: '30px', lineHeight: 1.1, color: textPrimary,
                  }}>
                    {box.name}
                  </h3>
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.7, color: textMuted, marginTop: '4px' }}>
                    {box.description}
                  </p>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {box.tags.map((tag) => (
                    <span key={tag} style={{
                      background: tagBg, color: tagColor,
                      border: `1px solid ${tagBorder}`,
                      borderRadius: '999px', padding: '5px 14px',
                      fontSize: '12px', fontWeight: 600,
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div style={{
                  borderTop: `1px solid ${dividerColor}`,
                  paddingTop: '20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    fontSize: '14px', fontWeight: 700, color: ctaColor,
                  }}>
                    Choose this box
                    <ArrowLongRightIcon style={{ width: 18, height: 18 }} />
                  </span>
                  <span style={{ fontSize: '11px', color: textMuted, fontStyle: 'italic' }}>
                    Free gift wrap
                  </span>
                </div>

              </button>
            )
          })}
        </div>

        {/* ── Perks ── */}
        <div style={{
          marginTop: '48px',
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'center',
          gap: '32px',
        }}>
          {perks.map((perk) => (
            <div key={perk} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircleIcon style={{ width: 16, height: 16, color: `${FOREST}80`, flexShrink: 0 }} strokeWidth={1.5} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: `${CHARCOAL}55`, letterSpacing: '0.04em' }}>
                {perk}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}