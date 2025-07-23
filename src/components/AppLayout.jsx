import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout({ children, mostrarSidebar = true }) {
  const [sidebarAberta, setSidebarAberta] = useState(false);
  
  console.log(mostrarSidebar)

  return (
    <div className="flex h-screen overflow-hidden">
      {mostrarSidebar && (
        <Sidebar aberta={sidebarAberta} onClose={() => setSidebarAberta(false)} />
      )}

      {mostrarSidebar && (
        <button
          className="fixed top-4 left-4 z-50 md:hidden bg-amber-600 text-white p-2 rounded shadow"
          onClick={() => setSidebarAberta(true)}
          aria-label="Abrir menu"
        >
          &#9776;
        </button>
      )}

      <div className="flex flex-col flex-1 overflow-y-auto">
        {mostrarSidebar && <Header />}
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}