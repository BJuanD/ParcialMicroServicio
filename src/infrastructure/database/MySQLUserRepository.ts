import { PrismaClient } from '@prisma/client';
import { User } from '../../domain/User';
import { UserRepository } from '../../domain/UserRepository';

const prisma = new PrismaClient();

export class MySQLUserRepository implements UserRepository {
    async createUser(user: User): Promise<User> {
        const newUser = await prisma.user.create({data: user});
        return newUser;
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({ where: {email}});
    }
}