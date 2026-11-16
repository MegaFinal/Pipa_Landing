import { useMemo, useRef, useState } from 'react'
import Logo from '../Logo.jsx'
import SkyWorld from '../sky/SkyWorld.jsx'
import KiteSelector from './KiteSelector.jsx'
import RaceKite from './RaceKite.jsx'
import RaceLines from './RaceLines.jsx'
import RaceResult from './RaceResult.jsx'
import useScrollProgress from '../../hooks/useScrollProgress.js'
import { getRaceFrame } from '../../race/raceEngine.js'
import { KITES, kiteById } from '../../data/kites.js'
import './KiteRace.css'

const LEAVE_DURATION = 450

/**
 * Primeira dobra: escolha da pipa e corrida guiada pelo scroll.
 * Em `select` a página fica travada no card; em `race` o scroll move o céu.
 */
export default function KiteRace({ phase, plan, playerId, onSelect, onSkip, onRestart, onDiscover }) {
  const sectionRef = useRef(null)
  const [leaving, setLeaving] = useState(false)
  const racing = phase === 'race' && plan
  const progress = useScrollProgress(sectionRef, Boolean(racing))
  const frame = useMemo(() => (racing ? getRaceFrame(plan, progress) : null), [racing, plan, progress])

  const handleSelect = (id) => {
    setLeaving(true)
    window.setTimeout(() => {
      setLeaving(false)
      onSelect(id)
    }, LEAVE_DURATION)
  }

  const isNight = progress < 0.14
  const winner = plan ? kiteById(plan.winner) : null

  return (
    <section
      id="topo"
      ref={sectionRef}
      className={`kite-race${racing ? ' is-racing' : ''}`}
      aria-label="Corrida de pipas"
    >
      <div className="kite-race__viewport">
        <SkyWorld progress={progress} />

        {racing && (
          <>
            <RaceLines kites={KITES} frame={frame} playerId={playerId} />
            <div className="kite-race__kites">
              {KITES.map((kite) => (
                <RaceKite key={kite.id} kite={kite} state={frame.kites[kite.id]} isPlayer={kite.id === playerId} />
              ))}
            </div>

            {frame.bubbles.map((bubble) => (
              <span
                key={bubble.id}
                className="kite-race__bubble"
                style={{ left: `${bubble.x}vw`, top: `${bubble.y}%` }}
              >
                {bubble.label}
              </span>
            ))}

            <p className={`kite-race__hint${progress > 0.02 ? ' is-hidden' : ''}`}>arraste para começar</p>

            <button type="button" className={`kite-race__skip${isNight ? '' : ' is-day'}`} onClick={onSkip}>
              pular corrida
            </button>

            <RaceResult
              visible={frame.finished}
              playerWon={plan.winner === playerId}
              winnerName={winner?.name}
              onRestart={onRestart}
              onDiscover={onDiscover}
            />
          </>
        )}

        {phase === 'select' && (
          <div className={leaving ? 'kite-race__selector is-leaving' : 'kite-race__selector'}>
            <KiteSelector onSelect={handleSelect} onSkip={onSkip} />
          </div>
        )}

        <Logo className="kite-race__logo" color={isNight ? 'var(--white)' : 'var(--blue-light)'} />
      </div>
    </section>
  )
}
