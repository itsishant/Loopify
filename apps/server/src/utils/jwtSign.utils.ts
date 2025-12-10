import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const jwtSign = () => {
    const signNewToken = jwt.sign("_id", JWT_SECRET!, {
        expiresIn: "7d"
    })
    return signNewToken;
}

export {
    jwtSign
};
