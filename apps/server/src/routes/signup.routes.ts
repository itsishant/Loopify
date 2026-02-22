import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserInfo,
} from "../controllers/signup.controller.js";
import { middlewareAuthentication } from "../authentication/middleware.authentication.js";

const router: Router = Router();

router.route("/get-user/:userId").get(middlewareAuthentication, getUserInfo);

router.route("/create-user").post(createUser);

router
  .route("/delete-user/:userId")
  .delete(middlewareAuthentication, deleteUser);

export default router;
