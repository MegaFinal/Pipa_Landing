/**
 * Motor da corrida de pipas.
 *
 * A corrida é uma função pura do progresso do scroll (0 → 1): dado um plano
 * sorteado no início, `getRaceFrame` devolve onde cada pipa está, quem já foi
 * cortada e quais balões aparecem. Assim rolar para cima "rebobina" a corrida.
 */

/** Momentos (progresso) em que cada pipa é eliminada. */
export const ELIMINATION_TIMES = [0.24, 0.44, 0.64]
const APPROACH = 0.07 // quanto antes do corte a pipa atacante se aproxima
const FLIGHT = 0.14 // duração do voo da pipa cortada
const RELAYOUT = [0.01, 0.09] // reorganização das raias depois do corte
const CENTER_WINNER = [0.78, 0.9]
export const RESULT_AT = 0.9

const EVENT_TYPES = [
  { type: 'cut', label: 'cortou!' },
  { type: 'cut', label: 'cortou!' },
  { type: 'tangle', label: 'embolou!' },
]

/** Raias (em % da largura) para cada quantidade de pipas no ar. */
const LANES = {
  4: [20, 46, 66, 80],
  3: [20, 50, 78],
  2: [32, 68],
  1: [50],
}

const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v))
const lerp = (a, b, t) => a + (b - a) * t
const ease = (t) => {
  const c = clamp(t)
  return c * c * (3 - 2 * c)
}
const progressIn = (p, start, end) => clamp((p - start) / (end - start))

function shuffle(list, random) {
  const copy = [...list]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/**
 * Sorteia o vencedor e a ordem dos cortes.
 * @param {string[]} kiteIds pipas na ordem das raias
 * @param {() => number} random gerador (injetável para testes)
 */
export function createRacePlan(kiteIds, random = Math.random) {
  const winner = kiteIds[Math.floor(random() * kiteIds.length)]
  const losers = shuffle(
    kiteIds.filter((id) => id !== winner),
    random,
  )

  let alive = [...kiteIds]
  const events = losers.map((victim, index) => {
    const position = alive.indexOf(victim)
    // quem corta é sempre uma vizinha de raia, para as linhas se cruzarem
    const neighbours = [alive[position - 1], alive[position + 1]].filter(Boolean)
    const cutter = neighbours[Math.floor(random() * neighbours.length)]
    const kind = EVENT_TYPES[Math.floor(random() * EVENT_TYPES.length)]
    const before = alive
    alive = alive.filter((id) => id !== victim)

    return {
      ...kind,
      victim,
      cutter,
      at: ELIMINATION_TIMES[index],
      before,
      after: alive,
      // a pipa cortada foge para o lado oposto de quem cortou
      direction: kiteIds.indexOf(cutter) < kiteIds.indexOf(victim) ? 1 : -1,
    }
  })

  return {
    kiteIds,
    winner,
    events,
    phases: Object.fromEntries(kiteIds.map((id, i) => [id, i * 1.7 + random()])),
  }
}

function laneX(order, id) {
  const lanes = LANES[order.length] ?? LANES[1]
  return lanes[order.indexOf(id)]
}

/** Posição de base (sem efeitos) de uma pipa ainda no ar. */
function baseX(plan, id, p) {
  let x = laneX(plan.kiteIds, id)
  for (const event of plan.events) {
    if (!event.after.includes(id)) break
    const t = ease(progressIn(p, event.at + RELAYOUT[0], event.at + RELAYOUT[1]))
    x = lerp(x, laneX(event.after, id), t)
  }
  return x
}

/**
 * Estado de todas as pipas num dado progresso.
 * Retorna `{ kites: {id: {...}}, bubbles: [...], finished }`.
 */
export function getRaceFrame(plan, p) {
  const kites = {}
  const bubbles = []

  for (const id of plan.kiteIds) {
    const phase = plan.phases[id]
    const wave = 1 - progressIn(p, 0.7, 0.85) // ondulação some perto da chegada
    kites[id] = {
      x: baseX(plan, id, p),
      y: 52 + Math.sin(p * 22 + phase) * 3.2 * wave,
      rotate: Math.sin(p * 30 + phase) * 4 * wave,
      opacity: 1,
      line: { attached: true, drop: 0, opacity: 1 },
    }
  }

  for (const event of plan.events) {
    const cutter = kites[event.cutter]
    const victim = kites[event.victim]
    const approach = ease(progressIn(p, event.at - APPROACH, event.at - 0.015))
    const release = ease(progressIn(p, event.at, event.at + 0.07))
    const pull = approach * (1 - release)

    // a atacante avança em direção à vítima até as linhas se cruzarem
    const target = victim.x - event.direction * 7
    cutter.x = lerp(cutter.x, target, pull)
    cutter.rotate += pull * -event.direction * 10

    if (event.type === 'tangle') {
      victim.rotate += Math.sin(p * 260) * 14 * pull
      cutter.rotate += Math.sin(p * 260 + 1) * 10 * pull
    }

    if (p >= event.at) {
      const flight = progressIn(p, event.at, event.at + FLIGHT)
      victim.line = { attached: false, drop: flight, opacity: 1 - progressIn(flight, 0.1, 0.6) }
      victim.opacity = 1 - progressIn(flight, 0.55, 1)

      if (event.type === 'cut') {
        // pipa cortada sobe com o vento e vai embora girando
        victim.x += event.direction * 38 * ease(flight)
        victim.y -= 40 * flight
        victim.rotate += event.direction * 200 * flight
      } else {
        // pipa embolada cai rodopiando
        victim.x += event.direction * 10 * flight
        victim.y += 70 * flight * flight
        victim.rotate += event.direction * 540 * flight
      }
    }

    const bubbleVisible = p > event.at - 0.03 && p < event.at + 0.09
    if (bubbleVisible) {
      bubbles.push({
        id: `${event.victim}-${event.at}`,
        label: event.label,
        x: lerp(cutter.x, victim.x, 0.5) + event.direction * 6,
        y: 40,
      })
    }
  }

  // o vencedor vai para o centro antes de cruzar a faixa
  const winner = kites[plan.winner]
  const centering = ease(progressIn(p, CENTER_WINNER[0], CENTER_WINNER[1]))
  winner.x = lerp(winner.x, 50, centering)

  return { kites, bubbles, finished: p >= RESULT_AT }
}

/** Pipas que ainda estavam no ar num dado progresso (útil para acessibilidade). */
export function aliveAt(plan, p) {
  return plan.kiteIds.filter((id) => {
    const event = plan.events.find((e) => e.victim === id)
    return !event || p < event.at
  })
}
