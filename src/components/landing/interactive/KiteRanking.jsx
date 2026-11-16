import { useState } from 'react'
import Cloud from '../../sky/Cloud.jsx'
import sprite from '../../../assets/animation/kites-sprite.webp'
import bed from '../../../assets/icons/bed.webp'
import stove from '../../../assets/icons/stove-pans.webp'
import './KiteRanking.css'

const LEVELS = [
  { name: 'Pipa dragão chinês' },
  { name: 'Pipa andorinha', current: true },
  { name: 'Pipa delta' },
]

const PASSES = [
  { id: 'sheet', title: 'Change the sheet', icon: bed, color: 'var(--magenta)' },
  { id: 'dishes', title: 'Wash the dishes', icon: stove, color: 'var(--yellow)' },
]

/**
 * Card da gamificação: as pessoas empinando pipa (a animação de carregamento do
 * app, em vai-e-volta a 12 fps), a trilha de níveis e os passes livres.
 * Os passes se abrem no hover e o clicado vem para a frente.
 */
export default function KiteRanking() {
  const [front, setFront] = useState('dishes')

  return (
    <div className="ranking">
      <Cloud className="ranking__cloud ranking__cloud--1" />
      <Cloud className="ranking__cloud ranking__cloud--2" />
      <Cloud className="ranking__cloud ranking__cloud--3" />
      <Cloud className="ranking__cloud ranking__cloud--4" />
      <Cloud className="ranking__cloud ranking__cloud--5" />

      <div
        className="ranking__kites"
        role="img"
        aria-label="Duas pessoas empinando pipas"
        style={{ backgroundImage: `url(${sprite})` }}
      />

      <ol className="ranking__levels" aria-label="Níveis">
        {LEVELS.map((level) => (
          <li key={level.name} className={level.current ? 'is-current' : ''}>
            <span className="ranking__dot" />
            <span className="ranking__level">{level.name}</span>
            {level.current && <span className="ranking__you">você</span>}
          </li>
        ))}
      </ol>

      <div className="ranking__passes">
        {PASSES.map((pass) => (
          <button
            key={pass.id}
            type="button"
            className={`pass pass--${pass.id}${front === pass.id ? ' is-front' : ''}`}
            style={{ '--pass-color': pass.color }}
            onClick={() => setFront(pass.id)}
            aria-pressed={front === pass.id}
            aria-label={`Passe livre: ${pass.title}, desbloqueia em Master of the House`}
          >
            <span className="pass__title">{pass.title}</span>
            <img className="pass__icon" src={pass.icon} alt="" />
            <span className="pass__stub">
              unlock at
              <strong>Master of the House</strong>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
