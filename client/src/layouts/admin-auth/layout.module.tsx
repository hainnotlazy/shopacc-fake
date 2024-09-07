import { AdminLoginForm } from "@/components/common/admin-login-form/admin-login-form.module";
import logo from "@/assets/logo.svg";
import { Footer, Toaster } from "@/components";
import background from "@/assets/images/admin-auth-background.jpg";

export function AdminAuthLayout() {
	return (
		<div
			className="bg-slate-100 flex flex-col h-screen bg-top bg-no-repeat bg-cover"
			style={{
				backgroundImage: `url(${background})`,
			}}
		>
			<main className="grow container flex items-center justify-center">
				<div
					id="login-form"
					className="px-7 py-7 md:w-2/3 xl:w-1/3 w-full bg-white shadow-md"
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
	);
}
