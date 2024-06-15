'use client'
import ColumnDiagram from '@/components/dashboard/columnDiagram';
import InfoBox from '@/components/dashboard/infoBox';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AccInfoBox from './component/AccountInforBox';
import { getAccounts } from '@/api/accountApi';

const options = [{ label: 'Option 1', url: '/' }, { label: 'Option 2', url: '/' }, { label: 'Option 3', url: '/' }];
const DashBoard: React.FC = () => {
    const role = useSelector((state: any) => state.loginedUser.role)
    const [Accounts, setAccounts] = React.useState([])
    const [AccNumber, setAccNumber] = React.useState({
        admin: 0,
        visitor: 0,
        sponsor: 0,
        staff: 0,
        operator: 0
    })
    useEffect(() => {
        if (role === 1) {
            getAccounts().then(result => {
                setAccounts(result.data);
            })
        }
    }, [])
    const handleUserByRole = (role: number) => {
        return Accounts.filter((account: any) => account.roleId === role).length
    }
    return (
        (role === 1) ?
            (<div className='w-full min-h-screen'>
                Admin
                <AccInfoBox title='Operator' value={handleUserByRole(5)} createPermit={true} createLink='' viewLink='operator'></AccInfoBox>
                <AccInfoBox title='Sponsor' value={handleUserByRole(3)} createPermit={true} createLink='' viewLink='sponsor'></AccInfoBox>
                <AccInfoBox title='Staff' value={handleUserByRole(4)} createPermit={true} createLink='' viewLink='staff'></AccInfoBox>
                <AccInfoBox title='Visitor' value={handleUserByRole(2)} createPermit={false} createLink='' viewLink='visitor'></AccInfoBox>
            </div>) :
            (<div>
                <div className="flex font-poppins">
                    <InfoBox title="incoming events" value="100" percent={10} options={options} />
                    <InfoBox title="incoming events" value="100" percent={10} options={options} />
                    <InfoBox title="incoming events" value="100" percent={10} options={options} />
                    <InfoBox title="incoming events" value="100" percent={-10} options={options} />
                </div>
                <div className="flex">
                    <ColumnDiagram />
                    <div className=''></div>
                    <InfoBox title="incoming events" value="100" percent={10} options={options} />
                </div>
            </div>)

    );
}

export default DashBoard;
