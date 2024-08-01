import logo from "@/assets/logo.svg";
import logoText from "@/assets/logo-text.svg";
import { Button, Label, Switch } from "@/components";
import { TbUserHexagon, TbBrightnessUp } from "react-icons/tb";
import { Link } from "react-router-dom";
import { Turn as Hamburger } from "hamburger-react";
import { useState } from "react";
import clsx from "clsx";

export function Header() {
	const [isDarkMode, setDarkMode] = useState(false);
	const [isSidenavOpen, setSidenavOpen] = useState(false);

	return (
		<header className="py-2.5 fixed top-0 right-0 left-0 z-10 text-red-500 border-b border-gray-300 shadow-md bg-white">
			<div className="md:px-8 container flex items-center justify-between px-2 mx-auto">
				<Link
					to="/"
					className="flex items-center"
					tabIndex={-1}
				>
					<img
						className="sm:block hidden"
						src={logo}
						alt="ShopLOL.fake logo"
						width="50"
						height="50"
						loading="eager"
						draggable="false"
					/>
					<img
						src={logoText}
						alt="ShopLOL.fake logo-text"
						width="120"
						height="50"
						loading="eager"
						draggable="false"
					/>
				</Link>
				<div className="md:block hidden space-x-4">
					<button className="hover:bg-red-500 hover:text-white px-3 py-1.5 rounded hover:shadow text-lg font-semibold">
						Home
					</button>
					<button className="hover:bg-red-500 hover:text-white px-3 py-1.5 rounded hover:shadow text-lg font-semibold">
						Guide
					</button>
					<button className="hover:bg-red-500 hover:text-white px-3 py-1.5 rounded hover:shadow text-lg font-semibold">
						Contact us
					</button>
				</div>
				<div className="flex items-center gap-4">
					<button className="sm:block hidden">
						<TbBrightnessUp size={24} />
					</button>
					<Button
						variant="default"
						className="flex items-center gap-2 text-base"
						asChild
					>
						<Link to={"/login"}>
							<TbUserHexagon
								size={18}
								className="md:block hidden"
							/>
							Sign In
						</Link>
					</Button>
					<button className="md:hidden z-10 -ml-4">
						<Hamburger
							direction="right"
							size={24}
							toggled={isSidenavOpen}
							toggle={setSidenavOpen}
						/>
					</button>
				</div>
			</div>

			<div
				className={clsx(
					"md:hidden",
					isSidenavOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16",
					"transition-all duration-500 sidenav bg-slate-50 absolute top-0 bottom-0 right-0 w-3/4 sm:w-1/2 h-screen pt-12 space-y-2 border-l-2 border-gray-300 shadow-lg",
				)}
			>
				<Link
					to="/"
					className="flex items-center justify-center"
				>
					<img
						src={logo}
						alt="ShopLOL.fake logo"
						width="50"
						height="50"
						loading="eager"
						draggable="false"
					/>
					<img
						src={logoText}
						alt="ShopLOL.fake logo-text"
						width="120"
						height="50"
						loading="eager"
						draggable="false"
					/>
				</Link>
				<div className="flex items-center justify-center gap-3">
					<Switch
						id="theme-mode"
						checked={isDarkMode}
						onClick={() => setDarkMode(prev => !prev)}
					/>
					<Label
						className="text-lg"
						htmlFor="theme-mode"
					>
						{isDarkMode ? "Dark Mode" : "Light Mode"}
					</Label>
				</div>
				<div className="px-4 space-y-2">
					<button className="hover:bg-red-500 hover:text-white block text-center w-full px-3 py-1.5 rounded hover:shadow text-lg font-semibold">
						Home
					</button>
					<button className="hover:bg-red-500 hover:text-white block text-center w-full px-3 py-1.5 rounded hover:shadow text-lg font-semibold">
						Guide
					</button>
					<button className="hover:bg-red-500 hover:text-white block text-center w-full px-3 py-1.5 rounded hover:shadow text-lg font-semibold">
						Contact us
					</button>
				</div>
			</div>
		</header>
	);
}
