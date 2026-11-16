/** Morros verdes do fim da corrida (dois tons, como nos protótipos). */
export default function Hills({ className = '', style }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 1440 600"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M260 600 C380 300 1000 90 1440 70 L1440 600 Z" fill="#869245" />
      <path d="M0 250 C380 250 1100 420 1440 560 L1440 600 L0 600 Z" fill="#bdc661" />
    </svg>
  )
}
