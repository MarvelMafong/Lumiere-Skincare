'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import styles from './shop.module.css'
import { products } from '@/lib/products'
import { useCartContext } from '@/context/CartContext'

const categories = ['All', 'Serums', 'Moisturisers', 'Eye Care', 'Toners', 'Sets']
const concerns   = ['All', 'Brightening', 'Hydration', 'Anti-Aging', 'Uneven Tone', 'Firmness']
const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Top Rated', 'Newest']

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeConcern, setActiveConcern]   = useState('All')
  const [sortBy, setSortBy]                 = useState('Featured')
  const [filterOpen, setFilterOpen]         = useState(false)
  const { addItem, items, removeItem, updateQty, total, count } = useCartContext()
  const [cartOpen, setCartOpen]             = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const filtered = products
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .filter(p => activeConcern === 'All' || p.concern === activeConcern)
    .sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - b.price
      if (sortBy === 'Price: High to Low') return b.price - a.price
      if (sortBy === 'Top Rated') return parseFloat(b.rating) - parseFloat(a.rating)
      return 0
    })

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
  }, [filtered])

  return (
    <>
      {/* Cart overlay */}
      {cartOpen && (
        <div className={styles.cartOverlay} onClick={() => setCartOpen(false)}>
          <div className={styles.cartSidebar} onClick={e => e.stopPropagation()}>
            <div className={styles.cartHead}>
              <div>
                <span className={styles.cartTitle}>Your Ritual</span>
                <span className={styles.cartBadge}>({count} items)</span>
              </div>
              <button className={styles.cartClose} onClick={() => setCartOpen(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className={styles.cartShip}>
              <span>{total >= 120 ? '✦ You qualify for free shipping!' : `You're $${120 - total} away from free shipping`}</span>
              <div className={styles.shipTrack}>
                <div className={styles.shipFill} style={{ width: `${Math.min(100, (total / 120) * 100)}%` }} />
              </div>
            </div>
            <div className={styles.cartItems}>
              {items.length === 0 ? (
                <p className={styles.emptyCart}>Your ritual awaits.</p>
              ) : items.map((item, i) => (
                <div key={i} className={styles.cartItem}>
                  <img src={item.img} alt={item.name} className={styles.cartItemImg} />
                  <div>
                    <div className={styles.cartItemName}>{item.name}</div>
                    <div className={styles.cartItemPrice}>${item.price} × {item.qty}</div>
                    <div className={styles.cartQtyRow}>
                      <button className={styles.qtyBtn} onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                      <span className={styles.qtyNum}>{item.qty}</span>
                      <button className={styles.qtyBtn} onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                    </div>
                  </div>
                  <button className={styles.cartRemove} onClick={() => removeItem(item.id)}>✕</button>
                </div>
              ))}
            </div>
            <div className={styles.cartFoot}>
              <div className={styles.cartTotal}>
                <span>Subtotal</span>
                <span>${total}</span>
              </div>
              <Link href="/checkout" className={styles.cartCheckout} onClick={() => setCartOpen(false)}>
                <span>Proceed to Checkout</span>
              </Link>
              <button className={styles.cartContinue} onClick={() => setCartOpen(false)}>Continue Shopping</button>
            </div>
          </div>
        </div>
      )}

      {/* Banner */}
      <div className={styles.banner}>
        <div className={styles.bannerBg} />
        <div className={styles.bannerContent}>
          <span className={styles.bannerEyebrow}>Lumière Collection</span>
          <h1 className={styles.bannerTitle}>All <span className={styles.bannerAccent}>Products</span></h1>
          <p className={styles.bannerSub}>28 botanical actives. Zero compromises. Every skin tone.</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link href="/" className={styles.bcLink}>Home</Link>
        <span className={styles.bcSep}>›</span>
        <span className={styles.bcCurrent}>Shop</span>
      </div>

      <div className={styles.layout}>
        {/* Sidebar */}
        <aside className={`${styles.sidebar} ${filterOpen ? styles.sidebarOpen : ''}`}>
          <div className={styles.filterHead}>
            <span className={styles.filterTitle}>Filter</span>
            <button className={styles.clearBtn} onClick={() => { setActiveCategory('All'); setActiveConcern('All'); setSortBy('Featured') }}>
              Clear all
            </button>
          </div>
          <div className={styles.filterGroup}>
            <span className={styles.filterGroupTitle}>Category</span>
            <div className={styles.filterOpts}>
              {categories.map(cat => (
                <button key={cat} className={`${styles.filterOpt} ${activeCategory === cat ? styles.filterOptActive : ''}`} onClick={() => setActiveCategory(cat)}>
                  <div className={`${styles.checkbox} ${activeCategory === cat ? styles.checkboxActive : ''}`} />
                  <span>{cat}</span>
                  <span className={styles.filterCount}>
                    {cat === 'All' ? products.length : products.filter(p => p.category === cat).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className={styles.filterGroup}>
            <span className={styles.filterGroupTitle}>Skin Concern</span>
            <div className={styles.filterOpts}>
              {concerns.map(con => (
                <button key={con} className={`${styles.filterOpt} ${activeConcern === con ? styles.filterOptActive : ''}`} onClick={() => setActiveConcern(con)}>
                  <div className={`${styles.checkbox} ${activeConcern === con ? styles.checkboxActive : ''}`} />
                  <span>{con}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className={styles.main} ref={sectionRef}>
          <div className={styles.toolbar}>
            <div className={styles.toolbarLeft}>
              <button className={styles.filterToggle} onClick={() => setFilterOpen(!filterOpen)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/>
                  <line x1="12" y1="18" x2="12" y2="18" strokeLinecap="round"/>
                </svg>
                Filters
              </button>
              <span className={styles.count}>Showing <strong>{filtered.length}</strong> products</span>
            </div>
            <div className={styles.toolbarRight}>
              <span className={styles.sortLabel}>Sort</span>
              <select className={styles.sortSelect} value={sortBy} onChange={e => setSortBy(e.target.value)}>
                {sortOptions.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>

          <div className={styles.grid}>
            {filtered.map((p, i) => (
              <div key={p.id} className={`${styles.card} ${styles.reveal}`} style={{ transitionDelay: `${i * 0.06}s` }}>
                <Link href={`/product?id=${p.id}`} className={styles.cardImgWrap}>
                  <img src={p.img} alt={p.name} className={styles.cardImgA} draggable={false} />
                  <img src={p.hover} alt={p.name} className={styles.cardImgB} draggable={false} />
                  {p.badge && (
                    <span className={`${styles.badge} ${p.badge === 'New' ? styles.badgeNew : p.badge === 'Best Seller' ? styles.badgeHot : styles.badgeSet}`}>
                      {p.badge}
                    </span>
                  )}
                  <button className={styles.wishBtn} aria-label="Wishlist" onClick={e => e.preventDefault()}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
                  <div className={styles.sweep} />
                </Link>
                <div className={styles.cardInfo}>
                  <span className={styles.cardCat}>{p.category}</span>
                  <Link href={`/product?id=${p.id}`} className={styles.cardName}>{p.name}</Link>
                  <p className={styles.cardDesc}>{p.desc}</p>
                  <div className={styles.cardRating}>
                    <div className={styles.stars}>{['★','★','★','★','★'].map((s,i) => <span key={i}>{s}</span>)}</div>
                    <span className={styles.ratingCount}>{p.rating} ({p.reviews})</span>
                  </div>
                  <div className={styles.cardFooter}>
                    <span className={styles.price}>${p.price}</span>
                    <button className={styles.addBtn} onClick={() => addItem(p)}>
                      <span>Add to Ritual</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className={styles.empty}>
              <p>No products match your filters.</p>
              <button onClick={() => { setActiveCategory('All'); setActiveConcern('All') }}>Clear filters</button>
            </div>
          )}
        </main>
      </div>
    </>
  )
}