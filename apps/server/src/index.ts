import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);
dotenv.config();

const PORT = 3000;

import { connectToDatabase } from "./database/connection.js";
connectToDatabase();

// LLM Routes
import responseRoutes from "./routes/response.routes.js";
app.use("/api/v1/response", responseRoutes);

// Signup Routes
import signupRouter from "./routes/signup.routes.js";
app.use("/api/v1/signup", signupRouter);

// Login Route
import loginRouter from "./routes/login.routes.js";
app.use("/api/v1/login", loginRouter);

// Subscription Routes
import subscriptionRouter from "./routes/subscription.routes.js";
app.use("/api/v1/subscription", subscriptionRouter);

// Google Authentication Routes
import googelAuthRouter from "./routes/authentication/google.authentication.routes.js";
app.use("/api/v1/auth", googelAuthRouter);

// otp verification routes
import otpVerificationRouter from "./routes/authentication/otp-verification.routes.js";
app.use("/api/v1/auth", otpVerificationRouter);

// mailer routes
import reminderMailRouter from "./routes/reminderMail.routes.js";
app.use("/api/v1/mailer", reminderMailRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
