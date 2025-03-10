import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "./authMiddleware";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Acceso denegado: No se proporciono un token valido." });
        return;
    }

    const token = authHeader.split(" ")[1];

    if (!process.env.JWT_SECRET) {
        res.status(500).json({ message: "Error del servidor: Falta la clave JWT" });
        return;
    }

    try {
        //throw new Error("Error simulado para pruebas"); //Para probar el error 500

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            id: number;
            email: string;
        };

        (req as AuthenticatedRequest).user = decoded;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(403).json({ message: "Token expirado. Inicia sesion nuevamente." });
            return;
        } else if (error instanceof jwt.JsonWebTokenError) {
            res.status(403).json({ message: "Token invalido. Inicia sesion nuevamente." });
        } else {
            res.status(500).json({ message: "Error interno del servidor." });
            return;
        }

    }
}