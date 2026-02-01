import { Users } from "../../models/signupModel.js";

const checkUser = async (email: string) => {
  try {
    const isExistingUser = await Users.findOne({ email: email });
    return isExistingUser;
  } catch (error) {
    throw new Error("Check user failed");
  }
};

export { checkUser };
