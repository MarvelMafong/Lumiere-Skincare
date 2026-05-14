'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from './FeaturedCollection.module.css'
import { products } from '@/lib/products'
import { useCartContext } from '@/context/CartContext'

export default function FeaturedCollection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { addItem } = useCartContext()

  const featured = products.slice(0, 3)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.visible)
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    const els = sectionRef.current?.querySelectorAll(`.${styles.reveal}`)
    els?.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={`${styles.header} ${styles.reveal}`}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowDash} />
          <span className={styles.eyebrowText}>The Collection</span>
          <div className={styles.eyebrowDash} />
        </div>
        <h2 className={styles.title}>
          Rituals, <span className={styles.accent}>refined.</span>
        </h2>
        <p className={styles.subtitle}>
          Each formula is a conversation between nature and science,
          crafted to work with your skin, not against it.
        </p>
      </div>

      <div className={styles.grid}>
        {featured.map((p, i) => (
          <div
            key={p.id}
            className={`${styles.card} ${i === 1 ? styles.cardCenter : ''} ${styles.reveal}`}
            style={{ transitionDelay: `${i * 0.15}s` }}
          >
            <Link href={`/product?id=${p.id}`} className={styles.cardImg}>
              <img src={p.img} alt={p.name} className={styles.imgPrimary} draggable={false} />
              <img src={p.hover} alt={p.name} className={styles.imgHover} draggable={false} />
              {p.badge && (
                <span className={`${styles.badge} ${p.badge === 'New' ? styles.badgeNew : styles.badgeHot}`}>
                  {p.badge}
                </span>
              )}
              <button
                className={styles.wishlist}
                aria-label="Add to wishlist"
                onClick={e => e.preventDefault()}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
              <div className={styles.sweep} />
            </Link>

            <div className={styles.cardInfo}>
              <span className={styles.cardCat}>{p.category}</span>
              <h3 className={styles.cardName}>{p.name}</h3>
              <p className={styles.cardDesc}>{p.desc}</p>
              <div className={styles.cardRating}>
                <div className={styles.stars}>
                  {['★','★','★','★','★'].map((s, j) => <span key={j}>{s}</span>)}
                </div>
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

      <div className={`${styles.viewAll} ${styles.reveal}`}>
        <Link href="/shop" className={styles.viewAllLink}>
          Explore the Full Collection
          <div className={styles.arrow} />
        </Link>
      </div>
    </section>
  )
}