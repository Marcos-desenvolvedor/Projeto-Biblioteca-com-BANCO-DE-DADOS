import { pool } from "../../DB/conexao.js";

export class Usuario {
  // LISTAR USER TODOS

  static async listarTodos() {
    const resultado = await pool.query("SELECT * FROM usuarios");
    return resultado.rows;
  }

  // 2. BUSCAR POR ID
  static async BuscarPorId(id) {
    const resultado = await pool.query(
      "SELECT * FROM usuarios WHERE id = $1 RETURNING *",
      [id],
    );
    return resultado.rows[0];
  }

  // 3. BUSCAR POR EMAIL
  static async BuscarPorEmail(email) {
    const resultado = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1 RETURNING *",
      [email],
    );
    return resultado.rows[0];
  }

  // 4. CRIAR USUARIO
  static async criarUsuario(nome, email, uf) {
    const resultado = await pool.query(
      "INSERT INTO usuarios (nome, email, uf) VALUES ($1, $2, $3) RETURNING *",
      [nome, email, uf],
    );
    return resultado.rows[0];
  }

  // 5. ATUALIZA USUARIO
  static async atualizarUsuario(id, nome, email, uf) {
    const resultado = await pool.query(
      "UPDATE usuarios SET nome = $1, email = $2, uf = $3 WHERE id = $4 RETURNING *",
      [nome, email, uf, id],
    );
    return resultado.rows[0];
  }

  // 6. DELETA USUARIOS
  static async deletarUsuario(id) {
    const resultado = await pool.query(
      "DELETE FROM usuarios WHERE id = $1 RETURNING *",
      [id],
    );
    return resultado.rows[0];
  }
}
