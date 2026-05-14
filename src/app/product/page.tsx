'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import styles from './product.module.css'
import { products } from '@/lib/products'
import { useCartContext } from '@/context/CartContext'

const reviews = [
  { stars: 5, title: '"Genuinely transformed my skin."', body: 'I\'ve tried everything. This is the only product that made a visible difference in two weeks. My skin tone is even for the first time in years.', author: 'Amara K. · London', verified: true },
  { stars: 5, title: '"Worth every penny."', body: 'The texture, the glow, the way my skin looks after application. Nothing compares at any price point.', author: 'Naomi T. · Lagos', verified: true },
  { stars: 5, title: '"Finally formulated for me."', body: 'As a woman with deep skin I\'ve spent years using serums that made me look ashy. Not this one. Repurchased three times.', author: 'Chloe M. · Paris', verified: true },
]

function ProductContent() {
  const searchParams = useSearchParams()
  const id = parseInt(searchParams.get('id') || '1')
  const product = products.find(p => p.id === id) || products[0]
  const { addItem } = useCartContext()

  const images = [product.img, product.hover, '/images/hero-model.jpg', '/images/ingredients-flatlay.jpg']
  const sizes = [
    { label: product.size, price: product.price },
    { label: product.size === 'Full Set' || product.size === 'Gift Set' ? 'Gift Wrap' : '50ml', price: Math.round(product.price * 1.35) },
  ]

  const [activeImg, setActiveImg]   = useState(0)
  const [fadeOut, setFadeOut]       = useState(false)
  const [activeSize, setActiveSize] = useState(0)
  const [qty, setQty]               = useState(1)
  const [wished, setWished]         = useState(false)
  const [added, setAdded]           = useState(false)
  const [openAcc, setOpenAcc]       = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  const currentPrice = sizes[activeSize].price * qty

  const switchImg = (idx: number) => {
    setFadeOut(true)
    setTimeout(() => { setActiveImg(idx); setFadeOut(false) }, 250)
  }

  const handleAdd = () => {
    addItem({ ...product, price: sizes[activeSize].price })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  useEffect(() => {
    setActiveImg(0)
    setActiveSize(0)
    setQty(1)
    setAdded(false)
  }, [id])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add(styles.visible); observer.unobserve(e.target) }
      }),
      { threshold: 0.1 }
    )
    const els = sectionRef.current?.querySelectorAll(`.${styles.reveal}`)
    els?.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const accItems = [
    {
      label: 'How to Use',
      content: <ol><li>Apply 2–3 drops to clean fingertips.</li><li>Press gently into face and neck.</li><li>Allow 60 seconds to absorb fully.</li><li>Follow with Lumière Radiance Cream.</li><li>Use morning and evening.</li></ol>
    },
    {
      label: 'Full Ingredients',
      content: <p>Rosa Canina Seed Oil, Niacinamide, Bakuchiol, Macadamia Seed Oil, Squalane, Panthenol, Hyaluronic Acid, Vitamin C (Ascorbyl Glucoside), Centella Asiatica Extract, Sea Kelp Extract, Green Tea Extract, Aloe Barbadensis Leaf Juice, Tocopherol.</p>
    },
    {
      label: 'Our Commitments',
      content: <ul><li>Cruelty-free — never tested on animals</li><li>Vegan — zero animal-derived ingredients</li><li>Fragrance-free — safe for sensitive skin</li><li>Clean certified — free from 1,300+ harmful ingredients</li><li>Recyclable glass packaging</li></ul>
    },
  ]

  const upsells = products.filter(p => p.id !== product.id).slice(0, 3)

  return (
    <>
      <div className={styles.breadcrumb}>
        <Link href="/" className={styles.bcLink}>Home</Link>
        <span className={styles.bcSep}>›</span>
        <Link href="/shop" className={styles.bcLink}>Shop</Link>
        <span className={styles.bcSep}>›</span>
        <span className={styles.bcCurrent}>{product.name}</span>
      </div>

      <div className={styles.pdp} ref={sectionRef}>
        <div className={styles.gallery}>
          <div className={styles.mainImgWrap}>
            <img
              src={images[activeImg]}
              alt={product.name}
              className={`${styles.mainImg} ${fadeOut ? styles.fadeOut : ''}`}
            />
            <div className={styles.zoomHint}>Click thumbnails to switch</div>
          </div>
          <div className={styles.thumbs}>
            {images.map((img, i) => (
              <img key={i} src={img} alt={`View ${i + 1}`}
                className={`${styles.thumb} ${i === activeImg ? styles.thumbActive : ''}`}
                onClick={() => switchImg(i)} draggable={false}
              />
            ))}
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.badges}>
            {product.badge && <span className={styles.badgeNew}>{product.badge}</span>}
          </div>
          <span className={styles.cat}>{product.category} · {product.concern}</span>
          <h1 className={styles.name}>Lumière<br />{product.name}</h1>
          <div className={styles.rating}>
            <div className={styles.stars}>{['★','★','★','★','★'].map((s,i) => <span key={i}>{s}</span>)}</div>
            <span className={styles.ratingNum}>{product.rating}</span>
            <span className={styles.ratingCount}>({product.reviews} reviews)</span>
            <a href="#reviews" className={styles.ratingLink}>Read reviews</a>
          </div>
          <div className={styles.rule} />
          <p className={styles.tagline}>{product.desc}</p>
          <p className={styles.desc}>
            Formulated for every complexion. Fourteen botanical actives work in concert to repair,
            brighten and restore the luminosity that is already yours.
          </p>
          <div className={styles.benefits}>
            {['Brightening','Anti-Aging','All Skin Types','Fragrance-Free','Vegan'].map(b => (
              <span key={b} className={styles.benefit}>{b}</span>
            ))}
          </div>
          <span className={styles.sizeLabel}>Select Size</span>
          <div className={styles.sizes}>
            {sizes.map((s, i) => (
              <button key={i} className={`${styles.sizeBtn} ${i === activeSize ? styles.sizeBtnActive : ''}`} onClick={() => setActiveSize(i)}>
                {s.label}
                <span className={styles.sizePrice}>${s.price}</span>
              </button>
            ))}
          </div>
          <div className={styles.priceWrap}>
            <span className={styles.price}>${sizes[activeSize].price}</span>
            <span className={styles.priceSub}>Free shipping over $120</span>
          </div>
          <div className={styles.buyRow}>
            <div className={styles.qtyWrap}>
              <button className={styles.qtyBtn} onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span className={styles.qtyNum}>{qty}</span>
              <button className={styles.qtyBtn} onClick={() => setQty(q => q + 1)}>+</button>
            </div>
            <button className={`${styles.addBtn} ${added ? styles.addBtnAdded : ''}`} onClick={handleAdd}>
              <span>{added ? '✦ Added to Ritual' : `Add to Ritual — $${currentPrice}`}</span>
            </button>
            <button className={`${styles.wishBtn} ${wished ? styles.wishBtnActive : ''}`} onClick={() => setWished(!wished)} aria-label="Wishlist">
              <svg width="16" height="16" viewBox="0 0 24 24" fill={wished ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.4">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>
          <div className={styles.guarantees}>
            {[{ icon:'🛡', label:'30-Day Returns' },{ icon:'🚚', label:'Free Shipping $120+' },{ icon:'⭐', label:'Cruelty-Free' }].map(g => (
              <div key={g.label} className={styles.guarantee}>
                <span className={styles.guaranteeIcon}>{g.icon}</span>
                <span className={styles.guaranteeLabel}>{g.label}</span>
              </div>
            ))}
          </div>
          <div className={styles.accordion}>
            {accItems.map((item, i) => (
              <div key={i} className={`${styles.accItem} ${openAcc === i ? styles.accOpen : ''}`}>
                <button className={styles.accTrigger} onClick={() => setOpenAcc(openAcc === i ? -1 : i)}>
                  <span className={styles.accLabel}>{item.label}</span>
                  <div className={styles.accIcon} />
                </button>
                {openAcc === i && <div className={styles.accBody}>{item.content}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.stats}>
        {[['97%','Saw visible radiance'],['14','Botanical actives'],['60s','Full absorption'],['5.0','Average rating']].map(([n,l]) => (
          <div key={l} className={`${styles.statItem} ${styles.reveal}`}>
            <span className={styles.statNum}>{n}</span>
            <span className={styles.statLabel}>{l}</span>
          </div>
        ))}
      </div>

      <div className={styles.reviewsSection} id="reviews">
        <div className={styles.reviewsHeader}>
          <div>
            <h2 className={styles.reviewsTitle}>What they&apos;re saying</h2>
            <div className={styles.reviewsSummary}>
              <span className={styles.reviewsScore}>{product.rating}</span>
              <div className={styles.reviewsStars}>{['★','★','★','★','★'].map((s,i) => <span key={i}>{s}</span>)}</div>
              <span className={styles.reviewsTotal}>{product.reviews} verified reviews</span>
            </div>
          </div>
          <button className={styles.writeReview}>Write a Review</button>
        </div>
        <div className={styles.reviewsGrid}>
          {reviews.map((r, i) => (
            <div key={i} className={`${styles.reviewCard} ${styles.reveal}`} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className={styles.rvStars}>{Array(r.stars).fill('★').map((s,j) => <span key={j}>{s}</span>)}</div>
              <div className={styles.rvTitle}>{r.title}</div>
              <p className={styles.rvBody}>{r.body}</p>
              <div className={styles.rvFooter}>
                <span className={styles.rvAuthor}>{r.author}</span>
                {r.verified && <span className={styles.rvVerified}>✓ Verified</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.upsell}>
        <div className={styles.upsellHeader}>
          <span className={styles.upsellEyebrow}>Complete the Ritual</span>
          <h2 className={styles.upsellTitle}>Pair it with <span className={styles.upsellAccent}>what works.</span></h2>
        </div>
        <div className={styles.upsellGrid}>
          {upsells.map((u, i) => (
            <Link href={`/product?id=${u.id}`} key={i} className={`${styles.upsellCard} ${styles.reveal}`}
              style={{ transitionDelay: `${i * 0.12}s`, textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
              <div className={styles.upsellImg}><img src={u.img} alt={u.name} /></div>
              <div className={styles.upsellInfo}>
                <div className={styles.upsellName}>{u.name}</div>
                <div className={styles.upsellPrice}>${u.price}</div>
                <button className={styles.upsellAdd} onClick={e => { e.preventDefault(); addItem(u) }}>
                  <span>Add to Ritual</span>
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default function ProductPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#FAFAF7' }} />}>
      <ProductContent />
    </Suspense>
  )
}