'use client'

import { useEffect, useRef } from 'react'
import styles from './SkinLight.module.css'

const portraits = [
  { img: '/images/woman2.jpeg', quote: '"This is the first serum that didn\'t make my skin fight back."', tag: 'Deep Skin · Verified Review' },
  { img: '/images/hero-model.jpg', quote: '"My skin tone has never looked this even. In two weeks."', tag: 'Light Brown Skin · Verified Review' },
  { img: '/images/gift-unboxing.jpeg', quote: '"Formulated for me. Not adapted for me. Actually for me."', tag: 'Olive Skin · Verified Review' },
  { img: '/images/woman4.jpeg', quote: '"I stopped wearing foundation after 3 weeks."', tag: 'Warm Tan Skin · Verified Review' },
  { img: '/images/manwoman.jpeg', quote: '"The glow is real. People ask me what I changed."', tag: 'Deep Espresso Skin · Verified Review' },
  { img: '/images/aes.jpeg', quote: '"Skincare that finally respects what my skin already is."', tag: 'Rich Brown Skin · Verified Review' },
  { img: '/images/woman3.jpeg', quote: '"Effortless. Like my skin just remembered what it was."', tag: 'Medium Warm Skin · Verified Review' },
  { img: '/images/gold-oil-drop.jpg', quote: '"We both use it. It works for both of us. That\'s the point."', tag: 'Couple · Verified Review' },
]

const offsets = [0, 40, 0, 60, -20, 30, -10, 50]

export default function SkinLight() {
  const sectionRef = useRef<HTMLDivElement>(null)

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
      { threshold: 0.08 }
    )
    const els = sectionRef.current?.querySelectorAll(`.${styles.reveal}`)
    els?.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.glow} />

      <div className={`${styles.header} ${styles.reveal}`}>
        <div className={styles.eyebrow}>
          <div className={styles.dash} />
          <span className={styles.eyebrowText}>Every Complexion</span>
          <div className={styles.dash} />
        </div>
        <h2 className={styles.title}>Skin for <span className={styles.accent}>every light.</span></h2>
        <p className={styles.subtitle}>Lumière was never built for one skin tone. It was built for the full spectrum of human luminosity.</p>
      </div>

      <div className={styles.grid}>
        {portraits.map((p, i) => (
          <div
            key={i}
            className={`${styles.card} ${styles.reveal}`}
            style={{ marginTop: offsets[i] + 'px', transitionDelay: `${i * 0.07}s` }}
          >
            <img src={p.img} alt="Lumière for every skin" className={styles.cardImg} draggable={false} />
            <div className={styles.flare} />
            <div className={styles.overlay}>
              <p className={styles.overlayQuote}>{p.quote}</p>
              <span className={styles.overlayTag}>{p.tag}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={`${styles.statement} ${styles.reveal}`}>
        <div className={styles.statItem}>
          <span className={styles.statNum}>40+</span>
          <span className={styles.statLabel}>Skin tones represented in our trials</span>
        </div>
        <div className={styles.statDivider} />
        <p className={styles.statQuote}>
          <strong>Lumière was formulated with every complexion in the room.</strong>{' '}
          Not as an afterthought. As the founding principle.
        </p>
      </div>
    </section>
  )
}