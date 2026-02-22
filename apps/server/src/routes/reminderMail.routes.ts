import { Router } from "express";
import { OneDayMail } from "../controllers/mailer/oneDay.mailer.controller.js";
import { FourteenDayMail } from "../controllers/mailer/fourteenDay.mailer.controller.js";
import { ThreeDayMail } from "../controllers/mailer/threeDay.mailer.controller.js";
import { SevenDayMail } from "../controllers/mailer/sevenDay.mailer.controller.js";
import { middlewareAuthentication } from "../authentication/middleware.authentication.js";
import { ThirtyDayMail } from "../controllers/mailer/thirtyDay.mailer.controller.js";

const router: Router = Router();

router.route("/one-day-reminder/:id").post(middlewareAuthentication, OneDayMail);
router.route("/three-day-reminder/:id").post(middlewareAuthentication, ThreeDayMail);
router.route("/seven-day-reminder/:id").post(middlewareAuthentication, SevenDayMail);
router.route("/fourteen-day-reminder/:id").post(middlewareAuthentication, FourteenDayMail);
router.route("/thirty-day-reminder/:id").post(middlewareAuthentication, ThirtyDayMail);

export default router;
