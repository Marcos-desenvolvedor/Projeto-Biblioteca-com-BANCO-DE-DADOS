import { Usuario } from "./src/models/usuarios.js";
import { pool } from "./DB/conexao.js";
import { Livros } from "./src/models/livros.js";
import { Emprestimos } from "./src/models/emprestimo.js";

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

async function RodarTesteLivrosCriar() {
  try {
    console.log("Criando livro...");

    const adicionarLivro = await Livros.criarLivro(
      "Olhinohs",
      "Marcos",
      2018,
      10,
    );

    console.log("Livro criado: ", adicionarLivro);

    const todosLivros = await Livros.listarTodos();
    console.table(todosLivros);
  } catch (erro) {
    console.error("Error no teste: ", erro);
  } finally {
    await pool.end();
  }
}

// RodarTesteLivrosCriar();

async function RodarTesteLivrosDeletar() {
  try {
    const livroDeletado = await Livros.deletarLivro(1);
    console.log("Livro deletado: ", livroDeletado);

    const todosLivros = await Livros.listarTodos();
    console.table(todosLivros);
  } catch (erro) {
    console.error("Error no teste: ", erro);
  } finally {
    await pool.end();
  }
}

// RodarTesteLivrosDeletar();

async function testarEmprestimo() {
  console.log("Tentando realizar empréstimo...");

  const emp = await Emprestimos.realizarEmprestimo(3, 2);
  console.log("Sucesso:", emp);

  const lista = await Emprestimos.listarTudo();
  console.table(lista);
}

testarEmprestimo();
