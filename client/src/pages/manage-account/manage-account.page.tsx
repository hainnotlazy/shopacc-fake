import { ProfileForm, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components";

export const ManageAccountPage = () => {
	return (
		<Tabs
			defaultValue="account-profile"
			className="space-y-4"
		>
			<TabsList className="h-fit grid w-full grid-cols-2 bg-red-500">
				<TabsTrigger
					className="text-base text-white"
					value="account-profile"
				>
					Account Profile
				</TabsTrigger>
				<TabsTrigger
					className="text-base text-white"
					value="change-password"
				>
					Change Password
				</TabsTrigger>
			</TabsList>
			<TabsContent value="account-profile">
				<ProfileForm />
			</TabsContent>
			<TabsContent value="change-password">45654</TabsContent>
		</Tabs>
	);
};
