import { ErrorPage, NotFoundPage } from "@/pages";
import { createBrowserRouter } from "react-router-dom";
import { defaultRouter } from "./routers/default.router";
import { authRouter } from "./routers/auth.router";
import { adminRouter } from "./routers/admin-router";

const router = createBrowserRouter([
	{
		path: "",
		errorElement: <ErrorPage />,
		children: [defaultRouter, authRouter, adminRouter],
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
]);

export default router;
