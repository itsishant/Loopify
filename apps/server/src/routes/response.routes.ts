import { Router } from "express";
import { createPromptResponse } from "../controllers/response.controller.js";

const router: Router = Router();

router.route("/prompt-response").post(createPromptResponse);

export default router;
