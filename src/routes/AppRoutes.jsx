import { Routes, Route, Navigate } from 'react-router-dom'

// Site principal
import SimOuNao from '../pages/SimOuNao'
import Inicio from '../pages/Inicio'
import Sobre from '../pages/Sobre'
import Contatos from '../pages/Contatos'
import AdquiraASua from '../pages/AdquiraASua'
import Nao from '../pages/Nao'

// Admin
import AdminLogin from '../pages/admin/Login'
import AdminLayout from '../components/AdminLayout'
import Dashboard from '../pages/admin/Dashboard'
import Produtos from '../pages/admin/Produtos'
import Clientes from '../pages/admin/Clientes'
import Eventos from '../pages/admin/Eventos'
import Relatorio from '../pages/admin/Relatorio'
import ProtectedRoute from '../components/ProtectedRoute'

function AppRoutes() {
  return (
    <Routes>
      {/* ── Site principal ── */}
      <Route path="/" element={<Navigate to="/verificar-idade" replace />} />
      <Route path="/verificar-idade" element={<SimOuNao />} />
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/contatos" element={<Contatos />} />
      <Route path="/adquira-a-sua" element={<AdquiraASua />} />
      <Route path="/nao" element={<Nao />} />

      {/* ── Admin ── */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="produtos"  element={<Produtos />} />
        <Route path="clientes"  element={<Clientes />} />
        <Route path="eventos"    element={<Eventos />} />
        <Route path="relatorio"  element={<Relatorio />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
