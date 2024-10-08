import { UpdateProfileDto } from './../../core/dtos/profile/update-profile.dto';
import { User } from "@/core/models";

export interface IProfileService {
	toggleDarkMode(useDarkMode: boolean): Promise<User>;
	updateProfile(UpdateProfileDto: UpdateProfileDto): Promise<User>;
}
