import * as React from "react"
import { useState } from "react";
import { Event } from "@/constants/models/Event";
import DashboardEventTable from "./component/EventTable";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { getAll } from "@/api/eventApi";

const DashboardEventList = () => {
    const [data, setData] = useState<Event[]>([])
    const nav = useNavigate();
    React.useEffect(() => {
        getEvents();
    }, [])
    const getEvents = async () => {
        //const response = await getAll();
        const response = await getAll();
        setData(response.data);
    }
    console.log(data)
    return (
        <div className="w-full">
            <div className="text-4xl font-semibold w-full py-2 pl-5 mx-auto bg-purple-400 text-gray-50 flex">
                <h1 >Events</h1>
                <Button className="ml-auto mr-1" variant="secondary" onClick={() => nav("create")}>Create Event</Button>
            </div>
            <DashboardEventTable data={data} />
        </div>
    )
}
export default DashboardEventList;