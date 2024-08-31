import { EmailVerification, LoginForm, RegisterForm } from "@/components";
import { AdminAuthLayout, AdminDefaultLayout, AuthLayout, DefaultLayout } from "@/layouts";
import { ErrorPage, HelloPage, HomePage, NotFoundPage } from "@/pages";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { AuthRoute, ProtectedRoute, VerifyEmailRoute } from "./guards";
import { AdminContainer } from "@/layouts/admin/container/layout.module";
import { Dashboard } from "@/layouts/admin/default/dashboard.module";
import { GameAssets } from "@/layouts/admin/default/game-assets.module";
import { Accounts } from "@/layouts/admin/default/accounts.module";
import { Users } from "@/layouts/admin/default/users.module";
import { Settings } from "@/layouts/admin/default/settings.module";
import { TransactionHistories } from "@/layouts/admin/default/transaction-histories.module";

const router = createBrowserRouter([
	{
		element: <DefaultLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "/hello",
				element: (
					<ProtectedRoute>
						<HelloPage />
					</ProtectedRoute>
				),
			},
		],
	},
	{
		element: (
			<AuthRoute>
				<AuthLayout />
			</AuthRoute>
		),
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/login",
				element: <LoginForm />,
			},
			{
				path: "/register",
				element: <RegisterForm />,
			},
			{
				path: "verify",
				element: (
					<ProtectedRoute>
						<VerifyEmailRoute>
							<EmailVerification />
						</VerifyEmailRoute>
					</ProtectedRoute>
				),
			},
		],
	},
	{
		path: "admin",
		errorElement: <ErrorPage />,
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
						path: "dashboard",
						element: <Dashboard />,
						index: true
					},
					{
						path: "game-assets",
						element: <GameAssets />
					},
					{
						path: "accounts",
						element: <Accounts />
					},
					{
						path: "users",
						element: <Users />
					},
					{
						path: "settings",
						element: <Settings />
					},
					{
						path: "transaction-histories",
						element: <TransactionHistories />
					}
				]
			},
			{
				path: "login",
				element: (
					<AuthRoute isAdminRoute={true}>
						<AdminAuthLayout />
					</AuthRoute>
				),
			},
			{
				path: "*",
				element: <NotFoundPage />
			}
		],
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
]);

export default router;
