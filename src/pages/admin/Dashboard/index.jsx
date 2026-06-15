import { useNavigate } from 'react-router-dom'
import { FaBoxOpen, FaUsers, FaCalendarDays } from 'react-icons/fa6'
import { useAuth } from '../../../contexts/AuthContext'
import styles from './Dashboard.module.css'

const CRUDS = [
  {
    id: 'produtos',
    titulo: 'Produtos',
    descricao: 'Cadastre, edite e remova as cervejas do catálogo.',
    icone: <FaBoxOpen />,
    cor: 'laranja',
    rota: '/admin/produtos',
  },
  {
    id: 'clientes',
    titulo: 'Clientes',
    descricao: 'Gerencie a base de clientes da cervejaria.',
    icone: <FaUsers />,
    cor: 'laranja',
    rota: '/admin/clientes',
  },
  {
    id: 'eventos',
    titulo: 'Eventos',
    descricao: 'Organize degustações, feiras e noites temáticas.',
    icone: <FaCalendarDays />,
    cor: 'laranja',
    rota: '/admin/eventos',
  },
]

function Dashboard() {
  const { usuario } = useAuth()
  const navigate = useNavigate()

  return (
    <>
      <div className={styles.cabecalho}>
        <h1>Olá, {usuario?.nome} 👋</h1>
        <p>Selecione um módulo para gerenciar.</p>
      </div>

      <div className={styles.grid}>
        {CRUDS.map(item => (
          <div
            key={item.id}
            className={styles.card}
            onClick={() => navigate(item.rota)}
          >
            <div className={`${styles.cardIcone} ${styles[item.cor]}`}>
              {item.icone}
            </div>
            <p className={styles.cardTitulo}>{item.titulo}</p>
            <p className={styles.cardDescricao}>{item.descricao}</p>
            <span className={`${styles.badge} ${styles.disponivel}`}>
              Disponível
            </span>
          </div>
        ))}
      </div>
    </>
  )
}

export default Dashboard
