import styles from './Manifesto.module.css'

const items = [
  'Your skin. Illuminated',
  '28 Botanical Actives',
  'Every Complexion. Always',
  'Clean · Clinical · Luxurious',
  'Free Shipping Over $120',
  'Cruelty-Free · Sustainably Sourced',
  'New — The Radiance Serum',
]

export default function Manifesto() {
  return (
    <div className={styles.strip}>
      <div className={styles.track}>
        {[...items, ...items].map((item, i) => (
          <div key={i} className={styles.item}>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}