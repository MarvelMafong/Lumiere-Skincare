import styles from './loading.module.css'

export default function Loading() {
  return (
    <div className={styles.wrap}>
      <div className={styles.mark}>
        <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="60" height="72">
          <path
            d="M50 4 L96 50 L50 116 L4 50 Z"
            stroke="#C4A882" strokeWidth="1.2" fill="none"
            className={styles.prismOuter}
          />
          <path
            d="M43 26 L43 74 L63 74"
            stroke="#E8B4B8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"
            className={styles.prismL}
          />
          <ellipse cx="54" cy="47" rx="4.5" ry="5.8" fill="#E8B4B8" opacity="0.9"/>
        </svg>
        <span className={styles.wordmark}>LUMIÈRE</span>
        <div className={styles.bar}>
          <div className={styles.barFill} />
        </div>
      </div>
    </div>
  )
}