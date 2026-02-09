import { Router } from "express";
import { verifyOTP } from "../../authentication/verify-otp.authentication.js";

const router = Router();

router.route("/verify-otp").post(verifyOTP);

export default router;
