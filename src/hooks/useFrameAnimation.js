import { useEffect, useState } from 'react'

/**
 * Índice do quadro de uma animação quadro a quadro, como a FrameAnimationView do app:
 * troca de quadro em intervalos fixos (sem interpolação), indo e voltando quando
 * `autoreverses` está ligado (0, 1 … último … 1, 0). Com "reduzir movimento",
 * fica parado em `stillFrame`.
 */
export default function useFrameAnimation({ frameCount, framesPerSecond, autoreverses = false, stillFrame = 0 }) {
  const [frame, setFrame] = useState(stillFrame)

  useEffect(() => {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || frameCount < 2) {
      setFrame(stillFrame)
      return undefined
    }

    const cycle = autoreverses ? 2 * (frameCount - 1) : frameCount
    let step = 0
    const timer = window.setInterval(() => {
      step = (step + 1) % cycle
      setFrame(step < frameCount ? step : cycle - step)
    }, 1000 / framesPerSecond)

    return () => window.clearInterval(timer)
  }, [frameCount, framesPerSecond, autoreverses, stillFrame])

  return frame
}
