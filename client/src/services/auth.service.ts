import { IAuthService } from "./interfaces/auth.service";
import { AuthenticatedResponse } from "@/core/responses";
import { IHttpClient } from "./interfaces";
import httpClient from "./httpClient";

class AuthService implements IAuthService {
	constructor(private readonly httpClient: IHttpClient) {
		this.httpClient = httpClient;
	}

	login(username: string, password: string): Promise<AuthenticatedResponse> {
		throw new Error("Method not implemented.");
	}
	async register(
		username: string,
		email: string,
		password: string,
	): Promise<AuthenticatedResponse> {
		const result = await this.httpClient.post<AuthenticatedResponse>("/api/auth/register", {
			username,
			email,
			password,
		});

		return result;
	}
}

const authService = new AuthService(httpClient);
export default authService;
