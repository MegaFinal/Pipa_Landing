import useReveal from '../../hooks/useReveal.js'
import wordmark from '../../assets/brand/wordmark.png'
import tradicional from '../../assets/pipas/tradicional.png'
import { APP_STORE_URL } from '../../config.js'
import './Closing.css'

/** Pipa tradicional nas cores roxo e verde, com rabiola, para o lado esquerdo. */
function PurpleKite({ className }) {
  return (
    <svg className={className} viewBox="0 0 120 230" aria-hidden="true">
      <path d="M58 0 L96 40 L86 50 L58 34 Z" fill="#a9579a" />
      <path d="M58 0 L20 40 L30 50 L58 34 Z" fill="#7e8a3c" />
      <path d="M58 0 L96 40 L58 34 Z" fill="#7e8a3c" />
      <path d="M58 0 L20 40 L58 34 Z" fill="#8a4a86" />
      <path d="M20 40 L58 34 L58 120 Z" fill="#c487c6" />
      <path d="M20 40 L32 52 L58 120 Z" fill="#a9579a" />
      <path d="M96 40 L58 34 L58 120 Z" fill="#bdc661" />
      <path d="M96 40 L84 52 L58 120 Z" fill="#869245" />
      <path d="M58 120 C40 150 58 170 36 200 C30 210 22 214 14 220" fill="none" stroke="#a9579a" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M58 120 C50 160 66 176 44 206 C38 216 30 222 22 228" fill="none" stroke="#bdc661" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M58 120 C46 140 52 166 38 186" fill="none" stroke="#869245" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  )
}

/** Fechamento azul: logo, "Sua casa mais leve" e o botão de baixar. */
export default function Closing() {
  const [ref, visible] = useReveal()

  return (
    <section ref={ref} className={`closing${visible ? ' is-visible' : ''}`} aria-labelledby="closing-title">
      <PurpleKite className="closing__kite closing__kite--left" />
      <img className="closing__kite closing__kite--right" src={tradicional} alt="" />

      <div className="closing__content">
        <img className="closing__logo" src={wordmark} alt="pipa" width="446" height="203" />
        <h2 id="closing-title" className="closing__title">
          Sua casa mais leve
        </h2>
        <p className="closing__text">Baixe o Pipa, chame quem mora com você e deixe a divisão com a gente!</p>
        <a className="pill-button closing__cta" href={APP_STORE_URL} target="_blank" rel="noreferrer">
          Baixar o Pipa
        </a>
      </div>
    </section>
  )
}
