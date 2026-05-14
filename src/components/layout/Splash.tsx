'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './Splash.module.css'

export default function Splash() {
  const splashRef = useRef<HTMLDivElement>(null)
  const [letters] = useState('LUMIÈRE'.split(''))
  const [done, setDone] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const timer = setTimeout(() => {
      const splash = splashRef.current
      if (!splash) return
      splash.classList.add(styles.exit)
      setTimeout(() => {
        setDone(true)
        document.body.style.overflow = ''
      }, 1400)
    }, 3900)

    return () => clearTimeout(timer)
  }, [])

  if (done) return null

  return (
    <div ref={splashRef} className={styles.splash}>
      <div className={styles.bloom} />
      <div className={styles.glowRing} />

      <div className={styles.mark}>
        <div className={styles.prismWrap}>
          <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="90" height="110">
            <path
              className={styles.prismOuter}
              d="M50 4 L96 50 L50 116 L4 50 Z"
              stroke="#C4A882" strokeWidth="1.2" fill="none"
            />
            <line x1="50" y1="4" x2="50" y2="116" stroke="#C4A882" strokeWidth="0.6" opacity="0.22"/>
            <line x1="50" y1="60" x2="96" y2="50" stroke="#C4A882" strokeWidth="0.6" opacity="0.22"/>
            <path
              className={styles.prismL}
              d="M43 26 L43 74 L63 74"
              stroke="#E8B4B8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"
            />
            <ellipse className={styles.prismDrop} cx="54" cy="47" rx="4.5" ry="5.8" fill="#E8B4B8" opacity="0.9"/>
            <line className={styles.prismDrop} x1="54" y1="41.2" x2="54" y2="37" stroke="#E8B4B8" strokeWidth="1.1" strokeLinecap="round"/>
            <line x1="4" y1="50" x2="-24" y2="50" stroke="#C4A882" strokeWidth="0.7" opacity="0.5" className={styles.ray}/>
            <line x1="96" y1="50" x2="124" y2="50" stroke="#C4A882" strokeWidth="0.7" opacity="0.5" className={styles.ray}/>
          </svg>
        </div>

        <div className={styles.letters}>
          {letters.map((letter, i) => (
            <span
              key={i}
              className={styles.letter}
              style={{ animationDelay: `${2.2 + i * 0.09}s` }}
            >
              {letter}
            </span>
          ))}
        </div>

        <p className={styles.sub}>Luxury Skincare &nbsp;·&nbsp; Maison de Beauté</p>
      </div>

      <div className={styles.line} />
      <p className={styles.est}>EST. 2024 &nbsp;·&nbsp; PARIS</p>
    </div>
  )
}