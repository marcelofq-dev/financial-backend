// routes/expenses.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Nosso middleware de proteção
const Expense = require('../models/Expense');

// @rota   GET api/expenses
// @desc   Buscar todos os gastos DO USUÁRIO LOGADO
// @acesso Privado
router.get('/', auth, async (req, res) => {
  try {
    // req.user.id vem do middleware 'auth'
    const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// @rota   POST api/expenses
// @desc   Adicionar um novo gasto
// @acesso Privado
router.post('/', auth, async (req, res) => {
  try {
    const { description, amount, category } = req.body;

    const newExpense = new Expense({
      userId: req.user.id, // ID do usuário logado
      description,
      amount,
      category
    });

    const expense = await newExpense.save();
    res.status(201).json(expense);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;