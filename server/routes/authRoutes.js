import { Router } from "express";
import { loginVisitor, registerVisitor, getAllUsers } from "../controllers/authControllers.js";

const router = Router();

router.get('/loginVisitor',loginVisitor)

router.get('/all',getAllUsers)

router.post('/registerVisitor',registerVisitor)

export default router;