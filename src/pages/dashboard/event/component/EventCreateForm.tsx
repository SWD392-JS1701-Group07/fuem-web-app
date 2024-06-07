import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useParams } from "react-router-dom"
import { create } from "@/api/eventApi"
import { EventCreateModel } from "@/constants/models/Event"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

const items = [
    { id: "1", label: "Monday", },
    { id: "2", label: "Tuesday", },
    { id: "3", label: "Wednesday", },
    { id: "4", label: "Thursday", },
    { id: "5", label: "Friday", },
    { id: "6", label: "Saturday", },
    { id: "7", label: "Sunday", },
] as const

const formDetailSchema = z.object({
    name: z.string()
        .min(3, { message: 'Name must be at least 3 characters.' }),
    place: z.string(),
    // duration: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    startDate: z.date({
        required_error: "Please select a date"
    }),
    // endDate: z.date({
    //     required_error: "Please select a date"
    // }),
    description: z.string()
        .min(3, { message: 'Name must be at least 3 characters.' }),
    // eventStatus: z.boolean(),
    price: z.number({
        required_error: "required",
        invalid_type_error: "must be a number",
    }),
    quantity: z.number({
        required_error: "required",
        invalid_type_error: "must be a number",
    }),
    // avatarUrl: z.string()
    //     .min(3, { message: 'Name must be at least 3 characters.' }),
    // ownerId: z.number({
    //     required_error: "required",
    //     invalid_type_error: "must be a number",
    // }),
    subjectId: z.string(),
})

type FormDetailValues = z.infer<typeof formDetailSchema>

export function CreateEventForm() {
    const { dietId } = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

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
        description: "",
        startTime: new Date().toDateString(),
        endTime: new Date().toDateString(),
        startDate: new Date(),
        //endDate: new Date(),
        //eventStatus: true,
        price: 0,
        quantity: 0,
        //avatarUrl: "",
        //ownerId: 0,
        subjectId: "0"
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
        let eventCreateModel: EventCreateModel = {
            name: values.name,
            place: values.place,
            description: values.description,
            startTime: new Date(values.startTime),
            endTime: new Date(values.endTime),
            startDate: new Date(values.startDate),
            endDate: new Date(values.startDate),
            eventStatus: 1,
            price: values.price,
            quantity: values.quantity,
            avatarUrl: "#",
            ownerId: 1,
            subjectId: parseInt(values.subjectId)
        };
        create(eventCreateModel)
            .then((response) => {
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
                console.log("error", error)
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
                    <Accordion type="single" collapsible defaultValue="general">
                        <AccordionItem title="Event Detail" value="general">
                            <AccordionTrigger className="bg-slate-200 pl-2">General information</AccordionTrigger>
                            <AccordionContent>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Name of the event" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="place"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Place</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Place of the event" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="subjectId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Subject</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-start">
                                    <div className="pr-32">
                                        <FormField
                                            control={form.control}
                                            name="startDate"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>Event Date</FormLabel>
                                                    <FormDescription>
                                                        the scheduled date of this event.
                                                    </FormDescription>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "w-[240px] pl-3 text-left font-normal",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value ? (
                                                                        format(field.value, "MMM dd, yyyy")
                                                                    ) : (
                                                                        <span>Pick a date</span>
                                                                    )}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={{ before: new Date() }}
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="pr-32">
                                        <FormField
                                            control={form.control}
                                            name="startTime"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>Begin at</FormLabel>
                                                    <FormDescription>
                                                        the begin hour of this event.
                                                    </FormDescription>
                                                    <Input type="time" {...field} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="endTime"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>End at</FormLabel>
                                                    <FormDescription>
                                                        the end hour of this event.
                                                    </FormDescription>
                                                    <Input type="time" {...field} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-start">
                                    <div className="pr-44">
                                        <FormField
                                            control={form.control}
                                            name="price"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>Ticket price</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" min="0" placeholder="0" step={0.01} {...field} onChange={event => field.onChange(+event.target.value)} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="pr-44">
                                        <FormField
                                            control={form.control}
                                            name="quantity"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>Ticket quantity</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" min="0" placeholder="0" step={0.01} {...field} onChange={event => field.onChange(+event.target.value)} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Diet detail's description" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem title="Sponsor information" value={"sponsor"} disabled>
                            <AccordionTrigger className="bg-slate-200 pl-2" >Sponsor information</AccordionTrigger>
                            <AccordionContent>
                                {/* <FormField
                                control={form.control}
                                name="eventStatus"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <FormControl>
                                            <Checkbox {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            /> */}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Button type="submit" className="w-full hover:shadow-primary-md">Create Diet Detail</Button>
                </form>
            </Form>
        </>
    )
}
