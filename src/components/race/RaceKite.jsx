/**
 * Uma pipa na corrida. O ponto `anchor` da imagem fica exatamente em (x, y),
 * que é também onde a linha começa — assim a rotação acontece em volta do nó.
 * Só a imagem gira; o balão "Você" continua de pé.
 */
export default function RaceKite({ kite, state, isPlayer }) {
  const { x, y, rotate, opacity } = state
  const origin = `${kite.anchor.x * 100}% ${kite.anchor.y * 100}%`

  return (
    <div
      className={`race-kite race-kite--${kite.id}${isPlayer ? ' is-player' : ''}`}
      style={{
        left: `${x}vw`,
        top: `${y}%`,
        '--kite-width': kite.width,
        opacity,
        transform: `translate(-${kite.anchor.x * 100}%, -${kite.anchor.y * 100}%)`,
      }}
    >
      {isPlayer && <span className="race-kite__tag">Você</span>}
      <div className="race-kite__body" style={{ transform: `rotate(${rotate}deg)`, transformOrigin: origin }}>
        <img className="race-kite__image" src={kite.image} alt={isPlayer ? `Sua pipa: ${kite.name}` : kite.name} />
      </div>
    </div>
  )
}
