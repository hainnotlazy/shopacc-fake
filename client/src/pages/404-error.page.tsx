import { TbChevronLeft, TbGhost } from "react-icons/tb";
import { Link } from "react-router-dom";

export function NotFoundPage() {
	return (
		<div className="bg-slate-200 flex flex-col items-center justify-center h-screen gap-3 select-none">
			<TbGhost size={100} />
			<h1 className=" space-y-2 font-semibold text-center">
				<span className="block text-4xl">Oops!</span>
				<span className="block text-3xl text-gray-600">Look like you're lost.</span>
			</h1>
			<Link
				to={"/"}
				className="hover:text-blue-400 hover:underline flex items-center gap-1 text-lg text-blue-600"
			>
				<TbChevronLeft />
				Back to home
			</Link>
		</div>
	);
}
