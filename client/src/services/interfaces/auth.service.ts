import { AuthenticatedResponse } from "@/core/responses";

export interface IAuthService {
	login(username: string, password: string): Promise<AuthenticatedResponse>;
	register(username: string, email: string, password: string): Promise<AuthenticatedResponse>;
}
