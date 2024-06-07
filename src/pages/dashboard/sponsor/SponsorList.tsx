import { Sponsor } from "@/constants/models/Sponsor";
import SponsorTable from "./component/SponsorTable";

const sponsors: Sponsor[] = [{
    id: 1,
    name: 'hurbert',
    email: "11@gmail.com",
    phoneNumber: "123456",
    avatarUrl: "#",
    accountId: 2,
}, {
    id: 2,
    name: 'Robert',
    email: "12411@gmail.com",
    phoneNumber: "123456",
    avatarUrl: "#",
    accountId: 2,
}]

const SponsorList = () => {
    return (
        <>
            <SponsorTable data={sponsors} />
        </>
    );
}

export default SponsorList;