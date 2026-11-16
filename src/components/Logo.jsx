import logoUrl from '../assets/brand/logo.png'
import './Logo.css'

/**
 * Logo do Pipa. A imagem é usada como máscara para que a cor
 * acompanhe o fundo (branco no céu noturno, azul no céu de dia).
 */
export default function Logo({ color = 'var(--white)', className = '' }) {
  return (
    <a href="#topo" className={`logo ${className}`} aria-label="Pipa — para partilhar">
      <span
        className="logo__mark"
        style={{
          backgroundColor: color,
          WebkitMaskImage: `url(${logoUrl})`,
          maskImage: `url(${logoUrl})`,
        }}
      />
    </a>
  )
}
