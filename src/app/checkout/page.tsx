'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './checkout.module.css'
import { useCartContext } from '@/context/CartContext'

const steps = ['Bag', 'Details', 'Shipping', 'Payment']

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartContext()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '',
    address: '', city: '', country: '', zip: '', phone: '',
    shipping: 'standard',
    cardNum: '', expiry: '', cvv: '', cardName: '',
  })
  const [done, setDone] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const shippingCost = form.shipping === 'express' ? 18 : total >= 120 ? 0 : 12
  const orderTotal = total + shippingCost
  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const validate = (fields: string[]) => {
    const missing = fields.filter(f => !form[f as keyof typeof form])
    setErrors(missing)
    return missing.length === 0
  }

  if (done) return (
    <div className={styles.success}>
      <div className={styles.successInner}>
        <div className={styles.successDiamond} />
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1B4332" strokeWidth="1.2">
          <path d="M20 6L9 17l-5-5"/>
        </svg>
        <h1 className={styles.successTitle}>Order Confirmed.</h1>
        <p className={styles.successSub}>
          Thank you. A confirmation has been sent to <strong>{form.email}</strong>.
          Your ritual is on its way.
        </p>
        <div className={styles.successOrder}>Order #LUM-{Math.floor(Math.random() * 90000) + 10000}</div>
        <Link href="/" className={styles.successBtn}><span>Return to Home</span></Link>
      </div>
    </div>
  )

  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <Link href="/" className={styles.logoWrap}>
          <svg width="28" height="34" viewBox="0 0 100 120" fill="none">
            <path d="M50 4 L96 50 L50 116 L4 50 Z" stroke="#C4A882" strokeWidth="1.6" fill="none"/>
            <path d="M43 26 L43 74 L63 74" stroke="#E8B4B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <ellipse cx="54" cy="47" rx="4.5" ry="5.8" fill="#E8B4B8" opacity="0.9"/>
          </svg>
          <span className={styles.logoName}>LUMIÈRE</span>
        </Link>

        <div className={styles.steps}>
          {steps.map((s, i) => (
            <div key={s} className={`${styles.stepItem} ${i === step ? styles.stepActive : ''} ${i < step ? styles.stepDone : ''}`}>
              <div className={styles.stepDot}>
                {i < step
                  ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                  : <span>{i + 1}</span>
                }
              </div>
              <span className={styles.stepLabel}>{s}</span>
              {i < steps.length - 1 && <div className={styles.stepLine} />}
            </div>
          ))}
        </div>

        {errors.length > 0 && (
          <div style={{ background: '#F5DEDE', border: '1px solid #C9848A', padding: '12px 16px', marginBottom: '20px', fontFamily: 'Outfit', fontSize: '0.82rem', color: '#C9848A' }}>
            Please fill in all required fields.
          </div>
        )}

        {/* Step 0 — Bag */}
        {step === 0 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Your Ritual</h2>
            {items.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <p style={{ fontFamily: 'Outfit', fontSize: '0.9rem', color: '#8A8880', marginBottom: '20px' }}>Your bag is empty.</p>
                <Link href="/shop" style={{ fontFamily: 'Cormorant SC, serif', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#FAFAF7', background: '#0A0F0D', padding: '14px 32px', textDecoration: 'none' }}>
                  Shop Now
                </Link>
              </div>
            ) : (
              <>
                <div className={styles.bagItems}>
                  {items.map((item, i) => (
                    <div key={i} className={styles.bagItem}>
                      <img src={item.img} alt={item.name} className={styles.bagImg} />
                      <div className={styles.bagInfo}>
                        <div className={styles.bagName}>{item.name}</div>
                        <div className={styles.bagSize}>{item.size} · Qty {item.qty}</div>
                      </div>
                      <div className={styles.bagPrice}>${item.price * item.qty}</div>
                    </div>
                  ))}
                </div>
                <div className={styles.bagSummary}>
                  <div className={styles.bagRow}><span>Subtotal</span><span>${total}</span></div>
                  <div className={styles.bagRow}><span>Shipping</span><span>{shippingCost === 0 ? 'Free' : `$${shippingCost}`}</span></div>
                  <div className={`${styles.bagRow} ${styles.bagTotal}`}><span>Total</span><span>${orderTotal}</span></div>
                </div>
                <button className={styles.nextBtn} onClick={() => setStep(1)}><span>Continue to Details</span></button>
              </>
            )}
          </div>
        )}

        {/* Step 1 — Details */}
        {step === 1 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Contact Details</h2>
            <div className={styles.formGrid}>
              <div className={styles.formField} style={{ gridColumn: '1 / -1' }}>
                <label className={styles.label}>Email *</label>
                <input className={`${styles.input} ${errors.includes('email') ? styles.inputError : ''}`} type="email" placeholder="your@email.com" value={form.email} onChange={e => update('email', e.target.value)} />
              </div>
              <div className={styles.formField}>
                <label className={styles.label}>First Name *</label>
                <input className={`${styles.input} ${errors.includes('firstName') ? styles.inputError : ''}`} type="text" placeholder="Isabelle" value={form.firstName} onChange={e => update('firstName', e.target.value)} />
              </div>
              <div className={styles.formField}>
                <label className={styles.label}>Last Name *</label>
                <input className={`${styles.input} ${errors.includes('lastName') ? styles.inputError : ''}`} type="text" placeholder="Mercier" value={form.lastName} onChange={e => update('lastName', e.target.value)} />
              </div>
              <div className={styles.formField} style={{ gridColumn: '1 / -1' }}>
                <label className={styles.label}>Phone</label>
                <input className={styles.input} type="tel" placeholder="+1 000 000 0000" value={form.phone} onChange={e => update('phone', e.target.value)} />
              </div>
            </div>
            <div className={styles.btnRow}>
              <button className={styles.backBtn} onClick={() => setStep(0)}>← Back</button>
              <button className={styles.nextBtn} onClick={() => {
                if (validate(['email', 'firstName', 'lastName'])) setStep(2)
              }}><span>Continue to Shipping</span></button>
            </div>
          </div>
        )}

        {/* Step 2 — Shipping */}
        {step === 2 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Shipping Address</h2>
            <div className={styles.formGrid}>
              <div className={styles.formField} style={{ gridColumn: '1 / -1' }}>
                <label className={styles.label}>Address *</label>
                <input className={`${styles.input} ${errors.includes('address') ? styles.inputError : ''}`} type="text" placeholder="12 Rue du Faubourg" value={form.address} onChange={e => update('address', e.target.value)} />
              </div>
              <div className={styles.formField}>
                <label className={styles.label}>City *</label>
                <input className={`${styles.input} ${errors.includes('city') ? styles.inputError : ''}`} type="text" placeholder="Paris" value={form.city} onChange={e => update('city', e.target.value)} />
              </div>
              <div className={styles.formField}>
                <label className={styles.label}>ZIP / Postcode *</label>
                <input className={`${styles.input} ${errors.includes('zip') ? styles.inputError : ''}`} type="text" placeholder="75008" value={form.zip} onChange={e => update('zip', e.target.value)} />
              </div>
              <div className={styles.formField} style={{ gridColumn: '1 / -1' }}>
                <label className={styles.label}>Country *</label>
                <input className={`${styles.input} ${errors.includes('country') ? styles.inputError : ''}`} type="text" placeholder="France" value={form.country} onChange={e => update('country', e.target.value)} />
              </div>
            </div>
            <h3 className={styles.shippingLabel}>Shipping Method</h3>
            <div className={styles.shippingOptions}>
              <button className={`${styles.shippingOpt} ${form.shipping === 'standard' ? styles.shippingOptActive : ''}`} onClick={() => update('shipping', 'standard')}>
                <div>
                  <div className={styles.shippingName}>Standard Shipping</div>
                  <div className={styles.shippingTime}>5–7 business days</div>
                </div>
                <div className={styles.shippingPrice}>{total >= 120 ? 'Free' : '$12'}</div>
              </button>
              <button className={`${styles.shippingOpt} ${form.shipping === 'express' ? styles.shippingOptActive : ''}`} onClick={() => update('shipping', 'express')}>
                <div>
                  <div className={styles.shippingName}>Express Shipping</div>
                  <div className={styles.shippingTime}>2–3 business days</div>
                </div>
                <div className={styles.shippingPrice}>$18</div>
              </button>
            </div>
            <div className={styles.btnRow}>
              <button className={styles.backBtn} onClick={() => setStep(1)}>← Back</button>
              <button className={styles.nextBtn} onClick={() => {
                if (validate(['address', 'city', 'zip', 'country'])) setStep(3)
              }}><span>Continue to Payment</span></button>
            </div>
          </div>
        )}

        {/* Step 3 — Payment */}
        {step === 3 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Payment</h2>
            <div className={styles.secureNote}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Secured by 256-bit SSL encryption
            </div>
            <div className={styles.formGrid}>
              <div className={styles.formField} style={{ gridColumn: '1 / -1' }}>
                <label className={styles.label}>Card Number *</label>
                <input className={`${styles.input} ${errors.includes('cardNum') ? styles.inputError : ''}`} type="text" placeholder="1234 5678 9012 3456" value={form.cardNum} onChange={e => update('cardNum', e.target.value)} maxLength={19} />
              </div>
              <div className={styles.formField} style={{ gridColumn: '1 / -1' }}>
                <label className={styles.label}>Cardholder Name *</label>
                <input className={`${styles.input} ${errors.includes('cardName') ? styles.inputError : ''}`} type="text" placeholder="Isabelle Mercier" value={form.cardName} onChange={e => update('cardName', e.target.value)} />
              </div>
              <div className={styles.formField}>
                <label className={styles.label}>Expiry *</label>
                <input className={`${styles.input} ${errors.includes('expiry') ? styles.inputError : ''}`} type="text" placeholder="MM / YY" value={form.expiry} onChange={e => update('expiry', e.target.value)} maxLength={7} />
              </div>
              <div className={styles.formField}>
                <label className={styles.label}>CVV *</label>
                <input className={`${styles.input} ${errors.includes('cvv') ? styles.inputError : ''}`} type="text" placeholder="···" value={form.cvv} onChange={e => update('cvv', e.target.value)} maxLength={4} />
              </div>
            </div>
            <div className={styles.btnRow}>
              <button className={styles.backBtn} onClick={() => setStep(2)}>← Back</button>
              <button className={styles.nextBtn} onClick={() => {
                if (validate(['cardNum', 'cardName', 'expiry', 'cvv'])) {
                  clearCart()
                  setDone(true)
                }
              }}>
                <span>Place Order — ${orderTotal}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={styles.right}>
        <div className={styles.summary}>
          <h3 className={styles.summaryTitle}>Order Summary</h3>
          {items.map((item, i) => (
            <div key={i} className={styles.summaryItem}>
              <img src={item.img} alt={item.name} className={styles.summaryImg} />
              <div className={styles.summaryInfo}>
                <div className={styles.summaryName}>{item.name}</div>
                <div className={styles.summarySize}>{item.size} · Qty {item.qty}</div>
              </div>
              <div className={styles.summaryPrice}>${item.price * item.qty}</div>
            </div>
          ))}
          <div className={styles.summaryDivider} />
          <div className={styles.summaryRow}><span>Subtotal</span><span>${total}</span></div>
          <div className={styles.summaryRow}><span>Shipping</span><span>{shippingCost === 0 ? 'Free' : `$${shippingCost}`}</span></div>
          <div className={`${styles.summaryRow} ${styles.summaryTotal}`}><span>Total</span><span>${orderTotal}</span></div>
          <div className={styles.summaryNote}>Free shipping on orders over $120</div>
          <div className={styles.summaryBadges}>
            {['Cruelty-Free','Clean Certified','Secure Checkout'].map(b => (
              <span key={b} className={styles.summaryBadge}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}