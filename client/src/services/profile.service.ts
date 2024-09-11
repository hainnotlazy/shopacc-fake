import { IHttpClient } from './interfaces/httpClient';
import { UpdateProfileDto } from "@/core/dtos/profile/update-profile.dto";
import { User } from "@/core/models";
import { IProfileService } from "./interfaces/profile.service";
import { ICookiesService } from './interfaces';
import cookiesService, { AuthTokenType } from './cookies.service';
import httpClient from './httpClient';

class ProfileService implements IProfileService {
	constructor(private readonly httpClient: IHttpClient, private readonly cookiesService: ICookiesService) {}

	async toggleDarkMode(useDarkMode: boolean): Promise<User> {
		return await this.httpClient.put<User>("api/profile/darkmode", useDarkMode);
	}

	async updateProfile(updateProfileDto: UpdateProfileDto): Promise<User> {
		var formData = new FormData();
		formData.append("fullname", updateProfileDto.fullname ?? "");
		formData.append("bio", updateProfileDto.bio ?? "");
		formData.append("avatar", updateProfileDto.avatar ?? "");

		return await this.httpClient.put<User>("/api/profile/update", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${this.cookiesService.getToken(AuthTokenType.ACCESS_TOKEN) ?? ""}`,
			}
		});
	}
}

const profileService = new ProfileService(httpClient, cookiesService);
export default profileService;
