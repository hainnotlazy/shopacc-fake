import { FcGoogle } from "react-icons/fc";

export function OAuthSection() {
	return (
		<>
			<div className="flex items-center justify-center w-full gap-4">
				<div className="w-1/3 h-0.5 bg-gray-300"></div>
				<div className="font-semibold text-gray-700 select-none">OR</div>
				<div className="w-1/3 h-0.5 bg-gray-300"></div>
			</div>
			<div className="flex items-center justify-center">
				<button>
					<FcGoogle
						className="text-red-500"
						size={30}
					/>
				</button>
			</div>
		</>
	);
}
