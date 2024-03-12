"use client";
import * as z from "zod";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "@/schemas";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CardWrapper } from "./card-wrapper";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { LoadingSpinner } from "../ui/spinner";
import { newPassword } from "@/actions/new-password";

export const NewPasswordForm = () => {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();
	const form = useForm<z.infer<typeof NewPasswordSchema>>({
		resolver: zodResolver(NewPasswordSchema),
		defaultValues: {
			password: "",
		},
	});

	const onFormSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
		setError("");
		setSuccess("");
		startTransition(() => {
			newPassword(values, token).then((data) => {
				setError(data?.error);
				setSuccess(data?.success);
			});
		});
	};

	return (
		<CardWrapper headerLabel='Enter New Password' backButtonLabel='Back to login' backButtongHref='/auth/login'>
			<Form {...form}>
				<span></span>
				<form onSubmit={form.handleSubmit(onFormSubmit)} className='space-y-6'>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Enter Your New Password:</FormLabel>
									<FormControl>
										<Input disabled={isPending} {...field} placeholder='******' type='password' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button className='w-full' disabled={isPending}>
						Reset Password
						{isPending && <LoadingSpinner className='ml-31' />}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
