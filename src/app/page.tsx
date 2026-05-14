import Hero from '@/components/sections/Hero'
import Manifesto from '@/components/sections/Manifesto'
import FeaturedCollection from '@/components/sections/FeaturedCollection'
import Ritual from '@/components/sections/Ritual'
import Bestsellers from '@/components/sections/Bestsellers'
import Ingredients from '@/components/sections/Ingredients'
import SkinLight from '@/components/sections/SkinLight'
import Press from '@/components/sections/Press'
import Editorial from '@/components/sections/Editorial'
import Newsletter from '@/components/sections/Newsletter'
import PreFooter from '@/components/sections/PreFooter'

export default function Home() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <FeaturedCollection />
      <Ritual />
      <Bestsellers />
      <Ingredients />
      <SkinLight />
      <Press />
      <Editorial />
      <Newsletter />
      <PreFooter />
    </main>
  )
}