import { z } from "zod";

const schema = z.object({
	fullname: z
		.string()
		.min(3, { message: "Fullname must be at least 3 characters" })
		.max(80, { message: "Fullname must be less than 80 characters" })
		.optional(),
	bio: z.string().max(255, { message: "Bio must be less than 255 characters" }).optional(),
	avatar: z.instanceof(File).optional(),
});

export { schema };
