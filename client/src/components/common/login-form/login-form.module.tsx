import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Loader,
	OAuthSection,
	useToast,
} from "@/components";
import { loginFormSchema } from "@/core/form-schemas";
import { useAppDispatch } from "@/core/store";
import { currentUserReducer } from "@/core/store/slices";
import { AuthService, AuthTokenType, CookiesService, HttpClient } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TbChevronLeft, TbGhost2, TbEye, TbEyeOff } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

export function LoginForm() {
	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});
	const { isSubmitting, errors } = form.formState;

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { toast } = useToast();
	const [showPassword, setShowPassword] = useState(false);

	async function onSubmit() {
		const { username, password } = form.getValues();

		try {
			const result = await AuthService.login(username, password);

			dispatch(currentUserReducer.actions.setCurrentUser(result.user));
			CookiesService.setToken(AuthTokenType.ACCESS_TOKEN, result.accessToken);
			CookiesService.setToken(AuthTokenType.REFRESH_TOKEN, result.refreshToken);

			toast({
				title: "Welcome back 👋!",
				description: "Login successfully",
				duration: 4000,
			});

			navigate("/");
		} catch (e) {
			const { status, message: errMessage } = HttpClient.getErrorResponse(e);
			form.setError("root", {
				type: status.toString(),
				message: errMessage,
			});
			toast({
				variant: "destructive",
				title: "Login failed 🥲",
				description: errMessage,
			});
		}
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
						Welcome back
						<TbGhost2 size={30} />
					</h2>
					<p className="text-neutral-500 text-base text-center">
						Enter your username and password to continue your shopping
					</p>
				</div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input
											autoFocus
											className={clsx(
												"focus:!ring-sky-500 bg-white",
												form.getFieldState("username").invalid && "ring-1 !ring-red-500",
											)}
											placeholder="Enter your username or email"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="flex items-center justify-between gap-4">
										<span>Password</span>
										<button
											className="hover:text-blue-500 flex items-center gap-1 mr-1 text-blue-600"
											type="button"
											tabIndex={-1}
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? <TbEyeOff size={16} /> : <TbEye size={16} />}
											{showPassword ? "Hide" : "Show"}
										</button>
									</FormLabel>
									<FormControl>
										<Input
											className={clsx(
												"focus:!ring-sky-500 bg-white",
												form.getFieldState("password").invalid && "ring-1 !ring-red-500",
											)}
											type={showPassword ? "text" : "password"}
											placeholder="Enter your password"
											maxLength={150}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{errors.root && (
							<p className="!mt-4 !-mb-3 text-center text-red-500 font-semibold text-sm">
								{errors.root.message}
							</p>
						)}
						<Button
							className="hover:bg-blue-500 focus-visible:ring-blue-600 disabled:bg-blue-400 flex items-center gap-2 ml-auto bg-blue-600"
							type="submit"
							disabled={isSubmitting}
						>
							{isSubmitting && <Loader />}
							{isSubmitting ? "Processing..." : "Login"}
						</Button>
						<p className="!mt-0 text-neutral-500">
							Don't have an account?{" "}
							<Link
								className="hover:text-blue-800 hover:underline font-semibold text-blue-600"
								to={"/register"}
							>
								Register now
							</Link>
						</p>
					</form>
				</Form>
				<OAuthSection />
			</div>
		</div>
	);
}
