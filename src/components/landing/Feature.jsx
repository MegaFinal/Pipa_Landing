import useReveal from '../../hooks/useReveal.js'

/** Bloco de funcionalidade: etiqueta colorida, título, texto e ilustração. */
export default function Feature({ tag, tagColor, title, text, image, imageAlt, imageSide = 'right', flat = false }) {
  const [ref, visible] = useReveal()

  return (
    <article
      ref={ref}
      className={`feature feature--image-${imageSide}${visible ? ' is-visible' : ''}`}
    >
      <div className="feature__text">
        <span className="feature__tag" style={{ background: tagColor }}>
          {tag}
        </span>
        <h3 className="feature__title">{title}</h3>
        <p className="feature__body">{text}</p>
      </div>
      <img className={`feature__image${flat ? ' feature__image--flat' : ''}`} src={image} alt={imageAlt} loading="lazy" />
    </article>
  )
}
