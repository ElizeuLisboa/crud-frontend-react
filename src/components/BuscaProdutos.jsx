import React, { useState } from 'react';

const categorias = [
  { label: 'Todos', value: 'todas' },
  { label: 'Eletrônicos', value: 'eletronicos' },
  { label: 'Roupas', value: 'roupas' },
  { label: 'Livros', value: 'livros' },
  { label: 'Alimentos', value: 'Alimentos' },
  { label: 'Informática', value: 'informática' },
  { label: 'Celulares', value: 'celulares' },
  { label: 'Acessórios', value: 'acessorios' },
  // Adicione outras categorias que tiver
];

export default function BuscaProdutos({ onBuscar }) {
  const [categoria, setCategoria] = useState('');
  const [termo, setTermo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onBuscar({ categoria, termo });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <select
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        style={{ padding: '0.5rem', marginRight: '0.5rem' }}
      >
        {categorias.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Buscar produtos..."
        value={termo}
        onChange={(e) => setTermo(e.target.value)}
        style={{ padding: '0.5rem', marginRight: '0.5rem', flexGrow: 1 }}
      />

      <button type="submit" style={{ padding: '0.5rem 1rem' }}>
        Buscar
      </button>
    </form>
  );
}
