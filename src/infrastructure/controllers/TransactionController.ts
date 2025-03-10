import express from 'express';
import { TransactionService } from '../../application/TransactionService';
import { TransactionRepository } from '../database/TransactionRepository';
import { AccountRepository } from '../database/AccountRepository';

// Crear el router
const router = express.Router();
const transactionRepository = new TransactionRepository();
const accountRepository = new AccountRepository();
const transactionService = new TransactionService(transactionRepository, accountRepository);

// Ruta para realizar un depósito
router.post('/transactions/deposit', (req, res) => {
  const { accountId, amount } = req.body;
  console.log(`Datos recibidos: accountId=${accountId}, amount=${amount}, tipo de amount=${typeof amount}`);
  
  // Asegurar que amount sea un número
  const numericAmount = Number(amount);
  if (isNaN(numericAmount)) {
    res.status(400).json({ error: 'El monto debe ser un número válido' });
    return;
  }
  
  transactionService.deposit(accountId, numericAmount)
    .then(transaction => {
      res.status(201).json(transaction);
    })
    .catch(error => {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'Ocurrió un error inesperado' });
      }
    });
});

// Ruta para realizar un retiro
router.post('/transactions/withdraw', (req, res) => {
  const { accountId, amount } = req.body;
  
  // Asegurar que amount sea un número
  const numericAmount = Number(amount);
  if (isNaN(numericAmount)) {
    res.status(400).json({ error: 'El monto debe ser un número válido' });
    return;
  }
  
  transactionService.withdraw(accountId, numericAmount)
    .then(transaction => {
      res.status(201).json(transaction);
    })
    .catch(error => {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'Ocurrió un error inesperado' });
      }
    });
});

export default router;