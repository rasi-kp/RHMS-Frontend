import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import Sidebar from './components/Sidebar';
import Report from './components/reports'
import Appointments from './components/Appointments';
import Navbar from './components/Navbar';
import NavbarMobile from './components/NavbarMobile';
import Recent from './components/recentactivity'
import Subscription from './components/Subscription';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DashboardLayout = ({ children }) => {

    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);

    const tokenredux = useSelector(state => state.auth);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    useEffect(() => {
        if (tokenredux.token != null) {
            if (tokenredux.role == 'patient') {
                navigate('/patient')
            }
            if (tokenredux.role == 'doctor') {
                navigate('/doctor')
            }
            if (tokenredux.role == 'admin') {
                navigate('/admin')
            }
        }
        else {
            navigate('/login')
        }
    }, []);

    return (
        <div className='bg-[#E2F1FF] h-full sm:h-screen'>
            <NavbarMobile toggle={toggleSidebar} />
            <div>
                <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
                <h1 className='absolute lg:ml-52 p-7 pt-6 font-semibold hidden lg:block'>Dashboard</h1>
                    <Navbar user={tokenredux.name}/>
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
            <ToastContainer/>
        </div>
    );
};

export default DashboardLayout;
