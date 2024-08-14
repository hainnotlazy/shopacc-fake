import styles from "./loader.module.scss";
import clsx from "clsx";

export function Loader({
	classNames,
	size = "base",
	color = "white",
}: {
	classNames?: string;
	size?: "base" | "lg" | "xl" | "2xl";
	color?: "white" | "primary";
}) {
	return (
		<div
			className={clsx(styles.loader, styles[`size-${size}`], styles[`text-${color}`], classNames)}
		></div>
	);
}
