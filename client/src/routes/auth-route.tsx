import { AuthTokenType, CookiesService } from "@/services";
import { Navigate, Outlet } from "react-router-dom";

export function AuthRoute({ children, onAuthenticatedUri }: { children: React.ReactNode, onAuthenticatedUri?: string }) {
	const accessToken = CookiesService.getToken(AuthTokenType.ACCESS_TOKEN);
	const refreshToken = CookiesService.getToken(AuthTokenType.REFRESH_TOKEN);

	if (accessToken && refreshToken) {
		return (
			<Navigate
				to={ !!onAuthenticatedUri ? onAuthenticatedUri : "/" }
				replace
			/>
		);
	}

	return children ? children : <Outlet />;
}
