export const products = [
  {
    id: 1,
    name: 'Velmora Rosemary Essential Oil',
    tagline: 'Pure Botanical Power, Steam Distilled',
    price: 549,
    originalPrice: null,
    currency: '₹',
    rating: 4.8,
    reviews: 124,
    sizes: ['15ml'],
    category: 'Essential Oils',
    image: '/images/rosemary.png',
    badge: 'Best Seller',
    benefits: ['Refreshing aroma', 'Supports focus', 'Invigorating'],
    description:
      'Pure botanical power — steam distilled rosemary essential oil crafted for everyday aromatherapy rituals.',
    inStock: true,
    featured: true,
  },
  {
    id: 2,
    name: 'Lavender Essential Oil',
    tagline: 'Pure Botanical Power for Aromatherapy',
    price: 549,
    originalPrice: null,
    currency: '₹',
    rating: 4.7,
    reviews: 86,
    sizes: ['15ml'],
    category: 'Essential Oils',
    image: '/images/lavender.png',
    badge: 'Calming',
    benefits: ['Calming aroma', 'Soothing', 'Relaxation ritual'],
    description:
      'A calming, soothing lavender essential oil designed for aromatherapy and gentle evening wind-down routines.',
    inStock: true,
    featured: true,
  },
  {
    id: 3,
    name: 'Velmora Eucalyptus Essential Oil',
    tagline: 'Pure Steam Distilled Aromatherapy Oil',
    price: 349,
    originalPrice: null,
    currency: '₹',
    rating: 4.6,
    reviews: 63,
    sizes: ['15ml'],
    category: 'Essential Oils',
    image: '/images/eucalyptus.png',
    badge: 'Refreshing',
    benefits: ['Refreshing aroma', 'Purifying', 'Spa-like feel'],
    description:
      'Steam distilled eucalyptus essential oil with a refreshing, purifying aroma — perfect for everyday aromatherapy.',
    inStock: true,
    featured: false,
  },
  {
    id: 4,
    name: 'Velmora Premium Essential Oils Gift Set',
    tagline: 'Eucalyptus & Rosemary Oils Duo',
    price: 749,
    originalPrice: null,
    currency: '₹',
    rating: 4.9,
    reviews: 52,
    sizes: ['2 × 15ml'],
    category: 'Gift Sets',
    image: '/images/gift-set.png',
    badge: 'Gift Set',
    benefits: ['Perfect for gifting', 'Premium presentation', 'Everyday rituals'],
    description:
      'A premium duo set featuring Eucalyptus + Rosemary essentials — a luxurious gift for wellness rituals.',
    inStock: true,
    featured: true,
  },
]

export const categories = ['All', 'Essential Oils', 'Gift Sets']

export function getProductById(id) {
  return products.find((p) => String(p.id) === String(id))
}

