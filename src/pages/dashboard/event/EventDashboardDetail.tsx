import { getById, updateStatus } from "@/api/eventApi";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Event } from "@/constants/models/Event";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventDashboardDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<Event>();
    useEffect(() => {
        getById(Number(id)).then((res) => {
            //@ts-expect-error
            setEvent(res);
        });
    }, [id]);
    const handleActive = () => {
        if (event?.eventStatus === "Planning") {
            updateStatus(Number(id)).then(() => {
                updateStatus(Number(id)).then((res) => {
                    //@ts-expect-error
                    setEvent(res);
                    toast({
                        title: "Active success",
                        description: "Event is active",
                        variant: "default"
                    })
                }).catch(() => {
                    toast({
                        title: "Active fail",
                        description: "Event is not active",
                        variant: "destructive"
                    })
                }).catch(() => {
                    toast({
                        title: "Active fail",
                        description: "Event is not active",
                        variant: "destructive"
                    })
                })
            });
        } else {
            updateStatus(Number(id)).then((res) => {
                //@ts-expect-error
                setEvent(res);
                toast({
                    title: "Active success",
                    description: "Event is active",
                    variant: "default"
                })
            }).catch(() => {
                toast({
                    title: "Active fail",
                    description: "Event is not active",
                    variant: "destructive"
                })
            })
        }
    }
    console.log("data:", event);
    return (
        <div className="w-full">
            <div className="flex justify-between w-full">
                <h1 className="text-2xl">Event Detail</h1>
                {(localStorage.getItem("role") === "4" ?
                    ((event?.eventStatus == "Planning" || event?.eventStatus == "Pending") ?
                        (<Button onClick={handleActive} className="m-2">Active</Button>)
                        : null) : null)}
            </div>
            <Accordion type="multiple" defaultValue={["general"]}>
                <AccordionItem title="Event Detail" value="general">
                    <AccordionTrigger className="bg-slate-200 pl-2">General information</AccordionTrigger>
                    <AccordionContent>
                        <Card className="pt-2 text-lg">
                            <CardContent>Event Name: {event?.name}</CardContent>
                            <CardContent>
                                Sale Date: {event?.startSellDate.toString().substring(5, 10)}
                                - {event?.endSellDate.toString().substring(5, 10)}
                                -{event?.endSellDate.toString().substring(0, 4)}
                            </CardContent>
                            <CardContent>Ticket Price: {event?.price} VND</CardContent>
                            <CardContent>Ticket Quantity: {event?.quantity}</CardContent>
                            <CardContent>Event Status: {event?.eventStatus}</CardContent>
                            <CardContent>Description: {event?.description}</CardContent>
                            {/* <CardContent>Subject Id</CardContent> */}
                        </Card>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem title="Event Detail" value="schedule">
                    <AccordionTrigger className="bg-slate-200 pl-2">Schedule</AccordionTrigger>
                    <AccordionContent>
                        {event?.scheduleList != null ? event?.scheduleList.map((schedule) => (
                            <Card className="pt-2 text-lg">
                                <CardHeader>{schedule.place}</CardHeader>
                                <CardContent>Start Time: {schedule.startTime}</CardContent>
                                <CardContent>End Time: {schedule.endTime}</CardContent>
                            </Card>
                        )) : null
                        }
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem title="Event Detail" value="sponsor">
                    <AccordionTrigger className="bg-slate-200 pl-2">Sponsor</AccordionTrigger>
                    <AccordionContent>

                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

export default EventDashboardDetail;