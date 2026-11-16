import { useEffect, useState } from 'react'

/**
 * Progresso (0 → 1) do scroll dentro de um elemento alto com conteúdo sticky.
 * 0 = topo do elemento no topo da tela; 1 = fim do elemento no fim da tela.
 */
export default function useScrollProgress(ref, enabled = true) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!enabled) {
      setProgress(0)
      return undefined
    }

    let frame = 0
    const measure = () => {
      frame = 0
      const element = ref.current
      if (!element) return
      const rect = element.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const value = scrollable > 0 ? -rect.top / scrollable : 0
      setProgress(Math.min(1, Math.max(0, value)))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ref, enabled])

  return progress
}
