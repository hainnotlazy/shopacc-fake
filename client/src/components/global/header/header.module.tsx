import logo from "@/assets/logo.svg";
import logoText from "@/assets/logo-text.svg";
import { UserNavigation, DefaultNavigation } from "@/components";
import { TbBrightnessUp } from "react-icons/tb";
import { Link } from "react-router-dom";
import { currentUserSelector } from "@/core/store/selectors";
import styles from "./header.module.scss";
import clsx from "clsx";
import { useAppSelector } from "@/core/store";

export function Header() {
	const currentUser = useAppSelector(currentUserSelector);

	return (
		<header
			className={clsx(
				"py-2.5 fixed top-0 right-0 left-0 z-10 text-red-500 border-b border-gray-300 shadow-md bg-white flex items-center",
				styles.header,
			)}
		>
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
					<button type="button">
						<TbBrightnessUp size={24} />
					</button>

					{currentUser && <UserNavigation />}

					{!currentUser && <DefaultNavigation />}
				</div>
			</div>
		</header>
	);
}
