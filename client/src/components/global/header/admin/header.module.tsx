import { Notification } from "@/components/common/notification/notification.module";
import { AdminUserNavigation } from "../../user-navigation/admin/user-navigation.module";
import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { DarkModeToggle } from "../../dark-mode-toggle/dark-mode-toggle.module";

export function AdminHeader() {
	return (
		<>
			<nav className="dark:bg-slate-600 dark:text-slate-300 min-h-70 w-full px-4 py-3 bg-white border-b shadow-sm">
				<div className="flex items-center justify-between">
					<div className="w-100 relative">
						<FaSearch className="absolute top-2.5 start-3 text-black" />
						<Input
							type="text"
							placeholder="Type to search"
							className="ps-9 bg-neural-300 dark:bg-slate-300 text-black"
						/>
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
