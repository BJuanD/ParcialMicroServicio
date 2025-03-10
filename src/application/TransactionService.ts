import { TransactionRepository } from '../infrastructure/database/TransactionRepository';
import { AccountRepository } from '../infrastructure/database/AccountRepository';
import { Transaction } from '../domain/Transaction';

export class TransactionService {
  constructor(
    private transactionRepository: TransactionRepository,
    private accountRepository: AccountRepository,
  ) {}

  async deposit(accountId: string, amount: number): Promise<Transaction> {
    console.log(`Iniciando depósito: accountId=${accountId}, amount=${amount}, tipo de amount=${typeof amount}`);
    
    // Convertir accountId a número si es una string
    const numericAccountId = typeof accountId === 'string' ? parseInt(accountId, 10) : accountId;
    
    const account = await this.accountRepository.getAccountById(numericAccountId);
    if (!account) {
      throw new Error('Cuenta no encontrada');
    }
    
    console.log(`Cuenta encontrada: ID=${account.id}, balance actual=${account.balance}`);
    
    // Asegurar que amount sea tratado como número
    const numericAmount = Number(amount);
    if (isNaN(numericAmount)) {
      throw new Error('El monto debe ser un número válido');
    }
    
    const newBalance = Number(account.balance) + numericAmount;
    console.log(`Nuevo balance calculado: ${account.balance} + ${numericAmount} = ${newBalance}`);
    
    await this.accountRepository.updateAccountBalance(numericAccountId, newBalance);
    
    const transaction = new Transaction(
      Math.random().toString(36).substr(2, 9), // ID aleatorio
      numericAccountId.toString(),
      'deposit',
      numericAmount,
      new Date(),
    );
    
    console.log(`Transacción creada: ${JSON.stringify(transaction)}`);
    return this.transactionRepository.createTransaction(transaction);
  }

  async withdraw(accountId: string, amount: number): Promise<Transaction> {
    // Convertir accountId a número si es una string
    const numericAccountId = typeof accountId === 'string' ? parseInt(accountId, 10) : accountId;
    
    const account = await this.accountRepository.getAccountById(numericAccountId);
    if (!account) {
      throw new Error('Cuenta no encontrada');
    }

    // Asegurar que amount sea tratado como número
    const numericAmount = Number(amount);
    if (isNaN(numericAmount)) {
      throw new Error('El monto debe ser un número válido');
    }

    if (account.balance < numericAmount) {
      throw new Error('Fondos insuficientes');
    }

    const newBalance = Number(account.balance) - numericAmount;
    await this.accountRepository.updateAccountBalance(numericAccountId, newBalance);

    const transaction = new Transaction(
      Math.random().toString(36).substr(2, 9), // ID aleatorio
      numericAccountId.toString(),
      'withdraw',
      numericAmount,
      new Date(),
    );

    return this.transactionRepository.createTransaction(transaction);
  }
}