import { Sponsor } from "@/constants/models/Sponsor";
import SponsorTable from "./component/SponsorTable";
import { getAll } from "@/api/sponsorApi";
import React, { useState } from "react";

// const sponsors: Sponsor[] = [{
//     id: 1,
//     name: 'hurbert',
//     email: "11@gmail.com",
//     phoneNumber: "123456",
//     avatarUrl: "#",
//     accountId: 2,
// }, {
//     id: 2,
//     name: 'Robert',
//     email: "12411@gmail.com",
//     phoneNumber: "123456",
//     avatarUrl: "#",
//     accountId: 2,
// }] 


const SponsorList = () => {
    const [data, setData] = useState<Sponsor[]>([])
    React.useEffect(() => {
        getSponsor();
    }, [])
    const getSponsor = async () => {
        const response = await getAll();
        setData(response.data.data);
    }
    console.log(data)
    return (
        <div>
            <SponsorTable data={data} />
        </div>
    );
}

export default SponsorList;