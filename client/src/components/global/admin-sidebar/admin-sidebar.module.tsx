import logo from "@/assets/logo.svg";
import logoText from "@/assets/logo-text.svg";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { createContext, ReactElement, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminSidebarExpandedContext = createContext<boolean>(true);
export function AdminSidebar({ children }: { children: Array<ReactElement> }) {
	const isExpanded = useContext(AdminSidebarExpandedContext);
	const [expanded, setExpanded] = useState(isExpanded);

	return (
		<aside
			className="md:block hidden h-screen"
			aria-label="Sidebar"
		>
			<nav className="relative flex flex-col h-full bg-white border-r shadow-sm">
				<div className={`p-3 pb-2 flex justify-center select-none`}>
					<div className="h-14 flex items-center">
						<img
							src={logo}
							alt="shopacc logo"
							loading="eager"
							className={`overflow-hidden transition-all w-14 h-full`}
							draggable="false"
						/>
						<img
							src={logoText}
							alt="ShopLOL.fake logo-text"
							loading="eager"
							className={`overflow-hidden transition-all ${expanded ? "w-40 h-full" : "w-0"}`}
							draggable="false"
						/>
					</div>
					<button
						className="absolute p-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 top-1/2 -right-4 dark:text-black"
						onClick={() => setExpanded(curr => !curr)}
					>
						{!expanded ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</button>
				</div>

				<AdminSidebarExpandedContext.Provider value={expanded}>
					<ul className="flex-1 px-3 select-none">{children}</ul>
				</AdminSidebarExpandedContext.Provider>
			</nav>
		</aside>
	);
}

export function AdminSidebarItem({
	icon,
	text,
	redirect,
	active = false,
}: {
	icon: ReactElement;
	text: string;
	redirect: string;
	active?: boolean;
}) {
	const expanded = useContext(AdminSidebarExpandedContext);
	const navigate = useNavigate();

	return (
		<li
			className={
				`h-12 relative flex justify-center items-center py-2 px-3 my-1 rounded-md cursor-pointer transition-color group ` +
				`${
					active
						? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
						: "hover:bg-indigo-50 text-gray-600"
				}`
			}
			onClick={() => navigate(redirect)}
		>
			{icon}
			<span className={`overflow-hidden transition-all ${expanded ? "w-48 ml-3" : "w-0"}`}>
				{text}
			</span>
			{!expanded && (
				<div
					className={
						"absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 " +
						"text-base invisible opacity-20 -translate-x-3 transition-all group-hover:visible " +
						"group-hover:opacity-100 group-hover:translate-x-0"
					}
				>
					{text}
				</div>
			)}
		</li>
	);
}
