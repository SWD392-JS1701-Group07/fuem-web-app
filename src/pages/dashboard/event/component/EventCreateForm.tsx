"use client"
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
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { addEventImage, create } from "@/api/eventApi"
import { EventCreateModel, SponsorshipCreateModel, Subject } from "@/constants/models/Event"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/components/ui/use-toast"
import { Card } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { Textarea } from "@/components/ui/textarea"
import { EVENT_PLACEHOLDER_URL } from "@/constants/models/url"
import { ChevronsUpDown } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Sponsor } from "@/constants/models/Sponsor"
import { searchSponsor } from "@/api/sponsorApi"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getAll } from "@/api/subjectApi"

const formDetailSchema = z.object({
    name: z.string()
        .min(3, { message: 'Name must be at least 3 characters.' }),
    startSellDate: z.string(),
    endSellDate: z.string(),
    description: z.string()
        .min(3, { message: 'Name must be at least 3 characters.' }),
    price: z.string({
        required_error: "required",
    }),
    quantity: z.string({
        required_error: "required",
    })
        .min(1, { message: 'Quantity must be at least 1.' }),
    avatarUrl: z.string()
        .optional(),
    subjectId: z.string(),
})

type FormDetailValues = z.infer<typeof formDetailSchema>
type ScheduleInCreate = {
    date: string,
    startTime: string,
    endTime: string,
    place: string
}

