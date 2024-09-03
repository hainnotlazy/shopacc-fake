import { Notification } from "@/components/common/notification/notification.module";
import { AdminUserNavigation } from "../../user-navigation/admin/user-navigation.module";
import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { DarkModeToggle } from "../../dark-mode-toggle/dark-mode-toggle.module";


export function AdminHeader() {
	return (
		<>
			<nav className="shadow-sm border-b bg-white dark:bg-slate-600 dark:text-slate-300 px-4 py-3 min-h-70 w-full">
				<div className="flex items-center justify-between">
					<div className="relative w-100">
						<FaSearch className="absolute top-2.5 start-3 text-black" />
						<Input type="text" placeholder="Type to search" className="ps-9 bg-neural-300 text-black dark:bg-slate-300" />
					</div>
					<div className="flex items-center gap-3">
						<Notification />
						<DarkModeToggle />
						<AdminUserNavigation />
					</div>
				</div>
			</nav>
		</>
	);
}
