import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import logo from '../../assets/logobranca.svg'

function Header() {
  const [menuAberto, setMenuAberto] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <header className={styles.header}>
        <img
          className={styles.logo}
          src={logo}
          alt="Logo Mars Beer"
          onClick={() => navigate('/inicio')}
        />

        <button
          className={styles.menuToggle}
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label="Abrir menu"
        >
          <span /><span /><span />
        </button>

        <nav className={`${styles.nav} ${menuAberto ? styles.navAberto : ''}`}>
          <NavLink className={styles.navLink} to="/inicio" onClick={() => setMenuAberto(false)}>
            INÍCIO
          </NavLink>
          <NavLink className={styles.navLink} to="/sobre" onClick={() => setMenuAberto(false)}>
            SOBRE A MARS
          </NavLink>
          <NavLink className={styles.navLink} to="/contatos" onClick={() => setMenuAberto(false)}>
            CONTATOS
          </NavLink>
          <NavLink className={styles.navLink} to="/adquira-a-sua" onClick={() => setMenuAberto(false)}>
            ADQUIRA A SUA
          </NavLink>
        </nav>
      </header>
      <hr className={styles.hr} />
    </>
  )
}

export default Header
