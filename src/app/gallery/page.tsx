'use client'

import { useState } from 'react'
import styles from './gallery.module.css'

const categories = ['All', 'Products', 'Lifestyle', 'Ingredients', 'Packaging']

const items = [
  { img: '/images/serum-card.jpg', cat: 'Products', title: 'Illuminating Serum', span: 'tall' },
  { img: '/images/hero-model.jpg', cat: 'Lifestyle', title: 'Morning Ritual', span: 'wide' },
  { img: '/images/radiance-cream-card.jpg', cat: 'Products', title: 'Radiance Cream', span: 'normal' },
  { img: '/images/ingredients-flatlay.jpg', cat: 'Ingredients', title: 'Botanical Actives', span: 'normal' },
  { img: '/images/gift-box.jpg', cat: 'Packaging', title: 'The Gift Edit', span: 'tall' },
  { img: '/images/model-serum.jpg', cat: 'Lifestyle', title: 'The Ritual', span: 'wide' },
  { img: '/images/eye-elixir-card.jpg', cat: 'Products', title: 'Eye Renewal Elixir', span: 'normal' },
  { img: '/images/gold-oil-drop.jpg', cat: 'Ingredients', title: 'Golden Extract', span: 'normal' },
  { img: '/images/gift-unboxing.jpg', cat: 'Packaging', title: 'Unboxing Experience', span: 'wide' },
  { img: '/images/portrait-deep.jpg', cat: 'Lifestyle', title: 'Every Complexion', span: 'tall' },
  { img: '/images/product-set.jpg', cat: 'Products', title: 'Full Collection', span: 'normal' },
  { img: '/images/toning-mist.jpg', cat: 'Products', title: 'Radiance Mist', span: 'normal' },
]

export default function GalleryPage() {
  const [active, setActive] = useState('All')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered = items.filter(i => active === 'All' || i.cat === active)

  return (
    <main className={styles.main}>
      {/* Banner */}
      <div className={styles.banner}>
        <div className={styles.bannerBg} />
        <div className={styles.bannerOverlay} />
        <div className={styles.bannerContent}>
          <span className={styles.eyebrow}>Visual Archive</span>
          <h1 className={styles.title}>The Lumière <span className={styles.accent}>Gallery</span></h1>
          <p className={styles.sub}>Every image is a document of intention. Science, beauty, and the light between them.</p>
        </div>
      </div>

      {/* Filter */}
      <div className={styles.filterBar}>
        {categories.map(cat => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${active === cat ? styles.filterBtnActive : ''}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {filtered.map((item, i) => (
          <div
            key={i}
            className={`${styles.item} ${styles[item.span]}`}
            onClick={() => setLightbox(i)}
          >
            <img src={item.img} alt={item.title} className={styles.itemImg} draggable={false} />
            <div className={styles.itemOverlay}>
              <span className={styles.itemCat}>{item.cat}</span>
              <span className={styles.itemTitle}>{item.title}</span>
              <div className={styles.itemIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className={styles.lightbox} onClick={() => setLightbox(null)}>
          <button className={styles.lbClose} onClick={() => setLightbox(null)}>✕</button>
          <button
            className={`${styles.lbNav} ${styles.lbPrev}`}
            onClick={e => { e.stopPropagation(); setLightbox(l => l !== null ? Math.max(0, l - 1) : null) }}
          >‹</button>
          <div className={styles.lbContent} onClick={e => e.stopPropagation()}>
            <img src={filtered[lightbox]?.img} alt={filtered[lightbox]?.title} className={styles.lbImg} />
            <div className={styles.lbInfo}>
              <span className={styles.lbCat}>{filtered[lightbox]?.cat}</span>
              <span className={styles.lbTitle}>{filtered[lightbox]?.title}</span>
            </div>
          </div>
          <button
            className={`${styles.lbNav} ${styles.lbNext}`}
            onClick={e => { e.stopPropagation(); setLightbox(l => l !== null ? Math.min(filtered.length - 1, l + 1) : null) }}
          >›</button>
        </div>
      )}
    </main>
  )
}