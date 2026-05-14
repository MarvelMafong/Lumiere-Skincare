export interface Product {
  id: number
  name: string
  category: string
  concern: string
  price: number
  rating: string
  reviews: string
  badge: string | null
  img: string
  hover: string
  desc: string
  size: string
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Illuminating Serum',
    category: 'Serums',
    concern: 'Brightening',
    price: 138,
    rating: '5.0',
    reviews: '381',
    badge: 'Best Seller',
    img: '/images/serum-card.jpg',
    hover: '/images/model-serum.jpg',
    desc: '14 botanical actives. Visible radiance in 14 days.',
    size: '30ml',
  },
  {
    id: 2,
    name: 'Radiance Cream',
    category: 'Moisturisers',
    concern: 'Hydration',
    price: 98,
    rating: '4.9',
    reviews: '214',
    badge: null,
    img: '/images/radiance-cream-card.jpg',
    hover: '/images/cream-jar.jpg',
    desc: '24h barrier repair. Velvet-weight hydration.',
    size: '50ml',
  },
  {
    id: 3,
    name: 'Eye Renewal Elixir',
    category: 'Eye Care',
    concern: 'Anti-Aging',
    price: 112,
    rating: '4.7',
    reviews: '96',
    badge: 'New',
    img: '/images/eye-elixir-card.jpg',
    hover: '/images/toning-mist.jpg',
    desc: 'Peptide complex. Lifts and firms the eye contour.',
    size: '15ml',
  },
  {
    id: 4,
    name: 'Radiance Toning Mist',
    category: 'Toners',
    concern: 'Hydration',
    price: 68,
    rating: '4.8',
    reviews: '142',
    badge: null,
    img: '/images/toning-mist.jpg',
    hover: '/images/ingredients-flatlay.jpg',
    desc: 'Rose water and hyaluronic acid. Set, refresh, glow.',
    size: '100ml',
  },
  {
    id: 5,
    name: 'The Morning Ritual',
    category: 'Sets',
    concern: 'Brightening',
    price: 298,
    rating: '5.0',
    reviews: '87',
    badge: 'Set',
    img: '/images/product-set.jpg',
    hover: '/images/gift-unboxing.jpg',
    desc: 'Complete 4-step set. Save $48 vs buying individually.',
    size: 'Full Set',
  },
  {
    id: 6,
    name: 'The Gift Edit',
    category: 'Sets',
    concern: 'Hydration',
    price: 185,
    rating: '5.0',
    reviews: '53',
    badge: 'Gift',
    img: '/images/gift-box.jpg',
    hover: '/images/gift-unboxing.jpg',
    desc: 'Curated luxury set. Matte black box with gold ribbon.',
    size: 'Gift Set',
  },
]