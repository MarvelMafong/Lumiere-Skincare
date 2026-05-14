'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './account.module.css'

export default function AccountPage() {
  const [tab, setTab] = useState<'profile' | 'orders' | 'wishlist'>('profile')
  const [signedIn, setSignedIn] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const [mode, setMode] = useState<'signin' | 'register'>('signin')

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  if (!signedIn) return (
    <div className={styles.authWrap}>
      <div className={styles.authBox}>
        <div className={styles.authLogo}>
          <svg width="32" height="40" viewBox="0 0 100 120" fill="none">
            <path d="M50 4 L96 50 L50 116 L4 50 Z" stroke="#C4A882" strokeWidth="1.4" fill="none"/>
            <path d="M43 26 L43 74 L63 74" stroke="#E8B4B8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <ellipse cx="54" cy="47" rx="4.5" ry="5.8" fill="#E8B4B8" opacity="0.9"/>
          </svg>
          <span className={styles.authLogoName}>LUMIÈRE</span>
        </div>

        <div className={styles.authTabs}>
          <button className={`${styles.authTab} ${mode === 'signin' ? styles.authTabActive : ''}`} onClick={() => setMode('signin')}>Sign In</button>
          <button className={`${styles.authTab} ${mode === 'register' ? styles.authTabActive : ''}`} onClick={() => setMode('register')}>Create Account</button>
        </div>

        {mode === 'signin' ? (
          <>
            <h1 className={styles.authTitle}>Welcome back.</h1>
            <p className={styles.authSub}>Sign in to access your ritual, orders and wishlist.</p>
            <div className={styles.authForm}>
              <div className={styles.authField}>
                <label className={styles.authLabel}>Email</label>
                <input className={styles.authInput} type="email" placeholder="your@email.com" value={form.email} onChange={e => update('email', e.target.value)} />
              </div>
              <div className={styles.authField}>
                <label className={styles.authLabel}>Password</label>
                <input className={styles.authInput} type="password" placeholder="••••••••" value={form.password} onChange={e => update('password', e.target.value)} />
              </div>
              <button className={styles.authBtn} onClick={() => setSignedIn(true)}><span>Sign In</span></button>
              <button className={styles.authForgot}>Forgot your password?</button>
            </div>
          </>
        ) : (
          <>
            <h1 className={styles.authTitle}>Join Lumière.</h1>
            <p className={styles.authSub}>Create your account and begin your ritual.</p>
            <div className={styles.authForm}>
              <div className={styles.authField}>
                <label className={styles.authLabel}>Full Name</label>
                <input className={styles.authInput} type="text" placeholder="Isabelle Mercier" />
              </div>
              <div className={styles.authField}>
                <label className={styles.authLabel}>Email</label>
                <input className={styles.authInput} type="email" placeholder="your@email.com" />
              </div>
              <div className={styles.authField}>
                <label className={styles.authLabel}>Password</label>
                <input className={styles.authInput} type="password" placeholder="••••••••" />
              </div>
              <button className={styles.authBtn} onClick={() => setSignedIn(true)}><span>Create Account</span></button>
            </div>
          </>
        )}
      </div>
      <div className={styles.authImg}>
        <img src="/images/hero-model.jpg" alt="Lumière" />
        <div className={styles.authImgOverlay} />
        <p className={styles.authImgQuote}>&ldquo;Formulated for every complexion that has ever deserved better.&rdquo;</p>
      </div>
    </div>
  )

  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarUser}>
          <div className={styles.avatar}>IM</div>
          <div>
            <span className={styles.userName}>Isabelle Mercier</span>
            <span className={styles.userEmail}>isabelle@lumiere.com</span>
          </div>
        </div>
        <nav className={styles.sidebarNav}>
          {(['profile','orders','wishlist'] as const).map(t => (
            <button key={t} className={`${styles.sidebarLink} ${tab === t ? styles.sidebarLinkActive : ''}`} onClick={() => setTab(t)}>
              {t === 'profile' ? 'My Profile' : t === 'orders' ? 'My Orders' : 'Wishlist'}
            </button>
          ))}
          <Link href="/contact" className={styles.sidebarLink}>Support</Link>
          <button className={styles.sidebarSignOut} onClick={() => setSignedIn(false)}>Sign Out</button>
        </nav>
      </div>

      <div className={styles.main}>
        {tab === 'profile' && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>My Profile</h2>
            <div className={styles.profileGrid}>
              {[['First Name','Isabelle'],['Last Name','Mercier'],['Email','isabelle@lumiere.com'],['Phone','+33 1 00 00 00 00']].map(([l, v]) => (
                <div key={l} className={styles.profileField}>
                  <label className={styles.profileLabel}>{l}</label>
                  <input className={styles.profileInput} defaultValue={v} />
                </div>
              ))}
            </div>
            <button className={styles.saveBtn}><span>Save Changes</span></button>
          </div>
        )}

        {tab === 'orders' && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>My Orders</h2>
            <div className={styles.ordersList}>
              {[
                { id: 'LUM-48291', date: 'April 12, 2024', status: 'Delivered', total: 236, items: ['Illuminating Serum', 'Radiance Cream'] },
                { id: 'LUM-39184', date: 'March 3, 2024', status: 'Delivered', total: 112, items: ['Eye Renewal Elixir'] },
              ].map(order => (
                <div key={order.id} className={styles.orderCard}>
                  <div className={styles.orderTop}>
                    <div>
                      <span className={styles.orderId}>{order.id}</span>
                      <span className={styles.orderDate}>{order.date}</span>
                    </div>
                    <span className={`${styles.orderStatus} ${styles.orderDelivered}`}>{order.status}</span>
                  </div>
                  <div className={styles.orderItems}>{order.items.join(' · ')}</div>
                  <div className={styles.orderFooter}>
                    <span className={styles.orderTotal}>${order.total}</span>
                    <button className={styles.orderReorder}>Reorder</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'wishlist' && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Wishlist</h2>
            <div className={styles.wishGrid}>
              {[
                { name: 'Radiance Toning Mist', price: 68, img: '/images/toning-mist.jpg' },
                { name: 'The Morning Ritual', price: 298, img: '/images/product-set.jpg' },
              ].map((item, i) => (
                <div key={i} className={styles.wishCard}>
                  <img src={item.img} alt={item.name} className={styles.wishImg} />
                  <div className={styles.wishInfo}>
                    <div className={styles.wishName}>{item.name}</div>
                    <div className={styles.wishPrice}>${item.price}</div>
                    <button className={styles.wishAdd}><span>Add to Ritual</span></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}