import Cookies from "universal-cookie";
import { ICookiesService } from "./interfaces";

export enum AuthTokenType {
	ACCESS_TOKEN = "access-token",
	REFRESH_TOKEN = "refresh-token",
}

class CookiesService implements ICookiesService {
	private readonly cookies: Cookies;

	constructor() {
		this.cookies = new Cookies(null, {
			path: "/",
			sameSite: "strict",
		});
	}
	clearToken(type: AuthTokenType): void {
		this.cookies.remove(type);
	}

	getToken(type: AuthTokenType): string | undefined {
		const token = this.cookies.get(type);
		return token ? token : undefined;
	}

	setToken(type: AuthTokenType, value: string): void {
		const tokenLifeSpan: number =
			type === AuthTokenType.ACCESS_TOKEN
				? (import.meta.env.VITE_ACCESS_TOKEN_LIFESPAN_DAYS ?? 1)
				: (import.meta.env.VITE_REFRESH_TOKEN_LIFESPAN_DAYS ?? 30);

		this.cookies.set(type, value, {
			maxAge: tokenLifeSpan * 24 * 60 * 60,
		});
	}

	hasAccessToken(): boolean {
		return !!this.getToken(AuthTokenType.ACCESS_TOKEN);
	}

	hasRefreshToken(): boolean {
		return !!this.getToken(AuthTokenType.REFRESH_TOKEN);
	}
}

const cookiesService = new CookiesService();
export default cookiesService;
