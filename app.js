import express from "express";
import "dotenv/config";
import { Usuario } from "./src/models/usuarios.js";

const app = express();
const port = 3000;

app.use(express.json());

app.post("/usuarios", async (req, res) => {
  try {
    const { nome, email, uf } = req.body;

    const novoUsuario = await Usuario.criarUsuario(nome, email, uf);
    res.status(200).json(novoUsuario);
  } catch {
    res
      .status(500)
      .json({ mensagem: "Erro ao criar usuário", erro: erro.message });
  }
});

app.get("/usuarios", async (req, res) => {
  try {
    const lista = await Usuario.listarTodos();
    res.status(200).json(lista);
  } catch (error) {
    res
      .status(500)
      .json({ mensagem: "Erro ao buscar usuários", erro: error.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});
