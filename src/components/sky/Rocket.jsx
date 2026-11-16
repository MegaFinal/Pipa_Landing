/** Foguete inclinado que decora o céu noturno. */
export default function Rocket({ className = '', style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 300 260" aria-hidden="true">
      <g transform="rotate(-28 150 130)">
        {/* chama */}
        <path d="M22 130 C10 104 30 92 44 100 C40 80 66 78 72 98 L72 162 C66 182 40 180 44 160 C30 168 10 156 22 130 Z" fill="#e2ae36" />
        {/* aletas */}
        <path d="M110 84 C96 40 120 18 150 20 L170 86 Z" fill="#e75e3d" />
        <path d="M110 176 C96 220 120 242 150 240 L170 174 Z" fill="#e75e3d" />
        {/* corpo */}
        <path d="M64 130 C64 92 120 70 200 72 C250 74 286 104 292 130 C286 156 250 186 200 188 C120 190 64 168 64 130 Z" fill="#f7f6f6" />
        <path d="M64 130 C64 150 100 174 160 182 C110 170 80 152 80 130 Z" fill="#e3e1e4" />
        <path d="M238 78 C266 90 286 108 292 130 C286 152 266 170 238 182 C252 160 256 100 238 78 Z" fill="#e75e3d" />
        {/* janela */}
        <circle cx="170" cy="130" r="34" fill="#e75e3d" />
        <circle cx="170" cy="130" r="22" fill="#d6e1ee" />
      </g>
    </svg>
  )
}
