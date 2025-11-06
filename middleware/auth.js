// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Pegar o token do header
  const token = req.header('Authorization');

  // Verificar se não há token
  if (!token) {
    return res.status(401).json({ msg: 'Sem token, autorização negada.' });
  }

  // O token vem no formato "Bearer <token>", então pegamos só o token
  const tokenString = token.split(' ')[1];

  // Verificar o token
  try {
    const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
    // Adicionar o usuário (do payload do token) ao objeto 'req'
    req.user = decoded.user;
    next(); // Passa para a próxima função (a rota)
  } catch (err) {
    res.status(401).json({ msg: 'Token inválido.' });
  }
};