import { Router } from "express";
import { middlewareAuthentication } from "../authentication/middleware.authentication.js";
import {
  createSubscription,
  createSubscriptionWeb,
  deleteSubscription,
  getSubscription,
  updateSubscription,
} from "../controllers/subscription.controller.js";

const router: Router = Router();

router
  .route("/create-subscription")
  .post(middlewareAuthentication, createSubscription);

router
  .route("/create-subscription-web")
  .post(middlewareAuthentication, createSubscriptionWeb);

router
  .route("/get-subscription/:userId")
  .get(middlewareAuthentication, getSubscription);
router
  .route("/update-subscription/:id")
  .put(middlewareAuthentication, updateSubscription);
router
  .route("/delete-subscription/:id")
  .delete(middlewareAuthentication, deleteSubscription);

export default router;
