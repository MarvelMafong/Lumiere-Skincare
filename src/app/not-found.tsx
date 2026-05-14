import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.diamond} />
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>This page has left the building.</h1>
        <p className={styles.sub}>
          The page you are looking for may have moved, been renamed, or never existed.
          Let us guide you back to the light.
        </p>
        <div className={styles.links}>
          <Link href="/" className={styles.btnPrimary}><span>Back to Home</span></Link>
          <Link href="/shop" className={styles.btnGhost}><span>Shop All Products</span></Link>
        </div>
        <div className={styles.brandMark}>LUMIÈRE</div>
      </div>
    </div>
  )
}