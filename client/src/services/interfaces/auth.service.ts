import { AuthenticatedResponse } from "@/core/responses";

export interface IAuthService {
	login(username: string, password: string): Promise<AuthenticatedResponse>;
	loginAsGoogle(googleAuthCode: string): Promise<AuthenticatedResponse>;
	loginAsAdmin(
		username: string,
		password: string,
		rememberMe: boolean,
	): Promise<AuthenticatedResponse>;
	register(username: string, email: string, password: string): Promise<AuthenticatedResponse>;
}
