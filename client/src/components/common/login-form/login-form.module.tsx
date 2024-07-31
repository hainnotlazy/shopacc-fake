import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
} from "@/components";
import { loginFormSchema } from "@/core/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { TbChevronLeft, TbGhost2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import { z } from "zod";

export function LoginForm() {
	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	function onSubmit() {}

	return (
		<div className="flex flex-col items-center h-full gap-12">
			<Button className="self-start">
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
											placeholder="Enter your username"
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
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter your password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							className="hover:bg-blue-500 block ml-auto bg-blue-600"
							type="submit"
						>
							Login
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
				<div className="flex items-center justify-center w-full gap-4">
					<div className="w-1/3 h-0.5 bg-gray-300"></div>
					<div className="font-semibold text-gray-700 select-none">OR</div>
					<div className="w-1/3 h-0.5 bg-gray-300"></div>
				</div>
				<div className="flex items-center justify-center">
					<button>
						<FcGoogle
							className="text-red-500"
							size={30}
						/>
					</button>
				</div>
			</div>
		</div>
	);
}
