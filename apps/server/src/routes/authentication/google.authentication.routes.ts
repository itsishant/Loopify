import { Router } from "express";
import { googleSignIn } from "../../controllers/authentication/google.signin.controller.js";

const router: Router = Router();

router.route("/google-signin").post(googleSignIn);

export default router;
