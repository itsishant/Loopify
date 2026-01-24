import mongoose from "mongoose";
import { signupSchema } from "../schema/signup.schema.js";
import type { ISignupData } from "../interface/signup.interface.js";

const Users = mongoose.model<ISignupData>("Users", signupSchema);

export { Users };
