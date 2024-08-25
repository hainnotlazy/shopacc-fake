import logo from "@/assets/logo.svg";
import logoText from "@/assets/logo-text.svg";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { createContext, ReactElement, useContext, useState } from "react";

const AdminSidebarExpandedContext = createContext<boolean>(true);
export function AdminSidebar({ children }: { children: Array<ReactElement> }) {
	const isExpanded = useContext(AdminSidebarExpandedContext);
	const [expanded, setExpanded] = useState(isExpanded);

	return (
		<aside className="h-screen md:block none" aria-label="Sidebar">
			<nav className="h-full flex flex-col bg-white border-r shadow-sm relative">
				<div className={`p-4 pb-2 flex justify-center items-center w:1/5 select-none`}>
					<img
						src={logo}
						alt="shopacc logo"
						loading="eager"
						className={`overflow-hidden transition-all w-20`}
						draggable="false"/>
					<img
						src={logoText}
						alt="ShopLOL.fake logo-text"
						loading="eager"
						className={`overflow-hidden transition-all ${
              expanded ? "w-36" : "w-0"
            }`}
						draggable="false"
					/>
					<button
						className="p-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 absolute -right-4"
						onClick={() => setExpanded((curr) => !curr)}
					>
						{!expanded ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
					</button>
				</div>

				<AdminSidebarExpandedContext.Provider value={expanded}>
					<ul className="flex-1 px-3">{children}</ul>
				</AdminSidebarExpandedContext.Provider>
			</nav>
		</aside>
	)
}

export function AdminSidebarItem({icon, text, active = false}: {icon: ReactElement, text?: string, active?: boolean}) {
	const expanded = useContext(AdminSidebarExpandedContext);

	return (
		<li className={`h-12 relative flex justify-center items-center py-2 px-3 my-1 rounded-md cursor-pointer text-lg transition-color group ` +
									 `${active ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800'
														 : 'hover:bg-indigo-50 text-gray-600'}`}>
			{ icon }
			<span
				className={`overflow-hidden transition-all ${
          expanded ? "w-48 ml-3" : "w-0"
        }`}
			>
				{ text }
			</span>
			{!expanded && (
        <div className={"absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 " +
												"text-base invisible opacity-20 -translate-x-3 transition-all group-hover:visible " +
												"group-hover:opacity-100 group-hover:translate-x-0"}
        >
          {text}
        </div>
			)}
		</li>
	)
}
