import { User } from "@/core/models";
import httpClient from "./httpClient";
import { IHttpClient, IUsersService } from "./interfaces";

class UsersService implements IUsersService {
	constructor(private readonly httpClient: IHttpClient) {
		this.httpClient = httpClient;
	}

	async getCurrentUser(): Promise<User> {
		const user = await this.httpClient.get<User>("/api/users", {});

		return user;
	}

	async resendVerificationEmail(): Promise<void> {
		await this.httpClient.post("/api/users/resend-verification-mail", null);
	}

	async verifyEmail(verificationCode: string): Promise<void> {
		await this.httpClient.post("/api/users/verify-email", { verificationCode });
	}
}

const usersService = new UsersService(httpClient);
export default usersService;
