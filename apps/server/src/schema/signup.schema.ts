import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
})

const signupModel = mongoose.model("signupModel", signupSchema);

export {
    signupModel
}
