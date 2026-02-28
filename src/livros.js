import { pool } from "../DB/conexao.js";

export class Livros {
  // 1. LISTAR TODOS OS LIVROS
  static async listarTodos() {
    const resultado = await pool.query("SELECT * FROM livros");
    return resultado.rows;
  }
  // 2. BUSCA POR ID
  static async buscarPorId(id) {
    const resultado = await pool.query(
      "SELECT * FROM livros WHERE id = $1 RETURNING *",
      [id],
    );

    return resultado.rows[0];
  }
  // 3. BUSCA POR NOME
  static async buscarPorNome(titulo) {
    const resultado = await pool.query(
      "SELECT * FROM nome WHERE titulo = $1 RETURNING *",
      [titulo],
    );
    return resultado.rows[0];
  }
  // 4. CRIA LIVRO
  static async criarLivro(titulo, autor, ano, quantidade) {
    const resultado = await pool.query(
      "INSERT INTO livros (titulo, autor, ano, quantidade) VALUES ($1, $2, $3, $4) RETURNING *",
      [titulo, autor, ano, quantidade],
    );
    return resultado.rows[0];
  }
  // 5. DELETA LIVRO
  static async deletarLivro(id) {
    const resultado = await pool.query(
      "DELETE FROM livros WHERE id = $1 RETURNING *",
      [id],
    );
    return resultado.rows[0];
  }

  // 6. ATUALIZA LIVROS
  static async atualizarLivro(id, titulo, autor, ano, quantidade) {
    const resultado = await pool.query(
      "UPDATE livros SET titulo = $1, autor = $2, ano = $3, quantidade = $4  WHERE = $5 RETURNING*",
      [titulo, autor, ano, quantidade, id],
    );
    return resultado.rows[0];
  }
}
