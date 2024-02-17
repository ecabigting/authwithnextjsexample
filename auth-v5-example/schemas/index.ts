import * as z from "zod";

export const LoginSchema = z.object({
	email: z.string().email({
		message: "A valid email is required.",
	}),
	password: z.string().min(1, {
		message: "Password is required",
	}),
});

export const RegisterSchema = z.object({
	email: z.string().email({
		message: "A valid email is required.",
	}),
	password: z.string().min(6, {
		message: "Password must be atleast 6 characters long.",
	}),
	name: z.string().min(1, {
		message: "Name is required",
	}),
});
