import { AccountRepository } from '../infrastructure/database/AccountRepository';
import { Account } from '../domain/Account';

export class AccountService {
  constructor(private accountRepository: AccountRepository) {}

  async createAccount(userId: string, initialBalance: number): Promise<Account> {
    return this.accountRepository.createAccount(userId, initialBalance);
  }

  async getAccountById(accountId: string): Promise<Account | null> {
    return this.accountRepository.getAccountById(accountId);
  }
}