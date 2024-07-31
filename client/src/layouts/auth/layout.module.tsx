import { Outlet } from "react-router-dom";
import altBackground from "@/assets/images/auth-alt-background.png";
import styles from "./layout.module.scss";
import clsx from "clsx";

export function AuthLayout() {
	return (
		<main className="bg-slate-100 flex h-screen max-h-screen overflow-hidden">
			<div className="md:w-1/2 xl:w-1/3 w-full p-4">
				<Outlet />
			</div>

			<div className="md:block xl:w-2/3 relative hidden w-1/2">
				<img
					className={clsx(
						"aspect-square brightness-50 object-cover w-full h-full",
						styles["animate-saturate"],
					)}
					src={altBackground}
					alt="Auth background"
					loading="eager"
					width="1024"
					height="1024"
				/>
				<div className="bottom-16 absolute left-0 right-0 px-4 space-y-3 text-center text-white">
					<h1 className="text-4xl font-semibold select-none">ShopLOL.fake</h1>
					<p className="text-neutral-300 text-lg">
						An online LOL account store is trusted by over 10,000 players.
					</p>
				</div>
			</div>
		</main>
	);
}
