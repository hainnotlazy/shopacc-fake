import { Button } from "@/components";
import { Link } from "react-router-dom";

export function HomePage() {
	return (
		<div>
			<p>Home page!!</p>
			<Button asChild>
				<Link to="/verify">Go to verify</Link>
			</Button>
		</div>
	);
}
