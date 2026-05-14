import Link from 'next/link'
import styles from './Footer.module.css'

const shopLinks = ['New Arrivals','Bestsellers','Serums','Moisturisers','Eye Care','Ritual Sets','Gift Edits']
const learnLinks = ['The Ritual','Ingredient Glossary','Skin Quiz','Journal','Our Science','Reviews','Press']
const helpLinks = ['About Lumière','Contact Us','Shipping & Returns','Track Your Order','FAQ','Stockists']

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <svg width="36" height="44" viewBox="0 0 100 120" fill="none">
              <path d="M50 4 L96 50 L50 116 L4 50 Z" stroke="#C4A882" strokeWidth="1.4" fill="none"/>
              <line x1="50" y1="4" x2="50" y2="116" stroke="#C4A882" strokeWidth="0.6" opacity="0.25"/>
              <line x1="50" y1="60" x2="96" y2="50" stroke="#C4A882" strokeWidth="0.6" opacity="0.25"/>
              <path d="M43 26 L43 74 L63 74" stroke="#E8B4B8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <ellipse cx="54" cy="47" rx="4.5" ry="5.8" fill="#E8B4B8" opacity="0.9"/>
              <line x1="54" y1="41.2" x2="54" y2="37" stroke="#E8B4B8" strokeWidth="1.1" strokeLinecap="round"/>
            </svg>
            <span className={styles.logoName}>LUMIÈRE</span>
          </Link>
          <p className={styles.desc}>
            Luxury skincare formulated for every complexion that has ever deserved better.
            Born in Paris. Built for the world.
          </p>
          <div className={styles.social}>
            {['Instagram','TikTok','Pinterest','YouTube'].map(s => (
              <a key={s} href="#" className={styles.socialLink} aria-label={s}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                </svg>
              </a>
            ))}
          </div>
          <div className={styles.certs}>
            {['Cruelty-Free','Vegan','Clean Certified','Sustainably Sourced'].map(c => (
              <span key={c} className={styles.cert}>{c}</span>
            ))}
          </div>
        </div>

        <div>
          <span className={styles.colTitle}>Shop</span>
          <ul className={styles.links}>
            {shopLinks.map(l => <li key={l}><Link href="/shop">{l}</Link></li>)}
          </ul>
        </div>
        <div>
          <span className={styles.colTitle}>Learn</span>
          <ul className={styles.links}>
            {learnLinks.map(l => <li key={l}><a href="#">{l}</a></li>)}
          </ul>
        </div>
        <div>
          <span className={styles.colTitle}>Help</span>
          <ul className={styles.links}>
            {helpLinks.map(l => <li key={l}><a href="#">{l}</a></li>)}
          </ul>
        </div>
      </div>

      <div className={styles.mid}>
        <div className={styles.contact}>
          <span className={styles.contactLabel}>Get in touch</span>
          <a href="mailto:hello@lumiere.com" className={styles.contactEmail}>hello@lumiere.com</a>
          <p className={styles.contactAddress}>
            12 Rue du Faubourg Saint-Honoré<br />
            75008 Paris, France<br /><br />
            Mon – Fri · 9:00 – 18:00 CET
          </p>
        </div>
        <div className={styles.awards}>
          {[['97%','Customer satisfaction'],['28','Botanical actives'],['40+','Skin tones trialled'],['0','Harmful ingredients']].map(([n,l]) => (
            <div key={l} className={styles.award}>
              <span className={styles.awardNum}>{n}</span>
              <span className={styles.awardLabel}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.legal}>
          {['Privacy Policy','Terms of Service','Cookie Settings','Accessibility'].map(l => (
            <a key={l} href="#">{l}</a>
          ))}
        </div>
        <span className={styles.copyright}>© 2024 Lumière. All rights reserved.</span>
        <div className={styles.payment}>
          <span className={styles.payLabel}>We accept</span>
          {['Visa','MC','Amex','PayPal','Apple Pay'].map(p => (
            <span key={p} className={styles.payIcon}>{p}</span>
          ))}
        </div>
      </div>

      <div className={styles.signature}>
        <div className={styles.sigLine} />
        <p className={styles.sigText}>
          Designed &amp; Built by{' '}
          <a href="mailto:mafongmarvel@gmail.com">Marvel Mafong</a>
          {' · '}
          <a href="mailto:mafongmarvel@gmail.com">mafongmarvel@gmail.com</a>
        </p>
        <div className={styles.sigLine} />
      </div>
    </footer>
  )
}