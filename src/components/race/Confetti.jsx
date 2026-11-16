import { useMemo } from 'react'

const COLORS = ['#e75e3d', '#e1ae36', '#476aa0', '#a9529a', '#869245']

/** Confete de tracinhos coloridos para comemorar a vitória. */
export default function Confetti({ count = 60 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 2.4,
        duration: 2.6 + Math.random() * 2.2,
        rotate: -40 + Math.random() * 80,
        color: COLORS[i % COLORS.length],
      })),
    [count],
  )

  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((piece, i) => (
        <span
          key={i}
          className="confetti__piece"
          style={{
            left: `${piece.left}%`,
            background: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            '--rotate': `${piece.rotate}deg`,
          }}
        />
      ))}
    </div>
  )
}
