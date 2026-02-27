import { Usuario } from "./src/models/usuarios.js";
import { pool } from "./DB/conexao.js";

async function rodarTeste() {
  try {
    // 1. CRIANDO USER
    console.log("Tentando criar User...");
    const novoUser = await Usuario.criarUsuario(
      "Marcos teste",
      "marcos126@gmial.com",
      "MG",
    );
    console.log("Usuario criado: ", novoUser);

    console.log("Buscando todos os usuarios...");

    const todosUsers = await Usuario.listarTodos();
    console.table(todosUsers);
  } catch (erro) {
    console.error("Error no teste: ", erro);
  } finally {
    await pool.end();
  }
}

async function rodarTesteDelete() {
  try {
    // 1. ATUALIZAR USUARIO
    console.log("Atualizando usuario...");

    const userAtualizado = await Usuario.atualizarUsuario(
      1,
      "Marcos Henrique teste",
      "marcos126@gmail.com",
      "MG",
    );
    console.log("Usuario atualizado: ", userAtualizado);

    // 2. DELETAR USUARIO
    console.log("Deletando usuario...");

    const userDeletado = await Usuario.deletarUsuario(2);
    console.log("Usuario deletado: ", userDeletado);
  } catch (erro) {
    console.error("Error no teste: ", erro);
  } finally {
    await pool.end();
  }
}

// rodarTesteDelete();
// rodarTeste();
