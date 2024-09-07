import { DefaultLayout } from "@/layouts";
import { HomePage, HelloPage, ManageAccountPage } from "@/pages";
import { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "../guards";

export const defaultRouter: RouteObject = {
	element: <DefaultLayout />,
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
		{
			path: "account",
			element: (
				<ProtectedRoute>
					<ManageAccountPage />
				</ProtectedRoute>
			),
		},
	],
};
