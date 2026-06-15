import { useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { useCrud } from '../../../hooks/useCrud'
import TabelaAdmin from '../../../components/admin/TabelaAdmin'
import Modal from '../../../components/admin/Modal'
import shared from '../crud.module.css'

const FORM_VAZIO = { nome: '', email: '', telefone: '', cidade: '' }

const COLUNAS = [
  { chave: 'nome',     label: 'Nome' },
  { chave: 'email',    label: 'E-mail' },
  { chave: 'telefone', label: 'Telefone' },
  { chave: 'cidade',   label: 'Cidade' },
]

function validar(campos) {
  const erros = {}
  if (!campos.nome.trim())  erros.nome  = 'Nome obrigatório.'
  if (!campos.email.trim()) erros.email = 'E-mail obrigatório.'
  else if (!/\S+@\S+\.\S+/.test(campos.email)) erros.email = 'E-mail inválido.'
  return erros
}

function FormCliente({ inicial, onSalvar, onCancelar }) {
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
        <label htmlFor="c-nome">Nome *</label>
        <input id="c-nome" name="nome" value={campos.nome} onChange={atualizar}
          placeholder="Ex: João Silva" className={erros.nome ? shared.inputErro : ''} />
        {erros.nome && <span className={shared.msgErro}>{erros.nome}</span>}
      </div>

      <div className={shared.campo}>
        <label htmlFor="c-email">E-mail *</label>
        <input id="c-email" name="email" type="email" value={campos.email} onChange={atualizar}
          placeholder="Ex: joao@email.com" className={erros.email ? shared.inputErro : ''} />
        {erros.email && <span className={shared.msgErro}>{erros.email}</span>}
      </div>

      <div className={shared.campo}>
        <label htmlFor="c-telefone">Telefone</label>
        <input id="c-telefone" name="telefone" value={campos.telefone} onChange={atualizar}
          placeholder="Ex: (61) 99999-9999" />
      </div>

      <div className={shared.campo}>
        <label htmlFor="c-cidade">Cidade</label>
        <input id="c-cidade" name="cidade" value={campos.cidade} onChange={atualizar}
          placeholder="Ex: Brasília" />
      </div>

      <div className={shared.formBotoes}>
        <button type="button" className={shared.btnCancelar} onClick={onCancelar}>Cancelar</button>
        <button type="submit" className={shared.btnSalvar}>Salvar</button>
      </div>
    </form>
  )
}

function Clientes() {
  const { itens: clientes, adicionar, editar, remover } = useCrud('mars_clientes')
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
          <h1>Clientes</h1>
          <p>{clientes.length} cliente{clientes.length !== 1 ? 's' : ''} cadastrado{clientes.length !== 1 ? 's' : ''}</p>
        </div>
        <button className={shared.btnNovo} onClick={abrirNovo}>
          <FaPlus /> Novo Cliente
        </button>
      </div>

      {clientes.length === 0 ? (
        <div className={shared.vazio}>
          <p>Nenhum cliente cadastrado ainda.</p>
          <p>Clique em <strong>Novo Cliente</strong> para começar.</p>
        </div>
      ) : (
        <TabelaAdmin
          colunas={COLUNAS}
          dados={clientes}
          onEditar={abrirEdicao}
          onRemover={remover}
        />
      )}

      {modalAberto && (
        <Modal
          titulo={editando ? 'Editar Cliente' : 'Novo Cliente'}
          onFechar={fechar}
        >
          <FormCliente
            inicial={editando}
            onSalvar={salvar}
            onCancelar={fechar}
          />
        </Modal>
      )}
    </>
  )
}

export default Clientes
