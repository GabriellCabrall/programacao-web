import { useNavigate } from 'react-router-dom'
import styles from './Nao.module.css'
import PageWrapper from '../../components/PageWrapper'
import Footer from '../../components/Footer'
import logo from '../../assets/logobranca.svg'
import caratriste from '../../assets/caratriste.svg'

function Nao() {
  const navigate = useNavigate()

  return (
    <PageWrapper>
      <main className={styles.container}>
        <div className={styles.containerImg}>
          <img src={logo} alt="Logo Mars Beer" />
        </div>

        <div className={styles.containerTexto}>
          <p className={styles.textoPrincipal}>
            INFELIZMENTE<br />
            VOCÊ NÃO PODE<br />
            ACESSAR A ESSE<br />
            SITE
          </p>
          <button className={styles.botao} onClick={() => navigate('/verificar-idade')}>
            VOLTAR
          </button>
        </div>

        <img className={styles.caratriste} src={caratriste} alt="Cara triste" />
      </main>

      <Footer />
    </PageWrapper>
  )
}

export default Nao
