'use client'

import { useState } from 'react'
import styles from './contact.module.css'

const faqs = [
  { q: 'How long does shipping take?', a: 'Standard shipping takes 5–7 business days. Express shipping takes 2–3 business days. Free standard shipping on all orders over $120.' },
  { q: 'What is your returns policy?', a: 'We offer a 30-day return policy on all unopened products. If you are not satisfied, contact us and we will arrange a return at no cost to you.' },
  { q: 'Are your products suitable for sensitive skin?', a: 'Yes. All Lumière formulas are fragrance-free, hypoallergenic, and dermatologist tested. They are safe for all skin types including sensitive and reactive skin.' },
  { q: 'Are your products cruelty-free and vegan?', a: 'Absolutely. Every Lumière product is certified cruelty-free and 100% vegan. We never test on animals and use zero animal-derived ingredients.' },
  { q: 'How do I know which products are right for me?', a: 'Take our Skin Quiz on the website for a personalised recommendation. You can also email us and our skincare advisors will guide you personally.' },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return
    setSent(true)
  }

  return (
    <main className={styles.main}>
      {/* Banner */}
      <div className={styles.banner}>
        <div className={styles.bannerBg} />
        <div className={styles.bannerOverlay} />
        <div className={styles.bannerContent}>
          <span className={styles.eyebrow}>Get In Touch</span>
          <h1 className={styles.bannerTitle}>We&apos;re here<br /><span className={styles.accent}>for you.</span></h1>
          <p className={styles.bannerSub}>Our team of skincare advisors is available Monday to Friday, 9am to 6pm CET.</p>
        </div>
      </div>

      {/* Contact info + Form */}
      <div className={styles.grid}>
        {/* Left — info */}
        <div className={styles.infoCol}>
          <div className={styles.infoBlock}>
            <span className={styles.infoLabel}>Email Us</span>
            <a href="mailto:hello@lumiere.com" className={styles.infoValue}>hello@lumiere.com</a>
            <p className={styles.infoNote}>We respond within 24 hours.</p>
          </div>
          <div className={styles.infoBlock}>
            <span className={styles.infoLabel}>Visit Us</span>
            <p className={styles.infoValue}>12 Rue du Faubourg Saint-Honoré</p>
            <p className={styles.infoNote}>75008 Paris, France</p>
          </div>
          <div className={styles.infoBlock}>
            <span className={styles.infoLabel}>Hours</span>
            <p className={styles.infoValue}>Mon – Fri · 9:00 – 18:00 CET</p>
            <p className={styles.infoNote}>Closed on weekends and public holidays.</p>
          </div>
          <div className={styles.infoBlock}>
            <span className={styles.infoLabel}>Follow Us</span>
            <div className={styles.socials}>
              {['Instagram', 'TikTok', 'Pinterest', 'YouTube'].map(s => (
                <a key={s} href="#" className={styles.social}>{s}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className={styles.formCol}>
          {!sent ? (
            <>
              <h2 className={styles.formTitle}>Send us a message</h2>
              <div className={styles.formGrid}>
                <div className={styles.formField}>
                  <label className={styles.label}>Your Name</label>
                  <input className={styles.input} type="text" placeholder="Isabelle Mercier" value={form.name} onChange={e => update('name', e.target.value)} />
                </div>
                <div className={styles.formField}>
                  <label className={styles.label}>Email Address</label>
                  <input className={styles.input} type="email" placeholder="your@email.com" value={form.email} onChange={e => update('email', e.target.value)} />
                </div>
                <div className={styles.formField} style={{ gridColumn: '1 / -1' }}>
                  <label className={styles.label}>Subject</label>
                  <input className={styles.input} type="text" placeholder="Order enquiry, product advice..." value={form.subject} onChange={e => update('subject', e.target.value)} />
                </div>
                <div className={styles.formField} style={{ gridColumn: '1 / -1' }}>
                  <label className={styles.label}>Message</label>
                  <textarea className={styles.textarea} placeholder="Tell us how we can help..." value={form.message} onChange={e => update('message', e.target.value)} rows={6} />
                </div>
              </div>
              <button className={styles.submitBtn} onClick={handleSubmit}>
                <span>Send Message</span>
              </button>
            </>
          ) : (
            <div className={styles.sentWrap}>
              <div className={styles.sentDiamond} />
              <h2 className={styles.sentTitle}>Message received.</h2>
              <p className={styles.sentSub}>Thank you for reaching out, {form.name}. We will be in touch within 24 hours.</p>
            </div>
          )}
        </div>
      </div>

      {/* FAQ */}
      <div className={styles.faqSection}>
        <div className={styles.faqInner}>
          <div className={styles.faqHeader}>
            <span className={styles.faqEyebrow}>FAQ</span>
            <h2 className={styles.faqTitle}>Common questions,<br /><span className={styles.faqAccent}>answered honestly.</span></h2>
          </div>
          <div className={styles.faqs}>
            {faqs.map((faq, i) => (
              <div key={i} className={`${styles.faqItem} ${openFaq === i ? styles.faqOpen : ''}`}>
                <button className={styles.faqTrigger} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className={styles.faqQ}>{faq.q}</span>
                  <div className={styles.faqIcon} />
                </button>
                {openFaq === i && <p className={styles.faqA}>{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}