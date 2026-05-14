'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from './Editorial.module.css'

export default function Editorial() {
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
      { threshold: 0.12 }
    )
    const els = sectionRef.current?.querySelectorAll(`.${styles.reveal}`)
    els?.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.glowBlush} />

      <div className={styles.inner}>
        <div className={`${styles.imgWrap} ${styles.reveal}`}>
          <div className={styles.imgAccent} />
          <div className={styles.imgFrame}>
            <img src="/images/gift-unboxing.jpg" alt="The Lumière Story" />
          </div>
          <div className={styles.imgTag}>
            <span className={styles.imgTagLabel}>The Journal</span>
            <span className={styles.imgTagValue}>Issue 01</span>
          </div>
        </div>

        <div className={`${styles.content} ${styles.reveal}`} style={{ transitionDelay: '0.15s' }}>
          <div className={styles.eyebrow}>
            <div className={styles.dash} />
            <span className={styles.eyebrowText}>Brand Story</span>
          </div>

          <h2 className={styles.title}>
            Built in a Parisian atelier.{' '}
            <span className={styles.accent}>Designed for the whole world.</span>
          </h2>

          <div className={styles.pullquote}>
            <p>&ldquo;We didn&apos;t set out to build a skincare brand. We set out to answer a question nobody was answering honestly.&rdquo;</p>
          </div>

          <p className={styles.body}>
            Lumière was born from a single principle: that the most advanced skincare in the world
            should work for every complexion on earth. Not a diluted formula, not a parallel range,
            the same formula, the same concentration, the same result. For everyone.
          </p>
          <p className={styles.body}>
            Every product begins in our Paris atelier, where botanists, chemists and perfumers
            work in the same room. Science without sterility. Luxury without exclusion.
          </p>

          <div className={styles.author}>
            <img src="/images/gift-unboxing.jpg" alt="Isabelle Mercier" className={styles.authorImg} />
            <div>
              <span className={styles.authorName}>Isabelle Mercier</span>
              <span className={styles.authorRole}>Founder · Creative Director</span>
            </div>
          </div>

          <Link href="/about" className={styles.cta}>
            Read the full story
            <div className={styles.ctaArrow} />
          </Link>
        </div>
      </div>
    </section>
  )
}