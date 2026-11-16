/**
 * Linhas (cerol!) que ligam cada pipa até a mão de quem empina, fora da tela.
 * Uma linha cortada perde a ponta e cai enquanto some.
 */
export default function RaceLines({ kites, frame, playerId }) {
  return (
    <svg className="race-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {kites.map((kite) => {
        const state = frame.kites[kite.id]
        const { line } = state
        if (line.opacity <= 0) return null

        const isPlayer = kite.id === playerId
        // ponto de origem: onde a pipa estava quando a linha ainda estava presa
        const topX = state.x
        const topY = line.attached ? state.y : 52 + line.drop * 60
        const bottomX = topX + (topX - 50) * 0.18
        const sag = line.attached ? 2 : 6 + line.drop * 10

        return (
          <path
            key={kite.id}
            d={`M ${topX} ${topY} Q ${(topX + bottomX) / 2 + sag * 0.3} ${(topY + 110) / 2} ${bottomX} 112`}
            fill="none"
            stroke={isPlayer ? '#322e2e' : '#b8b3c4'}
            strokeWidth={isPlayer ? 3 : 2.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity={line.opacity}
          />
        )
      })}
    </svg>
  )
}
