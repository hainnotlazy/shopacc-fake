import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components";
import { FaMoneyBill, FaRegChartBar } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import { MdCheckCircle, MdError } from "react-icons/md";
import moment from "moment";
import { useState } from "react";
import clsx from "clsx";

export function Dashboard() {
	const [isReload, setIsReload] = useState(false);
	const [lastTick, setLastTick] = useState(moment().format("DD/MM/yyyy hh:mm:ss"));

	function reload() {
		console.log("I am clicked");
		setIsReload(true);

		setTimeout(() => {
			setIsReload(false);
			setLastTick(moment().format("DD/MM/yyyy hh:mm:ss"));
		}, 4000);
	}

	return (
		<>
			<div className="p-3 grid grid-cols-1 gap-y-3">
				<Card>
					<CardHeader>
						<CardTitle>Monthly Overview</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex justify-between items-center">
							<span>
								Last updated time: <b>{lastTick}</b>
							</span>
							<TfiReload
								size={18}
								className={clsx("cursor-pointer", {
									"animate-spin": isReload,
								})}
								onClick={() => reload()}
							/>
						</div>
					</CardContent>
				</Card>
				<div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2">
					<Card className="border-l-8 border-indigo-500">
						<CardHeader>
							<CardTitle>
								<div className="flex items-center gap-x-1">
									<FaMoneyBill size={20} />
									<label className="uppercase text-sm">Total revenue</label>
								</div>
							</CardTitle>
						</CardHeader>
						<CardContent>0 VND</CardContent>
					</Card>
					<Card className="border-l-8 border-blue-500">
						<CardHeader>
							<CardTitle>
								<div className="flex items-center gap-x-1">
									<FaRegChartBar size={20} />
									<label className="uppercase text-sm">Number of transactions</label>
								</div>
							</CardTitle>
						</CardHeader>
						<CardContent>0 transaction(s)</CardContent>
					</Card>
					<Card className="border-l-8 border-emerald-500">
						<CardHeader>
							<CardTitle>
								<div className="flex items-center gap-x-1">
									<MdCheckCircle size={20} />
									<label className="uppercase text-sm">Successful transactions</label>
								</div>
							</CardTitle>
						</CardHeader>
						<CardContent>0 transaction(s)</CardContent>
					</Card>
					<Card className="border-l-8 border-red-500">
						<CardHeader>
							<CardTitle>
								<div className="flex items-center gap-x-1">
									<MdError size={20} />
									<label className="uppercase text-sm">Failed transactions</label>
								</div>
							</CardTitle>
						</CardHeader>
						<CardContent>0 transaction(s)</CardContent>
					</Card>
				</div>
				<Card>
					<CardHeader>
						<CardTitle className="text-lg">User Rankings</CardTitle>
						<CardDescription>
							List of users who has the most deposit to their account
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader className="bg-lime-500">
								<TableRow className="group">
									<TableHead className="text-black group-hover:text-gray-400">No.</TableHead>
									<TableHead className="text-black group-hover:text-gray-400">User Name</TableHead>
									<TableHead className="text-black group-hover:text-gray-400">Membership</TableHead>
									<TableHead className="text-black group-hover:text-gray-400">Value</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableCell>1</TableCell>
									<TableCell>darkie</TableCell>
									<TableCell>No</TableCell>
									<TableCell>10.000.000 VND</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>2</TableCell>
									<TableCell>hainlazy</TableCell>
									<TableCell>Yes</TableCell>
									<TableCell>5.000.000 VND</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle className="text-lg">List of recently sold accounts</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader className="bg-lime-500">
								<TableRow className="group">
									<TableHead className="text-black group-hover:text-gray-400">No.</TableHead>
									<TableHead className="text-black group-hover:text-gray-400">
										Account Name
									</TableHead>
									<TableHead className="text-black group-hover:text-gray-400">
										Account Type
									</TableHead>
									<TableHead className="text-black group-hover:text-gray-400">Value</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableCell>1</TableCell>
									<TableCell>darkie</TableCell>
									<TableCell>VN - Unranked</TableCell>
									<TableCell>1.000.000 VND</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>2</TableCell>
									<TableCell>hainlazy</TableCell>
									<TableCell>VN - Iron</TableCell>
									<TableCell>1.500.000 VND</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle className="text-lg">List of recent transactions</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader className="bg-lime-500">
								<TableRow className="group">
									<TableHead className="text-black group-hover:text-gray-400">No.</TableHead>
									<TableHead className="text-black group-hover:text-gray-400">User Name</TableHead>
									<TableHead className="text-black group-hover:text-gray-400">Membership</TableHead>
									<TableHead className="text-black group-hover:text-gray-400">Value</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableCell>1</TableCell>
									<TableCell>darkie</TableCell>
									<TableCell>No</TableCell>
									<TableCell>10.000.000 VND</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>2</TableCell>
									<TableCell>hainlazy</TableCell>
									<TableCell>Yes</TableCell>
									<TableCell>5.000.000 VND</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
