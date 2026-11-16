import useReveal from '../../hooks/useReveal.js'
import harvii from '../../assets/landing/harvii.webp'
import './Harvii.css'

const FEATURES = [
  { label: 'conexão por wi-fi', color: 'var(--green)' },
  { label: 'atualiza automaticamente', color: 'var(--magenta)' },
  { label: 'sem notificações', color: 'var(--orange)' },
  { label: 'tela e-paper', color: 'var(--blue)' },
]

/** Seção escura do Harvii, a telinha que mostra as tarefas do dia da casa. */
export default function Harvii() {
  const [ref, visible] = useReveal()

  return (
    <section ref={ref} className={`harvii${visible ? ' is-visible' : ''}`} aria-labelledby="harvii-title">
      <div className="harvii__text">
        <h2 id="harvii-title" className="harvii__title">
          Com o <span className="harvii__name">Harvii</span>, a casa toda vê o que é de quem
        </h2>
        <p className="harvii__lead">
          O Harvii é uma telinha que se conecta ao Pipa e mostra as tarefas do dia de todo mundo, sem precisar abrir o
          celular.
        </p>

        <ul className="harvii__features">
          {FEATURES.map((feature) => (
            <li key={feature.label} style={{ background: feature.color }}>
              {feature.label}
            </li>
          ))}
        </ul>

        <p className="harvii__price">
          <strong>R$ 550 reais</strong>
          <span>com 1 ano de Pipa Premium grátis para a casa</span>
        </p>
      </div>

      <div className="harvii__device">
        <img
          src={harvii}
          alt="Tela do Harvii com as tarefas do dia de Jones, Isabela, Carol, Anshu e Dayô"
          width="535"
          height="385"
          loading="lazy"
        />
      </div>
    </section>
  )
}
