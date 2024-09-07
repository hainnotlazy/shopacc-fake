import { AdminDefaultLayout, AdminAuthLayout, AdminContainer } from "@/layouts";
import { Navigate, RouteObject } from "react-router-dom";
import { ProtectedRoute, AuthRoute } from "../guards";
import {
	AdminAccounts,
	AdminDashboard,
	AdminGameAssets,
	AdminSettings,
	AdminTransactionHistories,
	AdminUsers,
} from "@/pages";

export const adminRouter: RouteObject = {
	path: "admin",
	element: (
		<ProtectedRoute isAdminRoute>
			<AdminContainer />
		</ProtectedRoute>
	),
	children: [
		{
			element: <AdminDefaultLayout />,
			children: [
				{
					path: "",
					element: (
						<Navigate
							to="/admin/dashboard"
							replace
						/>
					),
				},
				{
					path: "dashboard",
					element: <AdminDashboard />,
					index: true,
				},
				{
					path: "game-assets",
					element: <AdminGameAssets />,
				},
				{
					path: "accounts",
					element: <AdminAccounts />,
				},
				{
					path: "users",
					element: <AdminUsers />,
				},
				{
					path: "settings",
					element: <AdminSettings />,
				},
				{
					path: "transaction-histories",
					element: <AdminTransactionHistories />,
				},
			],
		},
		{
			path: "login",
			element: (
				<AuthRoute isAdminRoute>
					<AdminAuthLayout />
				</AuthRoute>
			),
		},
	],
};
