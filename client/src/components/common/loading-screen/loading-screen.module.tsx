import { Loader } from "@/components";
import styles from "./loading-screen.module.scss";
import clsx from "clsx";

export function LoadingScreen() {
	return (
		<div className=" text-rose-700 absolute top-0 bottom-0 left-0 right-0 z-50 select-none">
			<div className="w-full h-full bg-gray-500 opacity-75"></div>
			<div className="absolute top-0 flex flex-col items-center justify-center w-full h-full gap-6">
				<Loader
					size="2xl"
					color="primary"
				/>
				<h6 className={clsx("text-4xl font-semibold opacity-100", styles["text-moderustic"])}>
					LOADING ...
				</h6>
			</div>
		</div>
	);
}
