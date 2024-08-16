import logo from "@/assets/logo.svg";
import logoText from "@/assets/logo-text.svg";
import { Button, Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components";
import { TbUserHexagon, TbMenu2, TbLogin2 } from "react-icons/tb";
import { Link } from "react-router-dom";

export function DefaultNavigation() {
	return (
		<>
			<Button
				variant="default"
				className="md:flex items-center hidden gap-2 text-base"
				asChild
			>
				<Link to={"/login"}>
					<TbUserHexagon
						size={18}
						className="md:block hidden"
					/>
					Sign In
				</Link>
			</Button>
			<div className="md:hidden">
				<Sheet>
					<SheetTrigger asChild>
						<button className="flex items-center">
							<TbMenu2 size={24} />
						</button>
					</SheetTrigger>
					<SheetContent className="w-full overflow-y-auto">
						<SheetHeader className="pb-4 border-b-2">
							<div className="flex items-center justify-center">
								<img
									src={logo}
									alt="ShopLOL.fake logo"
									width="60"
									height="60"
									loading="eager"
									draggable="false"
								/>
								<img
									src={logoText}
									alt="ShopLOL.fake logo-text"
									width="120"
									height="60"
									loading="eager"
									draggable="false"
								/>
							</div>
							<p className="text-neutral-600 text-center">
								The League of Legends account store is trusted by over 10,000 players.
							</p>
						</SheetHeader>
						<div className="flex flex-col gap-3 pb-4 mt-4 border-b-2">
							<Button asChild>
								<Link
									className="px-4 py-2 font-semibold text-center"
									to="/"
								>
									Home
								</Link>
							</Button>
							<Button asChild>
								<Link
									className="px-4 py-2 font-semibold text-center"
									to="/"
								>
									Guide
								</Link>
							</Button>
							<Button asChild>
								<Link
									className="px-4 py-2 font-semibold text-center"
									to="/"
								>
									Contact us
								</Link>
							</Button>
						</div>
						<div className="flex flex-col gap-3 mt-4">
							<p className="text-neutral-500 px-4 text-center">
								🌟 Be our member to get awesome discounts today
							</p>
							<Button className="hover:bg-blue-500 focus:bg-blue-500 flex items-center w-full gap-2 bg-blue-600">
								<TbLogin2 size={20} />
								<span>Log in</span>
							</Button>
							<Button
								variant={"outline"}
								className="hover:bg-blue-600 focus:bg-blue-600 hover:text-white focus:text-white flex items-center w-full gap-2"
							>
								<TbUserHexagon size={20} />
								<span>Sign up</span>
							</Button>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</>
	);
}
