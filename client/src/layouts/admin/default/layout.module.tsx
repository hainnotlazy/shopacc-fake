import { AdminSidebar, AdminSidebarItem } from "@/components/common/sidebar/admin-sidebar.module";
import { MdManageAccounts, MdOutlineDashboard, MdVideogameAsset } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { AdminHeader } from "@/components/global/header/admin/header.module";
import { IoSettings } from "react-icons/io5";
import { Outlet } from "react-router-dom";

export function AdminDefaultLayout() {
	return (
		<>
			<div className="flex">
				<AdminSidebar>
					<AdminSidebarItem icon={<MdOutlineDashboard/>} text="Dashboard" active />
					<AdminSidebarItem icon={<MdManageAccounts/>} text="Accounts" />
					<AdminSidebarItem icon={<GrTransaction/>} text="Transaction Histories" />
					<AdminSidebarItem icon={<MdVideogameAsset/>} text="Game Assets" />
					<AdminSidebarItem icon={<FaUserFriends/>} text="Users" />
					<AdminSidebarItem icon={<IoSettings />} text="Settings" />
				</AdminSidebar>
				<div className="w-full">
					<AdminHeader />

					<main id="content" className="p-3">
						<Outlet />
					</main>
				</div>
			</div>
		</>
	);
}
