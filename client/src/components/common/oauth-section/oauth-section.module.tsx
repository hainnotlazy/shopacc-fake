import { FcGoogle } from "react-icons/fc";
import { CodeResponse, GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import authService from "@/services/auth.service";
import { AuthenticatedResponse } from "@/core/responses";
import { useCookies } from "react-cookie";
import { handleSetAuthToken } from "@/core/utils";

export function OAuthSection() {
	return (
		<>
			<div className="flex items-center justify-center w-full gap-4">
				<div className="w-1/3 h-0.5 bg-gray-300"></div>
				<div className="font-semibold text-gray-700 select-none">OR</div>
				<div className="w-1/3 h-0.5 bg-gray-300"></div>
			</div>
			<div className="flex items-center justify-center">
				<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTHENTICATION_CLIENT_ID}>
					<GoogleCustomButton />
				</GoogleOAuthProvider>
			</div>
		</>
	);
}

export function GoogleCustomButton() {
	const [, setCookie] = useCookies(["access-token", "refresh-token"]);
	
	const handleGoogleLogin = useGoogleLogin({
		flow: 'auth-code', //required 
		onSuccess: async (codeResponse: CodeResponse) => {
			try {
				const authorizationCode: string = codeResponse.code; //Get authorization code for custom google button after sign-in Google
				const result:AuthenticatedResponse = await authService.loginAsGoogle(authorizationCode);
				
				handleSetAuthToken(setCookie, "access-token", result.accessToken);
				handleSetAuthToken(setCookie, "refresh-token", result.refreshToken);
			}
			catch(exception) {
				console.log(exception);
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