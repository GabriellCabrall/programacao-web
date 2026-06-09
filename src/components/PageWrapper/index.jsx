import styles from './PageWrapper.module.css'
import particulas from '../../assets/particulas.png'

function PageWrapper({ children }) {
  return (
    <div className={styles.page}>
      <img className={styles.particulas} src={particulas} alt="" aria-hidden="true" />
      <div className={styles.conteudo}>
        {children}
      </div>
    </div>
  )
}

export default PageWrapper
