import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
	Loader,
	useToast,
} from "@/components";
import { emailVerificationFormSchema } from "@/core/form-schemas";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { currentUserSelector } from "@/core/store/selectors";
import { currentUserActions } from "@/core/store/slices";
import { HttpClient, UsersService } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TbChevronLeft, TbGhost2 } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

export function EmailVerification() {
	const dispatch = useAppDispatch();
	const currentUser = useAppSelector(currentUserSelector);

	const form = useForm<z.infer<typeof emailVerificationFormSchema>>({
		resolver: zodResolver(emailVerificationFormSchema),
		defaultValues: {
			code: "",
		},
	});
	const { isSubmitting, errors } = form.formState;

	const navigate = useNavigate();
	const { toast } = useToast();
	const [currentTime, setCurrentTime] = useState(new Date().getTime());
	const [nextResendMailTime, setNextResendMailTime] = useState(0);
	const [isResendingMail, setIsResendingMail] = useState(false);

	useEffect(() => {
		const currentTimeInterval = setInterval(() => {
			setCurrentTime(new Date().getTime());
		}, 1000);

		return () => clearInterval(currentTimeInterval);
	}, []);

	useEffect(() => {
		setNextResendMailTime(
			currentUser?.nextEmailVerificationTime
				? new Date(currentUser?.nextEmailVerificationTime).getTime()
				: 0,
		);
	}, [currentUser?.nextEmailVerificationTime]);

	async function handleResendVerificationCode() {
		setIsResendingMail(true);

		try {
			const result = await UsersService.resendVerificationEmail();

			toast({
				title: "Resend email successfully 👌!",
				description: "A verification code has been sent to your email",
				duration: 4000,
			});

			dispatch(
				currentUserActions.updateCurrentUser({
					nextEmailVerificationTime: result.nextEmailVerificationTime,
				}),
			);
		} catch (e) {
			const { status, message: errMessage } = HttpClient.getErrorResponse(e);
			toast({
				variant: "destructive",
				title: "Resend email failed 🥲",
				description: errMessage,
			});
		} finally {
			setIsResendingMail(false);
		}
	}

	async function handleVerifyEmail() {
		const { code } = form.getValues();

		try {
			await UsersService.verifyEmail(code);

			toast({
				title: "Verified successfully 👌!",
				description: "Your email has been verified successfully",
				duration: 4000,
			});

			dispatch(currentUserActions.updateCurrentUser({ isEmailVerified: true }));

			navigate("/");
		} catch (e) {
			const { status, message: errMessage } = HttpClient.getErrorResponse(e);
			form.setError("root", {
				type: status.toString(),
				message: errMessage,
			});
			toast({
				variant: "destructive",
				title: "Verify email failed 🥲",
				description: errMessage,
			});
		}
	}

	function resendCodeSection() {
		let resendSection: JSX.Element;
		if (nextResendMailTime > currentTime) {
			const timeLeft = nextResendMailTime - currentTime;
			const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
			const seconds = Math.floor((timeLeft / 1000) % 60);

			resendSection = (
				<span className="font-semibold text-yellow-600">
					You can resend it in {minutes.toString().padStart(2, "0")}:
					{seconds.toString().padStart(2, "0")}
				</span>
			);
		} else {
			resendSection = (
				<Button
					className="hover:underline hover:text-blue-500 disabled:text-blue-500 px-0 text-base text-blue-600 select-none"
					variant="ghost"
					type="button"
					tabIndex={-1}
					onClick={handleResendVerificationCode}
					disabled={isResendingMail}
				>
					{isResendingMail ? "Processing..." : "Resend code"}
				</Button>
			);
		}

		return (
			<p className="text-neutral-500 space-x-1">
				<span>Didn't receive the code?</span>
				{resendSection}
			</p>
		);
	}

	return (
		<div className="h-fit flex flex-col items-center gap-12">
			<Button
				className="self-start"
				asChild
			>
				<Link
					className="flex items-center gap-2"
					to={"/"}
				>
					<TbChevronLeft />
					Back to home
				</Link>
			</Button>
			<div className="flex flex-col justify-center flex-grow w-full h-full gap-6 px-4">
				<div className="space-y-2">
					<h2 className="flex items-center justify-center gap-2 text-2xl font-semibold select-none">
						Verify your email
						<TbGhost2 size={30} />
					</h2>
					<p className="text-neutral-500 text-base text-center">
						We have sent a verification code to {currentUser && currentUser.email}. To verify that
						this is your email address, enter it below.
					</p>
				</div>

				<Form {...form}>
					<form
						className="space-y-6"
						onSubmit={form.handleSubmit(handleVerifyEmail)}
					>
						<FormField
							control={form.control}
							name="code"
							render={({ field }) => (
								<FormItem className="space-y-4">
									<FormControl>
										<InputOTP
											{...field}
											maxLength={6}
											containerClassName="justify-center"
											className="!w-fit"
										>
											<InputOTPGroup>
												<InputOTPSlot
													index={0}
													className="!ring-blue-600 bg-white"
												/>
												<InputOTPSlot
													index={1}
													className="!ring-blue-600 bg-white"
												/>
												<InputOTPSlot
													index={2}
													className="!ring-blue-600 bg-white"
												/>
												<InputOTPSlot
													index={3}
													className="!ring-blue-600 bg-white"
												/>
												<InputOTPSlot
													index={4}
													className="!ring-blue-600 bg-white"
												/>
												<InputOTPSlot
													index={5}
													className="!ring-blue-600 bg-white"
												/>
											</InputOTPGroup>
										</InputOTP>
									</FormControl>
									<FormMessage className="text-base text-center" />
								</FormItem>
							)}
						/>
						<div className="space-y-2">
							{resendCodeSection()}
							{errors.root && (
								<p className="!mt-3 !-mb-3 text-center text-red-500 font-semibold">
									{errors.root.message}
								</p>
							)}
							<Button
								type="submit"
								className="hover:bg-blue-500 focus-visible:ring-blue-600 disabled:bg-blue-400 flex items-center gap-2 ml-auto bg-blue-600"
								disabled={isSubmitting}
							>
								{isSubmitting ? <Loader /> : ""}
								{isSubmitting ? "Processing..." : "Verify email"}
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
}
