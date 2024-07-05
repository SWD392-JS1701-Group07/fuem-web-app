import { useEffect, useState } from "react";
import { getCollaboratorByOperator } from "@/api/collaboratorApi";
import { Collaborator } from "@/constants/models/Collaborator";
import CollaboratorTable from "./component/CollaboratorTable";

const CollaboratorList = () => {
    const [userId] = useState<number>(localStorage.getItem("userId") ? Number(localStorage.getItem("userId")) : 0);
    const [data, getData] = useState<Collaborator[]>([]);
    useEffect(() => {
        getCollaboratorByOperator(userId).then((res) => {
            getData(res.data);
        });
    }, [getCollaboratorByOperator, userId])
    return (
        <div className="h-screen w-full">
            <CollaboratorTable data={data} />

        </div>
    );
}

export default CollaboratorList;