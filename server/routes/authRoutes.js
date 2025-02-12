import { Router } from "express";
import { loginVisitor, registerVisitor } from "../controllers/authControllers.js";

const router = Router();

router.get('/loginVisitor',loginVisitor)

router.post('/registerVisitor',registerVisitor)

export default router;