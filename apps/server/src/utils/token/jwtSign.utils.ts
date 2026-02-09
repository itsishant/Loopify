import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.log("JWT_SECRET is not defined");
}
const jwtSign = async (userId: string) => {
  const signNewToken = await jwt.sign({ id: userId }, JWT_SECRET!, {
    expiresIn: "1d",
  });
  return signNewToken;
};

export { jwtSign };
