import { Footer, Header } from "@/components";
import { Outlet } from "react-router-dom";

export function DefaultLayout() {
	return (
		<div className="overflow-x-hidden">
			<Header />

			<main className="bg-slate-100 min-h-screen">
				<Outlet />
			</main>

			<Footer />
		</div>
	);
}
