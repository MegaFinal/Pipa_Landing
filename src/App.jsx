import { useCallback, useEffect, useState } from 'react'
import KiteRace from './components/race/KiteRace.jsx'
import LandingPage from './components/landing/LandingPage.jsx'
import { createRacePlan } from './race/raceEngine.js'
import { KITES } from './data/kites.js'

/**
 * Fluxo da página:
 *  select  → card "Escolha a sua pipa" (scroll travado)
 *  race    → corrida guiada pelo scroll, seguida da landing
 *  landing → só a landing tradicional (quando a pessoa pula a corrida)
 */
export default function App() {
  const [phase, setPhase] = useState('select')
  const [playerId, setPlayerId] = useState(null)
  const [plan, setPlan] = useState(null)

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
  }, [])

  useEffect(() => {
    document.body.classList.toggle('is-locked', phase === 'select')
    if (phase !== 'race') window.scrollTo({ top: 0 })
  }, [phase])

  const startRace = useCallback((id) => {
    setPlayerId(id)
    setPlan(createRacePlan(KITES.map((kite) => kite.id)))
    window.scrollTo({ top: 0 })
    setPhase('race')
  }, [])

  const skipRace = useCallback(() => setPhase('landing'), [])

  const restartRace = useCallback(() => {
    window.scrollTo({ top: 0 })
    setPlan(null)
    setPhase('select')
  }, [])

  const discoverPipa = useCallback(() => {
    document.getElementById('conhecer')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <>
      {phase !== 'landing' && (
        <KiteRace
          phase={phase}
          plan={plan}
          playerId={playerId}
          onSelect={startRace}
          onSkip={skipRace}
          onRestart={restartRace}
          onDiscover={discoverPipa}
        />
      )}
      <LandingPage showLogo={phase === 'landing'} />
    </>
  )
}
