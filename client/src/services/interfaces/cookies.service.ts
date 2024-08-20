import { AuthTokenType } from "../cookies.service";

export interface ICookiesService {
	getToken(type: AuthTokenType): string | undefined;
	setToken(type: AuthTokenType, value: string): void;
	hasAccessToken(): boolean;
	hasRefreshToken(): boolean;
	clearToken(type: AuthTokenType): void;
}
