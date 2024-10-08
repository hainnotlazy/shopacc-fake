import { IAuthService } from "./interfaces/auth.service";
import { AuthenticatedResponse } from "@/core/responses";
import { IHttpClient } from "./interfaces";
import httpClient from "./httpClient";

class AuthService implements IAuthService {
	constructor(private readonly httpClient: IHttpClient) {
		this.httpClient = httpClient;
	}
	async loginAsAdmin(
		username: string,
		password: string,
		rememberMe: boolean,
	): Promise<AuthenticatedResponse> {
		return await this.httpClient.post<AuthenticatedResponse>("/api/auth/admin-login", {
			username,
			password,
			rememberMe,
		});
	}

	async loginAsGoogle(googleAuthCode: string): Promise<AuthenticatedResponse> {
		return await this.httpClient.post<AuthenticatedResponse>("/api/auth/external-login", {
			loginProvider: "google",
			authorizationCode: googleAuthCode,
		});
	}

	async login(username: string, password: string): Promise<AuthenticatedResponse> {
		return await this.httpClient.post<AuthenticatedResponse>("/api/auth/login", {
			username,
			password,
		});
	}

	async register(
		username: string,
		email: string,
		password: string,
	): Promise<AuthenticatedResponse> {
		return await this.httpClient.post<AuthenticatedResponse>("/api/auth/register", {
			username,
			email,
			password,
		});
	}
}

const authService = new AuthService(httpClient);
export default authService;
