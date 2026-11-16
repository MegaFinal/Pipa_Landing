import { useState } from 'react'
import stove from '../../../assets/icons/stove-pans.webp'
import bed from '../../../assets/icons/bed.webp'
import shower from '../../../assets/icons/shower.webp'
import laptop from '../../../assets/icons/laptop.webp'
import pantry from '../../../assets/icons/pantry.webp'
import clothesline from '../../../assets/icons/clothesline.webp'
import basket from '../../../assets/icons/basket.webp'
import './Clothesline.css'

/** Corda que cai no meio (mesma conta do Rope do app): altura em `x` (0–1). */
const ropeY = (rope, x) => rope.start + (rope.end - rope.start) * x + 4 * rope.sag * x * (1 - x)

const ROPES = [
  { start: 30, end: 13, sag: 4 },
  { start: 61, end: 68, sag: 6 },
]

// mesmas inclinações do ClotheslineCarousel do app
const TILTS = [-6, 3, -2, 6]

const TILES = [
  { rope: 0, x: 0.13, icon: stove, label: 'Lavar louça', color: 'var(--magenta)', pin: '#d88ad0' },
  { rope: 0, x: 0.4, icon: bed, label: 'Trocar o lençol', color: 'var(--orange)', pin: '#f4a08a' },
  { rope: 0, x: 0.65, icon: null, label: 'Nova tarefa', color: '#f3dfa8', pin: '#f0cc72', empty: true },
  { rope: 0, x: 0.9, icon: shower, label: 'Limpar o banheiro', color: 'var(--blue)', pin: '#8db4e8' },
  { rope: 1, x: 0.1, icon: shower, label: 'Lavar o box', color: 'var(--blue)', pin: '#8db4e8' },
  { rope: 1, x: 0.38, icon: pantry, label: 'Organizar a despensa', color: 'var(--yellow)', pin: '#f3d27a' },
  { rope: 1, x: 0.64, icon: clothesline, label: 'Estender a roupa', color: 'var(--orange)', pin: '#f4a08a' },
  { rope: 1, x: 0.9, icon: basket, label: 'Lavar a roupa', color: 'var(--magenta)', pin: '#d88ad0' },
]

/**
 * Varal de tarefas: passar o mouse balança a peça presa no prendedor;
 * clicar "pega" a tarefa e mostra os pontos ganhos, como no app.
 */
export default function Clothesline() {
  const [taken, setTaken] = useState(() => new Set())
  const [laptopHung, setLaptopHung] = useState(false)

  const toggle = (index) =>
    setTaken((current) => {
      const next = new Set(current)
      next.has(index) ? next.delete(index) : next.add(index)
      return next
    })

  return (
    <div className="varal">
      <div className="varal__board" />

      <svg className="varal__ropes" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {ROPES.map((rope, i) => (
          <path
            key={i}
            d={`M -2 ${rope.start} Q 50 ${2 * ropeY(rope, 0.5) - (rope.start + rope.end) / 2} 102 ${rope.end}`}
            fill="none"
            stroke="#1c1c1e"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {/* peça que alguém acabou de notar: entra pendurada quando você clica no espaço vazio */}
      <ul className="varal__tiles">
        {TILES.map((tile, index) => {
          const rope = ROPES[tile.rope]
          const isTaken = taken.has(index)
          const showLaptop = tile.empty && laptopHung
          return (
            <li
              key={index}
              className="varal__slot"
              style={{ left: `${tile.x * 100}%`, top: `${ropeY(rope, tile.x)}%`, '--tilt': `${TILTS[index % TILTS.length]}deg` }}
            >
              <button
                type="button"
                className={`varal-tile${tile.empty && !showLaptop ? ' is-empty' : ''}${isTaken ? ' is-taken' : ''}`}
                style={{ '--tile-color': showLaptop ? 'var(--yellow)' : tile.color, '--pin-color': showLaptop ? '#f3d27a' : tile.pin }}
                onClick={() => (tile.empty && !showLaptop ? setLaptopHung(true) : toggle(index))}
                aria-pressed={tile.empty && !showLaptop ? undefined : isTaken}
                aria-label={tile.empty && !showLaptop ? 'Pendurar uma tarefa nova no varal' : `${showLaptop ? 'Arrumar a escrivaninha' : tile.label}${isTaken ? ' (pega por você)' : ''}`}
              >
                <span className="varal-tile__pin" />
                <span className="varal-tile__body">
                  {(tile.icon || showLaptop) && <img src={showLaptop ? laptop : tile.icon} alt="" />}
                  {tile.empty && !showLaptop && <span className="varal-tile__plus">+</span>}
                </span>
                {isTaken && <span className="varal-tile__points">+10 pts</span>}
                {showLaptop && !isTaken && <span className="varal-tile__points varal-tile__points--notice">+5 pts</span>}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
