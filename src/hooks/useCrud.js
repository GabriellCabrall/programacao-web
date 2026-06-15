import { useState, useEffect } from 'react'

export function useCrud(chave) {
  const [itens, setItens] = useState(() => {
    try { return JSON.parse(localStorage.getItem(chave)) ?? [] }
    catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem(chave, JSON.stringify(itens))
  }, [itens])

  const adicionar = dados =>
    setItens(prev => [...prev, { ...dados, id: Date.now() }])

  const editar = (id, dados) =>
    setItens(prev => prev.map(i => i.id === id ? { ...i, ...dados } : i))

  const remover = id =>
    setItens(prev => prev.filter(i => i.id !== id))

  return { itens, adicionar, editar, remover }
}
