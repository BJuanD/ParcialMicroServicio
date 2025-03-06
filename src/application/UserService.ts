import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";
import bcrypt from "bcryptjs";

export class UserService {
    constructor(private userRepository: UserRepository) {}
    
    async registerUser(name: string, email: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User(0, name, email, hashedPassword);
        return this.userRepository.createUser(user);
    }

    async loginUser(email: string, password: string): Promise<boolean> {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) return false;
        return bcrypt.compare(password, user.password);
    }
}