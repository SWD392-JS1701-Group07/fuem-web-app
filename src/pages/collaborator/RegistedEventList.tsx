import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const RegistedEventList = () => {
    const nav = useNavigate();
    return (
        <div className="h-screen">
            <div>
                you don't join any event as collaborator at the moment,
                search for event to join?
                <Button onClick={() => nav("/event")}>Go to event page</Button>
            </div>
        </div>
    );
}

export default RegistedEventList;