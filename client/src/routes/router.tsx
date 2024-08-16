import { EmailVerification, LoginForm, RegisterForm } from "@/components";
import { AdminAuthLayout, AuthLayout, DefaultLayout } from "@/layouts";
import { ErrorPage, HelloPage, HomePage, NotFoundPage } from "@/pages";
import { createBrowserRouter } from "react-router-dom";
import { AuthRoute, ProtectedRoute, VerifyEmailRoute } from "./guards";

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
		errorElement: <ErrorPage />,
		path: "admin",
		children: [
			{
				path: "login",
				element: (
					<AuthRoute isAdminRoute={true}>
						<AdminAuthLayout />
					</AuthRoute>
				),
			},
		],
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
]);

export default router;
