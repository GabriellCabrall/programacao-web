import { Routes, Route, Navigate } from 'react-router-dom'
import SimOuNao from '../pages/SimOuNao'
import Inicio from '../pages/Inicio'
import Sobre from '../pages/Sobre'
import Contatos from '../pages/Contatos'
import AdquiraASua from '../pages/AdquiraASua'
import Nao from '../pages/Nao'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/verificar-idade" replace />} />
      <Route path="/verificar-idade" element={<SimOuNao />} />
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/contatos" element={<Contatos />} />
      <Route path="/adquira-a-sua" element={<AdquiraASua />} />
      <Route path="/nao" element={<Nao />} />
    </Routes>
  )
}

export default AppRoutes
