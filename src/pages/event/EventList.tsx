import * as React from "react"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { getAll } from "@/api/eventApi";
import EventCalendar from "./component/EventCalendar";
import EventTable from "./component/EventTable";
import { Event } from "@/constants/models/Event";
import { Separator } from "@/components/ui/separator";


const EventList = () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [data, setData] = React.useState<Event[]>([])
    React.useEffect(() => {
        getEvents();
    }, [])
    const getEvents = async () => {
        const response = await getAll();
        setData(response.data);
    }
    console.log(data)
    return (
        <div className="w-full pb-2">
            <h1 className="text-4xl font-semibold w-full py-2 pl-5 mx-auto">Events</h1>
            <Tabs defaultValue="list" className="">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="list">List</TabsTrigger>
                    <TabsTrigger value="calendar">Calendar</TabsTrigger>
                </TabsList>
                <TabsContent value="list">
                    <div className="flex items-center py-4">
                        <EventTable data={data} />
                    </div>
                </TabsContent>
                <TabsContent value="calendar">
                    <EventCalendar data={data} />
                </TabsContent>
            </Tabs>
            <Separator />
        </div>
    )
}
export default EventList;