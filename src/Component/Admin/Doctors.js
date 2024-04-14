import React, { useState } from 'react';

import Sidebar from './component/Sidebar';
import Navbar from './component/Navbar';
import NavbarMobile from './component/NavbarMobile';
import Doctor from './component/doctorcom'

const DashboardLayout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='bg-[#E2F1FF] h-full'>
            <NavbarMobile toggle={toggleSidebar} />
            <div>
                <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
                <h1 className='absolute lg:ml-52 p-7 pt-6 font-semibold hidden lg:block'>Doctor Details</h1>
                    <Navbar />
                <Doctor/>
                
            </div>
        </div>
    );
};

export default DashboardLayout;
