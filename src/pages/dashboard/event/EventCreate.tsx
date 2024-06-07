import { CreateEventForm } from "./component/EventCreateForm";

const CreateEvent = () => {
    return (
        <div className="w-full p-1">
            <h1>Create Event</h1>
            <CreateEventForm />
        </div>
    );
}

export default CreateEvent;