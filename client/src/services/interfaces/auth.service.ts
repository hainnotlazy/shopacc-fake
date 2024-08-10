import { AuthenticatedResponse } from "@/core/responses";

export interface IAuthService {
	login(username: string, password: string): Promise<AuthenticatedResponse>;
	register(username: string, password: string): Promise<AuthenticatedResponse>;
}
