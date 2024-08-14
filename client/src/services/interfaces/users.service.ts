import { User } from "@/core/models";

export interface IUsersService {
	getCurrentUser(): Promise<User>;
	resendVerificationEmail(): Promise<void>;
	verifyEmail(verificationCode: string): Promise<void>;
}
