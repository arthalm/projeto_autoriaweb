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

// Rota para buscar todos os hotéis
router.get('/', (req, res) => {
  executarConsulta('SELECT * FROM tbhotel', [], res, "Erro na consulta dos hotéis");
});

// Rota para buscar um hotel específico
router.get("/:cnpj", (req, res) => {
  const cnpj = req.params.cnpj;
  executarConsulta('SELECT * FROM tbhotel WHERE cnpj = ?', [cnpj], res, "Erro na consulta do hotel");
});

// Rota para criar um novo hotel
router.post('/', (req, res) => {
  const { cnpj, nomehotel, cep } = req.body;
  executarConsulta('INSERT INTO tbhotel (cnpj, nomehotel, cep) VALUES (?, ?, ?)', [cnpj, nomehotel, cep], res, "Erro no cadastro do hotel!");
});

// Rota para deletar um hotel
router.delete("/:cnpj", (req, res) => {
  const hotelCNPJ = req.params.cnpj;
  executarConsulta('DELETE FROM tbhotel WHERE cnpj = ?', [hotelCNPJ], res, 'Erro ao deletar hotel');
});

// Rota para atualizar um hotel
router.put('/', (req, res) => {
  const { cnpj, nomehotel, cep } = req.body;
  executarConsulta('UPDATE tbhotel SET nomehotel = ?, cep = ? WHERE cnpj = ?', [nomehotel, cep, cnpj], res, "Erro ao atualizar hotel");
});

module.exports = router;