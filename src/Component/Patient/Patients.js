import React, { useState } from 'react';

import Patient from './components/patientcom'
import Sidebar from './components/Sidebar';
import Navbar from '../common/Navbar';
import { ToastContainer } from 'react-toastify';


const DashboardLayout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='bg-[#E2F1FF] h-screen'>
            <div>
                <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
                <h1 className='absolute lg:ml-52 p-7 pt-6 font-semibold hidden lg:block'>Patient Details</h1>
                <Navbar toggle={toggleSidebar}/>
                <Patient />
            </div>
            <ToastContainer/>
        </div>
    );
};

export default DashboardLayout;
