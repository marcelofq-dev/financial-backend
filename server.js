// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const whitelist = [
  process.env.CLIENT_URL,       // A URL do seu front-end no Vercel
  'http://localhost:3000',      // O seu ambiente de desenvolvimento React local
];

// 2. Configure as opções do CORS
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true); 
    } else {
      callback(new Error('Acesso não permitido pelo CORS'));
    }
  }
};

app.use(cors(corsOptions));


// Conexão com o Banco de Dados
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Conectado.'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas da API
app.use('/api/users', require('./routes/users'));
app.use('/api/expenses', require('./routes/expenses'));

// Iniciar o Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});