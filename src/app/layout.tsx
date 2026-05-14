import type { Metadata } from 'next'
import './globals.css'
import Cursor from '@/components/layout/Cursor'
import Splash from '@/components/layout/Splash'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { CartProvider } from '@/context/CartContext'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'LUMIÈRE — Luxury Skincare',
  description: 'Formulated for every complexion that has ever deserved better.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <div className="grain" />
          <Splash />
          <Navbar />
          <Cursor />
          <Script
            id="sw-register"
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/sw.js')
                  })
                }
              `,
            }}
          />
          <div style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
            {children}
          </div>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}