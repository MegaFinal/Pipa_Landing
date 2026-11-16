/** Estrela de quatro pontas usada no céu noturno. */
export default function Sparkle({ size = 24, color = '#d9c3a6', style, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      style={style}
      aria-hidden="true"
    >
      <path
        d="M20 0 C21.6 12 28 18.4 40 20 C28 21.6 21.6 28 20 40 C18.4 28 12 21.6 0 20 C12 18.4 18.4 12 20 0 Z"
        fill={color}
      />
    </svg>
  )
}
