import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import Sidebar from './component/Sidebar';
import Report from './component/reports'
import Appointments from './component/Appointments';
import Navbar from './component/Navbar';
import NavbarMobile from './component/NavbarMobile';
import Graph from './component/graph';
import Newmessage from './component/newmessage';


import { useSelector } from 'react-redux';

const DashboardLayoutDoctor = ({ children }) => {
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
                <Newmessage/>
                    <div className='w-full md:w-3/4 '>
                    <Graph />
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default DashboardLayoutDoctor;
