import React, { useState } from 'react';

import Sidebar from './component/Sidebar';
import Navbar from '../common/Navbar';
import Doctor from './component/doctorcom'

const DashboardLayout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='bg-[#E2F1FF] h-full'>
            <div>
                <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
                <h1 className='absolute lg:ml-52 p-7 pt-6 font-semibold hidden lg:block'>Doctor Details</h1>
                <Navbar toggle={toggleSidebar}/>
                <Doctor/>
                
            </div>
        </div>
    );
};

export default DashboardLayout;
