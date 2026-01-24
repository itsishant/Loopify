import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: false,
    default: null,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },

  googleId: {
    type: String,
    required: false,
    default: null,
  },
});

export { signupSchema };
