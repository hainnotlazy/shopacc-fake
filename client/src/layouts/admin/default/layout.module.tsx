import { AdminSidebar, AdminSidebarItem } from "@/components/global/sidebar/admin-sidebar.module";
import { AdminHeader } from "@/components/global/header/admin/header.module";
import { Outlet, useLocation } from "react-router-dom";
import { AdminModules } from "@/routes/admin-modules";

export function AdminDefaultLayout() {
	const location = useLocation();

	let sidebarElements = AdminModules.map(function(module) {
		const isActive = location.pathname.startsWith(module.redirectUri);
		return <AdminSidebarItem key={module.name} icon={module.icon} text={module.name} redirect={module.redirectUri} active={isActive} />;
	});

	return (
		<>
			<div className="flex">
				<div className="h-screen sticky top-0">
					<AdminSidebar>
						{sidebarElements}
					</AdminSidebar>
				</div>
				<div className="w-full flex flex-col">
					<div className="sticky top-0">
						<AdminHeader />
					</div>
					<main
						id="content"
						className="flex-1 p-3 bg-rose-50 dark:bg-slate-900"
					>
						<Outlet />
					</main>
				</div>
			</div>
		</>
	);
}
