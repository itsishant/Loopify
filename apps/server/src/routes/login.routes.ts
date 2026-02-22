import { Router } from "express";
import { loginUser } from "../controllers/login.controller.js";

const router: Router = Router();

router.route("/login-user").post(loginUser);

export default router;
