import styles from './about.module.css'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>Our Story</span>
          <h1 className={styles.title}>Built for every<br /><span className={styles.accent}>complexion on earth.</span></h1>
          <p className={styles.sub}>Born in Paris. Formulated for the world. Lumière exists because every skin tone deserves the same standard of luxury.</p>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.grid}>
          <div className={styles.gridText}>
            <span className={styles.sectionEyebrow}>The Founding Principle</span>
            <h2 className={styles.sectionTitle}>We didn&apos;t set out to build a skincare brand.</h2>
            <p className={styles.body}>We set out to answer a question nobody was answering honestly: why does the most advanced skincare in the world still not work for every complexion?</p>
            <p className={styles.body}>Lumière was founded on a single non-negotiable — one formula, one concentration, one result. For every skin tone on earth. Not a parallel range. Not an adaptation. The same.</p>
            <p className={styles.body}>Every product is tested across 40+ skin tones before it leaves our atelier. If it does not perform equally across all of them, it does not ship.</p>
          </div>
          <div className={styles.gridImg}>
            <img src="/images/hero-model.jpg" alt="Lumière Story" />
          </div>
        </div>
      </div>

      <div className={styles.darkSection}>
        <div className={styles.statsGrid}>
          {[
            ['2024', 'Year founded'],
            ['40+', 'Skin tones in every trial'],
            ['28', 'Botanical actives'],
            ['0', 'Harmful ingredients'],
            ['97%', 'Customer satisfaction'],
            ['3', 'Awards in year one'],
          ].map(([num, label]) => (
            <div key={label} className={styles.statItem}>
              <span className={styles.statNum}>{num}</span>
              <span className={styles.statLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.grid}>
          <div className={styles.gridImg}>
            <img src="/images/ingredients-flatlay.jpg" alt="Our Ingredients" />
          </div>
          <div className={styles.gridText}>
            <span className={styles.sectionEyebrow}>The Science</span>
            <h2 className={styles.sectionTitle}>Nature and science in the same room.</h2>
            <p className={styles.body}>Our Paris atelier brings together botanists, cosmetic chemists and perfumers. Every formula begins with the most bioavailable botanical actives we can source, then science does the rest.</p>
            <p className={styles.body}>We never use fillers. We never use harmful preservatives. We never compromise the formula to reduce cost. Clean is not a trend for us — it is the only standard we have ever known.</p>
            <Link href="/shop" className={styles.cta}><span>Shop the Collection</span></Link>
          </div>
        </div>
      </div>

      <div className={styles.valuesSection}>
        <h2 className={styles.valuesTitle}>What we stand for.</h2>
        <div className={styles.valuesGrid}>
          {[
            { title: 'Inclusion', body: 'Every formula is tested across 40+ skin tones. If it doesn\'t work for all of them, it doesn\'t exist.' },
            { title: 'Transparency', body: 'Full ingredient lists. Clear sourcing. No greenwashing. No vague claims.' },
            { title: 'Efficacy', body: 'Every ingredient earns its place. Nothing is decorative. Everything has a function.' },
            { title: 'Sustainability', body: 'Recyclable glass. Ethically sourced botanicals. Carbon-offset shipping.' },
          ].map((v, i) => (
            <div key={i} className={styles.valueCard}>
              <div className={styles.valueDot} />
              <h3 className={styles.valueTitle}>{v.title}</h3>
              <p className={styles.valueBody}>{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}