import { LoginForm, RegisterForm, EmailVerification } from "@/components";
import { AuthLayout } from "@/layouts";
import { RouteObject } from "react-router-dom";
import { AuthRoute, ProtectedRoute, VerifyEmailRoute } from "../guards";

export const authRouter: RouteObject = {
	element: (
		<AuthRoute>
			<AuthLayout />
		</AuthRoute>
	),
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
};
