import { AuthTokenType, CookiesService } from "@/services";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AUTH_ROUTES: string[] = ["/login", "/register"];
const PROTECTED_ROUTES: string[] = ["/verify"];

export function AuthRoute({
	children,
	isAdminRoute = false,
}: {
	children: React.ReactNode;
	isAdminRoute?: boolean;
}) {
	const location = useLocation();
	const { pathname } = location;

	const accessToken = CookiesService.getToken(AuthTokenType.ACCESS_TOKEN);
	const refreshToken = CookiesService.getToken(AuthTokenType.REFRESH_TOKEN);

	if (AUTH_ROUTES.includes(pathname) && accessToken && refreshToken) {
		return (
			<Navigate
				to={isAdminRoute ? "/admin/dashboard" : "/"}
				replace
			/>
		);
	}

	if (PROTECTED_ROUTES.includes(pathname) && !accessToken && !refreshToken) {
		return (
			<Navigate
				to={isAdminRoute ? "/admin/login" : "/login"}
				replace
			/>
		);
	}

	return children ? children : <Outlet />;
}
