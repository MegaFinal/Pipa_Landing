/** Aviãozinho que cruza as nuvens no meio da corrida. */
export default function Airplane({ className = '', style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 280 150" aria-hidden="true">
      <path d="M150 70 L120 18 C116 8 128 0 138 8 L178 70 Z" fill="#e2ae36" />
      <path d="M232 64 L256 22 C260 14 270 18 268 28 L258 70 Z" fill="#c9cde6" />
      <path d="M20 76 C20 60 70 52 150 52 C210 52 246 58 258 70 C262 84 246 92 224 98 C180 108 80 108 38 98 C26 94 20 86 20 76 Z" fill="#476aa0" />
      <path d="M38 98 C20 94 12 80 22 66 C30 58 44 56 50 60 C58 72 58 90 50 100 Z" fill="#e75e3d" />
      <path d="M118 62 C118 50 170 50 176 62 C176 72 120 74 118 62 Z" fill="#d6e1ee" />
      <path d="M128 60 C130 54 146 56 148 60 C146 66 130 66 128 60 Z" fill="#ffffff" />
      <path d="M150 84 L184 134 C190 144 204 138 200 126 L184 84 Z" fill="#e2ae36" />
      <path d="M236 82 L258 112 C262 118 270 114 268 106 L256 80 Z" fill="#d9a04a" opacity="0.9" />
    </svg>
  )
}
