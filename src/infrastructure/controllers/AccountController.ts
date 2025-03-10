import express, { Request, Response } from 'express';
import { AccountService } from '../../application/AccountService';
import { AccountRepository } from '../database/AccountRepository';

const router = express.Router();
const accountRepository = new AccountRepository();
const accountService = new AccountService(accountRepository);

router.post('/accounts', async (req: Request, res: Response) => {
  const { userId, initialBalance } = req.body;
  const account = await accountService.createAccount(userId, initialBalance);
  res.status(201).json(account);
});

export default router;