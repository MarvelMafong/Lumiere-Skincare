'use client'

import { useEffect, useRef } from 'react'
import styles from './Cursor.module.css'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    // Hide until first mouse move
    cursor.style.opacity = '0'

    const onMove = (e: MouseEvent) => {
      cursor.style.opacity = '1'
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
    }

    const onEnter = () => cursor.classList.add(styles.hov)
    const onLeave = () => cursor.classList.remove(styles.hov)
    const onDown  = () => cursor.classList.add(styles.click)
    const onUp    = () => cursor.classList.remove(styles.click)

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)

    const addHover = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    addHover()
    const observer = new MutationObserver(addHover)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={cursorRef} className={styles.cursor}>
      <div className={styles.ch} />
      <div className={styles.cv} />
      <div className={styles.diamond} />
    </div>
  )
}