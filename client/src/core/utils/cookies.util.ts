import { CookieSetOptions } from "universal-cookie";

export function handleSetAuthToken(
	callback: (
		name: "access-token" | "refresh-token",
		value: string,
		options?: CookieSetOptions,
	) => void,
	cookieName: "access-token" | "refresh-token",
	value: string,
): void {
	let tokenLifeSpan: number =
		cookieName === "access-token"
			? (import.meta.env.VITE_ACCESS_TOKEN_LIFESPAN_DAYS ?? 1)
			: (import.meta.env.VITE_REFRESH_TOKEN_LIFESPAN_DAYS ?? 30);

	callback(cookieName, value, {
		path: "/",
		sameSite: "strict",
		maxAge: tokenLifeSpan * 24 * 60 * 60,
	});
}
