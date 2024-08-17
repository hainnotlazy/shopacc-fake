import { AuthTokenType, CookiesService } from "@/services";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { matchPath } from "react-router-dom";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "../routes";

export function ProtectedRoute({
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

	const isMatch = PROTECTED_ROUTES.some((protectedRoute) => matchPath(protectedRoute, pathname) && !AUTH_ROUTES.includes(pathname));

	if (isMatch && !accessToken && !refreshToken) {
		return (
			<Navigate
				to={isAdminRoute ? "/admin/login" : "/login"}
				replace
			/>
		);
	}

	return children ? children : <Outlet />;
}
