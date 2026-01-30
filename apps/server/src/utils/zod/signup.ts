import zod from "zod";

const signupZod = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
  otp: zod.string().optional(),
});

export { signupZod };
