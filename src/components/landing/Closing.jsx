import useReveal from '../../hooks/useReveal.js'
import andorinha from '../../assets/pipas/andorinha.png'
import { APP_STORE_URL } from '../../config.js'
import './Closing.css'

/** Chamada final (fundo escuro) e rodapé. */
export default function Closing() {
  const [ref, visible] = useReveal()

  return (
    <>
      <section ref={ref} className={`closing${visible ? ' is-visible' : ''}`}>
        <div className="closing__text">
          <h2 className="closing__title">Lembrar também é trabalho</h2>
          <p className="closing__lead">
            Antes de alguém lavar a louça, alguém percebeu que a pia encheu, lembrou que precisava lavar e decidiu
            quem faz.
          </p>
          <p className="closing__lead closing__lead--strong">O Pipa conta tudo isso na hora de dividir a casa.</p>
          <a className="pill-button pill-button--light closing__cta" href={APP_STORE_URL} target="_blank" rel="noreferrer">
            Baixar o Pipa
          </a>
        </div>
        <div className="closing__kite" aria-hidden="true">
          <img src={andorinha} alt="" />
          <span className="closing__line" />
        </div>
      </section>

      <footer className="footer">
        <p>Pipa: para partilhar · feito na Apple Developer Academy | Mackenzie</p>
        <p>© {new Date().getFullYear()} Pipa</p>
      </footer>
    </>
  )
}