export function CreateEventForm() {
    const nav = useNavigate();
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [open, setOpen] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [searchSponsorList, setSearchSponsorList] = useState<Sponsor[]>([])
    const { toast } = useToast();
    const [Subject, setSubject] = useState<Subject[]>([])
    const [Sponsorships, setSponsorships] = useState<SponsorshipCreateModel[]>([]);
    const [schedules, setSchedules] = useState<ScheduleInCreate[]>([{ date: new Date().toString(), startTime: new Date().toString(), endTime: new Date().toString(), place: "" }]);
    useEffect(() => {
        searchSponsor(searchValue).then((res) => {
            console.log("search sponsor", res.data)
            setSearchSponsorList(res.data)
        }).catch((error) => {
            console.log("search sponsor fail", error)
            setSearchSponsorList([])
        })
    }, [searchValue])
    useEffect(() => {
        getAll().then((res) => {
            setSubject(res.data)
        }).catch((error) => {
            console.log("Get subject fail", error)
        })
    }, [])
    const defaultValues: Partial<FormDetailValues> = {
        name: "",
        description: "",
        price: "",
        quantity: "",
        avatarUrl: "",
        subjectId: "0",
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

        const eventCreateModel: EventCreateModel = {
            name: values.name,
            place: "place",
            description: values.description,
            startSellDate: new Date(values.startSellDate),
            endSellDate: new Date(values.endSellDate),
            price: parseInt(values.price),
            quantity: parseInt(values.quantity),
            avatarUrl: values.avatarUrl ? values.avatarUrl : null,
            ownerId: localStorage.getItem("userId") ? parseInt(localStorage.getItem("userId") as string) : 0,
            eventStatus: "2",
            subjectId: parseInt(values.subjectId),
            scheduleList: schedules ? schedules.map((schedule) => {
                return {
                    startTime: new Date(schedule?.date?.split('T')[0] + "T" + schedule?.startTime + ":00Z"),
                    endTime: new Date(schedule?.date?.split('T')[0] + "T" + schedule?.endTime + ":00Z"),
                    place: schedule?.place || ""
                }
            }) : [],
            sponsorships: Sponsorships.map((sponsorship) => {
                return {
                    description: sponsorship.description || "",
                    type: sponsorship.type || "",
                    title: sponsorship.title || "",
                    sum: sponsorship.sum || 0,
                    sponsor: {
                        name: sponsorship.sponsor.name || "",
                        email: sponsorship.sponsor.email || "",
                        phoneNumber: sponsorship.sponsor.phoneNumber || "",
                        accountId: null
                    }
                }
            })
        };
        create(eventCreateModel)
            .then((res) => {
                console.log("Create event success", res);

                const formData = new FormData();
                //@ts-expect-error
                formData.append('id', res.id.toString());
                //@ts-expect-error
                formData.append('avatarProfile', avatarFile);
                console.log("formData", formData.get('id'), formData.get('avatarProfile'));
                if (avatarFile) {
                    addEventImage(formData).then(() => {
                        toast({
                            title: "Create success",
                            description: "Event has been created",
                        })
                        nav("/dashboard/event");
                    }).catch((error) => {
                        console.log("Add image fail", error)
                        toast({
                            title: "Event created without Image",
                            description: "Event has been created but event image has not been uploaded",
                            style: {
                                backgroundColor: "yellow",
                                color: "black"
                            }
                        })
                        nav("/dashboard/event");
                    })
                } else {
                    toast({
                        title: "Create success",
                        description: "Event has been created",
                    })
                    nav("/dashboard/event");
                }
            })
            .catch((error) => {
                toast({
                    title: "Create fail",
                    description: error.response.data,
                    variant: "destructive",
                })
            })
            .finally(() => {
            })
    }

    const handleAddNewSponsor = (ev: React.MouseEvent) => {
        ev.preventDefault();
        if (Sponsorships.length == 0) {
            setSponsorships([{

                description: "",
                type: "",
                title: "",
                sum: 0,
                sponsor: {
                    name: "",
                    email: "",
                    phoneNumber: "",
                    accountId: null
                }
            }
            ])
        } else {
            setSponsorships([...Sponsorships, {
                description: "",
                type: "",
                title: "",
                sum: 0,
                sponsor: {
                    name: "",
                    email: "",
                    phoneNumber: "",
                    accountId: null
                }
            }
            ])
        }
    }
    const handleAddSponsor = (ev: React.MouseEvent, sponsor: Sponsor) => {
        ev.preventDefault();
        if (Sponsorships.length == 0) {
            setSponsorships([{
                description: "",
                type: "",
                title: "",
                sum: 0,
                sponsor: {
                    name: sponsor?.name || "",
                    email: sponsor?.email || "",
                    phoneNumber: sponsor?.phoneNumber || "",
                    accountId: sponsor?.accountId || null
                }
            }
            ])
        } else {
            setSponsorships([...Sponsorships, {
                description: "",
                type: "",
                title: "",
                sum: 0,
                sponsor: {
                    name: sponsor?.name || "",
                    email: sponsor?.email || "",
                    phoneNumber: sponsor?.phoneNumber || "",
                    accountId: sponsor?.accountId || null
                }
            }
            ])
        }
    }
    const handleAddSchedule = (ev: React.MouseEvent) => {
        ev.preventDefault();
        if (schedules.length == 0) {
            setSchedules([{
                date: new Date().toString(),
                startTime: new Date().toString(),
                endTime: new Date().toString(),
                place: ""
            }
            ])
        } else {
            setSchedules([...schedules, {
                date: new Date().toString(),
                startTime: new Date().toString(),
                endTime: new Date().toString(),
                place: ""
            }
            ])
        }
    }
    const handleDeleteSponsor = (id: number, ev: React.MouseEvent) => {
        ev.preventDefault();
        setSponsorships(Sponsorships.filter(sponsorship => sponsorship !== Sponsorships[id]))
    }
    const handleDeleteSchedule = (id: number, ev: React.MouseEvent) => {
        ev.preventDefault();
        setSchedules(schedules.filter(schedule => schedule !== schedules[id]))
    }
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAvatarFile(e.target.files[0])
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <Accordion type="multiple" defaultValue={["general", "schedule"]}>
                        <AccordionItem title="Event Detail" value="general">
                            <AccordionTrigger className="bg-slate-200 pl-2">General information*</AccordionTrigger>
                            <AccordionContent>
                                <div className="flex w-full">
                                    <div>
                                        {avatarFile ? <img src={URL.createObjectURL(avatarFile)} alt="avatar" className="max-h-80" /> : <img src={EVENT_PLACEHOLDER_URL} />}
                                        <input type="file" accept="image/*" placeholder="Name of the event" onChange={handleAvatarChange} />
                                    </div>
                                    <div className="w-full ml-5">
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
                                        <div className="mt-5">
                                            <FormField
                                                control={form.control}
                                                name="description"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel >Description</FormLabel>
                                                        <FormControl>
                                                            <Textarea className="h-44" placeholder="Event's description" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5">
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
                                </div>
                                <div className="flex justify-start mt-5">
                                    <div className="pr-44">
                                        <FormField
                                            control={form.control}
                                            name="quantity"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>Ticket quantity*</FormLabel>
                                                    <FormDescription>ticket quantity</FormDescription>
                                                    <FormControl>
                                                        <Input type="number" min="1" placeholder="0" step={1} {...field} />
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
                                                            <Input type="number" min="10000" placeholder="0" step={1000} {...field} />
                                                        </FormControl>
                                                        <FormLabel className="text-lg self-end ml-1">VND</FormLabel>
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
                                                        <Input type="date"  {...field} />
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
                                                        <Input type="date" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem title="Schedule" value="schedule" className="my-1">
                            <AccordionTrigger className="bg-slate-200 pl-2" >Schedule*</AccordionTrigger>
                            <AccordionContent>
                                <Button onClick={handleAddSchedule}>Add Schedule</Button>
                                {schedules.map((schedule, id) => (
                                    <Card>
                                        <div className="flex justify-between m-2">
                                            <h1 className="text-lg">Schedule {id + 1}*</h1>
                                            {(schedules.length > 1) ?
                                                <Button
                                                    onClick={(e) => handleDeleteSchedule(id, e)}
                                                >Remove</Button>
                                                : null
                                            }
                                        </div>
                                        <div className="mt-5">
                                            <span>Date*</span>
                                            <Input required type="date" value={schedule.date} onChange={(e) => {
                                                setSchedules(schedules.map((schedule, index) => {
                                                    if (index === id) {
                                                        return { ...schedule, date: e.target.value }
                                                    }
                                                    return schedule
                                                }))
                                            }} />
                                        </div>
                                        <div className="mt-5">
                                            <span>Start Time*</span>
                                            <Input required type="time" value={schedule.startTime} onChange={(e) => {
                                                setSchedules(schedules.map((schedule, index) => {
                                                    if (index === id) {
                                                        return { ...schedule, startTime: e.target.value }
                                                    }
                                                    return schedule
                                                }))
                                            }}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <span>End Time*</span>
                                            <Input required type="time" value={schedule.endTime} onChange={(e) => {
                                                setSchedules(schedules.map((schedule, index) => {
                                                    if (index === id) {
                                                        return { ...schedule, endTime: e.target.value }
                                                    }
                                                    return schedule
                                                }))
                                            }}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <span>Place*</span>
                                            <Input required value={schedule.place} onChange={(e) => {
                                                setSchedules(schedules.map((schedule, index) => {
                                                    if (index === id) {
                                                        return { ...schedule, place: e.target.value }
                                                    }
                                                    return schedule
                                                }))
                                            }}
                                            />
                                        </div>
                                    </Card>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem title="Sponsor information" value={"sponsor"}>
                            <AccordionTrigger className="bg-slate-200 pl-2" >Sponsor information</AccordionTrigger>
                            <AccordionContent>
                                <div className="flex justify-between m-2">
                                    <Button onClick={handleAddNewSponsor}>Add new sponsor</Button>
                                    <div className="flex">
                                        <Popover open={open} onOpenChange={setOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={open}
                                                    className="w-[200px] justify-between"
                                                    onClick={() => { setSearchValue("") }}
                                                >
                                                    Search Sponsor
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[200px] p-0">
                                                <ScrollArea>
                                                    <Input
                                                        placeholder="Search sponsor"
                                                        onChange={(e) => setSearchValue(e.target.value)}
                                                    />
                                                    {(searchSponsorList.length > 0) ? (
                                                        searchSponsorList.map((sponsor) => (
                                                            <Button
                                                                onClick={(e) => { handleAddSponsor(e, sponsor), setOpen(false) }}
                                                                className="w-full"
                                                            >
                                                                {sponsor.name}
                                                            </Button>
                                                        ))) : (<Button className="w-full">no Result</Button>)
                                                    }
                                                </ScrollArea>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                                {Sponsorships.map((sponsorship, id) => (
                                    <Card className="my-2">
                                        <div className="flex justify-between m-2">
                                            <h1 className="text-lg">Sponsor {id + 1}</h1>
                                            <Button onClick={(e) => handleDeleteSponsor(id, e)}>Remove</Button>
                                        </div>
                                        <div className="mt-5">
                                            <span>Name*</span>
                                            {(sponsorship.sponsor.name != "") ?
                                                <Input required value={sponsorship.sponsor.name} disabled /> :
                                                <Input required value={sponsorship.sponsor.name} onChange={(e) => {
                                                    setSponsorships(Sponsorships.map((sponsorship, index) => {
                                                        if (index === id) {
                                                            return { ...sponsorship, sponsor: { ...sponsorship.sponsor, name: e.target.value } }
                                                        }
                                                        return sponsorship
                                                    }))
                                                }
                                                }
                                                />}
                                        </div>
                                        <div className="mt-5">
                                            <span>Email*</span>
                                            {(sponsorship.sponsor.email != "") ?
                                                <Input required value={sponsorship.sponsor.email} disabled /> :
                                                <Input required value={sponsorship.sponsor.email} onChange={(e) => {
                                                    setSponsorships(Sponsorships.map((sponsorship, index) => {
                                                        if (index === id) {
                                                            return { ...sponsorship, sponsor: { ...sponsorship.sponsor, email: e.target.value } }
                                                        }
                                                        return sponsorship
                                                    }))
                                                }}
                                                />}
                                        </div>
                                        <div className="mt-5">
                                            <span>Phone number*</span>
                                            {(sponsorship.sponsor.phoneNumber != "") ?
                                                <Input required value={sponsorship.sponsor.phoneNumber} disabled /> :
                                                <Input required value={sponsorship.sponsor.phoneNumber} onChange={(e) => {
                                                    setSponsorships(Sponsorships.map((sponsorship, index) => {
                                                        if (index === id) {
                                                            return { ...sponsorship, sponsor: { ...sponsorship.sponsor, phoneNumber: e.target.value } }
                                                        }
                                                        return sponsorship
                                                    }))
                                                }}
                                                />}
                                        </div>
                                        <div className="flex mt-5">
                                            <div className="w-full mr-10">
                                                <span>Sponsor Type*</span>
                                                <Input required value={sponsorship.type} onChange={
                                                    (e) => {
                                                        setSponsorships(Sponsorships.map((sponsorship, index) => {
                                                            if (index === id) {
                                                                return { ...sponsorship, type: e.target.value }
                                                            }
                                                            return sponsorship
                                                        }))
                                                    }
                                                } />
                                            </div>
                                            <div className="w-full pr-4">
                                                <span>Sponsorship Sum*</span>
                                                <Input
                                                    required
                                                    type="number"
                                                    min="10000"
                                                    placeholder="0"
                                                    step={1000}
                                                    value={sponsorship.sum}
                                                    onChange={(e) => {
                                                        setSponsorships(Sponsorships.map((sponsorship, index) => {
                                                            if (index === id) {
                                                                return { ...sponsorship, sum: parseInt(e.target.value) }
                                                            }
                                                            return sponsorship
                                                        }))
                                                    }}
                                                />
                                            </div>
                                        </div>
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
