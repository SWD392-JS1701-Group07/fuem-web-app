import { getById } from "@/api";
import { Event } from "@/constants/models/Event";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<Event>();
    useEffect(() => {
        getEventDetail();
    }, [])
    const getEventDetail = async () => {
        getById(parseInt(id as string)).then((response) => {
            setEvent(response.data);
        })
    }
    return (
        <div>
            <h1>{
                //@ts-expect-error
                (event) ? event.eventName : "nothing"}</h1>
        </div>
    );
}

export default EventDetail;