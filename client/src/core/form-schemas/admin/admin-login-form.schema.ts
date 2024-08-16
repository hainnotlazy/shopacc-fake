import { z } from "zod";

const schema = z.object({
	username: z
		.string({
			required_error: "Username is required",
		})
		.min(3, { message: "Username must be at least 3 characters" })
		.max(80, { message: "Username is invalid" }),
	password: z
		.string({
			required_error: "Password is required",
		})
		.min(8, { message: "Password is invalid" })
		.max(150, { message: "Password is invalid" }),
    rememberMe: z.boolean({})
                 .optional()
                 .default(false),
});

export { schema };