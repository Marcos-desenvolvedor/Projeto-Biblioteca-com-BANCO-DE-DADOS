import { pool } from "../../DB/conexao.js";

export class Emprestimos {
  static async realizarEmprestimo(id_usuario, id_livro) {
    try {
      const livro = await pool.query("SELECT quantidade FROM livros id= $1", [
        id_livro,
      ]);

      if (livro.rows[0].quantidade <= 0) {
        throw new Error("Livro sem estoque");
      }

      const sqlEmprestimo = `INSERT INTO emprestimos (id_usuario, id_livro)
      VALUES ($1, $2) RETURNING *`;

      const novoEmprestimos = await pool.query(sqlEmprestimo, [
        id_usuario,
        id_livro,
      ]);

      await pool.query(
        "UPDATE livros SET quantidade = quantidade - 1 WHERE id = $1",
        [id_livro],
      );
      return novoEmprestimos.rows[0];
    } catch (error) {
      console.error("ERROR ao relizar empréstimo: ", error.message);
    }
  }

  static async listarTudo() {



    
  }
}
