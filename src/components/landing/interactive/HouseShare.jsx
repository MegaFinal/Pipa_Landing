import { useEffect, useRef, useState } from 'react'
import './HouseShare.css'

const CURRENT = 25
const IDEAL = 32

/**
 * Cor da sua parte, com a mesma regra do app (BarPercentageComponent):
 * bem abaixo do ideal laranja, abaixo amarelo, no ideal verde, acima azul, bem acima roxo.
 */
function shareColor(share, ideal) {
  if (share < ideal * 0.5) return 'var(--orange)'
  if (share < ideal) return 'var(--yellow)'
  if (share <= ideal * 1.2) return 'var(--green)'
  if (share <= ideal * 1.5) return 'var(--blue)'
  return 'var(--magenta)'
}

/** Card "Divisão da casa": ao passar o mouse (ou tocar), a barra enche até o ideal. */
export default function HouseShare() {
  const [target, setTarget] = useState(CURRENT)
  const [shown, setShown] = useState(CURRENT)
  const frame = useRef(0)

  // conta os números até o alvo, acompanhando a barra
  useEffect(() => {
    const from = shown
    const start = performance.now()
    const duration = 700
    cancelAnimationFrame(frame.current)
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setShown(from + (target - from) * eased)
      if (t < 1) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target])

  const fill = () => setTarget(IDEAL)
  const reset = () => setTarget(CURRENT)
  const reached = target === IDEAL

  return (
    <div
      className={`share${reached ? ' is-ideal' : ''}`}
      onMouseEnter={fill}
      onMouseLeave={reset}
      onFocus={fill}
      onBlur={reset}
      onClick={() => setTarget(reached ? CURRENT : IDEAL)}
      tabIndex={0}
      role="group"
      aria-label={`Divisão da casa: ${Math.round(shown)}% do esforço mental da casa esta semana foi seu, ideal ${IDEAL}%`}
    >
      <div className="share__card">
        <h4 className="share__title">Divisão da casa</h4>
        <p className="share__text">O trabalho de notar, lembrar, decidir e acompanhar é tão importante quanto realizar uma tarefa</p>

        <div className="share__value">
          <span className="share__percent">{Math.round(shown)}%</span>
          <span className="share__caption">
            {reached ? 'do esforço mental da casa: a divisão ideal!' : 'do esforço mental da casa esta semana foi seu'}
          </span>
        </div>

        <div className="share__bar" aria-hidden="true">
          <span
            className="share__fill"
            style={{ width: `${shown}%`, background: shareColor(Math.round(shown), IDEAL) }}
          />
          <span className="share__ideal" style={{ left: `${IDEAL}%` }}>
            <span className="share__ideal-label">ideal {IDEAL}%</span>
          </span>
        </div>

        <div className="share__legend" aria-hidden="true">
          <span>
            <i style={{ background: shareColor(Math.round(shown), IDEAL) }} /> você
          </span>
          <span>
            <i className="share__legend-rest" /> resto da casa
          </span>
        </div>
      </div>
      <span className="share__hint" aria-hidden="true">
        {reached ? 'é isso aí 🎉' : 'passe o mouse'}
      </span>
    </div>
  )
}
