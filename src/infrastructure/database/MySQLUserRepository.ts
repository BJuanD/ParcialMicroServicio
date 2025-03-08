import { PrismaClient } from '@prisma/client';
import { User } from '../../domain/User';
import { UserRepository } from '../../domain/UserRepository';

const prisma = new PrismaClient();

export class MySQLUserRepository implements UserRepository {
    async createUser(user: User): Promise<User> {
        const newUser = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password
            }
        });
        
        return new User(newUser.id, newUser.name, newUser.email, newUser.password);
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({ where: {email}});
    }
}