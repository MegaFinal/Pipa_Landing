import { useState } from 'react'
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion'
import food from '../../../assets/icons/food.webp'
import drinks from '../../../assets/icons/drinks.webp'
import fruit from '../../../assets/icons/fruit.webp'
import avatar from '../../../assets/icons/avatar.webp'
import './ShoppingList.css'

const SECTIONS = [
  {
    id: 'alimentos',
    title: 'Alimentos',
    icon: food,
    color: 'var(--orange)',
    items: [
      { name: 'Arroz', amount: '1 pacote' },
      { name: 'Feijão', amount: '2 pacotes' },
      { name: 'Ovos', amount: '12 unidades' },
      { name: 'Macarrão', amount: '3 pacotes' },
    ],
  },
  {
    id: 'bebidas',
    title: 'Bebidas',
    icon: drinks,
    color: 'var(--yellow)',
    items: [
      { name: 'Café', amount: '1 pacote' },
      { name: 'Leite', amount: '6 caixas' },
      { name: 'Suco de uva', amount: '2 garrafas' },
      { name: 'Água com gás', amount: '4 garrafas' },
    ],
  },
  {
    id: 'hortifrut',
    title: 'Hortifrut',
    icon: fruit,
    color: 'var(--green)',
    items: [
      { name: 'Alface', amount: '1 unidade' },
      { name: 'Laranja', amount: '6 unidades' },
      { name: 'Maçã', amount: '3 unidades' },
      { name: 'Maracujá', amount: '2 unidades' },
    ],
  },
]

// Mesma mola do app (ShopSectionStack.moveAnimation: response 0.5, damping 0.86)
const SPRING = { type: 'spring', duration: 0.5, bounce: 0.14 }

/**
 * Lista de compras empilhada como pastas, igual ao app: as categorias fechadas
 * ficam por cima, encavaladas; as abertas descem para o fim e mostram os itens.
 */
export default function ShoppingList() {
  const [open, setOpen] = useState(() => new Set(['hortifrut']))
  const [checked, setChecked] = useState(() => new Set())
  const reduceMotion = useReducedMotion()
  const transition = reduceMotion ? { duration: 0 } : SPRING

  const toggleSection = (id) =>
    setOpen((current) => {
      const next = new Set(current)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const toggleItem = (key) =>
    setChecked((current) => {
      const next = new Set(current)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })

  // fechadas primeiro (encavaladas), abertas no fim — como stackEntries(for:) no app
  const closed = SECTIONS.filter((section) => !open.has(section.id))
  const opened = SECTIONS.filter((section) => open.has(section.id))
  const entries = [
    ...closed.map((section, index) => ({ section, isOpen: false, overlapsNext: index < closed.length - 1 || opened.length > 0 })),
    ...opened.map((section, index) => ({ section, isOpen: true, joinsAbove: index > 0 })),
  ]

  return (
    <div className="shop">
      <motion.span
        className="shop__sticker"
        initial={{ rotate: -8 }}
        whileHover={{ rotate: -4, scale: 1.06 }}
        transition={{ type: 'spring', stiffness: 400, damping: 12 }}
      >
        o sabonete acabou!
      </motion.span>

      <LayoutGroup>
        <div className="shop__stack">
          {entries.map(({ section, isOpen, overlapsNext, joinsAbove }, index) => {
            const remaining = section.items.filter((item) => !checked.has(`${section.id}:${item.name}`)).length
            return (
              <motion.section
                key={section.id}
                layout
                transition={transition}
                className={`shop-card${isOpen ? ' is-open' : ''}${overlapsNext ? ' overlaps-next' : ''}${joinsAbove ? ' joins-above' : ''}`}
                style={{ zIndex: index + 1, '--card-color': section.color }}
              >
                <motion.button
                  layout="position"
                  transition={transition}
                  type="button"
                  className="shop-card__header"
                  aria-expanded={isOpen}
                  aria-controls={`shop-${section.id}`}
                  onClick={() => toggleSection(section.id)}
                >
                  <img className="shop-card__icon" src={section.icon} alt="" />
                  <span className="shop-card__title">{section.title}</span>
                  <span className="shop-card__count">{remaining}</span>
                  <svg className="shop-card__chevron" viewBox="0 0 16 10" aria-hidden="true">
                    <path d="M2 2 L8 8 L14 2" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.ul
                      id={`shop-${section.id}`}
                      className="shop-card__items"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={transition}
                    >
                      {section.items.map((item) => {
                        const key = `${section.id}:${item.name}`
                        const done = checked.has(key)
                        return (
                          <li key={key} className={`shop-item${done ? ' is-done' : ''}`}>
                            <img className="shop-item__avatar" src={avatar} alt="" />
                            <span className="shop-item__text">
                              <span className="shop-item__name">{item.name}</span>
                              <span className="shop-item__amount">{item.amount}</span>
                            </span>
                            <button
                              type="button"
                              className="shop-item__check"
                              role="checkbox"
                              aria-checked={done}
                              aria-label={`Comprado: ${item.name}`}
                              onClick={() => toggleItem(key)}
                            >
                              <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 12.5 L10.2 16.5 L18 8" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                          </li>
                        )
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.section>
            )
          })}
        </div>
      </LayoutGroup>
    </div>
  )
}
