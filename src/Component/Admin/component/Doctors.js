import React, { useState } from 'react';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import NavbarMobile from './components/NavbarMobile';
import Doctor from './components/doctorcom'

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
