import styles from './Press.module.css'

const publications = [
  'Vogue', 'Allure', "Harper's Bazaar", 'Byrdie',
  'Elle', 'Into The Gloss', 'Refinery29', 'WWD',
]

export default function Press() {
  return (
    <section className={styles.section}>
      <p className={styles.label}>As Seen In</p>
      <div className={styles.trackWrap}>
        <div className={styles.track}>
          {[...publications, ...publications].map((pub, i) => (
            <div key={i} className={styles.item}>
              <span className={styles.name}>{pub}</span>
              <span className={styles.sep}>◆</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.quote}>
        <p className={styles.quoteText}>
          &ldquo;The most considered luxury skincare launch of the year.&rdquo;
        </p>
        <span className={styles.quoteSource}>Vogue Beauty · 2024</span>
      </div>
    </section>
  )
}