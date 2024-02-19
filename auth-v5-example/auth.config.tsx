import github from "next-auth/providers/github";
import instagram from "next-auth/providers/instagram";
import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import bcryptjs from "bcryptjs";

export default {
	// providers: [github, instagram],
	providers: [
		credentials({
			async authorize(credentials) {
				const validateFields = LoginSchema.safeParse(credentials);

				if (validateFields.success) {
					const { email, password } = validateFields.data;

					const user = await getUserByEmail(email);
					if (!user || !user.password) return null;

					const passwordMatch = await bcryptjs.compare(password, user.password);
					if (passwordMatch) return user;
				}
				return null;
			},
		}),
	],
} satisfies NextAuthConfig;
