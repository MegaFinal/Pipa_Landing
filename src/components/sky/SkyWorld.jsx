import Sun from './Sun.jsx'
import Sparkle from './Sparkle.jsx'
import Cloud from './Cloud.jsx'
import Rocket from './Rocket.jsx'
import Airplane from './Airplane.jsx'
import Hills from './Hills.jsx'
import './SkyWorld.css'

/** Altura do mundo em "telas". O céu rola de cima (noite) até os morros. */
export const WORLD_SCREENS = 6

// Posições em telas (y) e porcentagem da largura (x / w).
const STARS = [
  { x: 4, y: 0.14, s: 14 }, { x: 27, y: 0.1, s: 20 }, { x: 22, y: 0.26, s: 10 },
  { x: 39, y: 0.21, s: 16 }, { x: 34, y: 0.33, s: 18 }, { x: 46, y: 0.02, s: 22 },
  { x: 7, y: 0.36, s: 46 }, { x: 13, y: 0.4, s: 72 }, { x: 80, y: 0.33, s: 12 },
  { x: 84, y: 0.02, s: 22 }, { x: 89, y: 0.13, s: 90 }, { x: 86, y: 0.29, s: 50 },
  { x: 84, y: 0.47, s: 22 }, { x: 73, y: 0.63, s: 10 }, { x: 50, y: 0.67, s: 12 },
  { x: 32, y: 0.57, s: 26 }, { x: 56, y: 0.53, s: 22 }, { x: 95, y: 0.5, s: 14 },
]

const CLOUDS = [
  // entardecer
  { x: -12, y: 0.82, w: 70, tone: 'night' },
  { x: 32, y: 0.9, w: 64, tone: 'night' },
  { x: 60, y: 1.02, w: 60, tone: 'dusk' },
  { x: -18, y: 1.12, w: 80, tone: 'dusk' },
  { x: 62, y: 1.32, w: 52, tone: 'dusk' },
  // dia
  { x: -10, y: 1.6, w: 72, tone: 'day' },
  { x: 70, y: 1.72, w: 40, tone: 'day' },
  { x: 34, y: 1.95, w: 70, tone: 'day' },
  { x: 8, y: 2.3, w: 22, tone: 'day' },
  { x: 62, y: 2.25, w: 24, tone: 'day' },
  { x: 4, y: 2.55, w: 50, tone: 'day' },
  { x: 52, y: 2.82, w: 52, tone: 'day' },
  { x: 32, y: 2.98, w: 26, tone: 'day' },
  { x: -8, y: 3.3, w: 46, tone: 'day' },
  { x: 64, y: 3.45, w: 44, tone: 'day' },
  { x: 24, y: 3.75, w: 34, tone: 'day' },
  { x: 74, y: 4.05, w: 30, tone: 'day' },
  { x: -6, y: 4.25, w: 40, tone: 'day' },
  { x: 40, y: 4.5, w: 46, tone: 'day' },
  { x: 16, y: 5.04, w: 24, tone: 'day' },
  { x: 60, y: 4.92, w: 46, tone: 'day' },
]

const toTop = (screens) => `${(screens / WORLD_SCREENS) * 100}%`

export default function SkyWorld({ progress }) {
  const shift = progress * ((WORLD_SCREENS - 1) / WORLD_SCREENS) * 100

  return (
    <div className="sky-world" style={{ transform: `translate3d(0, -${shift}%, 0)` }} aria-hidden="true">
      <Sun className="sky-world__sun" />

      {STARS.map((star, i) => (
        <Sparkle
          key={i}
          className="sky-world__star"
          size={star.s}
          color={star.s > 40 ? '#d4bfa6' : '#e2d2b8'}
          style={{
            left: `${star.x}%`,
            top: toTop(star.y),
            width: `calc(${star.s} / 1440 * 100vw + ${star.s / 3}px)`,
            animationDelay: `${(i % 6) * 0.4}s`,
          }}
        />
      ))}

      <Rocket className="sky-world__rocket" />

      {CLOUDS.map((cloud, i) => (
        <Cloud
          key={i}
          tone={cloud.tone}
          className="sky-world__cloud"
          style={{ left: `${cloud.x}%`, top: toTop(cloud.y), width: `${cloud.w}%` }}
        />
      ))}

      <Airplane className="sky-world__airplane" />

      <Hills className="sky-world__hills" />
      <div className="sky-world__finish" />
    </div>
  )
}
