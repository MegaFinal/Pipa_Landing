/**
 * Nuvem fofinha com sombra lilás deslocada, no estilo dos protótipos.
 * `tone` controla a cor: "day" (branca) ou "dusk" (lilás do entardecer).
 */
const TONES = {
  day: { body: '#f7f5fb', light: '#ffffff', shadow: '#dcd7eb' },
  dusk: { body: '#e3ddec', light: '#ece8f3', shadow: '#c7c0dc' },
  night: { body: '#8d6b97', light: '#97779f', shadow: '#7a5d8a' },
}

const CLOUD_PATH =
  'M58 150 C18 150 4 118 22 96 C10 64 46 40 84 52 C96 18 150 8 196 30 C220 6 268 12 282 44 C318 50 330 86 312 110 C334 140 300 168 262 160 C238 186 150 186 124 166 C104 178 72 172 58 150 Z'

export default function Cloud({ tone = 'day', className = '', style }) {
  const c = TONES[tone] ?? TONES.day
  return (
    <svg className={className} style={style} viewBox="0 0 340 200" aria-hidden="true">
      <path d={CLOUD_PATH} fill={c.shadow} transform="translate(12 16)" />
      <path d={CLOUD_PATH} fill={c.body} />
      <path
        d="M30 92 C26 70 52 54 84 62 C98 30 150 22 192 42 C214 20 256 24 270 50"
        fill="none"
        stroke={c.light}
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  )
}
