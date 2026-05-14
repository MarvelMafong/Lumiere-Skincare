'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './Bestsellers.module.css'
import { products } from '@/lib/products'
import { useCartContext } from '@/context/CartContext'

export default function Bestsellers() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef(0)
  const currentX = useRef(0)
  const velX = useRef(0)
  const lastX = useRef(0)
  const lastT = useRef(0)
  const rafId = useRef<number>(0)
  const headerRef = useRef<HTMLDivElement>(null)
  const { addItem } = useCartContext()

  const cards = products.map((p, i) => ({
    ...p,
    rank: String(i + 1).padStart(2, '0'),
    sub: p.concern,
  }))

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.visible)
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    if (headerRef.current) observer.observe(headerRef.current)
    return () => observer.disconnect()
  }, [])

  const scrollToCard = (idx: number) => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[idx] as HTMLElement
    if (!card) return
    const outer = track.parentElement!
    const target = card.offsetLeft - outer.offsetWidth / 2 + card.offsetWidth / 2
    currentX.current = target
    track.style.transform = `translateX(${-target}px)`
    setActiveIdx(idx)
  }

  const onDragStart = (clientX: number) => {
    setIsDragging(true)
    dragStart.current = clientX
    velX.current = 0
    lastX.current = clientX
    lastT.current = Date.now()
    cancelAnimationFrame(rafId.current)
  }

  const onDragMove = (clientX: number) => {
    if (!isDragging) return
    const now = Date.now()
    const dt = now - lastT.current || 1
    velX.current = (clientX - lastX.current) / dt * 16
    lastX.current = clientX
    lastT.current = now
    const diff = clientX - dragStart.current
    currentX.current = currentX.current - diff
    dragStart.current = clientX
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${-currentX.current}px)`
    }
  }

  const snapNearest = () => {
    const track = trackRef.current
    if (!track) return
    const outer = track.parentElement!
    const outerW = outer.offsetWidth
    let minDist = Infinity
    let snapIdx = activeIdx
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement
      const center = el.offsetLeft + el.offsetWidth / 2
      const dist = Math.abs(center - (currentX.current + outerW / 2))
      if (dist < minDist) { minDist = dist; snapIdx = i }
    })
    scrollToCard(snapIdx)
  }

  const onDragEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    const momentum = () => {
      velX.current *= 0.92
      currentX.current -= velX.current
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${-currentX.current}px)`
      }
      if (Math.abs(velX.current) > 0.3) {
        rafId.current = requestAnimationFrame(momentum)
      } else {
        snapNearest()
      }
    }
    rafId.current = requestAnimationFrame(momentum)
  }

  useEffect(() => {
    scrollToCard(1)
  }, [])

  return (
    <section className={styles.section}>
      <div className={styles.bgText}>BESTSELLERS</div>
      <div className={styles.glow1} />
      <div className={styles.glow2} />

      <div className={`${styles.header} ${styles.reveal}`} ref={headerRef}>
        <div className={styles.headerLeft}>
          <div className={styles.eyebrow}>
            <div className={styles.dash} />
            <span className={styles.eyebrowText}>Most Loved</span>
          </div>
          <h2 className={styles.title}>
            What the world keeps<br />
            <span className={styles.accent}>coming back for.</span>
          </h2>
        </div>
        <div className={styles.navBtns}>
          <button className={styles.navBtn} onClick={() => scrollToCard(Math.max(0, activeIdx - 1))} aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button className={styles.navBtn} onClick={() => scrollToCard(Math.min(cards.length - 1, activeIdx + 1))} aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>

      <p className={styles.dragHint}>Drag to explore</p>

      <div className={styles.carouselOuter}>
        <div
          className={`${styles.track} ${isDragging ? styles.dragging : ''}`}
          ref={trackRef}
          onMouseDown={e => onDragStart(e.clientX)}
          onMouseMove={e => onDragMove(e.clientX)}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onTouchStart={e => onDragStart(e.touches[0].clientX)}
          onTouchMove={e => onDragMove(e.touches[0].clientX)}
          onTouchEnd={onDragEnd}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              className={`${styles.card} ${i === activeIdx ? styles.cardActive : ''}`}
              onClick={() => { if (!isDragging) scrollToCard(i) }}
            >
              <div className={styles.cardInner}>
                <div className={styles.cardImg}>
                  <img src={card.img} alt={card.name} draggable={false} />
                  <span className={styles.imgTag}>{card.category}</span>
                  <div className={styles.rankNum}>{card.rank}</div>
                  <button
                    className={styles.quickAdd}
                    aria-label="Quick add"
                    onClick={e => {
                      e.stopPropagation()
                      addItem(card)
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </button>
                </div>
                <div className={styles.cardInfo}>
                  <div className={styles.cardInfoTop} />
                  <div className={styles.cardName}>{card.name}</div>
                  <div className={styles.cardSub}>{card.sub}</div>
                  <div className={styles.cardFooter}>
                    <span className={styles.cardPrice}>${card.price}</span>
                    <div className={styles.cardStars}>
                      {['★','★','★','★','★'].map((s, j) => <span key={j}>{s}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.progressWrap}>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${((activeIdx) / (cards.length - 1)) * 100}%` }}
          />
        </div>
        <div className={styles.progressLabels}>
          <span>{String(activeIdx + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}</span>
          <span>Drag or use arrows</span>
        </div>
      </div>
    </section>
  )
}