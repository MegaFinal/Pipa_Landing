import Feature from './Feature.jsx'
import divisao from '../../assets/landing/divisao-tarefas.webp'
import varal from '../../assets/landing/varal.webp'
import lista from '../../assets/landing/lista-compras.webp'
import gamificacao from '../../assets/landing/gamificacao.webp'
import progresso from '../../assets/landing/progresso.webp'
import './Features.css'

const FEATURES = [
  {
    tag: 'Divisão automática de tarefas',
    tagColor: 'var(--blue)',
    title: 'O Pipa divide as tarefas por você',
    text: 'A divisão segue o tempo livre de cada um, sem ninguém ficar com mais. Cada pessoa recebe as tarefas nos dias em que está livre.',
    image: divisao,
    imageAlt: 'Gráfico da semana com as tarefas divididas entre Você, Ana, João, Bia e Carlos',
  },
  {
    tag: 'Varal',
    tagColor: 'var(--yellow)',
    title: 'Viu algo pra fazer? Pendura no varal!',
    text: 'Quem percebe ganha pontos. Quem pega a tarefa, também. Assim o trabalho de notar deixa de ser invisível.',
    image: varal,
    imageAlt: 'Varal com tarefas da casa penduradas por prendedores',
    imageSide: 'left',
    flat: true,
  },
  {
    tag: 'Lista de compras',
    tagColor: 'var(--magenta)',
    title: 'Acabou? Já tá na lista',
    text: 'Uma lista de compras só, que a casa toda vê e completa, separada por categoria para facilitar no mercado.',
    image: lista,
    imageAlt: 'Lista de compras separada em Alimentos, Bebidas e Hortifrut',
  },
  {
    tag: 'Gamificação',
    tagColor: 'var(--orange)',
    title: 'Cada tarefa leva sua pipa mais alto',
    text: 'Junte pontos, suba de nível e troque por passes livres. Sem ranking entre moradores: cada um voa no seu ritmo.',
    image: gamificacao,
    imageAlt: 'Pipas subindo de nível e passes livres para trocar por tarefas',
    imageSide: 'left',
  },
  {
    tag: 'Progresso',
    tagColor: 'var(--green)',
    title: 'Ninguém carrega tudo sozinho',
    text: 'O Pipa mostra a sua parte de todo o trabalho da casa e quanto seria o ideal.',
    image: progresso,
    imageAlt: 'Card mostrando que 25% do esforço mental da casa na semana foi seu, com ideal de 32%',
  },
]

/** Seção bege com as funcionalidades do app. */
export default function Features() {
  return (
    <section className="features" aria-labelledby="features-title">
      <h2 id="features-title" className="features__title">
        Tudo que a casa precisa lembrar, num lugar só
      </h2>
      <div className="features__list">
        {FEATURES.map((feature) => (
          <Feature key={feature.tag} {...feature} />
        ))}
      </div>
    </section>
  )
}
