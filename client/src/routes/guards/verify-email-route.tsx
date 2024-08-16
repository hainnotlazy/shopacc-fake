import { useAppSelector } from "@/core/store";
import { currentUserSelector } from "@/core/store/selectors";
import { Navigate, Outlet } from "react-router-dom";

export function VerifyEmailRoute({ children }: { children: React.ReactNode }) {
	const currentUser = useAppSelector(currentUserSelector);

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
