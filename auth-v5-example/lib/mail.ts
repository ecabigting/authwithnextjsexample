import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
	const confirmationLink = `http://localhost:3000/auth/new-verification?token=${token}`;
	await resend.emails.send({
		from: "noreply@ericcabigting.dev",
		to: email,
		subject: "Confirm your email",
		html: `<p>
        Click <a href=${confirmationLink}>here</a> to confirm your email!
        </p>`,
	});
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
	const resetPasswordLink = `http://localhost:3000/auth/new-password?token=${token}`;
	await resend.emails.send({
		from: "noreply@ericcabigting.dev",
		to: email,
		subject: "Reset your password",
		html: `<p>
        Click <a href=${resetPasswordLink}>here</a> to reset your!
        </p>`,
	});
};
