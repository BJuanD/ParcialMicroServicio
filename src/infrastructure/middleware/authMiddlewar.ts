import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "./authMiddleware";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "No autorizado" });
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            id: number;
            email: string;
        };

        (req as AuthenticatedRequest).user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: "Token invalido o expirado" });
        return;
    }
}