import { CardWrapper } from "./card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {
	return (
		<CardWrapper headerLabel='Something went wrong!' backButtonLabel='Back to login' backButtongHref='/auth/login'>
			<div className='w-full flex justify-center items-center'>
				<ExclamationTriangleIcon className='text-destructive size-24' />
			</div>
		</CardWrapper>
	);
};
