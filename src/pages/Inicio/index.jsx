import styles from './Inicio.module.css'
import PageWrapper from '../../components/PageWrapper'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import logo from '../../assets/logobranca.svg'
import cervejas from '../../assets/cervejas.png'
import sol from '../../assets/sol.png'

function Inicio() {
  return (
    <PageWrapper>
      <Header />
      <img className={styles.sol} src={sol} alt="" aria-hidden="true" />

      <main className={styles.inicio}>
        <img className={styles.logo} src={logo} alt="Logo Mars Beer" />
        <p className={styles.texto}>
          A CADA<br />
          GOLE<br />
          UMA SENSAÇÃO<br />
          ÚNICA
        </p>
        <img className={styles.cervejas} src={cervejas} alt="Cervejas Mars Beer" />
      </main>

      <hr className={styles.hr} />
      <Footer />
    </PageWrapper>
  )
}

export default Inicio
