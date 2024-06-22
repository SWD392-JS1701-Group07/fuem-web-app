import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formDetailSchema = z.object({
    name: z.string().min(10, { message: "Name must be at least 10 characters" }),
    email: z.string().email({ message: "Invalid email" }),
    username: z.string().min(6, { message: "Username must be at least 6 characters" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    studentId: z.string().nullable().optional(),
    phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 characters" }),
    dob: z.date(),
    gender: z.string(),
    avatarUrl: z.string().optional(),
    roleId: z.number(),
    subjectId: z.number().nullable().optional(),
})

type FormDetailValues = z.infer<typeof formDetailSchema>

const StaffCreate = () => {

    const defaultValues: Partial<FormDetailValues> = {
        name: "",
        email: "",
        username: "",
        password: "",
        studentId: "",
        phoneNumber: "",
        dob: new Date(),
        gender: "",
        avatarUrl: "",
        roleId: 4,
        subjectId: null
    }
    const form = useForm<FormDetailValues>({
        resolver: zodResolver(formDetailSchema),
        defaultValues,
        mode: "onChange",
    })

    const onSubmit = (values: FormDetailValues) => {
        console.log(values);
    }

    return (
        <div className="w-full m-2 h-screen">
            <h1>Staff Create</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name*</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name of staff" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email*</FormLabel>
                                <FormControl>
                                    <Input placeholder="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username*</FormLabel>
                                <FormControl>
                                    <Input placeholder="username" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password*</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    );
}

export default StaffCreate;