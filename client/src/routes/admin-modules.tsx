import { Module } from "@/core/models/module.model";
import { MdManageAccounts, MdOutlineDashboard, MdVideogameAsset } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { IoSettings } from "react-icons/io5";

export const AdminModules: Module[] = [
	{
		icon: <MdOutlineDashboard />,
		name: "Dashboard",
		redirectUri: "/admin/dashboard",
	},
	{
		icon: <MdManageAccounts />,
		name: "Accounts",
		redirectUri: "/admin/accounts",
	},
	{
		icon: <GrTransaction />,
		name: "Transaction Histories",
		redirectUri: "/admin/transaction-histories",
	},
	{
		icon: <MdVideogameAsset />,
		name: "Game Assets",
		redirectUri: "/admin/game-assets",
	},
	{
		icon: <FaUserFriends />,
		name: "Users",
		redirectUri: "/admin/users",
	},
	{
		icon: <IoSettings />,
		name: "Settings",
		redirectUri: "/admin/settings",
	},
];
