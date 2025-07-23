// import React, { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../contexts/AuthContext";

// export default function Sidebar({ aberta, onClose }) {
//   const { usuario, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const isAdmin = usuario?.role === "ADMIN" || usuario?.role === "SUPERUSER";

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//     onClose(); // fecha sidebar no mobile após logout
//   };

//   return (
//     <aside
//       className={`
//         fixed top-0 left-0 h-full w-64 bg-amber-600 text-white shadow-lg flex flex-col z-50
//         transform transition-transform duration-300
//         ${aberta ? "translate-x-0" : "-translate-x-full"}
//         md:translate-x-0 md:static md:flex
//       `}
//     >
//       <div className="p-6 text-2xl font-bold border-b border-amber-500 flex justify-between items-center">
//         Minha Loja
//         {/* Botão fechar no mobile */}
//         <button
//           className="md:hidden text-white text-2xl font-bold"
//           onClick={onClose}
//           aria-label="Fechar menu"
//         >
//           &times;
//         </button>
//       </div>

//       <nav className="flex-1 px-4 py-6 space-y-4 text-sm">
//         <Link to="/produtos" className="block hover:underline" onClick={onClose}>
//           Produtos
//         </Link>
//         <Link to="/carrinho" className="block hover:underline" onClick={onClose}>
//           Carrinho
//         </Link>
//         <Link to="/pedidos/meus" className="block hover:underline" onClick={onClose}>
//           Meus Pedidos
//         </Link>

//         {isAdmin && (
//           <>
//             <Link to="/clientes" className="block hover:underline" onClick={onClose}>
//               Listar Clientes
//             </Link>
//             <Link to="/clientes/novo" className="block hover:underline" onClick={onClose}>
//               Cadastrar Cliente
//             </Link>
//             <Link to="/produtos/novo" className="block hover:underline" onClick={onClose}>
//               Cadastrar Produto
//             </Link>
//           </>
//         )}
//       </nav>

//       <div className="p-4 border-t border-amber-500">
//         {usuario ? (
//           <>
//             <p className="text-sm mb-2">Olá, {usuario.nome.split(" ")[0]}</p>
//             <button
//               onClick={handleLogout}
//               className="text-white hover:underline text-sm"
//             >
//               Sair
//             </button>
//           </>
//         ) : (
//           <div>
//             <Link to="/admin" className="hover:underline text-sm" onClick={onClose}>
//               Acesso Administrativo
//             </Link>
//             <br />
//             <Link to="/login" className="hover:underline text-sm" onClick={onClose}>
//               Entrar
//             </Link>
//           </div>
//         )}
//       </div>
//     </aside>
//   );
// }

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Sidebar({ aberta, onClose }) {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const isAdmin = usuario?.role === "ADMIN" || usuario?.role === "SUPERUSER";
  const isAuthenticated = !!usuario;

  const handleLogout = () => {
    logout();
    navigate("/login");
    onClose();
  };

  const renderLink = (to, label, isEnabled = true) =>
    isEnabled ? (
      <Link to={to} className="block hover:underline" onClick={onClose}>
        {label}
      </Link>
    ) : (
      <span className="block text-white/50 cursor-not-allowed">{label}</span>
    );

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-amber-600 text-white shadow-lg flex flex-col z-50
        transform transition-transform duration-300
        ${aberta ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:flex`}
    >
      <div className="p-6 text-2xl font-bold border-b border-amber-500 flex justify-between items-center">
        Minha Loja
        <button
          className="md:hidden text-white text-2xl font-bold"
          onClick={onClose}
          aria-label="Fechar menu"
        >
          &times;
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-4 text-sm">
        {renderLink("/produtos", "Produtos", isAuthenticated)}
        {renderLink("/carrinho", "Carrinho", isAuthenticated)}
        {renderLink("/pedidos/meus", "Meus Pedidos", isAuthenticated)}

        {isAdmin && (
          <>
            {renderLink("/clientes", "Listar Clientes")}
            {renderLink("/clientes/novo", "Cadastrar Cliente")}
            {renderLink("/produtos/novo", "Cadastrar Produto")}
          </>
        )}
      </nav>

      <div className="p-4 border-t border-amber-500">
        {usuario ? (
          <>
            <p className="text-sm mb-2">Olá, {usuario.nome.split(" ")[0]}</p>
            <button
              onClick={handleLogout}
              className="text-white hover:underline text-sm"
            >
              Sair
            </button>
          </>
        ) : (
          <div>
            <Link to="/admin" className="hover:underline text-sm" onClick={onClose}>
              Acesso Administrativo
            </Link>
            <br />
            <Link to="/login" className="hover:underline text-sm" onClick={onClose}>
              Entrar
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
