import { Request, Response } from "express";
import { UserService } from "../../application/UserService";

export class UserController {
    constructor(private userService: UserService) {}

    async register(req: Request, res: Response) {
        const { name, email, password } = req.body;
        const user = await this.userService.registerUser(name, email, password);
        res.status(201).json(user);
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const valid = await this.userService.loginUser(email, password);
        valid ? res.json({ message: "Login exitoso"}) : res.status(401).json({ message: "Error de credenciales"});
    }
}