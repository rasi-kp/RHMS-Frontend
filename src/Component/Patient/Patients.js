import React, { useState } from 'react';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import NavbarMobile from './components/NavbarMobile';

const DashboardLayout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='bg-[#E2F1FF] h-screen'>
            <NavbarMobile toggle={toggleSidebar} />
            <div>
                <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
                <h1 className='absolute lg:ml-52 p-7 pt-6 font-semibold hidden lg:block'>Patient Details</h1>
                <Navbar />
                <div className='lg:ml-60 ml-6 me-8 rounded-lg bg-white  px-5 h-96 pt-3'>
                    <h1 className='absolute font-semibold text-xs pt-4 pl-3 underline underline-offset-8 decoration-blue-500'>Patient Info</h1>
                    <div className=' justify-end flex'>
                        <button className=' bg-[#3497F9]  text-white text-xs rounded-xl px-2 p-1.5'>Add Member</button>
                    </div>
                    <hr className='mt-2 ' />
                    <input
                        type="text"
                        className=" pl-4 ml-5 w-32 h-6 mt-2 rounded-full bg-[#E2F1FF] outline-none "
                        placeholder="Search" />
                </div>

            </div>
        </div>
    );
};

export default DashboardLayout;
