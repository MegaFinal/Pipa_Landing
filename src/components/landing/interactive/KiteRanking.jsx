import { useState } from 'react'
import Cloud from '../../sky/Cloud.jsx'
import useFrameAnimation from '../../../hooks/useFrameAnimation.js'
import sprite from '../../../assets/animation/kites-sprite.webp'
import doubleBed from '../../../assets/icons/double-bed.webp'
import stove from '../../../assets/icons/stove-pans.webp'
import './KiteRanking.css'

// mesma configuração do LoadingAnimation.kites no app
const KITES_ANIMATION = { frameCount: 16, framesPerSecond: 12, autoreverses: true, stillFrame: 0 }

const LEVELS = [
  { name: 'Pipa dragão chinês' },
  { name: 'Pipa andorinha', current: true },
  { name: 'Pipa delta' },
]

const PASSES = [
  { id: 'sheet', title: 'Change the sheet', icon: doubleBed, color: '#a9579a' },
  { id: 'dishes', title: 'Wash the dishes', icon: stove, color: '#dcb04a' },
]

/** Formato do passe: cantos para dentro e recortes laterais na altura do canhoto. */
const TICKET_PATH =
  'M14 0 H216 A14 14 0 0 0 230 14 V246 A11 11 0 0 0 230 268 V332 A14 14 0 0 0 216 346 H14 A14 14 0 0 0 0 332 V268 A11 11 0 0 0 0 246 V14 A14 14 0 0 0 14 0 Z'

/**
 * Card da gamificação: as pessoas empinando pipa (a animação de carregamento do
 * app, quadro a quadro), a trilha de níveis e os passes livres.
 * Os passes se afastam no hover e o clicado vem para a frente.
 */
export default function KiteRanking() {
  const [front, setFront] = useState('dishes')
  const frame = useFrameAnimation(KITES_ANIMATION)
  const position = (frame / (KITES_ANIMATION.frameCount - 1)) * 100

  return (
    <div className="ranking">
      {[1, 2, 3, 4, 5, 6, 7].map((n) => (
        <Cloud key={n} className={`ranking__cloud ranking__cloud--${n}`} />
      ))}

      <div
        className="ranking__kites"
        role="img"
        aria-label="Duas pessoas empinando pipas"
        style={{ backgroundImage: `url(${sprite})`, backgroundPosition: `${position}% 0` }}
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

      {PASSES.map((pass) => (
        <button
          key={pass.id}
          type="button"
          className={`pass pass--${pass.id}${front === pass.id ? ' is-front' : ''}`}
          onClick={() => setFront(pass.id)}
          aria-pressed={front === pass.id}
          aria-label={`Passe livre: ${pass.title}, desbloqueia em Master of the House`}
        >
          <svg className="pass__shape" viewBox="0 0 230 346" aria-hidden="true">
            <path d={TICKET_PATH} fill={pass.color} />
            <line x1="12" y1="257" x2="218" y2="257" stroke="#fff" strokeWidth="2.5" strokeDasharray="9 7" />
          </svg>
          <span className="pass__title">{pass.title}</span>
          <img className="pass__icon" src={pass.icon} alt="" />
          <span className="pass__stub">
            unlock at
            <strong>Master of the House</strong>
          </span>
        </button>
      ))}
    </div>
  )
}
