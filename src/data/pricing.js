/**
 * Preços do Pipa Premium, por casa (não por pessoa).
 * `example` é o tamanho de casa usado para mostrar o preço por morador.
 */
export const TIERS = [
  { id: 'small', label: 'até 3 pessoas', monthly: 12.9, annual: 99.9, student: 69.9, example: 3 },
  { id: 'medium', label: '4 a 6', monthly: 16.9, annual: 129.9, student: 90.9, example: 5 },
  { id: 'large', label: '7 ou mais', monthly: 21.9, annual: 169.9, student: 118.9, example: 8 },
]

export const LIFETIME = 249.9

export const FREE_FEATURES = [
  'Casa e moradores ilimitados',
  'Divisão automática uma vez por ciclo, com trocas manuais',
  'Lista de compras completa',
  'Progresso da casa e gamificação completa',
  'Calendário sincronizado',
  'Harvii com tarefas e calendário da semana',
]

export const PREMIUM_FEATURES = [
  'Tudo do grátis',
  'Redivisão automática a qualquer momento',
  'Férias agendadas, com as tarefas redistribuídas',
  'Pendências e despesas: quem deve para quem',
  'IA que sugere itens de compra e cria tarefas',
]

export const formatPrice = (value) =>
  value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

/** Preço do plano escolhido e quanto sai por morador por mês. */
export function quote(tier, period, isStudent) {
  const price = period === 'monthly' ? tier.monthly : isStudent ? tier.student : tier.annual
  const perMonth = period === 'monthly' ? price : price / 12
  const savings = Math.round((1 - tier.annual / (tier.monthly * 12)) * 100)
  return { price, perResident: perMonth / tier.example, savings }
}
