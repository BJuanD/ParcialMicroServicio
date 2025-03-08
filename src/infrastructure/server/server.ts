import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import userRoutes from "../routes/UserRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);

app.use((req, res) => {
    res.status(404).json({
        error: "Ruta no encontrada",
        code: 404
    });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Error en el servidor:", err.stack);
    res.status(err.status || 500).json({
        error: err.message || "Error intero del servidor",
        code: err.status || 500
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})