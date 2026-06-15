import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import styles from './Login.module.css'
import logo from '../../../assets/logo.svg'

function Login() {
  const { usuario, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const destino = location.state?.from?.pathname ?? '/admin/dashboard'

  const [campos, setCampos] = useState({ email: '', senha: '' })
  const [erros, setErros] = useState({})
  const [erroGeral, setErroGeral] = useState('')

  useEffect(() => {
    if (usuario) navigate(destino, { replace: true })
  }, [usuario])

  function atualizar(e) {
    const { name, value } = e.target
    setCampos(prev => ({ ...prev, [name]: value }))
    setErros(prev => ({ ...prev, [name]: '' }))
    setErroGeral('')
  }

  function validar() {
    const novosErros = {}
    if (!campos.email.trim()) novosErros.email = 'E-mail obrigatório.'
    else if (!/\S+@\S+\.\S+/.test(campos.email)) novosErros.email = 'E-mail inválido.'
    if (!campos.senha) novosErros.senha = 'Senha obrigatória.'
    return novosErros
  }

  function handleSubmit(e) {
    e.preventDefault()
    const novosErros = validar()
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros)
      return
    }
    const resultado = login(campos.email, campos.senha)
    if (!resultado.ok) setErroGeral(resultado.erro)
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.topo}>
          <img src={logo} alt="Logo Mars Beer" />
          <h1>Área do Administrador</h1>
          <p>Mars Beer — Painel de Controle</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {erroGeral && <p className={styles.erroGeral}>{erroGeral}</p>}

          <div className={styles.campo}>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="admin@gmail.com"
              value={campos.email}
              onChange={atualizar}
              className={erros.email ? styles.erro : ''}
              autoComplete="email"
            />
            {erros.email && <span className={styles.msgErro}>{erros.email}</span>}
          </div>

          <div className={styles.campo}>
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              name="senha"
              type="password"
              placeholder="••••••••"
              value={campos.senha}
              onChange={atualizar}
              className={erros.senha ? styles.erro : ''}
              autoComplete="current-password"
            />
            {erros.senha && <span className={styles.msgErro}>{erros.senha}</span>}
          </div>

          <button className={styles.btnEntrar} type="submit">
            Entrar
          </button>
        </form>

        <div className={styles.dica}>
          Credenciais de demonstração:<br />
          <strong>admin@gmail.com</strong> / <strong>admin123</strong>
        </div>
      </div>
    </div>
  )
}

export default Login
