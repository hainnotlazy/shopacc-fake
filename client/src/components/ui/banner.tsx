import { FC, PropsWithChildren } from "react";
import {
	IoAlertCircle,
	IoCheckmarkCircle,
	IoClose,
	IoInformationCircle,
	IoWarning,
} from "react-icons/io5";

type BannerVariant = "info" | "success" | "warning" | "danger";

const variantBorderColorMap = {
	info: "border-blue-600",
	success: "border-green-600",
	warning: "border-amber-600",
	danger: "border-red-600",
};

const variantBackgroundColorMap = {
	info: "bg-blue-50",
	success: "bg-green-50",
	warning: "bg-amber-50",
	danger: "bg-red-50",
};

const variantIconMap = {
	info: IoInformationCircle,
	success: IoCheckmarkCircle,
	warning: IoWarning,
	danger: IoAlertCircle,
};

type BannerProps = {
	variant?: BannerVariant;
	visible?: boolean;
	close?: boolean;
	onClose?: () => void;
};

const Banner: FC<PropsWithChildren<BannerProps>> = ({
	children,
	onClose,
	close = true,
	variant = "info",
	visible = true,
}) => {
	if (!visible) return null;

	const Icon = variantIconMap[variant];

	return (
		<div
			className={`w-full flex items-center gap-1 p-3 border-2 ${variantBorderColorMap[variant]} ${variantBackgroundColorMap[variant]}`}
		>
			{<Icon />}
			<p className="flex-1 text-start text-sm">{children}</p>
			{close && (
				<button
					type="button"
					onClick={() => onClose?.()}
				>
					<IoClose />
				</button>
			)}
		</div>
	);
};

export default Banner;
