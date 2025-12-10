import { type Request, type Response } from 'express';

import type { ISignupData } from '../interface/signup.interface.js';

import { signupZod } from '../utils/zod/signup.js';

import { userCreate } from '../utils/userCreate.utils.js';
import { jwtSign } from '../utils/jwtSign.utils.js';
const createUser = async (req: Request<{}, {}, ISignupData>, res: Response) => {
    try {

        const { email, password } = req.body; 
        const body = signupZod.safeParse(req.body);

        if (!body.success || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Invalid request data",
            })
        }

        const newUser = await userCreate(req);

        if (!newUser) {
            return res.status(401).json({
                success: false,
                message: "User creation failed"
            })
        }

        const jwtToken = jwtSign();

        if (!jwtToken) {
            return res.status(401).json({
                success: false,
                message: "JWT Token generation failed"
            })
        }

        return res.status(200).json({
            success: true,
            messsage: "User created successfully"
        })

    } catch (error) {
        console.log("Error while creating user:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export {
    createUser
};
