import { EmailVerification, LoginForm, RegisterForm } from "@/components";
import { AuthLayout, DefaultLayout } from "@/layouts";
import { ErrorPage, HelloPage, HomePage, NotFoundPage } from "@/pages";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./protected-route";
import { AuthRoute } from "./auth-route";

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
		element: <AuthLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/login",
				element: (
					<AuthRoute>
						<LoginForm />
					</AuthRoute>
				),
			},
			{
				path: "/register",
				element: (
					<AuthRoute>
						<RegisterForm />
					</AuthRoute>
				),
			},
			{
				path: "verify",
				element: <EmailVerification />,
			},
		],
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
]);

export default router;
