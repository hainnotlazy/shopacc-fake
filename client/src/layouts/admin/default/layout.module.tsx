import { AdminSidebar, AdminSidebarItem } from "@/components/common/sidebar/admin-sidebar.module";
import { MdManageAccounts, MdOutlineDashboard, MdVideogameAsset } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";

export function AdminDefaultLayout() {
	return (
		<main>
			<div className="flex">
				<AdminSidebar>
					<AdminSidebarItem icon={<MdOutlineDashboard/>} text="Dashboard" active/>
					<AdminSidebarItem icon={<MdManageAccounts/>} text="Accounts"/>
					<AdminSidebarItem icon={<GrTransaction/>} text="Transaction Histories"/>
					<AdminSidebarItem icon={<MdVideogameAsset/>} text="Game Assets"/>
					<AdminSidebarItem icon={<FaUserFriends/>} text="Users"/>
				</AdminSidebar>
			</div>
			<div className="content"></div>
		</main>
	);
}
