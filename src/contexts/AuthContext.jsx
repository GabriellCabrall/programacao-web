import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY = 'mars_admin_session'
const CREDENCIAIS = { email: 'admin@gmail.com', senha: 'admin123' }

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    try {
      const salvo = localStorage.getItem(STORAGE_KEY)
      return salvo ? JSON.parse(salvo) : null
    } catch {
      return null
    }
  })

  function login(email, senha) {
    if (email === CREDENCIAIS.email && senha === CREDENCIAIS.senha) {
      const user = { email, nome: 'Administrador' }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      setUsuario(user)
      return { ok: true }
    }
    return { ok: false, erro: 'E-mail ou senha incorretos.' }
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY)
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
