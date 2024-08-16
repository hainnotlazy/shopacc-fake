import { Button } from "@/components";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { adminLoginFormSchema } from "@/core/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TbEyeOff, TbEye } from "react-icons/tb";
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
    const [showPassword, setShowPassword] = useState(false);
    const onHandleAdminLogin = async () => {
        const dataBody = form.getValues(); 
        console.log(dataBody);
    };
    
    return (
        <Form {...form}>
            <form
                className="grid gap-y-4" 
                onSubmit={onHandleAdminLogin}>
                <FormField 
                    control={form.control}
                    name="username" 
                    render={( {field} ) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input 
                                        autoFocus
                                        className={clsx(
                                            "focus:!ring-sky-500",
                                            form.getFieldState("username").invalid && "ring-1 !ring-red-500",
                                        )}
                                        placeholder="Enter your username"
                                        {...field}
                                    />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}>
                </FormField>
                <FormField 
                    control={form.control}
                    name="password" 
                    render={( {field} ) => (
                        <FormItem>
                            <FormLabel className="flex items-center justify-between gap-4">
                                <span>Password</span>
								<button
									className="hover:text-blue-500 flex items-center gap-1 mr-1 text-blue-600"
									type="button"
									tabIndex={-1}
									onClick={() => setShowPassword(!showPassword)}>
									{showPassword ? <TbEyeOff size={16} /> : <TbEye size={16} />}
									{showPassword ? "Hide" : "Show"}
							    </button>
                            </FormLabel>
                            <FormControl>
                                <Input 
                                    autoFocus
                                    className={clsx(
                                        "focus:!ring-sky-500",
                                        form.getFieldState("password").invalid && "ring-1 !ring-red-500",
                                    )}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}>
                </FormField>
                <FormField 
                    control={form.control}
                    name="rememberMe" 
                    render={( {field} ) => (   
                        <FormLabel className="flex items-center">
                            <Input
                                checked={field.value}
                                onChange={ (event) => { form.setValue("rememberMe", event.target.checked) } }
                                type="checkbox"
                                style={{
                                width: '30px',
                                height: '15px',
                                display: 'inline-block'
                            }} />
                            <label>Remember me</label>
                        </FormLabel>
                    )}>
                </FormField>
                <Button
                    type="submit">
                    Sign in
                </Button>
            </form>
        </Form>    
    );
}