import { AdminSidebar, AdminSidebarItem } from "@/components/global/sidebar/admin-sidebar.module";
import { AdminHeader } from "@/components/global/header/admin/header.module";
import { Outlet, useLocation } from "react-router-dom";
import { AdminModules } from "@/routes/admin-modules";

export function AdminDefaultLayout() {
	const location = useLocation();

	let sidebarElements = AdminModules.map(function(module) {
		const isActive = location.pathname.startsWith(module.redirectUri);
		return <AdminSidebarItem icon={module.icon} text={module.name} redirect={module.redirectUri} active={isActive} />;
	});

	return (
		<>
			<div className="flex">
				<AdminSidebar>
					{sidebarElements}
				</AdminSidebar>
				<div className="w-full">
					<AdminHeader />

					<main id="content" className="p-3 bg-purple-100 dark:bg-slate-900">
						<Outlet />
					</main>
				</div>
			</div>
		</>
	);
}
