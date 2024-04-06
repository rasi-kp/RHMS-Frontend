import React, { useState } from 'react';

import Sidebar from './components/Sidebar';
import Report from './components/reports'
import Appointments from './components/Appointments';
import Navbar from './components/Navbar';
import NavbarMobile from './components/NavbarMobile';
import Recent from './components/recentactivity'
import Subscription from './components/Subscription';


const DashboardLayout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='bg-[#E2F1FF] h-full sm:h-screen'>
            <NavbarMobile toggle={toggleSidebar} />
            <div>
                <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
                <h1 className='absolute lg:ml-52 p-7 pt-6 font-semibold hidden lg:block'>Dashboard</h1>
                    <Navbar />
                <div className='sm:flex h-full'>
                    <Report />
                    <div className='md:w-3/4 '>
                        <Appointments />
                    </div>
                </div>

                <div className='sm:flex'>
                    <div className='w-full md:w-3/4 '>
                        <Subscription/>
                    </div>
                    <Recent />
                </div>
                
            </div>
        </div>
    );
};

export default DashboardLayout;
