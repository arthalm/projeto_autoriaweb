const express = require('express');
const router = express.Router();
const db = require('../util/db');
const verificarToken = require('../util/VerificaToken');

/**
 * Executa uma consulta no banco de dados e envia uma resposta.
 * @param {string} sql - A consulta SQL a ser executada.
 * @param {Array} params - Os parâmetros para a consulta SQL.
 * @param {Object} res - O objeto de resposta do Express.
 * @param {string} erroMsg - Mensagem de erro para ser enviada em caso de falha.
 */
function executarConsulta(sql, params, res, erroMsg) {
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(500).json({ erro: erroMsg, detalhes: err });
    } else {
      res.status(200).json(result);
    }
  });
}

// Rota para buscar todas as categorias de quarto
router.get('/', (req, res) => {
  executarConsulta('SELECT * FROM tbcategoria_quarto', [], res, "Erro na consulta das categorias de quarto.");
});

// Rota para buscar uma categoria de quarto específica
router.get("/:id", (req, res) => {
  const id = req.params.id;
  executarConsulta('SELECT * FROM tbcategoria_quarto WHERE id = ?', [id], res, "Erro na consulta da categoria de quarto.");
});

// Rota para criar uma nova categoria de quarto
router.post('/', (req, res) => {
  const { nomecategoria, descricao } = req.body;
  executarConsulta('INSERT INTO tbcategoria_quarto (nomecategoria, descricao) VALUES (?, ?)', [nomecategoria, descricao], res, "Erro no cadastro da categoria de quarto!");
});

// Rota para deletar uma categoria de quarto
router.delete("/:id", (req, res) => {
  const categoriaId = req.params.id;
  executarConsulta('DELETE FROM tbcategoria_quarto WHERE id = ?', [categoriaId], res, 'Erro ao deletar categoria de quarto.');
});

// Rota para atualizar uma categoria de quarto
router.put('/', (req, res) => {
  const { id, nomecategoria, descricao } = req.body;
  executarConsulta('UPDATE tbcategoria_quarto SET nomecategoria = ?, descricao = ? WHERE id = ?', [nomecategoria, descricao, id], res, "Erro ao atualizar categoria de quarto.");
});

module.exports = router;