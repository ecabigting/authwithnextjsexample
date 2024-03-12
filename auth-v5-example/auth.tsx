import NextAuth from "next-auth";
import "next-auth/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { UserRole } from "@prisma/client";

import authConfig from "./auth.config";
import { getUserByID } from "./data/user";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";

declare module "next-auth" {
	interface User {
		/** The user's role */
		role: "ADMIN" | "USER";
		customField?: string;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		/** OpenID ID Token */
		idToken?: string;
		role: UserRole;
		customField?: string;
	}
}
export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	pages: {
		signIn: "/auth/login",
		error: "/auth/error",
	},
	events: {
		async linkAccount({ user }) {
			await db.user.update({
				where: { id: user.id },
				data: { emailVerified: new Date() },
			});
		},
	},
	callbacks: {
		async signIn({ user, account }) {
			if (account?.provider !== "credentials") return true;

			const existingUser = await getUserByID(user.id as string);

			// prevent signin without email verification
			if (!existingUser?.emailVerified) return false;

			if (existingUser.isTwoFactorEnabled) {
				const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
				if (!twoFactorConfirmation) return false;
				// Delete two factor confirmation next sign in
				await db.twoFactorConfirmation.delete({
					where: { id: twoFactorConfirmation.id },
				});
			}
			return true;
		},
		async session({ token, session }) {
			if (token.sub && session.user) {
				session.user.id = token.sub;
				// await db.session.create({
				// 	data: {
				// 		expires: session.expires.toString(),
				// 		sessionToken: token.jti?.toString() || "",
				// 		userId: token.sub,
				// 	},
				// });
			}
			if (token.role && session.user) {
				session.user.role = token.role as UserRole;
			}
			return session;
		},
		async jwt({ token }) {
			if (!token.sub) return token;
			const existingUser = await getUserByID(token.sub);
			if (!existingUser) return token;
			token.role = existingUser.role;
			return token;
		},
	},
	adapter: PrismaAdapter(db),
	session: { strategy: "jwt" },
	...authConfig,
});
