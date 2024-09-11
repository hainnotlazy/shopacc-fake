import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAppSelector } from "@/core/store";
import { currentUserSelector } from "@/core/store/selectors";
import { useEffect, useRef, useState } from "react";

export function AdminNavigation() {
	const currentUser = useAppSelector(currentUserSelector);
	const [showUserOptions, setShowUserOptions] = useState(false);
	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef);

	function useOutsideAlerter(ref: any) {
		useEffect(() => {
			/**
			 * Alert if clicked on outside of element
			 */
			function handleClickOutside(event: any) {
				if (ref.current && !ref.current.contains(event.target)) {
					setShowUserOptions(false);
				}
			}
			// Bind the event listener
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				// Unbind the event listener on clean up
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [ref]);
	}

	return (
		<>
			<div ref={wrapperRef} className="cursor-pointer relative" onClick={() => setShowUserOptions(!showUserOptions)}>
				<Avatar className="select-none">
					<AvatarFallback>{currentUser?.username}</AvatarFallback>
				</Avatar>
				<div className={`absolute -left-20 ${!showUserOptions ? "hidden" : "block"}`}>
					<div className="w-40 bg-white">
						<ul>
							<li>Settings</li>
							<li>Help</li>
							<li>Logout</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}
