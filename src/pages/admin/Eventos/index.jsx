import { useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { useCrud } from '../../../hooks/useCrud'
import TabelaAdmin from '../../../components/admin/TabelaAdmin'
import Modal from '../../../components/admin/Modal'
import shared from '../crud.module.css'

const FORM_VAZIO = { titulo: '', data: '', local: '', vagas: '', descricao: '' }

const fmt = iso => {
  if (!iso) return '—'
  const [a, m, d] = iso.split('-')
  return `${d}/${m}/${a}`
}

const COLUNAS = [
  { chave: 'titulo', label: 'Título' },
  { chave: 'data',   label: 'Data', render: fmt },
  { chave: 'local',  label: 'Local' },
  { chave: 'vagas',  label: 'Vagas', render: v => v ? `${v} vaga${v != 1 ? 's' : ''}` : '—' },
]

function validar(campos) {
  const erros = {}
  if (!campos.titulo.trim()) erros.titulo = 'Título obrigatório.'
  if (!campos.data)          erros.data   = 'Data obrigatória.'
  if (!campos.local.trim())  erros.local  = 'Local obrigatório.'
  if (!campos.vagas)         erros.vagas  = 'Número de vagas obrigatório.'
  else if (Number(campos.vagas) <= 0) erros.vagas = 'Vagas deve ser maior que zero.'
  return erros
}

function FormEvento({ inicial, onSalvar, onCancelar }) {
  const [campos, setCampos] = useState(inicial ?? FORM_VAZIO)
  const [erros, setErros] = useState({})

  function atualizar(e) {
    const { name, value } = e.target
    setCampos(p => ({ ...p, [name]: value }))
    setErros(p => ({ ...p, [name]: '' }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validar(campos)
    if (Object.keys(errs).length) { setErros(errs); return }
    onSalvar(campos)
  }

  return (
    <form className={shared.form} onSubmit={handleSubmit} noValidate>
      <div className={shared.campo}>
        <label htmlFor="e-titulo">Título *</label>
        <input id="e-titulo" name="titulo" value={campos.titulo} onChange={atualizar}
          placeholder="Ex: Noite de Degustação" className={erros.titulo ? shared.inputErro : ''} />
        {erros.titulo && <span className={shared.msgErro}>{erros.titulo}</span>}
      </div>

      <div className={shared.campo}>
        <label htmlFor="e-data">Data *</label>
        <input id="e-data" name="data" type="date" value={campos.data} onChange={atualizar}
          className={erros.data ? shared.inputErro : ''} />
        {erros.data && <span className={shared.msgErro}>{erros.data}</span>}
      </div>

      <div className={shared.campo}>
        <label htmlFor="e-local">Local *</label>
        <input id="e-local" name="local" value={campos.local} onChange={atualizar}
          placeholder="Ex: Cervejaria Mars — Taguatinga" className={erros.local ? shared.inputErro : ''} />
        {erros.local && <span className={shared.msgErro}>{erros.local}</span>}
      </div>

      <div className={shared.campo}>
        <label htmlFor="e-vagas">Vagas *</label>
        <input id="e-vagas" name="vagas" type="number" min="1" value={campos.vagas}
          onChange={atualizar} placeholder="Ex: 30"
          className={erros.vagas ? shared.inputErro : ''} />
        {erros.vagas && <span className={shared.msgErro}>{erros.vagas}</span>}
      </div>

      <div className={shared.campo}>
        <label htmlFor="e-descricao">Descrição</label>
        <textarea id="e-descricao" name="descricao" value={campos.descricao}
          onChange={atualizar} placeholder="Detalhes do evento..." />
      </div>

      <div className={shared.formBotoes}>
        <button type="button" className={shared.btnCancelar} onClick={onCancelar}>Cancelar</button>
        <button type="submit" className={shared.btnSalvar}>Salvar</button>
      </div>
    </form>
  )
}

function Eventos() {
  const { itens: eventos, adicionar, editar, remover } = useCrud('mars_eventos')
  const [editando, setEditando] = useState(null)
  const [modalAberto, setModalAberto] = useState(false)

  function abrirNovo() { setEditando(null); setModalAberto(true) }
  function abrirEdicao(item) { setEditando(item); setModalAberto(true) }
  function fechar() { setModalAberto(false); setEditando(null) }

  function salvar(dados) {
    editando ? editar(editando.id, dados) : adicionar(dados)
    fechar()
  }

  return (
    <>
      <div className={shared.cabecalho}>
        <div className={shared.titulos}>
          <h1>Eventos</h1>
          <p>{eventos.length} evento{eventos.length !== 1 ? 's' : ''} cadastrado{eventos.length !== 1 ? 's' : ''}</p>
        </div>
        <button className={shared.btnNovo} onClick={abrirNovo}>
          <FaPlus /> Novo Evento
        </button>
      </div>

      {eventos.length === 0 ? (
        <div className={shared.vazio}>
          <p>Nenhum evento cadastrado ainda.</p>
          <p>Clique em <strong>Novo Evento</strong> para começar.</p>
        </div>
      ) : (
        <TabelaAdmin
          colunas={COLUNAS}
          dados={eventos}
          onEditar={abrirEdicao}
          onRemover={remover}
        />
      )}

      {modalAberto && (
        <Modal
          titulo={editando ? 'Editar Evento' : 'Novo Evento'}
          onFechar={fechar}
        >
          <FormEvento
            inicial={editando}
            onSalvar={salvar}
            onCancelar={fechar}
          />
        </Modal>
      )}
    </>
  )
}

export default Eventos
