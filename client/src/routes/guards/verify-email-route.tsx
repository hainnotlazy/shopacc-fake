import { currentUserSelector } from "@/core/store/selectors";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export function VerifyEmailRoute({ children }: { children: React.ReactNode }) {
	const currentUser = useSelector(currentUserSelector);

	if (currentUser?.isEmailVerified) {
		return (
			<Navigate
				to={"/"}
				replace
			/>
		);
	}

	return children ? children : <Outlet />;
}
