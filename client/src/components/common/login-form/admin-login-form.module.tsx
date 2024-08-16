import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { adminLoginFormSchema } from "@/core/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";

export function AdminLoginForm() {
    const form = useForm<z.infer<typeof adminLoginFormSchema>>({
		resolver: zodResolver(adminLoginFormSchema),
		defaultValues: {
			username: "",
			password: "",
            rememberMe: false,
		},
	});
    
    return (
        <Form {...form}>
            <FormField 
                control={form.control}
                name="username" 
                render={(field) => (
                    <FormItem>
						<FormLabel>Username</FormLabel>
							<FormControl>
								<Input 
                                    autoFocus
									className={clsx(
										"focus:!ring-sky-500",
										field.fieldState.invalid && "ring-1 !ring-red-500",
									)}
									placeholder="Enter your username"
									{...field}
								/>
							</FormControl>
						<FormMessage />
					</FormItem>
                )}>
            </FormField>
        </Form>    
    );
}