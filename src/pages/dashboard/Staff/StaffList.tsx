import React, { useState } from "react";
import { Operator } from "@/constants/models/Operator";
import { getByRole } from "@/api/accountApi";
import OperatorTable from "./Component/StaffTable";

const DashboardOperatorList = () => {
    const [data, setData] = useState<Operator[]>([]);
    React.useEffect(() => {
        getStaffs();
    }, [])

    const getStaffs = async () => {
            const response = await getByRole(4); 
            setData(response.data);
    };

    return (
        <div className="w-full">
            <OperatorTable data={data} />
        </div>
    );
};

export default DashboardOperatorList;
