import { useEffect, useRef, useState } from 'react'

/** Marca o elemento como visível na primeira vez que ele entra na tela. */
export default function useReveal(threshold = 0.2) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || visible) return undefined
    if (!('IntersectionObserver' in window)) {
      setVisible(true)
      return undefined
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, visible])

  return [ref, visible]
}
