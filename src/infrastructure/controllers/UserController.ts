import { Request, Response } from "express";
import { UserService } from "../../application/UserService";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

export class UserController {
    constructor(private userService: UserService) {}

    async register(req: Request, res: Response) {
        const { name, email, password } = req.body;
        try {
            const user = await this.userService.registerUser(name, email, password);
            res.status(201).json(({ message: "Usuario registrado con exito", user }));

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
                res.status(409).json({
                    message: "El correo ya esta en uso. Prueba con otro"
                });
            } else {
                console.error("Error inesperado:", error);
                res.status(500).json({ 
                    message: "Ocurrio un error inesperado al registar el usuario."
                });
            }
        }
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const token = await this.userService.loginUser(email, password);
            if (token) {
                res.json({
                    message: "Login exitoso",
                    token
                });
            } else {
                res.status(401).json({
                    message: "Error de credenciales"
                });
            }
        } catch (error) {
            console.error("Error en el login", error);
            res.status(500).json({
                message: "Ocurrio un error inesperado al intentar iniciar sesion"
            })
        }
    }

    async getProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
        const userId = req.user?.id;

        if (!userId) {
            res.status(401).json({ message: "No autorizado" });
            return;
        }

        try {
            const user = await this.userService.getProfile(userId);
            if (!user) {
                res.status(404).json({ message: "Usuario no encontrado" });
                return;
            }

            res.json({ message: "Perfil obtenido con exito", user });
        } catch (error) {
            console.error("Error al obtener el perfil:", error);
            res.status(500).json({ message: "Error inesperado al obtener el perfil" });
        }
    }
}