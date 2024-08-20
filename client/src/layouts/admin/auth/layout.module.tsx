import { AdminLoginForm } from "@/components/common/login-form/admin-login-form.module";
import logo from "@/assets/logo.svg";
import { Footer, Toaster } from "@/components";
import background from "@/assets/images/admin-auth-background.jpg";

export function AdminAuthLayout() {
	return (
		<>
			<div
				className="bg-slate-100 bg-cover bg-top bg-no-repeat h-screen flex flex-col"
				style={{
					backgroundImage: `url(${background})`,
				}}
			>
				<main className="flex items-center justify-center container grow">
					<div
						id="login-form"
						className="shadow-md px-7 py-7 w-full md:w-2/3 xl:w-1/3 bg-white"
					>
						<div className="flex justify-center">
							<img
								src={logo}
								alt="ShopLOL.fake logo"
								width="80"
								height="80"
								loading="eager"
								draggable="false"
							/>
						</div>
						<AdminLoginForm />
					</div>
				</main>
				<Footer />
				<Toaster />
			</div>
		</>
	);
}
