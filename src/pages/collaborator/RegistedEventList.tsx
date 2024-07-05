import { getEventByCollaborator } from "@/api";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RegistedEventTable from "./component/RegistedEventTable";
import { CollaboratorInEvent } from "@/constants/models/Collaborator";

const RegistedEventList = () => {
    const nav = useNavigate();
    const [data, setData] = useState<CollaboratorInEvent[]>([])
    useEffect(() => {
        getEventByCollaborator(parseInt(localStorage.getItem('userId') as string))
            .then((res) => {
                setData(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <div className="dark w-full bg-black px-16 pb-10 text-white h-screen">
            <div>
                <h1 className="mx-auto w-full py-8 font-jura text-6xl font-semibold">Collaborators</h1>
                {(data.length > 0) ? (
                    <RegistedEventTable data={data} />
                    //<RegistedEventTable data="" />
                ) : (
                    <div className=" text-lg">
                        you don't join any event as collaborator at the moment,
                        search for event to join?
                        <Button onClick={() => nav("/event")} className="ml-5">Go to event page</Button>
                    </div>
                )
                }
            </div>
        </div >
    );
}

export default RegistedEventList;