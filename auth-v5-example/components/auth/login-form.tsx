import { CardWrapper } from "./card-wrapper";

export const LoginForm = () => {
	return (
		<CardWrapper
			headerLabel='Welcome back'
			backButtonLabel="Don't have an account?"
			backButtongHref='/auth/register'
			showSocial
		>
			Login Form!
		</CardWrapper>
	);
};