import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import FeaturedProducts from '../components/FeaturedProducts.jsx'
import Benefits from '../components/Benefits.jsx'
import Testimonials from '../components/Testimonials.jsx'
import Newsletter from '../components/Newsletter.jsx'
import CategorySection from '../components/CategorySection.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'
import ProductHighlights from '../components/ProductHighlights.jsx'
import CertificationCarousel from '../components/CertificationCarousel.jsx'

export default function Home() {
  const navigate = useNavigate()
  const [cat, setCat] = useState('All')

  useEffect(() => {
    document.title = 'Velmora Essential Oils | Pure Therapeutic Essential Oils Online India'
    const meta = document.querySelector('meta[name="description"]')
    if (meta)
      meta.setAttribute(
        'content',
        'Buy pure essential oils online in India. Shop therapeutic-grade essential oils: eucalyptus, rosemary, lavender, peppermint, tea tree. Organic, steam-distilled, aromatherapy oils with free shipping.',
      )
  }, [])

  return (
    <div>
      <Hero />
      <ScrollReveal>
        <ProductHighlights />
      </ScrollReveal>
      <ScrollReveal>
        <CertificationCarousel />
      </ScrollReveal>

      <ScrollReveal>
        <CategorySection
          value={cat}
          onChange={(c) => {
            setCat(c)
            navigate(c === 'All' ? '/shop' : `/shop?category=${encodeURIComponent(c)}`)
          }}
        />
      </ScrollReveal>

      <ScrollReveal>
        <FeaturedProducts />
      </ScrollReveal>
      <ScrollReveal>
        <Benefits />
      </ScrollReveal>
      <ScrollReveal>
        <Testimonials />
      </ScrollReveal>
      <ScrollReveal>
        <Newsletter />
      </ScrollReveal>
    </div>
  )
}

