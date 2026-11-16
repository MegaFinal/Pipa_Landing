/**
 * Uma pipa na corrida. O ponto `anchor` da imagem fica exatamente em (x, y),
 * que é também onde a linha começa — assim a rotação acontece em volta do nó.
 */
export default function RaceKite({ kite, state, isPlayer }) {
  const { x, y, rotate, opacity } = state

  return (
    <div
      className={`race-kite race-kite--${kite.id}${isPlayer ? ' is-player' : ''}`}
      style={{
        left: `${x}vw`,
        top: `${y}%`,
        width: `clamp(${kite.width * 3.2}px, ${kite.width}vw, ${kite.width * 14}px)`,
        opacity,
        transform: `translate(-${kite.anchor.x * 100}%, -${kite.anchor.y * 100}%) rotate(${rotate}deg)`,
        transformOrigin: `${kite.anchor.x * 100}% ${kite.anchor.y * 100}%`,
      }}
    >
      {isPlayer && <span className="race-kite__tag">Você</span>}
      <img className="race-kite__image" src={kite.image} alt={isPlayer ? `Sua pipa: ${kite.name}` : kite.name} />
    </div>
  )
}
