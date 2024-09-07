import {
	AdminSidebar,
	AdminSidebarItem,
} from "@/components/global/admin-sidebar/admin-sidebar.module";
import { AdminHeader } from "@/components";
import { Outlet, useLocation } from "react-router-dom";
import { AdminModules } from "@/routes/admin-modules";

export function AdminDefaultLayout() {
	const location = useLocation();

	let sidebarElements = AdminModules.map(function (module) {
		const isActive = location.pathname.startsWith(module.redirectUri);
		return (
			<AdminSidebarItem
				key={module.name}
				icon={module.icon}
				text={module.name}
				redirect={module.redirectUri}
				active={isActive}
			/>
		);
	});

	return (
		<>
			<div className="flex">
				<div className="sticky top-0 h-screen">
					<AdminSidebar>{sidebarElements}</AdminSidebar>
				</div>
				<div className="flex flex-col w-full">
					<div className="sticky top-0 z-[90]">
						<AdminHeader />
					</div>
					<main
						id="content"
						className="bg-rose-50 dark:bg-slate-900 flex-1"
					>
						<Outlet />
					</main>
				</div>
			</div>
		</>
	);
}
