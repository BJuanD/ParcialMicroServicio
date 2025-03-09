import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class UserService {
    constructor(private userRepository: UserRepository) {}
    
    async registerUser(name: string, email: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User(0, name, email, hashedPassword);
        return this.userRepository.createUser(user);
    }

    async loginUser(email: string, password: string): Promise<string | null> {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;
        
        const token = jwt.sign({ id: user.id, email: user.email}, process.env.JWT_SECRET || "tu_clave_secreta_segura", { expiresIn: "1h" })
        return token;
    };


    async getProfile(userId: number): Promise<User | null> {
        return this.userRepository.findUserById(userId);
    }
}