import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { UserService } from "../../application/UserService";
import { MySQLUserRepository } from "../database/MySQLUserRepository";
import { authMiddleware } from "../middleware/authMiddlewar";

const router = Router();
const userRepo = new MySQLUserRepository();
const userService = new UserService(userRepo);
const userController = new UserController(userService);

router.post("/register", userController.register.bind(userController));
router.post("/login", userController.login.bind(userController));
router.get("/profile", authMiddleware, userController.getProfile.bind(userController));

export default router;