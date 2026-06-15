import { useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { useCrud } from '../../../hooks/useCrud'
import TabelaAdmin from '../../../components/admin/TabelaAdmin'
import Modal from '../../../components/admin/Modal'
import shared from '../crud.module.css'

const ESTILOS = ['Pilsen', 'Tripel', 'Weizenbier', 'IPA', 'Stout', 'Porter', 'Outro']

const FORM_VAZIO = { nome: '', estilo: '', teor: '', preco: '', descricao: '' }

const COLUNAS = [
  { chave: 'nome',    label: 'Nome' },
  { chave: 'estilo',  label: 'Estilo' },
  { chave: 'teor',    label: 'Teor Alc.' },
  {
    chave: 'preco', label: 'Preço',
    render: v => v ? `R$ ${Number(v).toFixed(2).replace('.', ',')}` : '—',
  },
]

function validar(campos) {
  const erros = {}
  if (!campos.nome.trim())   erros.nome   = 'Nome obrigatório.'
  if (!campos.estilo)        erros.estilo = 'Selecione um estilo.'
  if (!campos.preco)         erros.preco  = 'Preço obrigatório.'
  else if (Number(campos.preco) <= 0) erros.preco = 'Preço deve ser maior que zero.'
  return erros
}

function FormProduto({ inicial, onSalvar, onCancelar }) {
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
        <label htmlFor="p-nome">Nome *</label>
        <input id="p-nome" name="nome" value={campos.nome} onChange={atualizar}
          placeholder="Ex: Sol da Tarde" className={erros.nome ? shared.inputErro : ''} />
        {erros.nome && <span className={shared.msgErro}>{erros.nome}</span>}
      </div>

      <div className={shared.campo}>
        <label htmlFor="p-estilo">Estilo *</label>
        <select id="p-estilo" name="estilo" value={campos.estilo} onChange={atualizar}
          className={erros.estilo ? shared.inputErro : ''}>
          <option value="">Selecione...</option>
          {ESTILOS.map(e => <option key={e} value={e}>{e}</option>)}
        </select>
        {erros.estilo && <span className={shared.msgErro}>{erros.estilo}</span>}
      </div>

      <div className={shared.campo}>
        <label htmlFor="p-teor">Teor Alcoólico</label>
        <input id="p-teor" name="teor" value={campos.teor} onChange={atualizar}
          placeholder="Ex: 5%" />
      </div>

      <div className={shared.campo}>
        <label htmlFor="p-preco">Preço (R$) *</label>
        <input id="p-preco" name="preco" type="number" step="0.01" min="0"
          value={campos.preco} onChange={atualizar}
          placeholder="Ex: 18.90" className={erros.preco ? shared.inputErro : ''} />
        {erros.preco && <span className={shared.msgErro}>{erros.preco}</span>}
      </div>

      <div className={shared.campo}>
        <label htmlFor="p-descricao">Descrição</label>
        <textarea id="p-descricao" name="descricao" value={campos.descricao}
          onChange={atualizar} placeholder="Descrição da cerveja..." />
      </div>

      <div className={shared.formBotoes}>
        <button type="button" className={shared.btnCancelar} onClick={onCancelar}>Cancelar</button>
        <button type="submit" className={shared.btnSalvar}>Salvar</button>
      </div>
    </form>
  )
}

function Produtos() {
  const { itens: produtos, adicionar, editar, remover } = useCrud('mars_produtos')
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
          <h1>Produtos</h1>
          <p>{produtos.length} produto{produtos.length !== 1 ? 's' : ''} cadastrado{produtos.length !== 1 ? 's' : ''}</p>
        </div>
        <button className={shared.btnNovo} onClick={abrirNovo}>
          <FaPlus /> Novo Produto
        </button>
      </div>

      {produtos.length === 0 ? (
        <div className={shared.vazio}>
          <p>Nenhum produto cadastrado ainda.</p>
          <p>Clique em <strong>Novo Produto</strong> para começar.</p>
        </div>
      ) : (
        <TabelaAdmin
          colunas={COLUNAS}
          dados={produtos}
          onEditar={abrirEdicao}
          onRemover={remover}
        />
      )}

      {modalAberto && (
        <Modal
          titulo={editando ? 'Editar Produto' : 'Novo Produto'}
          onFechar={fechar}
        >
          <FormProduto
            inicial={editando}
            onSalvar={salvar}
            onCancelar={fechar}
          />
        </Modal>
      )}
    </>
  )
}

export default Produtos
