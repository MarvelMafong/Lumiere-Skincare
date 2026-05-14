'use client'

import { useEffect } from 'react'
import styles from './not-found.module.css'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.diamond} />
        <span className={styles.code}>500</span>
        <h1 className={styles.title}>Something went wrong.</h1>
        <p className={styles.sub}>
          An unexpected error occurred. Our team has been notified.
          Please try again or return to the homepage.
        </p>
        <div className={styles.links}>
          <button onClick={reset} className={styles.btnPrimary}>
            <span>Try Again</span>
          </button>
          <a href="/" className={styles.btnGhost}>
            <span>Back to Home</span>
          </a>
        </div>
        <div className={styles.brandMark}>LUMIÈRE</div>
      </div>
    </div>
  )
}