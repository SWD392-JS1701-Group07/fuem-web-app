import React from 'react';
import AdminOverview from './component/AdminOverview';
import Overview from './component/NormalOverview';

const DashBoard: React.FC = () => {
    const role = localStorage.getItem('role');
    return (
        (role === "1") ? (<AdminOverview />) : (<Overview />)
    );
}

export default DashBoard;
