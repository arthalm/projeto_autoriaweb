const express = require('express');
const cors = require('cors');
const loginRouter = require('./controllers/LoginController');
const categoriasRouter = require('./controllers/CategoriaController');
const hoteisRouter = require('./controllers/HotelController');

// Cria uma instância do servidor Express.
const app = express();

// Aplica o middleware para parsear JSON no corpo das requisições.
app.use(express.json());

// Habilita o CORS para permitir requisições de diferentes origens.
app.use(cors());

// Define a rota "/categorias" e "/hoteis" e associa ao router importado.
app.use("/login", loginRouter);
app.use("/categorias", categoriasRouter);
app.use("/hoteis", hoteisRouter);

// Define a porta do servidor, com um fallback para a porta 3000 se não estiver definida.
const PORT = process.env.PORT || 3000;

// Inicia o servidor na porta especificada.
app.listen(PORT, () => {
  console.log(`Servidor Express rodando na porta ${PORT}`);
});