import background from "@/assets/images/background.png";
import { Footer, Header, LoadingScreen, Toaster } from "@/components";
import { Outlet } from "react-router-dom";
import styles from "./layout.module.scss";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { fetchedCurrentUserSelector } from "@/core/store/selectors";

export function DefaultLayout() {
	const fetchedCurrentUser = useSelector(fetchedCurrentUserSelector);

	return (
		<div className="overflow-x-hidden">
			{!fetchedCurrentUser && <LoadingScreen />}
			<Header />

			<main
				className={clsx(
					"bg-slate-100 bg-blend-overlay bg-cover bg-top bg-no-repeat",
					styles["main-content"],
				)}
				style={{ backgroundImage: `url(${background})` }}
			>
				<div className="container p-4 mx-auto">
					<Outlet />
				</div>
			</main>

			<Toaster />

			<Footer />
		</div>
	);
}
