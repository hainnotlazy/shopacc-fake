import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	useToast,
	Textarea,
	Button,
	Loader
} from "@/components";
import { profileFormSchema } from "@/core/form-schemas";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { currentUserSelector } from "@/core/store/selectors";
import { zodResolver } from "@hookform/resolvers/zod";
import Avvvatars from "avvvatars-react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RiCameraFill } from "react-icons/ri";
import profileService from "@/services/profile.service";
import { currentUserActions } from "@/core/store/slices";

export const ProfileForm = () => {
	const dispatch = useAppDispatch();
	const { toast } = useToast();
	const currentUser = useAppSelector(currentUserSelector);
	const form = useForm<z.infer<typeof profileFormSchema>>({
		resolver: zodResolver(profileFormSchema),
		defaultValues: {
			fullname: currentUser?.fullname ?? "",
			bio: currentUser?.bio ?? "",
			avatar: new File([], ""),
		},
	});
	const { isSubmitting, errors } = form.formState;

	async function handleProfileUpdate(formValues: any): Promise<void> {
		var newCurrentUser = await profileService.updateProfile(formValues);
		dispatch(currentUserActions.setCurrentUser(newCurrentUser));
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleProfileUpdate)}
				className="drop-shadow-md p-4 space-y-3 bg-white rounded-md shadow-md"
				encType="multipart/form-data"
			>
				<div>
					<h1 className="text-2xl font-semibold text-center text-red-500">My Profile</h1>
				</div>

				<div className="flex items-start gap-4">
					<div className="flex justify-center w-1/3">
						<FormField
							control={form.control}
							name="avatar"
							render={({ field }) => (
								<FormItem className="relative">
									<FormControl className="absolute w-full h-full opacity-0 cursor-pointer">
										<Input
											accept=".jpg, .jpeg, .png"
											id="avatar"
											type="file"
											onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)}
										/>
									</FormControl>
									<Avvvatars
										value={currentUser?.username ?? ""}
										size={150}
										border={true}
										borderColor="#f87171"
										borderSize={4}
									/>
									<label
										htmlFor="avatar"
										className="absolute bottom-0 hover:text-neutral-600 right-0 cursor-pointer p-2.5 text-xl bg-gray-300 rounded-full border-2 border-neutral-400 hover:shadow"
									>
										<RiCameraFill />
									</label>
								</FormItem>
							)}
						/>
					</div>
					<div className="flex-grow">
						<FormField
							control={form.control}
							name="fullname"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Fullname</FormLabel>
									<FormControl>
										<Input
											className={clsx(
												"focus:!ring-sky-500 bg-white max-w-96",
												form.getFieldState("fullname").invalid && "ring-1 !ring-red-500",
											)}
											placeholder="Enter your fullname"
											maxLength={80}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="bio"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Bio</FormLabel>
									<FormControl>
										<Textarea
											className={clsx(
												"resize-none focus:!ring-sky-500 bg-white max-w-96 h-24",
												form.getFieldState("bio").invalid && "ring-1 !ring-red-500",
											)}
											placeholder="What are you thinking?"
											maxLength={255}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							className="hover:bg-blue-500 focus-visible:ring-blue-600 disabled:bg-blue-400 flex items-center gap-2 ml-auto bg-blue-600"
							type="submit"
							disabled={isSubmitting}
						>
							{isSubmitting && <Loader />}
							{isSubmitting ? "Processing..." : "Update"}
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
};
