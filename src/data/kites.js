import delta from '../assets/pipas/delta.png'
import bis14 from '../assets/pipas/bis14.png'
import tradicional from '../assets/pipas/tradicional.png'
import andorinha from '../assets/pipas/andorinha.png'

/**
 * Pipas disponíveis na corrida.
 * - `width`: largura relativa (em vw) na corrida
 * - `anchor`: ponto (0–1) da imagem onde a linha se prende
 */
export const KITES = [
  { id: 'delta', name: 'Delta', image: delta, width: 15, anchor: { x: 0.5, y: 0.45 } },
  { id: 'bis14', name: 'Bis 14', image: bis14, width: 21, anchor: { x: 0.47, y: 0.62 } },
  { id: 'tradicional', name: 'Tradicional', image: tradicional, width: 4.6, anchor: { x: 0.5, y: 0.36 } },
  { id: 'andorinha', name: 'Andorinha', image: andorinha, width: 15, anchor: { x: 0.5, y: 0.6 } },
]

export const kiteById = (id) => KITES.find((kite) => kite.id === id)
