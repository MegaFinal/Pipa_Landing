import { useState } from 'react'
import stove from '../../../assets/icons/stove-pans.webp'
import doubleBed from '../../../assets/icons/double-bed.webp'
import toilet from '../../../assets/icons/toilet.webp'
import shower from '../../../assets/icons/shower.webp'
import laptop from '../../../assets/icons/laptop.webp'
import pantry from '../../../assets/icons/pantry.webp'
import clothesline from '../../../assets/icons/clothesline.webp'
import basket from '../../../assets/icons/basket.webp'
import './Clothesline.css'

/** Corda que cai no meio (mesma conta do Rope do app): altura em % para `x` de 0 a 1. */
const ropeY = (rope, x) => rope.start + (rope.end - rope.start) * x + 4 * rope.sag * x * (1 - x)

// medidas do protótipo (varal de 800 × 738)
const ROPES = [
  { start: 37.6, end: 17.3, sag: 4.2 },
  { start: 62, end: 67.8, sag: 5.4 },
]

const COLORS = {
  magenta: { tile: '#a9579a', pin: '#d595d2' },
  orange: { tile: '#e1694a', pin: '#eea492' },
  yellow: { tile: '#dcb04a', pin: '#f0d27e' },
  blue: { tile: '#4c6aa1', pin: '#97b6e8' },
}

const TILES = [
  { rope: 0, x: 0.12, tilt: -5, icon: stove, label: 'Lavar a louça', color: 'magenta' },
  { rope: 0, x: 0.39, tilt: 3, icon: doubleBed, label: 'Trocar a roupa de cama', color: 'orange' },
  { rope: 0, x: 0.645, tilt: 0, empty: true },
  { rope: 0, x: 0.905, tilt: 6, icon: toilet, label: 'Limpar o banheiro', color: 'blue' },
  { rope: 1, x: 0.105, tilt: -4, icon: shower, label: 'Lavar o box', color: 'blue' },
  { rope: 1, x: 0.375, tilt: 2, icon: pantry, label: 'Organizar a despensa', color: 'yellow' },
  { rope: 1, x: 0.63, tilt: -1, icon: clothesline, label: 'Estender a roupa', color: 'orange' },
  { rope: 1, x: 0.89, tilt: 5, icon: basket, label: 'Lavar a roupa', color: 'magenta' },
]

const EMPTY = TILES.findIndex((tile) => tile.empty)

function Tile({ tile, isTaken, onClick, label, points, className = '' }) {
  const color = COLORS[tile.color]
  return (
    <button
      type="button"
      className={`varal-tile${isTaken ? ' is-taken' : ''} ${className}`}
      style={{ '--tile-color': color.tile, '--pin-color': color.pin }}
      onClick={onClick}
      aria-pressed={isTaken}
      aria-label={label}
    >
      <span className="varal-tile__pin" />
      <span className="varal-tile__body">
        <img src={tile.icon} alt="" />
      </span>
      {points && <span className="varal-tile__points">{points}</span>}
    </button>
  )
}

/**
 * Varal de tarefas, como no app: passar o mouse balança a peça no prendedor e
 * clicar pega a tarefa (+10 pts). A tarefa nova paira acima do espaço vazio;
 * clicar nela a pendura no varal (+5 pts para quem notou).
 */
export default function Clothesline() {
  const [taken, setTaken] = useState(() => new Set())
  const [hung, setHung] = useState(false)

  const toggle = (index) =>
    setTaken((current) => {
      const next = new Set(current)
      next.has(index) ? next.delete(index) : next.add(index)
      return next
    })

  const slotStyle = (tile) => ({
    left: `${tile.x * 100}%`,
    top: `${ropeY(ROPES[tile.rope], tile.x)}%`,
    '--tilt': `${tile.tilt}deg`,
  })

  const newTask = { icon: laptop, color: 'yellow', label: 'Arrumar a escrivaninha' }

  return (
    <div className="varal">
      <div className="varal__board" />

      <svg className="varal__ropes" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {ROPES.map((rope, i) => (
          <path
            key={i}
            d={`M 0 ${rope.start} Q 50 ${2 * ropeY(rope, 0.5) - (rope.start + rope.end) / 2} 100 ${rope.end}`}
            fill="none"
            stroke="#1c1c1e"
            strokeWidth="2.4"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      <ul className="varal__tiles">
        {TILES.map((tile, index) => (
          <li key={index} className="varal__slot" style={slotStyle(tile)}>
            {tile.empty ? (
              hung ? (
                <Tile
                  tile={newTask}
                  className="is-just-hung"
                  isTaken={taken.has(index)}
                  onClick={() => toggle(index)}
                  label={newTask.label}
                  points={taken.has(index) ? '+10 pts' : '+5 pts'}
                />
              ) : (
                <span className="varal-tile varal-tile--empty" aria-hidden="true">
                  <span className="varal-tile__pin" />
                  <span className="varal-tile__body" />
                </span>
              )
            ) : (
              <Tile
                tile={{ ...tile }}
                isTaken={taken.has(index)}
                onClick={() => toggle(index)}
                label={`${tile.label}${taken.has(index) ? ' (pega por você)' : ''}`}
                points={taken.has(index) ? '+10 pts' : null}
              />
            )}
          </li>
        ))}
      </ul>

      {!hung && (
        <button
          type="button"
          className="varal__new"
          style={{ left: `${TILES[EMPTY].x * 100 + 2}%` }}
          onClick={() => setHung(true)}
          aria-label="Pendurar a tarefa nova no varal"
        >
          <span className="varal-tile__body" style={{ '--tile-color': COLORS.yellow.tile }}>
            <img src={laptop} alt="" />
          </span>
        </button>
      )}
    </div>
  )
}
