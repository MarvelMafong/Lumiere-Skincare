'use client'

import { useEffect, useRef } from 'react'
import styles from './Ingredients.module.css'

const ingredients = [
  { num: '01', name: 'Botanical Complex', origin: '14 Actives · Ethically Sourced', text: 'A precise blend of 14 plant-derived actives, each chosen for a specific cellular function.', img: '/images/cream-jar.jpg' },
  { num: '02', name: 'Rosa Damascena', origin: 'Bulgaria · Steam Distilled', text: 'True Bulgarian rose water. Anti-inflammatory and the most complex skin-balancing botanical known.', img: '/images/logo.jpg' },
  { num: '03', name: 'Green Peptide Matrix', origin: 'Biotech · Lab Cultivated', text: 'Next-generation peptide technology that signals skin cells to rebuild collagen from within.', img: '/images/woman.jpeg' },
  { num: '04', name: 'Golden Marula Oil', origin: 'South Africa · Cold Pressed', text: '72% oleic acid. Absorbs in seconds. Delivers omega fatty acids deep into the dermis.', img: '/images/gold-oil-drop.jpg' },
]

const callouts = [
  { name: 'Rosehip Oil', origin: 'Chile · Cold Pressed', benefit: 'Repairs UV damage. Fades hyperpigmentation. Restores elasticity.', side: 'left' },
  { name: 'Niacinamide', origin: 'Lab · 10% Active', benefit: 'Minimises pores. Balances oil. Evens skin tone in 28 days.', side: 'right' },
  { name: 'Bakuchiol', origin: 'India · Plant Retinol', benefit: 'All the results of retinol. None of the irritation.', side: 'left' },
  { name: 'Sea Kelp', origin: 'Atlantic · Wild Harvested', benefit: 'Deep hydration from the ocean. Plumps, firms, lifts.', side: 'right' },
]

export default function Ingredients() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add(styles.visible); observer.unobserve(e.target) }
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
      <div className={styles.glowBlush} />
      <div className={styles.glowChampagne} />

      <div className={`${styles.header} ${styles.reveal}`}>
        <div className={styles.eyebrow}>
          <div className={styles.dash} />
          <span className={styles.eyebrowText}>What&apos;s Inside</span>
          <div className={styles.dash} />
        </div>
        <h2 className={styles.title}>Nature, at its most<br /><span className={styles.accent}>concentrated.</span></h2>
        <p className={styles.subtitle}>Every ingredient earns its place. Nothing is decorative. Everything has a reason, a source, and a result.</p>
      </div>

      <div className={`${styles.orbStage} ${styles.reveal}`}>
        <div className={styles.ringOuter}>
          <div className={styles.tick} /><div className={styles.tick} />
          <div className={styles.tick} /><div className={styles.tick} />
        </div>
        <div className={styles.ringMid} />
        <div className={styles.ringInner} />
        <div className={styles.orbGlow} />
        <div className={styles.orbImg}>
          <img src="/images/product-set.jpg" alt="Pure Botanical Extract" />
        </div>
        <div className={styles.orbLabel}><span>Pure Botanical Extract</span></div>
        <div className={styles.callouts}>
          {callouts.map((c, i) => (
            <div key={i} className={`${styles.callout} ${styles[`callout${i}` as keyof typeof styles]}`}>
              {c.side === 'left' && (
                <>
                  <div className={styles.calloutCard}>
                    <div className={styles.calloutName}>{c.name}</div>
                    <span className={styles.calloutOrigin}>{c.origin}</span>
                    <p className={styles.calloutBenefit}>{c.benefit}</p>
                  </div>
                  <div className={styles.calloutLine} />
                </>
              )}
              {c.side === 'right' && (
                <>
                  <div className={styles.calloutLine} />
                  <div className={styles.calloutCard}>
                    <div className={styles.calloutName}>{c.name}</div>
                    <span className={styles.calloutOrigin}>{c.origin}</span>
                    <p className={styles.calloutBenefit}>{c.benefit}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {ingredients.map((ing, i) => (
          <div key={i} className={`${styles.gridItem} ${styles.reveal}`} style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className={styles.gridNum}>{ing.num}</div>
            <img src={ing.img} alt={ing.name} className={styles.gridImg} />
            <div className={styles.gridPip} />
            <div className={styles.gridName}>{ing.name}</div>
            <span className={styles.gridOrigin}>{ing.origin}</span>
            <p className={styles.gridText}>{ing.text}</p>
          </div>
        ))}
      </div>

      <div className={`${styles.bottom} ${styles.reveal}`}>
        <div className={styles.bottomRule} />
        <p className={styles.bottomText}><strong>Clean is not a trend.</strong><br />It is the only standard we have ever known.</p>
        <a href="/shop" className={styles.bottomLink}>
          Read our full ingredient glossary
          <div className={styles.bottomArrow} />
        </a>
      </div>
    </section>
  )
}