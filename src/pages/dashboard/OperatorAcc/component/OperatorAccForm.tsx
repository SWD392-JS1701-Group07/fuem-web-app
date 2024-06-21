import { createAccount } from "@/api/accountApi";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Account } from "@/constants/models/Account";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formDetailSchema = z.object({
    name: z.string()
        .min(3, { message: "Name must be at least 3 characters" }),
    subjectId: z.number({
        required_error: "Subject is required",
        invalid_type_error: "Subject must be a number",
    }),
    email: z.string().email({ message: "Invalid email" }),
    username: z.string().min(3, { message: "Username must be at least 3 characters" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
    studentId: z.string().min(3, { message: "Student ID must be at least 3 characters" }).optional(),
    phoneNumber: z.string()
        .min(9, { message: "Phone number must be at least 9 characters" })
        .max(10, { message: "Phone number must be at most 10 characters" }),
    dob: z.date(),
    gender: z.string().min(3, { message: "Gender must be at least 3 characters" }),
    avatarUrl: z.string(),
    roleId: z.number(),
    isVerified: z.boolean().optional()
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ['confirmPassword']
        });
    }
})

type FormDetailValues = z.infer<typeof formDetailSchema>

const OperatorAccForm = () => {
    //const { dietId } = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();
    const [Account, setAccount] = useState<Account[]>([]);

    useEffect(() => {
        const initialize = async () => {
            try {
            } catch (err: any) {
                setError(`Error initializing the app: ${err.message}`);
            } finally {
                setIsLoading(false);
            }
        };
        initialize();
    }, [])
    const defaultValues: Partial<FormDetailValues> = {
        name: "",
        subjectId: 0,
        email: "",
        username: "",
        password: "",
        studentId: "",
        phoneNumber: "",
        dob: new Date(),
        roleId: 0,
    }

    const form = useForm<FormDetailValues>({
        resolver: zodResolver(formDetailSchema),
        defaultValues,
        mode: "onChange",
    })
    // const handleEndTime = (date: string, duaration: string) => {
    //     return new Date(new Date(date) + new Date(duaration)).toDateString();
    // }

    console.log("error", form.formState.errors)

    async function onSubmit(values: FormDetailValues) {
        console.log("submit")
        let accountCreateModel: Account = {
            name: values.name,
            subjectId: values.subjectId,
            email: values.email,
            username: values.username,
            password: values.password,
            studentId: values.studentId || "1",
            phoneNumber: values.phoneNumber,
            dob: values.dob,
            roleId: values.roleId,
            gender: values.gender,
            avatarUrl: values.avatarUrl,
        };
        createAccount(accountCreateModel)
            .then(() => {
                toast({
                    title: "Create success",
                    description: "Diet detail has been created",
                })
                setIsLoading(false);
            })
            .catch((error) => {
                toast(
                    {
                        title: "Create failed",
                        description: error,
                        variant: "destructive",
                        duration: 2000,
                        className: cn(
                            'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
                        )
                    }

                )
                //console.log("error", error)
                setIsLoading(false);
            })
            .finally(() => {
                setIsLoading(false);
            })
        setIsLoading(false);
        //router.push(`/dashboard/diets/${dietId}/view`);
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Operator Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name of the event" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Place of the event" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Place of the event" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>confirm password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="confirm password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>confirm password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="confirm password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="studentId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>StudentId</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full hover:shadow-primary-md">Create Event</Button>
                </form>
            </Form>
        </>
    );
}

export default OperatorAccForm;