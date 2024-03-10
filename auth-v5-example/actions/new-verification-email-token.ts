"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const NewVerificationEmail = async (token: string) => {
	const existingToken = await getVerificationTokenByToken(token);
	if (!existingToken) {
		return { error: "ErrID1: Invalid confirmation email link!" };
	}
	const hasExpired = new Date(existingToken.expires) < new Date();
	if (hasExpired) {
		return { error: "ErrID2: Confirmation email link expired!" };
	}
	const existingUser = await getUserByEmail(existingToken.email);
	if (!existingUser) {
		return { error: "ErrID3: Email does not exist!" };
	}

	await db.user.update({
		where: { id: existingUser.id },
		data: {
			emailVerified: new Date(),
			email: existingToken.email,
		},
	});

	await db.verificationToken.delete({
		where: { id: existingToken.id },
	});

	return { success: "Email Verified!" };
};
