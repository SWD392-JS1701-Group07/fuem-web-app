import React, { useState } from "react";
import { Operator } from "@/constants/models/Operator";
//import { useNavigate } from "react-router-dom";
import { getByRole } from "@/api/accountApi";
import OperatorTable from "./Component/OperatorTable";

const DashboardOperatorList = () => {
    const [data, setData] = useState<Operator[]>([]);
  //  const nav = useNavigate();

    React.useEffect(() => {
        getOperators();
    }, [])

    const getOperators = async () => {
            const response = await getByRole(5); 
            setData(response.data);
    };


    return (
        <div className="w-full">
            <OperatorTable data={data} />
        </div>
    );
};

export default DashboardOperatorList;
