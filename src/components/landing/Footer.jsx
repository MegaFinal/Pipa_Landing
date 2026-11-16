import './Footer.css'

/** Rodapé simples da landing. */
export default function Footer() {
  return (
    <footer className="footer">
      <p>Pipa: para partilhar · feito na Apple Developer Academy | Mackenzie</p>
      <p>© {new Date().getFullYear()} Pipa</p>
    </footer>
  )
}
