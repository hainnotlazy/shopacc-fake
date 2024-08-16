import { User } from "@/core/models";
import { ResendVerificationCodeResponse } from "@/core/responses";

export interface IUsersService {
	getCurrentUser(): Promise<User>;
	resendVerificationEmail(): Promise<ResendVerificationCodeResponse>;
	verifyEmail(verificationCode: string): Promise<void>;
}
