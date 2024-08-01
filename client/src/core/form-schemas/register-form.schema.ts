import { z } from "zod";

const schema = z
	.object({
		username: z
			.string({
				required_error: "Username is required",
			})
			.min(3, { message: "Username must be at least 3 characters" })
			.max(80, { message: "Username is invalid" }),
		email: z
			.string({ required_error: "Email is required" })
			.email({
				message: "Email is invalid",
			})
			.max(255, { message: "Email is invalid" }),
		password: z
			.string({
				required_error: "Password is required",
			})
			.min(8, { message: "Password is invalid" })
			.max(150, { message: "Password is invalid" }),
		confirmPassword: z.string({
			required_error: "Confirm password is required",
		}),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export { schema };
