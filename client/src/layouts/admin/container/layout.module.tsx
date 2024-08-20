import { LoadingScreen, Toaster } from "@/components";
import { useAppSelector } from "@/core/store";
import { fetchedCurrentUserSelector } from "@/core/store/selectors";
import { Outlet } from "react-router-dom";

export function AdminContainer() {
	const fetchedCurrentUser = useAppSelector(fetchedCurrentUserSelector);

	return (
		<div className="overflow-x-hidden">
			{!fetchedCurrentUser && <LoadingScreen/>}
			<Outlet />
			<Toaster />
		</div>
	);
}
