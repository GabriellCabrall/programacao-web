import { useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { useCrud } from '../../../hooks/useCrud'
import styles from './Relatorio.module.css'

const fmt = iso => {
  if (!iso) return '—'
  const [a, m, d] = iso.split('-')
  return `${d}/${m}/${a}`
}

function Relatorio() {
  const { itens: inscricoes, adicionar, remover } = useCrud('mars_inscricoes')
  const { itens: clientes } = useCrud('mars_clientes')
  const { itens: eventos }  = useCrud('mars_eventos')

  const [form, setForm]   = useState({ clienteId: '', eventoId: '' })
  const [erro, setErro]   = useState('')

  // ── JOIN: Inscrições ← Clientes + Eventos ──────────────────────────────
  const relatorio = inscricoes
    .map(i => ({
      ...i,
      cliente: clientes.find(c => c.id === i.clienteId),
      evento:  eventos.find(e => e.id === i.eventoId),
    }))
    .filter(i => i.cliente && i.evento) // descarta registros órfãos

  // Contagem de inscritos por evento (usado no badge de vagas)
  const inscritosPorEvento = relatorio.reduce((acc, r) => {
    acc[r.eventoId] = (acc[r.eventoId] ?? 0) + 1
    return acc
  }, {})

  const vagasRestantes = eventoId =>
    Number(eventos.find(e => e.id === eventoId)?.vagas ?? 0) -
    (inscritosPorEvento[eventoId] ?? 0)

  // ── Resumo ─────────────────────────────────────────────────────────────
  const clientesUnicos  = new Set(relatorio.map(r => r.clienteId)).size
  const eventosComInscritos = new Set(relatorio.map(r => r.eventoId)).size

  // ── Inscrição ──────────────────────────────────────────────────────────
  function handleChange(e) {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
    setErro('')
  }

  function inscrever(e) {
    e.preventDefault()

    if (!form.clienteId || !form.eventoId) {
      setErro('Selecione um cliente e um evento.')
      return
    }

    const cId = Number(form.clienteId)
    const eId = Number(form.eventoId)

    if (inscricoes.find(i => i.clienteId === cId && i.eventoId === eId)) {
      setErro('Este cliente já está inscrito neste evento.')
      return
    }

    if (vagasRestantes(eId) <= 0) {
      setErro('Este evento não tem mais vagas disponíveis.')
      return
    }

    adicionar({
      clienteId: cId,
      eventoId:  eId,
      dataInscricao: new Date().toISOString().split('T')[0],
    })
    setForm({ clienteId: '', eventoId: '' })
  }

  const semDados = clientes.length === 0 || eventos.length === 0

  return (
    <>
      {/* Cabeçalho */}
      <div className={styles.cabecalho}>
        <h1>Relatório de Inscrições</h1>
        <p>JOIN entre Clientes e Eventos via chave estrangeira simulada</p>
      </div>

      {/* Cards de resumo */}
      <div className={styles.resumo}>
        <div className={styles.resumoCard}>
          <span className={styles.resumoValor}>{relatorio.length}</span>
          <span className={styles.resumoLabel}>Total de inscrições</span>
        </div>
        <div className={styles.resumoCard}>
          <span className={styles.resumoValor}>{clientesUnicos}</span>
          <span className={styles.resumoLabel}>Clientes participando</span>
        </div>
        <div className={styles.resumoCard}>
          <span className={styles.resumoValor}>{eventosComInscritos}</span>
          <span className={styles.resumoLabel}>Eventos com inscritos</span>
        </div>
      </div>

      {/* Aviso se faltar cadastros */}
      {semDados && (
        <p className={styles.aviso}>
          ⚠️ Cadastre ao menos um <strong>Cliente</strong> e um <strong>Evento</strong> antes de criar inscrições.
        </p>
      )}

      {/* Formulário de nova inscrição */}
      <div className={styles.formCard}>
        <h2>Nova Inscrição</h2>
        <form onSubmit={inscrever}>
          <div className={styles.formLinha}>
            <select
              name="clienteId"
              value={form.clienteId}
              onChange={handleChange}
              className={erro && !form.clienteId ? styles.selectErro : ''}
              disabled={semDados}
            >
              <option value="">Selecione um cliente...</option>
              {clientes.map(c => (
                <option key={c.id} value={c.id}>{c.nome}</option>
              ))}
            </select>

            <select
              name="eventoId"
              value={form.eventoId}
              onChange={handleChange}
              className={erro && !form.eventoId ? styles.selectErro : ''}
              disabled={semDados}
            >
              <option value="">Selecione um evento...</option>
              {eventos.map(ev => {
                const restantes = vagasRestantes(ev.id)
                return (
                  <option key={ev.id} value={ev.id} disabled={restantes <= 0}>
                    {ev.titulo} ({restantes > 0 ? `${restantes} vagas` : 'lotado'})
                  </option>
                )
              })}
            </select>

            <button className={styles.btnInscrever} type="submit" disabled={semDados}>
              <FaPlus style={{ marginRight: 6 }} />
              Inscrever
            </button>
          </div>
          {erro && <p className={styles.erroForm}>{erro}</p>}
        </form>
      </div>

      {/* Tabela do relatório — resultado do JOIN */}
      <div className={styles.secaoTabela}>
        <h2>Resultado do JOIN</h2>

        {relatorio.length === 0 ? (
          <div className={styles.vazio}>
            <p>Nenhuma inscrição registrada ainda.</p>
          </div>
        ) : (
          <div className={styles.tabelaWrapper}>
            <table className={styles.tabela}>
              <thead>
                <tr>
                  {/* Colunas do Evento */}
                  <th>Evento</th>
                  <th>Data</th>
                  <th>Local</th>
                  <th className={styles.thEvento}>Vagas</th>
                  {/* Colunas do Cliente */}
                  <th>Cliente</th>
                  <th>E-mail</th>
                  <th>Inscrito em</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {relatorio.map(r => {
                  const restantes = vagasRestantes(r.eventoId)
                  return (
                    <tr key={r.id}>
                      <td>{r.evento.titulo}</td>
                      <td>{fmt(r.evento.data)}</td>
                      <td>{r.evento.local}</td>
                      <td className={styles.tdEvento}>
                        <span className={`${styles.badge} ${restantes > 0 ? styles.badgeOk : styles.badgeLotado}`}>
                          {restantes > 0 ? `${restantes} restantes` : 'Lotado'}
                        </span>
                      </td>
                      <td><strong>{r.cliente.nome}</strong></td>
                      <td>{r.cliente.email}</td>
                      <td>{fmt(r.dataInscricao)}</td>
                      <td>
                        <button className={styles.btnRemover} onClick={() => remover(r.id)}>
                          Remover
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}

export default Relatorio
