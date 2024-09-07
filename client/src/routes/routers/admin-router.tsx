import { AdminDefaultLayout, AdminAuthLayout } from "@/layouts";
import { AdminContainer } from "@/layouts/admin/container/layout.module";
import { Accounts } from "@/layouts/admin/default/accounts.module";
import { Dashboard } from "@/layouts/admin/default/dashboard.module";
import { GameAssets } from "@/layouts/admin/default/game-assets.module";
import { Settings } from "@/layouts/admin/default/settings.module";
import { TransactionHistories } from "@/layouts/admin/default/transaction-histories.module";
import { Users } from "@/layouts/admin/default/users.module";
import { Navigate, RouteObject } from "react-router-dom";
import { ProtectedRoute, AuthRoute } from "../guards";

export const adminRouter: RouteObject = {
	path: "admin",
	element: (
		<ProtectedRoute isAdminRoute={true}>
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
					element: <Dashboard />,
					index: true,
				},
				{
					path: "game-assets",
					element: <GameAssets />,
				},
				{
					path: "accounts",
					element: <Accounts />,
				},
				{
					path: "users",
					element: <Users />,
				},
				{
					path: "settings",
					element: <Settings />,
				},
				{
					path: "transaction-histories",
					element: <TransactionHistories />,
				},
			],
		},
		{
			path: "login",
			element: (
				<AuthRoute isAdminRoute={true}>
					<AdminAuthLayout />
				</AuthRoute>
			),
		},
	],
};
