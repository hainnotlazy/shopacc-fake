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
}

const cookiesService = new CookiesService();
export default cookiesService;
