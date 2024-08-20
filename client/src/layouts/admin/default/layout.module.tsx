import { AdminSidebar } from "@/components/common/sidebar/admin-sidebar.module";

export function AdminDefaultLayout() {
	return (
		<main>
			<div>
				<AdminSidebar />
			</div>
			<div className="content"></div>
		</main>
	);
}
