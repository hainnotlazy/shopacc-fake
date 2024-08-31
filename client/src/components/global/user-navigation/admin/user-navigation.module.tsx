import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAppSelector } from "@/core/store";
import { currentUserSelector } from "@/core/store/selectors";

export function AdminUserNavigation() {
	const currentUser = useAppSelector(currentUserSelector);

	return (
		<>
			<div>
				<Avatar>
					<AvatarFallback>{currentUser?.username}</AvatarFallback>
				</Avatar>
			</div>
		</>
	);
}
