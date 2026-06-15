import { FaUser, FaEnvelope, FaWineGlass } from 'react-icons/fa6'
import styles from './AdquiraASua.module.css'
import PageWrapper from '../../components/PageWrapper'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import logo from '../../assets/logo.svg'
import cervejas from '../../assets/cervejas.png'

function AdquiraASua() {
  return (
    <PageWrapper>
      <Header />

      <div className={styles.content}>
        <form className={styles.formCard} onSubmit={e => e.preventDefault()}>
          <img className={styles.tituloImg} src={logo} alt="Logo Mars Beer" />
          <h2 className={styles.titulo}>Adquira a sua</h2>

          <label htmlFor="username">Nome</label>
          <div className={styles.inputRow}>
            <FaUser className={styles.icone} />
            <input id="username" name="username" placeholder="insira seu nome" type="text" />
          </div>

          <label htmlFor="email">Email</label>
          <div className={styles.inputRow}>
            <FaEnvelope className={styles.icone} />
            <input id="email" name="email" placeholder="insira seu email" type="email" />
          </div>

          <label htmlFor="cerveja">Cerveja</label>
          <div className={styles.inputRow}>
            <FaWineGlass className={styles.icone} />
            <input id="cerveja" name="cerveja" placeholder="Escolha sua cerveja" type="text" />
          </div>

          <div className={styles.btnWrapper}>
            <button className={styles.btnEnviar} type="submit">Enviar</button>
          </div>
        </form>

        <img className={styles.cervejaImg} src={cervejas} alt="Cervejas Mars Beer" />
      </div>

      <hr />
      <Footer />
    </PageWrapper>
  )
}

export default AdquiraASua
