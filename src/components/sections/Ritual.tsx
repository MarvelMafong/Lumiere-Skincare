'use client'

import { useEffect, useRef } from 'react'
import styles from './Ritual.module.css'

const steps = [
  {
    number: '01',
    tag: 'Step 01',
    title: 'Cleanse.',
    accent: 'Prepare the canvas.',
    body: 'Begin with intention. Our gentle micellar cleanse removes everything the day left behind without stripping the skin of what it needs to thrive. Your baseline, restored.',
    pills: ['Micellar Complex', 'Aloe Vera', 'Prebiotics'],
    img: '/images/hero-model.jpg',
    reverse: false,
  },
  {
    number: '02',
    tag: 'Step 02',
    title: 'Illuminate.',
    accent: 'Feed the light.',
    body: 'The Lumière Serum penetrates in 60 seconds. Fourteen botanical actives work in concert, repairing, brightening, and restoring the luminosity that is already yours.',
    pills: ['Rosehip Oil', 'Vitamin C', 'Niacinamide'],
    img: '/images/serum-card.jpg',
    reverse: true,
  },
  {
    number: '03',
    tag: 'Step 03',
    title: 'Seal.',
    accent: 'Protect what matters.',
    body: 'Lock in every layer with the Radiance Cream. A 24-hour barrier shield that holds hydration, smooths texture, and leaves the skin with that unmistakable Lumière finish.',
    pills: ['Ceramides', 'Peptide Complex', 'Jojoba'],
    img: '/images/radiance-cream-card.jpg',
    reverse: false,
  },
]

export default function Ritual() {
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
      { threshold: 0.15 }
    )
    const els = sectionRef.current?.querySelectorAll(`.${styles.reveal}`)
    els?.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.section} ref={sectionRef} id="ritual">

      <div className={styles.texture} />
      <div className={styles.ambient} />

      <div className={`${styles.header} ${styles.reveal}`}>
        <div className={styles.eyebrow}>
          <div className={styles.dash} />
          <span className={styles.eyebrowText}>The Lumière Ritual</span>
          <div className={styles.dash} />
        </div>
        <h2 className={styles.title}>
          Three steps.<br />
          <span className={styles.accent}>One transformation.</span>
        </h2>
        <p className={styles.subtitle}>
          Skincare is not a chore. It is a ritual.
          A daily act of choosing yourself, deliberately.
        </p>
      </div>

      <div className={styles.timeline}>
        <div className={styles.spine} />

        {steps.map((step, i) => (
          <div
            key={i}
            className={`${styles.step} ${step.reverse ? styles.stepReverse : ''} ${styles.reveal}`}
            style={{ transitionDelay: `${i * 0.15}s` }}
          >
            <div className={styles.stepNumBg}>{step.number}</div>

            {!step.reverse && (
              <div className={styles.stepImg}>
                <img src={step.img} alt={step.title} />
              </div>
            )}

            <div className={styles.stepNode}>
              <div className={styles.nodeDot} />
            </div>

            <div className={styles.stepContent}>
              <span className={styles.stepTag}>{step.tag}</span>
              <h3 className={styles.stepTitle}>
                {step.title}<br />
                <span className={styles.stepAccent}>{step.accent}</span>
              </h3>
              <div className={styles.stepRule} />
              <p className={styles.stepBody}>{step.body}</p>
              <div className={styles.pills}>
                {step.pills.map((pill, j) => (
                  <span key={j} className={styles.pill}>{pill}</span>
                ))}
              </div>
            </div>

            {step.reverse && (
              <div className={styles.stepImg}>
                <img src={step.img} alt={step.title} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={`${styles.ctaWrap} ${styles.reveal}`}>
        <a href="/shop" className={styles.cta}>
          <span>Shop The Ritual</span>
          <div className={styles.ctaArrow} />
        </a>
      </div>

    </section>
  )
}