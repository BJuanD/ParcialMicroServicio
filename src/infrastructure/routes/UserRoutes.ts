import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { UserService } from "../../application/UserService";
import { MySQLUserRepository } from "../database/MySQLUserRepository";

const router = Router();
const userRepo = new MySQLUserRepository();
const userService = new UserService(userRepo);
const userController = new UserController(userService);

router.post("/register", userController.register.bind(userController));
router.post("/login", userController.login.bind(userController));

export default router;