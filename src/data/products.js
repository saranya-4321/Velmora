export const products = [
  {
    id: 1,
    name: 'Velmora Rosemary Essential Oil',
    tagline: '100% Pure • Steam Distilled • Herbal / Fresh',
    price: 549,
    originalPrice: null,
    currency: '₹',
    rating: 4.8,
    reviews: 124,
    sizes: ['15ml'],
    category: 'Essential Oils',
    image: '/images/rosemary.svg',
    badge: 'Best Seller',
    benefits: [
      'Supports hair growth & scalp health when diluted with a carrier oil',
      'Ideal for aromatherapy & diffusers with a refreshing herbal fragrance',
      'Multipurpose use: hair care, scalp massage, skincare blends & DIY',
      '100% pure & steam distilled — no additives, fillers, or synthetic fragrance',
      'Premium amber glass dropper bottle for controlled application',
    ],
    description:
      'Velmora Rosemary Essential Oil is 100% pure and steam distilled from high-quality rosemary leaves. Designed for everyday wellness, it’s ideal for aromatherapy, diffusers, and beauty rituals. Dilute with a carrier oil for scalp massage and haircare routines.',
    inStock: true,
    featured: true,
  },
  {
    id: 2,
    name: 'Velmora Lavender Essential Oil',
    tagline: 'Purity You Can Trust. Wellness You Can Feel.',
    price: 549,
    originalPrice: null,
    currency: '₹',
    rating: 4.7,
    reviews: 86,
    sizes: ['15ml'],
    category: 'Essential Oils',
    image: '/images/lavender.svg',
    badge: 'Calming',
    benefits: [
      '100% pure & steam distilled from premium lavender flowers',
      'Supports relaxation, emotional balance & restful sleep',
      'Ideal for aromatherapy & diffusers to create a peaceful environment',
      'Blend with carrier oils for relaxing massage & self-care rituals',
      'Suitable for skincare and haircare routines when properly diluted',
    ],
    description:
      'Experience the soothing power of nature with Velmora Lavender Essential Oil — carefully steam distilled from premium lavender flowers for maximum purity, aroma, and therapeutic benefits. Free from additives, fillers, and synthetic fragrances, it’s perfect for diffusers, massage blends, skincare, and haircare.',
    inStock: true,
    featured: true,
  },
  {
    id: 3,
    name: 'Velmora Eucalyptus Essential Oil',
    tagline: '100% Pure • Steam Distilled • Fresh & Invigorating',
    price: 349,
    originalPrice: null,
    currency: '₹',
    rating: 4.6,
    reviews: 63,
    sizes: ['15ml'],
    category: 'Essential Oils',
    image: '/images/eucalyptus.svg',
    badge: 'Refreshing',
    benefits: [
      'Steam distilled from high-quality eucalyptus leaves',
      'Ideal for aromatherapy & diffusers for a refreshing atmosphere',
      'Supports relaxation, wellness, and clear breathing ambience',
      'Great for DIY blends, massage (diluted), and home fragrance',
      'Premium amber glass dropper bottle helps preserve quality',
    ],
    description:
      'Velmora Eucalyptus Essential Oil delivers pure botanical power for your wellness routine. Steam distilled for potency and clarity, it offers a fresh, purifying aroma—ideal for aromatherapy, relaxation, and home fragrance rituals.',
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
    image: '/images/gift-set.svg',
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

