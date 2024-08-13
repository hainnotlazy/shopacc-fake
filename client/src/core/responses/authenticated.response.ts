import { User } from "../models/user.model";

export interface AuthenticatedResponse {
	user: User;
	accessToken: string;
	refreshToken: string;
}
