import * as z from "zod";

export const LoginSchema = z.object({
	email: z.string().email({
		message: "A valid email is required.",
	}),
	password: z.string().min(1, {
		message: "Password is required",
	}),
});
