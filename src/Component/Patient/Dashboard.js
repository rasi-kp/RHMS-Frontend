import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import Sidebar from './components/Sidebar';
import Report from './components/reports'
import Appointments from './components/Appointments';
import Navbar from '../common/Navbar';
import NavbarMobile from '../common/NavbarMobile';
import Recent from './components/recentactivity'
import Subscription from './components/Subscription';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dashboard } from '../../services/patient';

const DashboardLayout = ({ children }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const [data,setData]=useState('')

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
        const fetchData = async () => {
            const data = await dispatch(dashboard(tokenredux.token));
            setData(data)
            if(data?.error=="Unauthorized: Invalid token"){
                return navigate('/login')
            }
        };
        fetchData()
    }, []);
    return (
        <div className='bg-[#E2F1FF] h-full sm:h-screen'>
            <NavbarMobile toggle={toggleSidebar} />
            <div>
                <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
                <h1 className='absolute lg:ml-52 p-7 pt-6 font-semibold hidden lg:block'>Dashboard</h1>
                    <Navbar />
                <div className='sm:flex h-full'>
                    <Report appcount={data ? data.appointmentcount : 0} bg={data?data.subscription.blood_group:''}  memcount= {data ? data.totalMembers : 0} subscription={data && data.subscription ? data.subscription.subscription : false}  />
                    <div className='md:w-3/4 '>
                        <Appointments appointment= {data? data.upcomingAppointments:[]}/> 
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
