import { useNavigate } from 'react-router-dom'
import styles from './SimOuNao.module.css'
import PageWrapper from '../../components/PageWrapper'
import Footer from '../../components/Footer'
import logo from '../../assets/logobranca.svg'

function SimOuNao() {
  const navigate = useNavigate()

  return (
    <PageWrapper>
      <main className={styles.container}>
        <div className={styles.containerImg}>
          <img src={logo} alt="Logo Mars Beer" />
        </div>

        <div className={styles.containerTexto}>
          <p className={styles.textoPrincipal}>
            A MARS SE PREOCUPA<br />
            COM O CONSUMO<br />
            CONSCIENTE
          </p>
          <h2 className={styles.textoSecundario}>VOCÊ TEM MAIS DE 18 ANOS?</h2>
          <div className={styles.botoes}>
            <button className={styles.botao} onClick={() => navigate('/inicio')}>
              SIM
            </button>
            <button className={styles.botao} onClick={() => navigate('/nao')}>
              NÃO
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </PageWrapper>
  )
}

export default SimOuNao
