'use client'

import { useRef, useState } from 'react'
import styles from './Newsletter.module.css'

const perks = ['Early access', 'Ritual guides', 'Members-only offers', 'Behind the formula']

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    if (!email || !email.includes('@')) {
      inputRef.current?.focus()
      return
    }
    setSubmitted(true)
  }

  return (
    <section className={styles.section}>
      <div className={styles.bg} />
      <div className={styles.overlay} />
      <div className={styles.brandGlow} />
      <div className={styles.glow} />

      <div className={styles.spray}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className={styles.sprayParticle} />
        ))}
      </div>

      <div className={styles.inner}>
        <div className={styles.eyebrow}>
          <div className={styles.dash} />
          <span className={styles.eyebrowText}>The Inner Circle</span>
        </div>

        <h2 className={styles.title}>
          Light arrives<br />
          <span className={styles.accent}>first.</span>
        </h2>

        <p className={styles.sub}>
          Early access to new launches. Ritual guides written by our formulators.
          Exclusive offers that never reach the public.
          This is for the ones who know.
        </p>

        {!submitted ? (
          <>
            <div className={styles.form}>
              <input
                ref={inputRef}
                className={styles.input}
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                autoComplete="email"
                aria-label="Email address"
              />
              <button className={styles.btn} onClick={handleSubmit}>
                <span>Join</span>
              </button>
            </div>

            <p className={styles.privacy}>
              We respect your privacy. No spam, ever.
            </p>
          </>
        ) : (
          <p className={styles.success}>
            ✦ &nbsp; Welcome to the inner circle. Light arrives first.
          </p>
        )}

        <div className={styles.perks}>
          {perks.map((p, i) => (
            <div key={i} className={styles.perk}>
              <div className={styles.perkDot} />
              <span className={styles.perkText}>{p}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.product}>
        <img src="/images/serum-card.jpg" alt="Lumière Serum" />
      </div>
    </section>
  )
}