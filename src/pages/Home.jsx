import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import FeaturedProducts from '../components/FeaturedProducts.jsx'
import Benefits from '../components/Benefits.jsx'
import Testimonials from '../components/Testimonials.jsx'
import Newsletter from '../components/Newsletter.jsx'
import CategorySection from '../components/CategorySection.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'

export default function Home() {
  const navigate = useNavigate()
  const [cat, setCat] = useState('All')

  useEffect(() => {
    document.title = 'Velmora Oils — Premium Essential Oils'
    const meta = document.querySelector('meta[name="description"]')
    if (meta)
      meta.setAttribute(
        'content',
        'Velmora Oils — premium therapeutic-grade essential oils and aromatherapy blends for wellness, beauty, and balance.',
      )
  }, [])

  return (
    <div>
      <Hero />

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

