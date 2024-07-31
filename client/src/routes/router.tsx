import { AuthLayout, DefaultLayout } from "@/layouts";
import { HelloPage, HomePage } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
	{
		element: <DefaultLayout />,
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
		children: [
			{
				path: "/login",
				element: <div>login form here</div>,
			},
		],
	},
]);

export default router;
