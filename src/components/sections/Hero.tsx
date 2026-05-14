'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Hero.module.css'

export default function Hero() {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (imgRef.current) {
        imgRef.current.style.transform = `scale(1.02) translateY(${window.scrollY * 0.2}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className={styles.hero}>
      {/* Background image */}
      <div className={styles.heroBg}>
        <img
          ref={imgRef}
          src="/images/model-serum.jpg"
          alt="Lumière — Your skin, illuminated"
          className={styles.heroImg}
        />
      </div>

      {/* Overlays */}
      <div className={styles.ovMain} />
      <div className={styles.ovBottom} />
      <div className={styles.ovVignette} />
      <div className={styles.borderLeft} />
      <div className={styles.vRule} />

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowLine} />
          <span className={styles.eyebrowText}>Luxury Skincare</span>
        </div>

        <h1 className={styles.headline}>
          Your skin,<br />
          <span className={styles.accent}>illuminated.</span>
        </h1>

        <p className={styles.subhead}>Science meets ritual.</p>

        <div className={styles.rule} />

        <p className={styles.body}>
          Formulated for every complexion that has ever deserved better.
          Lumière harnesses the rarest botanical actives and the most
          advanced science — because your skin is not a problem to solve.
          It is light, waiting to be released.
        </p>

        <div className={styles.ctas}>
          <Link href="/shop" className={styles.btnPrimary}>
            <span>Discover the Collection</span>
          </Link>
          <Link href="/#ritual" className={styles.btnGhost}>
            <span>The Lumière Ritual</span>
          </Link>
        </div>
      </div>

      {/* Floating product */}
      <div className={styles.floatingProduct}>
        <img
          src="/images/eye-serum.jpg"
          alt="Lumière Radiance Serum"
          className={styles.floatingImg}
        />
      </div>

      {/* Blush ring accent */}
      <div className={styles.ringAccent} />

      {/* Scroll cue */}
      <div className={styles.scrollCue}>
        <div className={styles.scrollTrack} />
        <span className={styles.scrollLabel}>Scroll</span>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statNum}>97%</span>
          <span className={styles.statLabel}>Saw visible radiance</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNum}>28</span>
          <span className={styles.statLabel}>Botanical actives</span>
        </div>
      </div>
    </section>
  )
}