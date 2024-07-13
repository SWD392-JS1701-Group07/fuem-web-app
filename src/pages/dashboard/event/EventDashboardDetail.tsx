import { getById, updateStatus } from "@/api/eventApi";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { Event } from "@/constants/models/Event";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Collaborator } from "@/constants/models/Collaborator";
import { getCollaboratorByEvent } from "@/api/collaboratorApi";
import TicketTable from "@/pages/ticket/TicketList";
import { getTicketByEventId } from "@/api/ticketApi";
import { OrderTicket } from "@/constants/models/Ticket";
import CollaboratorTable from "./component/CollaboratorTable";

const EventDashboardDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<Event>();
    const [color, setColor] = useState("red-500");
    const [Collaborators, setCollaborators] = useState<Collaborator[]>([]);
    
  const [ticketList, setTicketList] = useState<OrderTicket[]>([])

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await getTicketByEventId(id as string)
        setTicketList(response?.data || [])
      } catch (error) {
        console.error('Error fetching tickets:', error)
      }
    }

    fetchTickets()
  }, [id])
  
    useEffect(() => {
        getById(Number(id)).then((res) => {
            setEvent(res.data);
        });
    }, [id]);
    useEffect(() => {
        getCollaboratorByEvent(Number(id)).then((res) => {
            setCollaborators(res.data);
        });
    }, [id]);
    useEffect(() => {
        if (event?.eventStatus === "Active" || event?.eventStatus === "Completed") {
            setColor("green-500");
        } else if (event?.eventStatus === "Pending") {
            setColor("gray-500");
        } else if (event?.eventStatus === "Ongoing") {
            setColor("blue-500");
        } else {
            setColor("red-500");
        }
    }, [event]);
    const handleActive = () => {
        if (event?.eventStatus === "Planning") {
            updateStatus(Number(id)).then(() => {
                updateStatus(Number(id)).then((res) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
            <div className="flex justify-between w-full p-3 bg-purple-400 text-gray-50">
                <div className="flex">
                    <h1 className="text-5xl">{event?.name}</h1>
                    <Button className={`border-4 border-${color} bg-white text-${color} rounded-3xl m-0 p-0 px-2`}>{event?.eventStatus}</Button>
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Ellipsis />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                View collaborators
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {(localStorage.getItem("role") === "4" ?
                        ((event?.eventStatus == "Planning" || event?.eventStatus == "Pending") ?
                            (<Button onClick={handleActive} className="m-2">Active</Button>)
                            : null) : null)}
                </div>
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
                        {(event?.sponsorships && event?.sponsorships.length > 0) ? event?.sponsorships.map((sponsorship) => (
                            <>
                                { }
                                <Card className="pt-2 text-lg" >
                                    <CardContent>Name: {sponsorship.sponsor.name}</CardContent>
                                    <CardContent>EMail: {sponsorship.sponsor.email}</CardContent>
                                    <CardContent>PhoneNumber: {sponsorship.sponsor.phoneNumber}</CardContent>
                                    <CardContent>Type: {sponsorship.type}</CardContent>
                                    <CardContent>Sum: {sponsorship.sum}</CardContent>
                                </Card>
                            </>
                        )) : (<></>)}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem title="Event Detail" value="Collaborator">
                    <AccordionTrigger className="bg-slate-200 pl-2">Collaborators</AccordionTrigger>
                    <AccordionContent>
                        <CollaboratorTable data={Collaborators} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem title="Event Detail" value="ticket">
          <AccordionTrigger className="bg-slate-200 pl-2">Tickets</AccordionTrigger>
          <AccordionContent>
            <div className="light mb-10 max-w-screen-2xl">
              {ticketList ? (
                <TicketTable data={ticketList} />
              ) : (
                <h1>There are no tickets for this event.</h1>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
            </Accordion>
        </div >
    );
}

export default EventDashboardDetail
