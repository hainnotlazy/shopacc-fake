import { AuthTokenType, CookiesService } from "@/services";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const accessToken = CookiesService.getToken(AuthTokenType.ACCESS_TOKEN);
	const refreshToken = CookiesService.getToken(AuthTokenType.REFRESH_TOKEN);

	if (!accessToken && !refreshToken) {
		return (
			<Navigate
				to="/login"
				replace
			/>
		);
	}

	return children ? children : <Outlet />;
}
