"use client";
import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema } from "@/schemas";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CardWrapper } from "./card-wrapper";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { LoadingSpinner } from "../ui/spinner";
import { ResetPassword } from "@/actions/resetpassword";

export const ResetPasswordForm = () => {
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();
	const form = useForm<z.infer<typeof ResetPasswordSchema>>({
		resolver: zodResolver(ResetPasswordSchema),
		defaultValues: {
			email: "",
		},
	});

	const onFormSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
		setError("");
		setSuccess("");
		startTransition(() => {
			ResetPassword(values).then((data) => {
				setError(data?.error);
				setSuccess(data?.success);
			});
		});
	};

	return (
		<CardWrapper headerLabel='Forgot your Password?' backButtonLabel='Back to login' backButtongHref='/auth/login'>
			<Form {...form}>
				<span></span>
				<form onSubmit={form.handleSubmit(onFormSubmit)} className='space-y-6'>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email:</FormLabel>
									<FormControl>
										<Input disabled={isPending} {...field} placeholder='your@email.com' type='email' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button className='w-full' disabled={isPending}>
						Send Reset Email
						{isPending && <LoadingSpinner className='ml-31' />}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
