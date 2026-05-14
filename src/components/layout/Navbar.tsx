'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import styles from './Navbar.module.css'
import { useCartContext } from '@/context/CartContext'

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false)
  const [menuOpen, setMenuOpen]       = useState(false)
  const [cartOpen, setCartOpen]       = useState(false)
  const [searchOpen, setSearchOpen]   = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [searchVal, setSearchVal]     = useState('')
  const [searchResults, setSearchResults] = useState<typeof import('@/lib/products').products>([])
  const searchRef = useRef<HTMLInputElement>(null)
  const { items, removeItem, updateQty, total, count } = useCartContext()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? 'hidden' : ''
  }, [menuOpen, searchOpen])

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 100)
  }, [searchOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setSearchOpen(false); setAccountOpen(false) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const handleSearch = async (val: string) => {
    setSearchVal(val)
    if (val.length < 2) { setSearchResults([]); return }
    const { products } = await import('@/lib/products')
    const results = products.filter(p =>
      p.name.toLowerCase().includes(val.toLowerCase()) ||
      p.category.toLowerCase().includes(val.toLowerCase()) ||
      p.concern.toLowerCase().includes(val.toLowerCase())
    )
    setSearchResults(results)
  }

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <Link href="/" className={styles.navLogo}>
          <svg className={styles.logoIcon} viewBox="0 0 100 120" fill="none">
            <path d="M50 4 L96 50 L50 116 L4 50 Z" stroke="#C4A882" strokeWidth="1.6" fill="none"/>
            <line x1="50" y1="4" x2="50" y2="116" stroke="#C4A882" strokeWidth="0.7" opacity="0.28"/>
            <line x1="50" y1="60" x2="96" y2="50" stroke="#C4A882" strokeWidth="0.7" opacity="0.28"/>
            <path d="M43 26 L43 74 L63 74" stroke="#E8B4B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <ellipse cx="54" cy="47" rx="4.5" ry="5.8" fill="#E8B4B8" opacity="0.9"/>
            <line x1="54" y1="41.2" x2="54" y2="37" stroke="#E8B4B8" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <div className={styles.logoText}>
            <span className={styles.logoName}>LUMIÈRE</span>
            <span className={styles.logoTagline}>Skincare</span>
          </div>
        </Link>

        <div className={styles.navRight}>
          <div className={styles.navLinks}>
            <Link href="/shop">Shop</Link>
            <Link href="/shop">Collections</Link>
            <Link href="/#ritual">The Ritual</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className={styles.navDivider} />

          {/* Search */}
          <button className={styles.navIcon} aria-label="Search" onClick={() => setSearchOpen(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="7"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
          </button>

          {/* Account */}
          <div className={styles.accountWrap}>
            <button className={styles.navIcon} aria-label="Account" onClick={() => setAccountOpen(!accountOpen)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </button>
            {accountOpen && (
              <div className={styles.accountDropdown}>
                <div className={styles.accountTop}>
                  <span className={styles.accountGreeting}>Welcome back</span>
                  <span className={styles.accountSub}>Sign in to access your ritual</span>
                </div>
                <div className={styles.accountLinks}>
                  <Link href="/account" className={styles.accountLink} onClick={() => setAccountOpen(false)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    My Account
                  </Link>
                  <Link href="/account/orders" className={styles.accountLink} onClick={() => setAccountOpen(false)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                      <line x1="3" y1="6" x2="21" y2="6"/>
                    </svg>
                    My Orders
                  </Link>
                  <Link href="/account/wishlist" className={styles.accountLink} onClick={() => setAccountOpen(false)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    Wishlist
                  </Link>
                  <Link href="/contact" className={styles.accountLink} onClick={() => setAccountOpen(false)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    Support
                  </Link>
                </div>
                <div className={styles.accountDivider} />
                <button className={styles.accountSignIn}>
                  <span>Sign In</span>
                </button>
              </div>
            )}
          </div>

          {/* Cart */}
          <button className={styles.navIcon} onClick={() => setCartOpen(true)} aria-label="Cart" style={{ position: 'relative' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {count > 0 && <span className={styles.cartDot} />}
          </button>

          <button
            className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Search overlay */}
      {searchOpen && (
        <div className={styles.searchOverlay} onClick={() => setSearchOpen(false)}>
          <div className={styles.searchBox} onClick={e => e.stopPropagation()}>
            <div className={styles.searchInputWrap}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8A8880" strokeWidth="1.5">
                <circle cx="11" cy="11" r="7"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                ref={searchRef}
                className={styles.searchInput}
                type="text"
                placeholder="Search products, ingredients, concerns..."
                value={searchVal}
                onChange={e => handleSearch(e.target.value)}
              />
              <button className={styles.searchClose} onClick={() => { setSearchOpen(false); setSearchVal(''); setSearchResults([]) }}>✕</button>
            </div>

            {searchResults.length > 0 && (
              <div className={styles.searchResults}>
                {searchResults.map(p => (
                  <Link
                    key={p.id}
                    href={`/product?id=${p.id}`}
                    className={styles.searchResult}
                    onClick={() => { setSearchOpen(false); setSearchVal(''); setSearchResults([]) }}
                  >
                    <img src={p.img} alt={p.name} className={styles.searchResultImg} />
                    <div className={styles.searchResultInfo}>
                      <span className={styles.searchResultName}>{p.name}</span>
                      <span className={styles.searchResultCat}>{p.category}</span>
                    </div>
                    <span className={styles.searchResultPrice}>${p.price}</span>
                  </Link>
                ))}
              </div>
            )}

            {searchVal.length >= 2 && searchResults.length === 0 && (
              <div className={styles.searchEmpty}>
                <p>No results for &ldquo;{searchVal}&rdquo;</p>
                <Link href="/shop" onClick={() => setSearchOpen(false)}>Browse all products</Link>
              </div>
            )}

            {searchVal.length === 0 && (
              <div className={styles.searchSuggestions}>
                <span className={styles.searchSugTitle}>Popular searches</span>
                <div className={styles.searchTags}>
                  {['Serum', 'Radiance', 'Eye Care', 'Gift Set', 'Hydration'].map(tag => (
                    <button key={tag} className={styles.searchTag} onClick={() => handleSearch(tag)}>
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Account overlay close */}
      {accountOpen && <div className={styles.accountOverlay} onClick={() => setAccountOpen(false)} />}

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.menuOpen : ''}`}>
        <button className={styles.mobileClose} onClick={() => setMenuOpen(false)}>✕</button>
        <Link href="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
        <Link href="/shop" onClick={() => setMenuOpen(false)}>Collections</Link>
        <Link href="/#ritual" onClick={() => setMenuOpen(false)}>The Ritual</Link>
        <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        <Link href="/gallery" onClick={() => setMenuOpen(false)}>Gallery</Link>
      </div>

      {/* Cart sidebar */}
      {cartOpen && (
        <div className={styles.cartOverlay} onClick={() => setCartOpen(false)}>
          <div className={styles.cartSidebar} onClick={e => e.stopPropagation()}>
            <div className={styles.cartHead}>
              <div>
                <span className={styles.cartTitle}>Your Ritual</span>
                <span className={styles.cartCountBadge}>({count} items)</span>
              </div>
              <button className={styles.cartClose} onClick={() => setCartOpen(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className={styles.cartShipping}>
              <span className={styles.cartShipLabel}>
                {total >= 120
                  ? '✦ You qualify for free shipping!'
                  : `You're $${120 - total} away from free shipping`}
              </span>
              <div className={styles.shipTrack}>
                <div className={styles.shipFill} style={{ width: `${Math.min(100, (total / 120) * 100)}%` }} />
              </div>
            </div>

            <div className={styles.cartItems}>
              {items.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <p style={{ fontFamily: 'Cormorant SC, serif', fontSize: '0.8rem', letterSpacing: '0.3em', color: '#8A8880', textTransform: 'uppercase', marginBottom: '20px' }}>
                    Your ritual awaits.
                  </p>
                  <Link href="/shop" onClick={() => setCartOpen(false)} style={{ fontFamily: 'Cormorant SC, serif', fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#FAFAF7', background: '#0A0F0D', padding: '12px 28px', textDecoration: 'none' }}>
                    Shop Now
                  </Link>
                </div>
              ) : items.map((item, i) => (
                <div key={i} className={styles.cartItem}>
                  <img src={item.img} alt={item.name} className={styles.cartItemImg} />
                  <div className={styles.cartItemInfo}>
                    <span className={styles.cartItemCat}>{item.category}</span>
                    <div className={styles.cartItemName}>{item.name}</div>
                    <div className={styles.cartItemSize}>{item.size}</div>
                    <div className={styles.cartItemBottom}>
                      <span className={styles.cartItemPrice}>${item.price * item.qty}</span>
                      <div className={styles.cartQty}>
                        <button className={styles.qtyBtn} onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                        <span className={styles.qtyNum}>{item.qty}</span>
                        <button className={styles.qtyBtn} onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                      </div>
                    </div>
                  </div>
                  <button className={styles.cartRemove} onClick={() => removeItem(item.id)}>✕</button>
                </div>
              ))}
            </div>

            <div className={styles.cartFoot}>
              <div className={styles.cartSubtotal}>
                <span className={styles.cartSubLabel}>Subtotal</span>
                <span className={styles.cartSubValue}>${total}</span>
              </div>
              <p className={styles.cartNote}>Taxes and shipping calculated at checkout</p>
              <Link href="/checkout" className={styles.cartCheckout} onClick={() => setCartOpen(false)}>
                <span>Proceed to Checkout</span>
              </Link>
              <button className={styles.cartContinue} onClick={() => setCartOpen(false)}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}