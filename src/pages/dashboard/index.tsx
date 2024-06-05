'use client'
import ColumnDiagram from '@/components/dashboard/columnDiagram';
import InfoBox from '@/components/dashboard/infoBox';
import React from 'react';

const options = [{ label: 'Option 1', url: '/' }, { label: 'Option 2', url: '/' }, { label: 'Option 3', url: '/' }];
const DashBoard: React.FC = () => {
    return (
        <div>
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
        </div>
    );
}

export default DashBoard;
