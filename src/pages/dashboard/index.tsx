import React from 'react';
import AdminOverview from './component/AdminOverview';

const DashBoard: React.FC = () => {
    const role = localStorage.getItem('role');
    return (
        (role === "1") ? (<AdminOverview />) : (<div className='h-screen'></div>)
        // <Overview />
    );
}

export default DashBoard;
