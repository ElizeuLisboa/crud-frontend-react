import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import api from "../services/api";

const cepRegex = /^\d{5}-?\d{3}$/;

export default function NovoCliente() {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: "",
    password: "",
    cep: "",
    logradouro: "",
    cidade: "",
    estado: "",
    role: "USER",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (usuario && !["ADMIN", "SUPERUSER"].includes(usuario.role)) {
      toast.error("Acesso não autorizado.");
      navigate("/clientes");
    }
  }, [usuario, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCepBlur = async () => {
    if (!form.cep) return;

    if (!cepRegex.test(form.cep)) {
      toast.error("CEP inválido. Use o formato 12345-678 ou 12345678.");
      return;
    }

    try {
      const cepSemTraco = form.cep.replace("-", "");
      const res = await fetch(`https://viacep.com.br/ws/${cepSemTraco}/json/`);
      const data = await res.json();
      if (data.erro) {
        toast.error("CEP não encontrado.");
      } else {
        setForm((prev) => ({
          ...prev,
          logradouro: data.logradouro || "",
          cidade: data.localidade || "",
          estado: data.uf || "",
        }));
      }
    } catch {
      toast.error("Erro ao buscar CEP.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nome || !form.email || !form.cpf || !form.password) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (form.cep && !cepRegex.test(form.cep)) {
      toast.error("CEP inválido. Use o formato 12345-678 ou 12345678.");
      return;
    }

    const payload = {
      nome: form.nome,
      email: form.email,
      cpf: form.cpf,
      senha: form.password, // atenção: backend espera "senha" no DTO
      cep: form.cep || null,
      logradouro: form.logradouro || null,
      cidade: form.cidade || null,
      estado: form.estado || null,
      ...(usuario?.role === "SUPERUSER" && { role: form.role }),
    };

    try {
      setLoading(true);
      await api.post("/clientes", payload);
      // toast.success("Cliente criado com sucesso!");
      toast.success("Cadastro realizado com sucesso!", {
        style: { backgroundColor: "#d1fae5", color: "#065f46" }, // verde suave
      });
      navigate("/clientes");
    } catch (err) {
      toast.error("Erro ao criar cliente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Novo Cliente</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Nome"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="cpf"
          value={form.cpf}
          onChange={handleChange}
          placeholder="CPF"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Senha"
          className="w-full border p-2 rounded"
          required
        />

        {/* Apenas SUPERUSER pode definir a role */}
        {usuario?.role === "SUPERUSER" && (
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
            <option value="SUPERUSER">SUPERUSER</option>
          </select>
        )}

        <input
          type="text"
          name="cep"
          value={form.cep}
          onChange={handleChange}
          onBlur={handleCepBlur}
          placeholder="CEP (ex: 12345-678)"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="logradouro"
          value={form.logradouro}
          onChange={handleChange}
          placeholder="Logradouro (Rua, Av, etc)"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="cidade"
          value={form.cidade}
          onChange={handleChange}
          placeholder="Cidade"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="estado"
          value={form.estado}
          onChange={handleChange}
          placeholder="Estado"
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {loading ? "Criando..." : "Criar Cliente"}
        </button>
      </form>
    </div>
  );
}
