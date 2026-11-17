import { useState } from 'react'
import useReveal from '../../hooks/useReveal.js'
import { FREE_FEATURES, LIFETIME, PREMIUM_FEATURES, TIERS, formatPrice, quote } from '../../data/pricing.js'
import { APP_STORE_URL } from '../../config.js'
import './Pricing.css'

const PERIODS = [
  { id: 'annual', label: 'anual' },
  { id: 'monthly', label: 'mensal' },
]

function Segmented({ label, options, value, onChange }) {
  return (
    <div className="segmented" role="radiogroup" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          role="radio"
          aria-checked={value === option.id}
          className={value === option.id ? 'is-selected' : ''}
          onClick={() => onChange(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

function FeatureList({ items }) {
  return (
    <ul className="plan__features">
      {items.map((item) => (
        <li key={item}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="12" />
            <path d="M7 12.5 L10.5 16 L17 8.5" />
          </svg>
          {item}
        </li>
      ))}
    </ul>
  )
}

/**
 * Preços: um preço por casa. Escolher o tamanho da casa, o período e o
 * desconto de estudante atualiza o Premium na hora.
 */
export default function Pricing() {
  const [ref, visible] = useReveal(0.15)
  const [tierId, setTierId] = useState('medium')
  const [period, setPeriod] = useState('monthly')
  const [isStudent, setIsStudent] = useState(false)

  const tier = TIERS.find((t) => t.id === tierId)
  const { price, perResident, savings } = quote(tier, period, isStudent)

  // o desconto de estudante só existe no plano anual
  const choosePeriod = (next) => {
    setPeriod(next)
    if (next === 'monthly') setIsStudent(false)
  }
  const toggleStudent = () => {
    setIsStudent((current) => !current)
    setPeriod('annual')
  }

  return (
    <section ref={ref} className={`pricing${visible ? ' is-visible' : ''}`} aria-labelledby="pricing-title">
      <h2 id="pricing-title" className="pricing__title">
        Um preço por casa, não por pessoa
      </h2>
      <p className="pricing__lead">
        Um morador assina e todo mundo usa. Toda casa começa com 2 meses de tudo liberado, sem cartão.
      </p>

      <div className="pricing__controls">
        <span className="pricing__question" id="pricing-question">
          Quantas pessoas moram na sua casa?
        </span>
        <Segmented label="Quantas pessoas moram na sua casa?" options={TIERS} value={tierId} onChange={setTierId} />
        <Segmented label="Período" options={PERIODS} value={period} onChange={choosePeriod} />
      </div>

      <button
        type="button"
        role="checkbox"
        aria-checked={isStudent}
        className={`pricing__student${isStudent ? ' is-checked' : ''}`}
        onClick={toggleStudent}
      >
        <span className="pricing__radio" aria-hidden="true" />
        <span>
          <strong>Casa de estudante</strong>
          <small>-30% no plano anual</small>
        </span>
      </button>

      <div className="pricing__plans">
        <article className="plan plan--free">
          <h3 className="plan__name">Grátis</h3>
          <p className="plan__price">R$ 0</p>
          <FeatureList items={FREE_FEATURES} />
        </article>

        <article className="plan plan--premium">
          <span className="plan__badge">
            {period === 'monthly'
              ? 'Mais em conta no plano anual!'
              : isStudent
                ? 'Desconto de estudante aplicado!'
                : `Economize ${savings}% no plano anual`}
          </span>
          <h3 className="plan__name">Premium</h3>
          <p className="plan__price" aria-live="polite">
            <span key={`${tierId}-${period}-${isStudent}`} className="plan__amount">
              R$ {formatPrice(price)}
            </span>
            <span className="plan__period">{period === 'monthly' ? '/mês' : '/ano'}</span>
          </p>
          <p className="plan__per-resident">
            R$ {formatPrice(perResident)} por morador por mês, numa casa de {tier.example} pessoas
          </p>
          <FeatureList items={PREMIUM_FEATURES} />
        </article>
      </div>

      <p className="pricing__lifetime">
        Prefere pagar uma vez só?{' '}
        <a href={APP_STORE_URL} target="_blank" rel="noreferrer">
          Vitalício por R$ {formatPrice(LIFETIME)}
        </a>
        , que vai com você caso mude de casa.
      </p>
    </section>
  )
}
