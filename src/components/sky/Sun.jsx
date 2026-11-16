/** Sol com raios em duas camadas (laranja e amarelo), como nos protótipos. */
function rays(count, inner, outer, cx, cy, offset = 0) {
  const points = []
  for (let i = 0; i < count * 2; i++) {
    const radius = i % 2 === 0 ? outer : inner
    const angle = (Math.PI * i) / count + offset
    points.push(`${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`)
  }
  return points.join(' ')
}

export default function Sun({ className = '', style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 400 400" aria-hidden="true">
      <g className="sun__rays">
        <polygon points={rays(18, 140, 196, 200, 200)} fill="#e47c32" />
        <polygon points={rays(18, 120, 168, 200, 200, Math.PI / 18)} fill="#e2ae36" />
      </g>
      <circle cx="200" cy="200" r="118" fill="#e2ae36" />
      <circle cx="200" cy="200" r="88" fill="#ffe8b2" />
    </svg>
  )
}
