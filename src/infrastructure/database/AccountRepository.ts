import pool from './config';
import { Account } from '../../domain/Account';

export class AccountRepository {
  async createAccount(userId: string, initialBalance: number): Promise<Account> {
    const query = `
      INSERT INTO accounts (user_id, balance)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const values = [userId, initialBalance];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async getAccountById(accountId: number | string): Promise<Account | null> {
    console.log(`Buscando cuenta con ID=${accountId}, tipo=${typeof accountId}`);
    const query = 'SELECT * FROM accounts WHERE id = $1;';
    const result = await pool.query(query, [accountId]);
    console.log(`Resultado de la consulta:`, result.rows[0]);
    return result.rows[0] || null;
  }

  async updateAccountBalance(accountId: number | string, newBalance: number): Promise<void> {
    console.log(`Actualizando balance: accountId=${accountId}, newBalance=${newBalance}`);
    const query = 'UPDATE accounts SET balance = $1 WHERE id = $2;';
    await pool.query(query, [newBalance, accountId]);
    console.log(`Balance actualizado para cuenta ${accountId}`);
  }
}