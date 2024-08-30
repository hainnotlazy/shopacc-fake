import { Notification } from "@/components/common/notification/notification.module";
import { AdminUserNavigation } from "../../user-navigation/admin/user-navigation.module";
import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { DarkModeToggle } from "../../dark-mode-toggle/dark-mode-toggle.module";

export function AdminHeader() {
	return (
		<>
			<nav className="bg-orange-600 px-4 py-3 h-70 flex items-center justify-between">
				<div className="relative w-100">
					<FaSearch className="absolute top-2.5 start-3" />
					<Input type="text" placeholder="Search..." className="ps-9 bg-neural-300 dark:bg-slate-500" />
				</div>
				<div className="flex items-center gap-3">
					<Notification />
					<DarkModeToggle />
					<AdminUserNavigation />
				</div>
			</nav>
		</>
	);
}
