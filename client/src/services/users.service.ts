import { User } from "@/core/models";
import httpClient from "./httpClient";
import { IHttpClient, IUsersService } from "./interfaces";
import { ResendVerificationCodeResponse } from "@/core/responses";

class UsersService implements IUsersService {
	constructor(private readonly httpClient: IHttpClient) {
		this.httpClient = httpClient;
	}

	async getCurrentUser(): Promise<User> {
		const user = await this.httpClient.get<User>("/api/users", {});

		return user;
	}

	async resendVerificationEmail(): Promise<ResendVerificationCodeResponse> {
		const result = await this.httpClient.post<ResendVerificationCodeResponse>(
			"/api/users/resend-verification-mail",
			null,
		);

		return result;
	}

	async verifyEmail(verificationCode: string): Promise<void> {
		await this.httpClient.post("/api/users/verify-email", { verificationCode });
	}
}

const usersService = new UsersService(httpClient);
export default usersService;
