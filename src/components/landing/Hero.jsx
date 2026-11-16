import Logo from '../Logo.jsx'
import useReveal from '../../hooks/useReveal.js'
import lembrar from '../../assets/landing/lembrar.webp'
import { APP_STORE_URL } from '../../config.js'
import './Hero.css'

/** Primeira dobra da landing tradicional (fundo verde). */
export default function Hero({ showLogo }) {
  const [ref, visible] = useReveal(0.15)

  return (
    <section id="conhecer" ref={ref} className={`hero${visible ? ' is-visible' : ''}`}>
      {showLogo ? (
        <Logo className="hero__logo" />
      ) : (
        <svg className="hero__ground" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 0 H1440 V10 C1100 120 380 120 0 40 Z" fill="var(--green-light)" />
        </svg>
      )}

      <div className="hero__text">
        <h1 className="hero__title">Lembrar também é trabalho</h1>
        <p className="hero__lead">
          Antes de alguém lavar a louça, alguém percebeu que a pia encheu, lembrou que precisava lavar e decidiu
          quem faz.
        </p>
        <p className="hero__lead hero__lead--strong">O Pipa conta tudo isso na hora de dividir a casa.</p>
        <a className="pill-button pill-button--dark hero__cta" href={APP_STORE_URL} target="_blank" rel="noreferrer">
          Baixar o Pipa
        </a>
      </div>

      <img
        className="hero__image"
        src={lembrar}
        alt="Card 'Lavar louça' rodeado pelas etapas notar, lembrar, decidir e acompanhar"
        width="1000"
        height="971"
      />
    </section>
  )
}
