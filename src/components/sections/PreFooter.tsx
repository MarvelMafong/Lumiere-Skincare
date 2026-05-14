import styles from './PreFooter.module.css'

export default function PreFooter() {
  return (
    <section className={styles.section}>
      <div className={styles.texture} />
      <div className={styles.inner}>
        <div className={styles.diamond} />
        <h2 className={styles.statement}>
          Every skin tone.<br />
          Every complexion.<br />
          <span className={styles.accent}>One standard of luxury.</span>
        </h2>
        <div className={styles.rule} />
        <span className={styles.tagline}>Lumière · Maison de Beauté · Est. 2024</span>
      </div>
    </section>
  )
}