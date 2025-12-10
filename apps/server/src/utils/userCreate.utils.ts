import { type Request } from 'express';
import { signupModel } from '../schema/signup.schema.js';
import type { ISignupData } from '../interface/signup.interface.js';
const userCreate = async (req: Request<{}, {}, ISignupData>) => {
    const createUser = await signupModel.create(req.body);
    return createUser;
}

export {
    userCreate
};
