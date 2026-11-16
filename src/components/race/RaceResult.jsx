import Confetti from './Confetti.jsx'

/** Tela da chegada: "Você ganhou!" (com confete) ou quem levou a corrida. */
export default function RaceResult({ visible, playerWon, winnerName, onRestart, onDiscover }) {
  return (
    <div className={`race-result${visible ? ' is-visible' : ''}`} aria-live="polite">
      {visible && playerWon && <Confetti />}

      <div className="race-result__heading">
        <h2 className="race-result__title">{playerWon ? 'Você ganhou!' : 'Você perdeu!'}</h2>
        {!playerWon && <p className="race-result__subtitle">A {winnerName} levou essa. Bora tentar de novo?</p>}
      </div>

      <div className="race-result__actions">
        <button type="button" className="pill-button pill-button--light" onClick={onRestart} tabIndex={visible ? 0 : -1}>
          Correr de novo
        </button>
        <button type="button" className="pill-button pill-button--dark" onClick={onDiscover} tabIndex={visible ? 0 : -1}>
          Conhecer o Pipa
        </button>
      </div>
    </div>
  )
}
