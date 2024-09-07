import { FcGoogle } from "react-icons/fc";
import { CodeResponse, GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { AuthService, AuthTokenType, CookiesService, HttpClient } from "@/services";
import { useToast } from "@/components";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/core/store";
import { appEnv } from "@/main";
import { AuthenticatedResponse } from "@/core/responses";
import { currentUserReducer } from "@/core/store/slices";

export function OAuthSection() {
	const googleClientId =
		appEnv.VITE_GOOGLE_AUTHENTICATION_CLIENT_ID ?? "google-authentication-client-id";

	return (
		<>
			<div className="flex items-center justify-center w-full gap-4">
				<div className="w-1/3 h-0.5 bg-gray-300"></div>
				<div className="font-semibold text-gray-700 select-none">OR</div>
				<div className="w-1/3 h-0.5 bg-gray-300"></div>
			</div>
			<div className="flex items-center justify-center">
				<GoogleOAuthProvider clientId={googleClientId}>
					<GoogleCustomButton />
				</GoogleOAuthProvider>
			</div>
		</>
	);
}

export function GoogleCustomButton() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { toast } = useToast();

	const handleGoogleLogin = useGoogleLogin({
		flow: "auth-code", //required
		onSuccess: async (codeResponse: CodeResponse) => {
			//Toggle loading screen on
			dispatch(currentUserReducer.actions.setFetchedUser(false));

			try {
				const authorizationCode: string = codeResponse.code; //Get authorization code for custom google button after signing in Google
				const result: AuthenticatedResponse = await AuthService.loginAsGoogle(authorizationCode);

				dispatch(currentUserReducer.actions.setCurrentUser(result.user));

				CookiesService.setToken(AuthTokenType.ACCESS_TOKEN, result.accessToken);
				CookiesService.setToken(AuthTokenType.REFRESH_TOKEN, result.refreshToken);

				toast({
					title: "Welcome 👋!",
					description: "Authenticated successfully",
					duration: 4000,
				});

				navigate("/");
			} catch (e) {
				const { status, message: errMessage } = HttpClient.getErrorResponse(e);
				toast({
					variant: "destructive",
					title: "Authenticate failed 🥲",
					description: errMessage,
				});
			} finally {
				//Toggle loading screen off
				dispatch(currentUserReducer.actions.setFetchedUser(true));
			}
		},
	});

	return (
		<button onClick={() => handleGoogleLogin()}>
			<FcGoogle
				className="text-red-500"
				size={30}
			/>
		</button>
	);
}
