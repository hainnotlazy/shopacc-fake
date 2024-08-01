import { LoginForm } from "@/components";
import { RegisterForm } from "@/components/common/register-form/register-form.module";
import { AuthLayout, DefaultLayout } from "@/layouts";
import { ErrorPage, HelloPage, HomePage, NotFoundPage } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

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
				element: <HelloPage />,
			},
		],
	},
	{
		element: <AuthLayout />,
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
		],
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
]);

export default router;
