import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { FaBoxOpen, FaRightFromBracket, FaUsers, FaCalendarDays, FaFileLines } from 'react-icons/fa6'
import { MdDashboard } from 'react-icons/md'
import { useAuth } from '../../contexts/AuthContext'
import styles from './AdminLayout.module.css'
import logo from '../../assets/logobranca.svg'

function AdminLayout() {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/admin/login')
  }

  const inicial = usuario?.nome?.charAt(0).toUpperCase() ?? 'A'

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <img src={logo} alt="Mars Beer" />
          <span>ÁREA<br />ADMIN</span>
        </div>

        <nav className={styles.nav}>
          <span className={styles.navLabel}>Menu</span>

          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.ativo : ''}`
            }
          >
            <MdDashboard />
            Dashboard
          </NavLink>

          <span className={styles.navLabel}>CRUDs</span>

          <NavLink
            to="/admin/produtos"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.ativo : ''}`
            }
          >
            <FaBoxOpen />
            Produtos
          </NavLink>

          <NavLink
            to="/admin/clientes"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.ativo : ''}`
            }
          >
            <FaUsers />
            Clientes
          </NavLink>

          <NavLink
            to="/admin/eventos"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.ativo : ''}`
            }
          >
            <FaCalendarDays />
            Eventos
          </NavLink>

          <span className={styles.navLabel}>Relatórios</span>

          <NavLink
            to="/admin/relatorio"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.ativo : ''}`
            }
          >
            <FaFileLines />
            Inscrições
          </NavLink>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.usuario}>
            <div className={styles.usuarioAvatar}>{inicial}</div>
            <div className={styles.usuarioInfo}>
              <span className={styles.usuarioNome}>{usuario?.nome}</span>
              <span className={styles.usuarioEmail}>{usuario?.email}</span>
            </div>
          </div>
          <button className={styles.btnLogout} onClick={handleLogout}>
            <FaRightFromBracket />
            Sair
          </button>
        </div>
      </aside>

      <main className={styles.main}>
        <div className={styles.conteudo}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AdminLayout
