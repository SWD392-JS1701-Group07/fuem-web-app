import { Button } from "@/components/ui/button"
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
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
//import { useParams } from "react-router-dom"
import { create } from "@/api/eventApi"
import { EventCreateModel, ScheduleCreateModel, SponsorshipCreateModel } from "@/constants/models/Event"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/components/ui/use-toast"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useNavigate } from "react-router-dom"

const formDetailSchema = z.object({
    name: z.string()
        .min(3, { message: 'Name must be at least 3 characters.' }),
    startSellDate: z.string(),
    endSellDate: z.string(),
    description: z.string()
        .min(3, { message: 'Name must be at least 3 characters.' }),
    price: z.number({
        required_error: "required",
        invalid_type_error: "must be a number",
    }),
    quantity: z.number({
        required_error: "required",
        invalid_type_error: "must be a number",
    })
        .min(1, { message: 'Quantity must be at least 1.' }),
    avatarUrl: z.string()
        .optional(),
    subjectId: z.string(),
    schedules: z.array(z.object({
        date: z.string(),
        startTime: z.string(),
        endTime: z.string(),
        place: z.string(),
    })
    ).optional(),
    sponsor: z.array(z.object({
        name: z.string().
            min(3, { message: 'Name must be at least 3 characters.' }),
        email: z.string().email(),
        phoneNumber: z.string()
            .min(9, { message: 'Phone number must be 9 or 10 characters.' })
            .max(10, { message: 'Phone number must be 9 or 10 characters.' }),
        sponsorType: z.string()
            .min(3, { message: 'Name must be at least 3 characters.' })
            .max(50, { message: 'Name must be at most 50 characters.' })
            .optional(),
        sponsorSum: z.number({
            required_error: "required",
            invalid_type_error: "must be a number",
        }).min(1000, { message: 'Sum must be greater than 0.' }),
        sponsorDescription: z.string().optional(),
        avatarFile: z.string().optional(),
        newAccount: z.boolean().optional()
    }))
})

type FormDetailValues = z.infer<typeof formDetailSchema>
type Sponsorship = {
    id: number,
    sponsorship: SponsorshipCreateModel
}
type Schedule = {
    id: number,
    schedule: ScheduleCreateModel
}

const Subject = [
    { id: 1, name: "Computer fundamental" },
    { id: 2, name: "Software Engineering" },
    { id: 3, name: "Mathematics" },
]

