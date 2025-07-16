import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Carrinho from "./pages/Carrinho";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import PedidosUsuario from "./pages/PedidosUsuario";
import NovoProduto from "./pages/NovoProduto";
import NovoCliente from "./pages/NovoCliente";
import Apresentacao from "./pages/Apresentacao";
import Clientes from "./pages/Clientes";
import EditarCliente from "./pages/EditarCliente";
import Sidebar from "./components/Sidebar";
import AppLayout from "./components/AppLayout";
import AdminPage from "./pages/Admin";
export default function App() {
  return (
    <CartProvider>
      <Router>
        <AuthProvider>
          <Sidebar />
          <main className="ml-64 flex-1 min-h-screen bg-gray-100">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/" element={<Apresentacao />} />
              <Route
                path="/produtos"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route path="/carrinho" element={<Carrinho />} />
              <Route
                path="/clientes/novo"
                element={
                  <PrivateRoute>
                    <NovoCliente />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <AdminPage />
                  </PrivateRoute>
                }
              />
              <Route path="/produtos/novo" element={<NovoProduto />} />
              <Route
                path="/clientes"
                element={
                  <PrivateRoute>
                    <AppLayout>
                      <Clientes />
                    </AppLayout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/clientes/:id/editar"
                element={
                  <PrivateRoute>
                    <AppLayout>
                      <EditarCliente />
                    </AppLayout>
                  </PrivateRoute>
                }
              />

              <Route path="/pedidos/meus" element={<PedidosUsuario />} />
            </Routes>
            <Footer />
            <ToastContainer
              position="top-right"
              autoClose={2000}
              theme="colored"
            />
          </main>
        </AuthProvider>
      </Router>
    </CartProvider>
  );
}
