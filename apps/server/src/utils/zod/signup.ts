import zod from "zod";

const signupZod = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
})

export {
    signupZod
};
