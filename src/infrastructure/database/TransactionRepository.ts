import pool from './config';
import { Transaction } from '../../domain/Transaction';

export class TransactionRepository {
  async createTransaction(transaction: Transaction): Promise<Transaction> {
    const query = `
      INSERT INTO transactions (id, account_id, type, amount, date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [
      transaction.id,
      transaction.accountId,
      transaction.type,
      transaction.amount,
      transaction.date,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async getTransactionsByAccountId(accountId: string): Promise<Transaction[]> {
    const query = 'SELECT * FROM transactions WHERE account_id = $1;';
    const result = await pool.query(query, [accountId]);
    return result.rows;
  }
}