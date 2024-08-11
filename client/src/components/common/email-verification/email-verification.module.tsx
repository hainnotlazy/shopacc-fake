import { Button, InputOTP, InputOTPGroup, InputOTPSlot } from "@/components";
import { useAppSelector } from "@/core/store";
import { UsersService } from "@/services";
import { TbChevronLeft, TbGhost2 } from "react-icons/tb";
import { Link } from "react-router-dom";

export function EmailVerification() {
	const currentUser = useAppSelector(state => state.currentUser);

	async function handleResendVerificationCode() {
		await UsersService.resendVerificationEmail();
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
						We have sent a verification code to {currentUser.user && currentUser.user.email}. To
						verify that this is your email address, enter it below.
					</p>
				</div>

				<InputOTP
					maxLength={6}
					containerClassName="justify-center"
					className="!w-fit"
				>
					<InputOTPGroup>
						<InputOTPSlot
							index={0}
							className="!ring-blue-600"
						/>
						<InputOTPSlot
							index={1}
							className="!ring-blue-600"
						/>
						<InputOTPSlot
							index={2}
							className="!ring-blue-600"
						/>
						<InputOTPSlot
							index={3}
							className="!ring-blue-600"
						/>
						<InputOTPSlot
							index={4}
							className="!ring-blue-600"
						/>
						<InputOTPSlot
							index={5}
							className="!ring-blue-600"
						/>
					</InputOTPGroup>
				</InputOTP>

				<div className="space-y-2">
					<p className="text-neutral-500">
						Didn't receive the code?{" "}
						<Button
							className="hover:underline hover:text-blue-500 px-0 text-base text-blue-600"
							variant="ghost"
							onClick={handleResendVerificationCode}
						>
							Resend code
						</Button>
					</p>
					<Button className="hover:bg-blue-500 focus-visible:ring-blue-600 block ml-auto bg-blue-600">
						Verify
					</Button>
				</div>
			</div>
		</div>
	);
}
