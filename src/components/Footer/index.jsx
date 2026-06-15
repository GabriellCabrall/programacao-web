import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <span>Criado e desenvolvido por Gabriel Cabral</span>
      <Link to="/admin/login" className={styles.adminLink}>
        Área Admin
      </Link>
    </footer>
  )
}

export default Footer
