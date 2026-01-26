import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },

  otp: {
    type: String,
    required: false,
    default: null,
  },
});

export { signupSchema };
