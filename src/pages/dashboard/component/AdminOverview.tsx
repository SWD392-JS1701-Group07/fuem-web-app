import { getAccounts } from "@/api/accountApi"
import React, { useEffect } from "react"
import AccInfoBox from "./AccountInforBox"

const AdminOverview = () => {
    const [Accounts, setAccounts] = React.useState([])
    const [AccNumber, setAccNumber] = React.useState({
        admin: 0,
        visitor: 0,
        sponsor: 0,
        staff: 0,
        operator: 0
    })
    useEffect(() => {
        getAccounts().then(result => {
            setAccounts(result.data);
        })
    }, [])
    const handleUserByRole = (role: number) => {
        return Accounts.filter((account: any) => account.roleId === role).length
    }
    return (
        <div className='w-full min-h-screen'>
            <AccInfoBox title='Operator' value={handleUserByRole(5)} createPermit={true} createLink='operator/create' viewLink='operator'></AccInfoBox>
            <AccInfoBox title='Sponsor' value={handleUserByRole(3)} createPermit={true} createLink='' viewLink='sponsor'></AccInfoBox>
            <AccInfoBox title='Staff' value={handleUserByRole(4)} createPermit={true} createLink='' viewLink='staff'></AccInfoBox>
            <AccInfoBox title='Visitor' value={handleUserByRole(2)} createPermit={false} createLink='' viewLink='visitor'></AccInfoBox>
        </div>
    );
}

export default AdminOverview;