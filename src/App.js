import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppLayout from "./components/AppLayout";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Carrinho from "./pages/Carrinho";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import PedidosUsuario from "./pages/PedidosUsuario";
import NovoProduto from "./pages/NovoProduto";
import NovoCliente from "./pages/NovoCliente";
import Clientes from "./pages/Clientes";
import EditarCliente from "./pages/EditarCliente";
// import Apresentacao from "./pages/Apresentacao";
import DetalhesProduto from "./pages/DetalhesProduto";

import AdminPage from "./pages/Admin";
import PrivateRoute from "./components/PrivateRoute";
import Produtos from "./pages/Produtos";
function AppRoutes() {
  const location = useLocation();

  const rotasComSidebar = [
    "/produtos",
    "/carrinho",
    "/pedidos/meus",
    "/clientes",
    "/clientes/novo",
    "/clientes/:id",
    "/produtos/novo",
  ];

  const mostrarSidebar = rotasComSidebar.some((rota) =>
    location.pathname.startsWith(rota.replace(":id", ""))
  );

  const rotasProtegidas = (
    <>
      <Route
        path="/produtos"
        element={
          <AppLayout mostrarSidebar={mostrarSidebar}>
            <Produtos  />
          </AppLayout>
        }
      />
      <Route path="/produtos/:id" element={<DetalhesProduto />} />
      <Route
        path="/produtos/novo"
        element={
          <PrivateRoute rolesPermitidos={["ADMIN", "SUPERUSER"]}>
            <AppLayout mostrarSidebar={mostrarSidebar}>
              <NovoProduto />
            </AppLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/carrinho"
        element={
          <AppLayout mostrarSidebar={mostrarSidebar}>
            <Carrinho />
          </AppLayout>
        }
      />
      <Route
        path="/pedidos/meus"
        element={
          <AppLayout mostrarSidebar={mostrarSidebar}>
            <PedidosUsuario />
          </AppLayout>
        }
      />
      
      <Route
        path="/clientes"
        element={
          <AppLayout mostrarSidebar={mostrarSidebar}>
            <Clientes />
          </AppLayout>
        }
      />
      <Route
        path="/clientes/novo"
        element={
          <AppLayout mostrarSidebar={mostrarSidebar}>
            <NovoCliente />
          </AppLayout>
        }
      />
      <Route
        path="/clientes/:id/editar"
        element={
          <AppLayout mostrarSidebar={mostrarSidebar}>
            <EditarCliente />
          </AppLayout>
        }
      />
      <Route
        path="/produtos/novo"
        element={
          <AppLayout mostrarSidebar={mostrarSidebar}>
            <NovoProduto />
          </AppLayout>
        }
      />
    </>
  );
  console.log(
    "pathname:",
    location.pathname,
    "| mostrarSidebar:",
    mostrarSidebar
  );
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout mostrarSidebar={true}>
            <Home />
          </AppLayout>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/admin" element={<AdminPage />} />

      {rotasProtegidas}

      {/* Fallback 404 */}
      <Route path="*" element={<div>Página não encontrada</div>} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
          <Footer />
          <ToastContainer />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}
