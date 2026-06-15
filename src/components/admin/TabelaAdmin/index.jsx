import styles from './TabelaAdmin.module.css'

/**
 * Tabela genérica reutilizável para os CRUDs do admin.
 *
 * @param {Array}    colunas   - [{ chave, label, render? }]
 * @param {Array}    dados     - array de objetos com id
 * @param {Function} onEditar  - (item) => void
 * @param {Function} onRemover - (id)   => void
 */
function TabelaAdmin({ colunas, dados, onEditar, onRemover }) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.tabela}>
        <thead>
          <tr>
            {colunas.map(col => (
              <th key={col.chave}>{col.label}</th>
            ))}
            <th style={{ textAlign: 'right' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {dados.map(item => (
            <tr key={item.id}>
              {colunas.map(col => (
                <td key={col.chave}>
                  {col.render ? col.render(item[col.chave], item) : (item[col.chave] ?? '—')}
                </td>
              ))}
              <td>
                <div className={styles.acoes}>
                  <button className={styles.btnEditar} onClick={() => onEditar(item)}>
                    Editar
                  </button>
                  <button className={styles.btnExcluir} onClick={() => onRemover(item.id)}>
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TabelaAdmin
