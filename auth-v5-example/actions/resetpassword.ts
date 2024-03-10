"use server";

import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { ResetPasswordSchema } from "@/schemas";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";

export const ResetPassword = async (values: z.infer<typeof ResetPasswordSchema>) => {
	const validateFields = ResetPasswordSchema.safeParse(values);

	if (!validateFields.success) {
		return { error: "Invalid Email!" };
	}

	const { email } = validateFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser) {
		return { error: "Email not found!" };
	}
	const passwordResetToken = await generatePasswordResetToken(email);
	await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);
	return { success: "Reset email sent!" };
};
