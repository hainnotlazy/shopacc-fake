import { currentUserSelector } from "@/core/store/selectors";
import Avvvatars from "avvvatars-react";
import styles from "./user-navigation.module.scss";
import clsx from "clsx";
import { Button, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components";
import { TbUser, TbWallet, TbHistory, TbHeadset, TbLogout2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/core/store";

export function UserNavigation() {
	const currentUser = useAppSelector(currentUserSelector);

	return (
		<Sheet>
			<SheetTrigger asChild>
				<button
					className={clsx(
						"hover:shadow bg-gradient-to-tl to-red-700 via-red-500 from-red-800 flex items-center gap-3 px-3 py-2 text-white transition-all duration-500 rounded-lg select-none",
						styles["user-navigation"],
					)}
				>
					<Avvvatars
						value={currentUser?.username ?? ""}
						size={35}
					/>
					<div className="text-start sm:block hidden">
						<p className="font-semibold">{currentUser?.username}</p>
						<p className="text-sm">0đ</p>
					</div>
				</button>
			</SheetTrigger>
			<SheetContent className="w-full overflow-y-auto">
				<SheetHeader>
					<SheetTitle className="text-start flex items-center gap-3 px-2 pt-0 pb-4 border-b-2">
						<Avvvatars
							value={currentUser?.username ?? ""}
							size={60}
						/>
						<div>
							<p className="font-semibold">{currentUser?.username}</p>
							<p className="text-neutral-500 text-sm font-normal">
								Account balance: <span>0đ</span>
							</p>
						</div>
					</SheetTitle>
				</SheetHeader>
				<div className="md:hidden flex flex-col gap-3 pb-4 mt-4 border-b-2">
					<Button asChild>
						<Link
							className="px-4 py-2 font-semibold text-center"
							to="/"
						>
							Home
						</Link>
					</Button>
					<Button asChild>
						<Link
							className="px-4 py-2 font-semibold text-center"
							to="/"
						>
							Guide
						</Link>
					</Button>
				</div>
				<div className="flex flex-col gap-2 pb-4 mt-4 border-b-2">
					<Button
						autoFocus
						variant="ghost"
						className="h-fit hover:shadow-sm flex items-center justify-start gap-4 text-lg"
					>
						<div className="p-4 bg-indigo-100 rounded-lg">
							<TbUser className="text-indigo-600" />
						</div>
						<div className="text-start">
							<p>Manage Account</p>
							<p className="text-neutral-400 text-wrap text-sm font-normal">
								Edit user profile, change password
							</p>
						</div>
					</Button>
					<Button
						variant="ghost"
						className="h-fit hover:shadow-sm flex items-center justify-start gap-4 text-lg"
					>
						<div className="p-4 bg-green-100 rounded-lg">
							<TbWallet className="text-green-600" />
						</div>
						<div className="text-start">
							<p>Deposit</p>
							<p className="text-neutral-400 text-wrap text-sm font-normal">
								Deposit by bank, e-wallet
							</p>
						</div>
					</Button>
					<Button
						variant="ghost"
						className="h-fit hover:shadow-sm flex items-center justify-start gap-4 text-lg"
					>
						<div className="p-4 bg-yellow-100 rounded-lg">
							<TbHistory className="text-yellow-600 rotate-90" />
						</div>
						<div className="text-start">
							<p>Purchase History</p>
							<p className="text-neutral-400 text-wrap text-sm font-normal">View your orders</p>
						</div>
					</Button>
					<Button
						variant="ghost"
						className="h-fit hover:shadow-sm flex items-center justify-start gap-4 text-lg"
					>
						<div className="p-4 bg-blue-100 rounded-lg">
							<TbHeadset className="text-blue-600" />
						</div>
						<div className="text-start">
							<p>Support</p>
							<p className="text-neutral-400 text-wrap text-sm font-normal">
								Create ticket and get support in 24h
							</p>
						</div>
					</Button>
				</div>
				<Button className="flex items-center w-full gap-2 mt-4">
					<TbLogout2 />
					<span>Log out</span>
				</Button>
			</SheetContent>
		</Sheet>
	);
}
