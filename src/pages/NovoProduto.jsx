import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function NovoProduto() {
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();
  const [imagem, setImagem] = useState(null);
  const [imagemUrl, setImagemUrl] = useState("");
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImagem(file);
    setImagemUrl(""); // limpa o campo de URL se for escolhido arquivo
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    const extensaoValida = /\.(jpg|jpeg|png|gif)$/i.test(url);

    if (!extensaoValida) {
      toast.error("A URL deve apontar para uma imagem válida (.jpg, .png...)");
      return;
    }

    setImagemUrl(url);
    setImagem(null);
    setPreview(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !usuario ||
      (usuario.role !== "ADMIN" && usuario.role !== "SUPERUSER")
    ) {
      toast.error("Acesso não autorizado.");
      return;
    }

    if (!imagem && !imagemUrl) {
      toast.error("Selecione uma imagem ou informe uma URL.");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);

    if (imagem) {
      formData.append("imagem", imagem);
    } else {
      formData.append("imagemUrl", imagemUrl);
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:4000/produtos", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Produto cadastrado com sucesso!");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Erro ao cadastrar produto.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        📦 Cadastrar Novo Produto
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-semibold">Título</label>
          <input
            type="text"
            name="title"
            placeholder="Nome do produto"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Descrição</label>
          <textarea
            name="description"
            placeholder="Detalhes do produto"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded h-24 resize-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Preço (R$)</label>
          <input
            type="number"
            name="price"
            placeholder="Ex: 99.90"
            value={form.price}
            onChange={handleChange}
            required
            step="0.01"
            className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Imagem do Produto (upload ou URL)
          </label>

          <input
            type="file"
            name="imagem"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border px-4 py-2 rounded mb-2"
          />

          <p className="text-center text-gray-500 mb-2">ou</p>

          <input
            type="text"
            name="imagemUrl"
            placeholder="https://exemplo.com/imagem.jpg"
            value={imagemUrl}
            onChange={handleUrlChange}
            className="w-full border px-4 py-2 rounded"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 w-48 h-48 object-cover rounded border mx-auto"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold px-6 py-3 rounded hover:bg-blue-700 transition w-full"
        >
          Cadastrar Produto
        </button>
      </form>
    </div>
  );
}
