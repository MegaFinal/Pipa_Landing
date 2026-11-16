import Feature from './Feature.jsx'
import WeekChart from './interactive/WeekChart.jsx'
import Clothesline from './interactive/Clothesline.jsx'
import ShoppingList from './interactive/ShoppingList.jsx'
import KiteRanking from './interactive/KiteRanking.jsx'
import HouseShare from './interactive/HouseShare.jsx'
import './Features.css'

const FEATURES = [
  {
    tag: 'Divisão automática de tarefas',
    tagColor: 'var(--blue)',
    title: 'O Pipa divide as tarefas por você',
    text: 'A divisão segue o tempo livre de cada um, sem ninguém ficar com mais. Cada pessoa recebe as tarefas nos dias em que está livre.',
    Visual: WeekChart,
  },
  {
    tag: 'Varal',
    tagColor: 'var(--yellow)',
    title: 'Viu algo pra fazer? Pendura no varal!',
    text: 'Quem percebe ganha pontos. Quem pega a tarefa, também. Assim o trabalho de notar deixa de ser invisível.',
    Visual: Clothesline,
    imageSide: 'left',
  },
  {
    tag: 'Lista de compras',
    tagColor: 'var(--magenta)',
    title: 'Acabou? Já tá na lista',
    text: 'Uma lista de compras só, que a casa toda vê e completa, separada por categoria para facilitar no mercado.',
    Visual: ShoppingList,
  },
  {
    tag: 'Gamificação',
    tagColor: 'var(--orange)',
    title: 'Cada tarefa leva sua pipa mais alto',
    text: 'Junte pontos, suba de nível e troque por passes livres. Sem ranking entre moradores: cada um voa no seu ritmo.',
    Visual: KiteRanking,
    imageSide: 'left',
  },
  {
    tag: 'Progresso',
    tagColor: 'var(--green)',
    title: 'Ninguém carrega tudo sozinho',
    text: 'O Pipa mostra a sua parte de todo o trabalho da casa e quanto seria o ideal.',
    Visual: HouseShare,
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
        {FEATURES.map(({ Visual, ...feature }) => (
          <Feature key={feature.tag} {...feature}>
            <Visual />
          </Feature>
        ))}
      </div>
    </section>
  )
}