export function CreateEventForm() {
    const nav = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();
    const [Sponsorships, setSponsorships] = useState<Sponsorship[]>([]);
    const [schedules, setSchedules] = useState<Schedule[]>([{ id: 0, schedule: { startTime: new Date(), endTime: new Date(), place: "place" } }]);

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
        price: 0,
        quantity: 0,
        avatarUrl: "",
        subjectId: "0",
        schedules: [],
        sponsor: []
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
        console.log("Sponsor avatar: ", values.sponsor[0].avatarFile)
        let eventCreateModel: EventCreateModel = {
            name: values.name,
            place: "place",
            description: values.description,
            startSellDate: new Date(values.startSellDate),
            endSellDate: new Date(values.endSellDate),
            price: values.price,
            quantity: values.quantity,
            avatarUrl: values.avatarUrl ? values.avatarUrl : null,
            ownerId: 5,
            eventStatus: "2",
            subjectId: parseInt(values.subjectId),
            scheduleList: values.schedules ? values.schedules.map((schedule) => {
                return {
                    startTime: new Date(schedule.date.split('T')[0] + "T" + schedule.startTime + ":00Z"),
                    endTime: new Date(schedule.date.split('T')[0] + "T" + schedule.endTime + ":00Z"),
                    place: schedule.place
                }
            }) : [],
            sponsorships: values.sponsor.map((sponsor) => {
                return {
                    description: sponsor.sponsorDescription || "",
                    type: sponsor.sponsorType || "",
                    title: sponsor.name,
                    sum: sponsor.sponsorSum,
                    sponsor: {
                        name: sponsor.name,
                        email: sponsor.email,
                        phoneNumber: sponsor.phoneNumber,
                        avatarFile: "#",
                        accountId: 0
                    }
                }
            })
        };
        create(eventCreateModel)
            .then(() => {
                toast({
                    title: "Create success",
                    description: "Event has been created",
                })
                nav("/dashboard/event");
            })
            .catch((error) => {
                console.log("error", error)
                toast({
                    title: "Create fail",
                    description: "Some errors occurred",
                    variant: "destructive",
                })
                setIsLoading(false);
            })
            .finally(() => {
                setIsLoading(false);
            })
        setIsLoading(false);
    }

    const handleAddSponsor = (ev: React.MouseEvent) => {
        ev.preventDefault();
        if (Sponsorships.length == 0) {
            setSponsorships([{
                id: Sponsorships.length,
                sponsorship: {
                    description: "description",
                    type: "type",
                    title: "title",
                    sum: 0,
                    sponsor: {
                        name: "sponsor",
                        email: "aaa",
                        phoneNumber: "123",
                        avatarFile: "#",
                        accountId: 0
                    }
                }
            }])
        } else {
            setSponsorships([...Sponsorships, {
                id: Sponsorships.length,
                sponsorship: {
                    description: "description",
                    type: "type",
                    title: "title",
                    sum: 0,
                    sponsor: {
                        name: "sponsor",
                        email: "aaa",
                        phoneNumber: "123",
                        avatarFile: "#",
                        accountId: 0
                    }
                }
            }])
        }
    }
    const handleAddSchedule = (ev: React.MouseEvent) => {
        ev.preventDefault();
        if (schedules.length == 0) {
            setSchedules([{
                id: schedules.length,
                schedule: {
                    startTime: new Date(),
                    endTime: new Date(),
                    place: "place"
                }
            }])
        } else {
            setSchedules([...schedules, {
                id: schedules.length,
                schedule: {
                    startTime: new Date(),
                    endTime: new Date(),
                    place: "place"
                }
            }])
        }
    }
    const handleDeleteSponsor = (id: number, ev: React.MouseEvent) => {
        ev.preventDefault();
        setSponsorships(Sponsorships.filter(sponsorship => sponsorship.id !== id))
    }
    const handleDeleteSchedule = (id: number, ev: React.MouseEvent) => {
        ev.preventDefault();
        setSchedules(schedules.filter(schedule => schedule.id !== id))
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <Accordion type="multiple" defaultValue={["general"]}>
                        <AccordionItem title="Event Detail" value="general">
                            <AccordionTrigger className="bg-slate-200 pl-2">General information*</AccordionTrigger>
                            <AccordionContent>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name*</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Name of the event" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="subjectId"
                                    render={({ field }) => (
                                        <FormItem className="mb-2">
                                            <FormLabel>Subject*</FormLabel>
                                            <FormControl>
                                                <select {...field} className="w-full p-2 border border-gray-200 rounded-md">
                                                    {Subject.map((subject) => (
                                                        <option key={subject.id} value={subject.id}>{subject.name}</option>
                                                    ))}
                                                </select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-start">
                                    <div className="pr-44">
                                        <FormField
                                            control={form.control}
                                            name="quantity"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>Ticket quantity*</FormLabel>
                                                    <FormDescription>ticket quantity</FormDescription>
                                                    <FormControl>
                                                        <Input type="number" min="0" placeholder="0" step={1} {...field} onChange={event => field.onChange(+event.target.value)} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="pr-44">
                                        <FormField
                                            control={form.control}
                                            name="price"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>Ticket price*</FormLabel>
                                                    <FormDescription>Enter 0 if the event is free</FormDescription>
                                                    <div className="flex">
                                                        <FormControl>
                                                            <Input type="number" min="0" placeholder="0" step={1000} {...field} onChange={event => field.onChange(+event.target.value)} />
                                                        </FormControl>
                                                        <FormLabel className="text-lg self-end">VND</FormLabel>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="pr-44">
                                        <FormField
                                            control={form.control}
                                            name="startSellDate"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>Ticket Sale At*</FormLabel>
                                                    <FormDescription>Also represent open date to participate</FormDescription>
                                                    <FormControl>
                                                        <Input type="date"  {...field} onChange={event => field.onChange(+event.target.value)} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="pr-4">
                                        <FormField
                                            control={form.control}
                                            name="endSellDate"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>Ticket Sale End*</FormLabel>
                                                    <FormDescription>Also represent close date of participant</FormDescription>
                                                    <FormControl>
                                                        <Input type="date" {...field} onChange={event => field.onChange(+event.target.value)} />
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
                                                <Input placeholder="Event's description" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem title="Schedule" value="schedule" className="my-1">
                            <AccordionTrigger className="bg-slate-200 pl-2" >Schedule*</AccordionTrigger>
                            <AccordionContent>
                                <Button onClick={handleAddSchedule}>Add Schedule</Button>
                                {schedules.map((schedule) => (
                                    <Card>
                                        <div className="flex justify-between m-2">
                                            <h1>Schedule {schedule.id + 1}*</h1>
                                            {(schedules.length > 1) ?
                                                <Button
                                                    onClick={(e) => handleDeleteSchedule(schedule.id, e)}
                                                >Remove</Button>
                                                : null
                                            }
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name={`schedules.${schedule.id}.date`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Date*</FormLabel>
                                                    <FormControl>
                                                        <Input type="date" {...field} min={new Date().toISOString().split('T')[0]} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`schedules.${schedule.id}.startTime`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>start Time*</FormLabel>
                                                    <FormControl>
                                                        <Input type="time" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`schedules.${schedule.id}.endTime`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>End Time*</FormLabel>
                                                    <FormControl>
                                                        <Input type="time" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`schedules.${schedule.id}.place`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Place*</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </Card>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem title="Sponsor information" value={"sponsor"}>
                            <AccordionTrigger className="bg-slate-200 pl-2" >Sponsor information</AccordionTrigger>
                            <AccordionContent>
                                <Button onClick={handleAddSponsor}>Add new sponsor</Button>
                                {Sponsorships.map((sponsor) => (
                                    <Card className="my-2">
                                        <div className="flex justify-between m-2">
                                            <h1>Sponsor {sponsor.id + 1}</h1>
                                            <div className="flex">
                                                <Input
                                                    placeholder="Filter emails..."
                                                    // value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                                                    // onChange={(event) =>
                                                    //     table.getColumn("email")?.setFilterValue(event.target.value)
                                                    // }
                                                    className="max-w-sm mr-2"
                                                />
                                                <Button>clear</Button>
                                                <Button onClick={(e) => handleDeleteSponsor(sponsor.id, e)}>Remove</Button>
                                            </div>
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name={`sponsor.${sponsor.id}.name`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>name*</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`sponsor.${sponsor.id}.email`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email*</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`sponsor.${sponsor.id}.phoneNumber`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Phone Number*</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="flex">
                                            <div className="w-full mr-10">
                                                <FormField
                                                    control={form.control}
                                                    name={`sponsor.${sponsor.id}.sponsorType`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Sponsor Type</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="w-full pr-4">
                                                <FormField
                                                    control={form.control}
                                                    name={`sponsor.${sponsor.id}.sponsorSum`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Sponsor Sum</FormLabel>
                                                            <div className="flex">
                                                                <FormControl>
                                                                    <Input type="number" min="0" placeholder="0" step={1000} {...field} onChange={event => field.onChange(+event.target.value)} />
                                                                </FormControl>
                                                                <FormLabel className="text-lg self-end">VND</FormLabel>
                                                            </div>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        {/* <FormField
                                            control={form.control}
                                            name={`sponsor.${sponsor.id}.avatarFile`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Sponsor Image</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} type="file" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        /> */}
                                        <FormField
                                            control={form.control}
                                            name={`sponsor.${sponsor.id}.newAccount`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Create a new account:    </FormLabel>
                                                    <FormControl>
                                                        <Checkbox {...field} value={(field.value == null ? "false" : "true")} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </Card>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Button type="submit" className="w-full hover:shadow-primary-md">Create Event</Button>
                </form>
            </Form>
        </>
    )
}
