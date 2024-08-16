import { useAppDispatch, useAppSelector } from "@/core/store";
import { currentUserSelector } from "@/core/store/selectors";
import { updateUseDarkMode } from "@/core/store/slices/current-user.slice";
import { useEffect, useState } from "react";
import { TbBrightnessUp, TbMoonStars } from "react-icons/tb";

export function DarkModeToggle() {
	const dispatch = useAppDispatch();
	const currentUser = useAppSelector(currentUserSelector);
	const [isDarkMode, setIsDarkMode] = useState(
		currentUser?.useDarkMode ?? document.documentElement.classList.contains("dark"),
	);

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [isDarkMode]);

	useEffect(() => {
		if (typeof currentUser?.useDarkMode === "boolean") {
			setIsDarkMode(currentUser.useDarkMode);
		}
	}, [currentUser]);

	function handleToggleDarkMode() {
		if (currentUser) {
			dispatch(updateUseDarkMode(!currentUser.useDarkMode));
		} else {
			setIsDarkMode(prev => !prev);
		}
	}

	return (
		<button
			type="button"
			onClick={handleToggleDarkMode}
		>
			{isDarkMode ? (
				<TbMoonStars size={!!currentUser ? 27 : 24} />
			) : (
				<TbBrightnessUp size={!!currentUser ? 27 : 24} />
			)}
		</button>
	);
}
