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

export function AdminDashboard() {
	const [isReload, setIsReload] = useState(false);
	const [lastTick, setLastTick] = useState(moment().format("DD/MM/yyyy hh:mm:ss"));

	function reload() {
		setIsReload(true);

		setTimeout(() => {
			setIsReload(false);
			setLastTick(moment().format("DD/MM/yyyy hh:mm:ss"));
		}, 4000);
	}

	return (
		<>
			<div className="gap-y-3 grid grid-cols-1 p-3">
				<Card>
					<CardHeader>
						<CardTitle>Monthly Overview</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center justify-between">
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
				<div className="lg:grid-cols-4 md:grid-cols-2 grid grid-cols-1 gap-2">
					<Card className="border-l-8 border-indigo-500">
						<CardHeader>
							<CardTitle>
								<div className="gap-x-1 flex items-center">
									<FaMoneyBill size={20} />
									<label className="text-sm uppercase">Total revenue</label>
								</div>
							</CardTitle>
						</CardHeader>
						<CardContent>0 VND</CardContent>
					</Card>
					<Card className="border-l-8 border-blue-500">
						<CardHeader>
							<CardTitle>
								<div className="gap-x-1 flex items-center">
									<FaRegChartBar size={20} />
									<label className="text-sm uppercase">Number of transactions</label>
								</div>
							</CardTitle>
						</CardHeader>
						<CardContent>0 transaction(s)</CardContent>
					</Card>
					<Card className="border-emerald-500 border-l-8">
						<CardHeader>
							<CardTitle>
								<div className="gap-x-1 flex items-center">
									<MdCheckCircle size={20} />
									<label className="text-sm uppercase">Successful transactions</label>
								</div>
							</CardTitle>
						</CardHeader>
						<CardContent>0 transaction(s)</CardContent>
					</Card>
					<Card className="border-l-8 border-red-500">
						<CardHeader>
							<CardTitle>
								<div className="gap-x-1 flex items-center">
									<MdError size={20} />
									<label className="text-sm uppercase">Failed transactions</label>
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
									<TableHead className="group-hover:text-gray-400 text-black">No.</TableHead>
									<TableHead className="group-hover:text-gray-400 text-black">User Name</TableHead>
									<TableHead className="group-hover:text-gray-400 text-black">Membership</TableHead>
									<TableHead className="group-hover:text-gray-400 text-black">Value</TableHead>
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
									<TableHead className="group-hover:text-gray-400 text-black">No.</TableHead>
									<TableHead className="group-hover:text-gray-400 text-black">
										Account Name
									</TableHead>
									<TableHead className="group-hover:text-gray-400 text-black">
										Account Type
									</TableHead>
									<TableHead className="group-hover:text-gray-400 text-black">Value</TableHead>
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
									<TableHead className="group-hover:text-gray-400 text-black">No.</TableHead>
									<TableHead className="group-hover:text-gray-400 text-black">User Name</TableHead>
									<TableHead className="group-hover:text-gray-400 text-black">Membership</TableHead>
									<TableHead className="group-hover:text-gray-400 text-black">Value</TableHead>
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
