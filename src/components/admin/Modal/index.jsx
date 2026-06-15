import { useEffect } from 'react'
import styles from './Modal.module.css'

function Modal({ titulo, onFechar, children }) {
  // Fecha com ESC
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onFechar() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onFechar])

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onFechar()}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{titulo}</h2>
          <button className={styles.btnFechar} onClick={onFechar} aria-label="Fechar">✕</button>
        </div>
        <div className={styles.corpo}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
