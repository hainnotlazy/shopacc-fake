import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { FaBell } from "react-icons/fa";

export function Notification() {
	return (
		<>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger><FaBell /></TooltipTrigger>
					<TooltipContent>
						<div className="p-1">
							<span>There are no notifications to show</span>
						</div>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</>
	);
}
