import { Button, Loader, toast } from "@/components";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { adminLoginFormSchema } from "@/core/form-schemas";
import { useAppDispatch } from "@/core/store";
import { currentUserReducer } from "@/core/store/slices";
import { AuthService, AuthTokenType, CookiesService, HttpClient } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TbEyeOff, TbEye } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export function AdminLoginForm() {
	const form = useForm<z.infer<typeof adminLoginFormSchema>>({
		resolver: zodResolver(adminLoginFormSchema),
		defaultValues: {
			username: "",
			password: "",
			rememberMe: false,
		},
	});
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const { isSubmitting } = form.formState;

	const onHandleAdminLogin = async () => {
		const { username, password, rememberMe } = form.getValues();
		try {
			const result = await AuthService.loginAsAdmin(username, password, rememberMe);

			dispatch(currentUserReducer.actions.setCurrentUser(result.user));

			CookiesService.setToken(AuthTokenType.ACCESS_TOKEN, result.accessToken);
			CookiesService.setToken(AuthTokenType.REFRESH_TOKEN, result.refreshToken);

			toast({
				title: "Welcome back 👋!",
				description: "Login successfully",
				duration: 4000,
			});

			navigate("/admin/dashboard");
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
	};

	return (
		<Form {...form}>
			<form
				className="grid gap-y-4"
				onSubmit={form.handleSubmit(onHandleAdminLogin)}
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
										"focus:!ring-sky-500",
										form.getFieldState("username").invalid && "ring-1 !ring-red-500",
									)}
									placeholder="Enter your username"
									disabled={isSubmitting}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				></FormField>
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
									disabled={isSubmitting}
								>
									{showPassword ? <TbEyeOff size={16} /> : <TbEye size={16} />}
									{showPassword ? "Hide" : "Show"}
								</button>
							</FormLabel>
							<FormControl>
								<Input
									className={clsx(
										"focus:!ring-sky-500",
										form.getFieldState("password").invalid && "ring-1 !ring-red-500",
									)}
									type={showPassword ? "text" : "password"}
									placeholder="Enter your password"
									disabled={isSubmitting}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				></FormField>
				<FormField
					control={form.control}
					name="rememberMe"
					render={({ field }) => (
						<FormLabel className="flex items-center">
							<Input
								checked={field.value}
								onChange={event => {
									form.setValue("rememberMe", event.target.checked);
								}}
								type="checkbox"
								style={{
									width: "30px",
									height: "15px",
									display: "inline-block",
								}}
								disabled={isSubmitting}
							/>
							<label>Remember me</label>
						</FormLabel>
					)}
				></FormField>
				<Button
					className="hover:bg-red-500 focus-visible:ring-red-600 disabled:bg-red-400 bg-red-600 gap-2"
					type="submit"
					disabled={isSubmitting}
				>
					{isSubmitting && <Loader />}
					{isSubmitting ? "Processing..." : "Sign in"}
				</Button>
			</form>
		</Form>
	);
}
