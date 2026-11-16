import { useState } from 'react'
import useReveal from '../../../hooks/useReveal.js'
import './WeekChart.css'

const PEOPLE = [
  { id: 'voce', name: 'Você', color: 'var(--orange)' },
  { id: 'ana', name: 'Ana', color: 'var(--magenta)' },
  { id: 'joao', name: 'João', color: 'var(--blue)' },
  { id: 'bia', name: 'Bia', color: 'var(--yellow)' },
  { id: 'carlos', name: 'Carlos', color: 'var(--green)' },
]

// minutos de tarefa de cada pessoa por dia (de cima para baixo na coluna)
const WEEK = [
  { day: 'Seg', blocks: [['joao', 100], ['voce', 26]] },
  { day: 'Ter', blocks: [['ana', 26], ['carlos', 14]] },
  { day: 'Qua', blocks: [['bia', 18], ['joao', 40], ['ana', 26]] },
  { day: 'Qui', blocks: [['bia', 6]] },
  { day: 'Sex', blocks: [['voce', 12], ['bia', 58]] },
  { day: 'Sab', blocks: [['voce', 26], ['ana', 16], ['carlos', 120]] },
  { day: 'Dom', blocks: [['joao', 36], ['bia', 12], ['voce', 70]] },
]

const MAX = Math.max(...WEEK.map((d) => d.blocks.reduce((sum, [, v]) => sum + v, 0) + (d.blocks.length - 1) * 8))
const colorOf = (id) => PEOPLE.find((p) => p.id === id).color

/**
 * Semana dividida pelo Pipa. As colunas sobem quando aparecem na tela;
 * passar o mouse numa pessoa da legenda (ou num bloco) destaca as tarefas dela.
 */
export default function WeekChart() {
  const [ref, visible] = useReveal(0.3)
  const [focus, setFocus] = useState(null)

  return (
    <div ref={ref} className={`week${visible ? ' is-visible' : ''}${focus ? ' has-focus' : ''}`}>
      <div className="week__card">
        <div className="week__columns" role="img" aria-label="Tarefas da semana divididas entre Você, Ana, João, Bia e Carlos">
          {WEEK.map((column, c) => (
            <div key={column.day} className="week__column" style={{ '--delay': `${c * 70}ms` }}>
              <span className="week__day">{column.day}</span>
              <div className="week__stack">
                {column.blocks.map(([person, minutes], b) => (
                  <span
                    key={b}
                    className={`week__block${focus === person ? ' is-focused' : ''}`}
                    style={{ height: `${(minutes / MAX) * 100}%`, background: colorOf(person) }}
                    onMouseEnter={() => setFocus(person)}
                    onMouseLeave={() => setFocus(null)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ul className="week__legend">
        {PEOPLE.map((person) => (
          <li key={person.id}>
            <button
              type="button"
              className={focus === person.id ? 'is-focused' : ''}
              onMouseEnter={() => setFocus(person.id)}
              onMouseLeave={() => setFocus(null)}
              onFocus={() => setFocus(person.id)}
              onBlur={() => setFocus(null)}
              onClick={() => setFocus((current) => (current === person.id ? null : person.id))}
            >
              <i style={{ background: person.color }} />
              {person.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
