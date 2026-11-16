import Hero from './Hero.jsx'
import Features from './Features.jsx'
import Harvii from './Harvii.jsx'
import Footer from './Footer.jsx'

/** Landing tradicional, exibida depois da corrida ou direto ao pular. */
export default function LandingPage({ showLogo = true }) {
  return (
    <main>
      <Hero showLogo={showLogo} />
      <Features />
      <Harvii />
      <Footer />
    </main>
  )
}
