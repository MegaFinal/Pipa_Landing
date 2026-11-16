import { KITES } from '../../data/kites.js'
import './KiteSelector.css'

/** Card "Escolha a sua pipa" com a opção de pular a corrida. */
export default function KiteSelector({ onSelect, onSkip }) {
  return (
    <div className="kite-selector" role="dialog" aria-labelledby="kite-selector-title">
      <h1 id="kite-selector-title" className="kite-selector__title">
        Escolha a sua pipa
      </h1>

      <ul className="kite-selector__list">
        {KITES.map((kite) => (
          <li key={kite.id} className={`kite-selector__item kite-selector__item--${kite.id}`}>
            <button type="button" className="kite-selector__option" onClick={() => onSelect(kite.id)}>
              <span className="kite-selector__image">
                <img src={kite.image} alt="" />
              </span>
              <span className="kite-selector__name">{kite.name}</span>
            </button>
          </li>
        ))}
      </ul>

      <button type="button" className="kite-selector__skip" onClick={onSkip}>
        pular
      </button>
    </div>
  )
}
