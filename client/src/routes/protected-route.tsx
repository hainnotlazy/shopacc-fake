import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const [cookie] = useCookies(["access-token", "refresh-token"]);

	if (!cookie["access-token"] && !cookie["refresh-token"]) {
		return (
			<Navigate
				to="/login"
				replace
			/>
		);
	}

	return children ? children : <Outlet />;
}
