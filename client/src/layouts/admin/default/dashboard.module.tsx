import { Card, CardContent, CardHeader, CardTitle, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components";
import { FaMoneyBill, FaRegChartBar } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import { MdCheckCircle, MdError } from "react-icons/md";
import moment from "moment";
import { useState } from "react";
import clsx from "clsx";


export function Dashboard() {
	const [isReload, setIsReload] = useState(false);

	function reload() {
		console.log("I am clicked")
		setIsReload(true);

		setTimeout(() => setIsReload(false), 1000);
	}

	return (
		<>
			<Card className="mb-3">
				<CardHeader>
					<CardTitle>
						Monthly Overview
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex justify-between items-center">
						<span>Last updated time: <b>{moment().format("DD/MM/yyyy hh:mm:ss")}</b></span>
						<TfiReload size={18} className={clsx("cursor-pointer", {
							"animate-spin": isReload
						})}
						onClick={() => reload()}
						/>
					</div>
				</CardContent>
			</Card>
			<div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2 mb-3">
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
					<CardTitle className="text-lg">List of sold accounts</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader className="bg-amber-200">
							<TableHead>No.</TableHead>
							<TableHead>Account Name</TableHead>
							<TableHead>Account Type</TableHead>
							<TableHead>Value</TableHead>
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
		</>
	);
}
