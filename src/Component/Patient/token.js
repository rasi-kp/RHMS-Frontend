import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { IoMdClose } from "react-icons/io";
import { GiConfirmed } from "react-icons/gi";

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import NavbarMobile from './components/NavbarMobile';
import { addappoinment,viewtoken } from "../../services/patient";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
const tokens = [
    { name: 1, time: '09:00-09:20' },
    { name: 2, time: '09:20-09:40' },
    { name: 3, time: '09:40-10:00' },
    { name: 4, time: '10:00-10:20' },
    { name: 5, time: '10:20-10:40' },
    { name: 6, time: '10:40-11:00' },
    { name: 7, time: '11:00-11:20' },
    { name: 8, time: '11:20-11:40' },
    { name: 9, time: '11:40-12:00' },
    { name: 10, time: '12:00-12:20' },
    { name: 11, time: '12:20-12:40' },
    { name: 12, time: '12:40-01:00' },
    { name: 13, time: '02:00-02:20' },
    { name: 14, time: '02:20-02:40' },
    { name: 15, time: '02:40-03:00' },
    { name: 16, time: '03:00-03:20' },
    { name: 17, time: '03:20-03:40' },
    { name: 18, time: '03:40-04:00' },
    { name: 19, time: '04:20-04:40' },
    { name: 20, time: '04:40-05:00' },
    { name: 21, time: '05:00-05:20' },
    { name: 22, time: '05:20-05:40' },
    { name: 23, time: '05:40-06:00' },
    { name: 24, time: '06:00-06:20' },
];

const today = new Date(); // Get today's date
const dates = [];
for (let i = 0; i < 7; i++) {
    const date = new Date(today); // Create a new date object
    date.setDate(today.getDate() + i); // Increment date by i days
    const day = date.toLocaleDateString('en-US', { weekday: 'short' }); // Get the abbreviated day name (e.g., Mon, Tue, etc.)
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
    dates.push({ day, date: formattedDate }); // Add the day and formatted date to the dates array
}

const DashboardLayout = ({ children }) => {
    const navigate=useNavigate()
    const {doctorid,patientid}= location.state || null
    const location = useLocation()
    const token = useSelector(state => state.auth.token); // Move useSelector inside the function
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const [selectedTokens, setSelectedTokens] = useState('');
    const [availabletoken,setAvailabletoken] =useState([])
    const [selectedDate, setSelectedDate] = useState('');
    const [isModalVisible,setIsmodalvisible] = useState(false)

    useEffect(() => {
        if(!patientid || !doctorid){
            navigate('/patient/appointments')
        }
    }, [isModalVisible]);

    const showModal = () => {
        setIsmodalvisible(!isModalVisible);
    };
    
    const handleTokenClick = (token) => {
        if (!selectedDate) {
            return toast.error("Please select a Date");
        }
        if (availabletoken.some(t => t.token_no === token.name)) {
            setSelectedTokens(token);
        } else {
            setSelectedTokens(null);
        }
    };
    const handleDateClick = (date) => {
        console.log(patientid,doctorid);
        if(!patientid || !doctorid){
            return toast.error("Pls select Patient")
        }
        setSelectedTokens('')
        setAvailabletoken([]);
        setSelectedDate(date);
        dispatch(viewtoken(date.date,doctorid,token))
            .then(Data => {
                setAvailabletoken(Data);
                console.log(availabletoken);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    };
    const submitted=(e)=>{
        if (!selectedTokens) {
            return toast.error("Please select Token");
        }
        setIsmodalvisible(true);
        
    }
    const confirm=(e)=> {
        const data={selectedTokens,selectedDate,doctorid,patientid}
        dispatch(addappoinment(data, token));
        setIsmodalvisible(false)
        setAvailabletoken([])
        setSelectedTokens('')
        navigate('/patient/appointments',{ state: { patientid:null,doctorid:null}})
    }
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    
    return (
        <div className='bg-[#E2F1FF] h-screen'>
            <NavbarMobile toggle={toggleSidebar} />
            <div>
                <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
                <h1 className='absolute lg:ml-52 p-7 pt-6 font-semibold hidden lg:block'>Select Token</h1>
                <Navbar />
                <div className='bg-white lg:ml-60 ml-6 me-6 lg:me-8 mt-1 h-full pb-5 rounded-lg'>
                    <h1 className='p-1 text-xs pl-3 mt-3 text-slate-500 font-bold '>Choose date</h1>
                    <div className="mx-3 flex overflow-x-auto whitespace-nowrap">
                        {dates.map((date, index) => (
                            <button
                                key={index}
                                className={`w-full text-xs p-1 ml-1 me-1 mt-2 border border-blue-600   ${selectedDate == date ? 'bg-blue-500 text-white' : 'text-blue-800 rounded hover:bg-slate-300'
                                    }`}
                                onClick={() => handleDateClick(date)}>
                                <div className="font-semibold text-sm">{date.day}</div>
                                <div>{date.date}</div>
                            </button>
                        ))}
                    </div>
                    <hr className='my-4' />
                    <div className='flex pl-5'>
                        <div className=' text-xs font-semibold text-slate-500 '>
                        <div className="flex items-center mb-1">
                                <div className=" ml-4 rounded-full h-2 w-2 bg-green-500 mr-1"></div>
                                <p>Available</p>
                                <div className=" ml-4 rounded-full h-2 w-2 bg-slate-400 mr-1"></div>
                                <p>Not Available</p>
                                <div className="ml-4 rounded-full h-2 w-2 bg-red-500 mr-1"></div>
                                <p>Selected</p>
                            </div>    
                        </div>
                    </div>
                    <div className='flex flex-wrap overflow-x-auto whitespace-nowrap mx-2 mt-3'>
                        {tokens.map(token => (
                            <button
                                key={token.name}
                                className={`w-20 md:w-20 text-xs p-1 ml-3 mt-2 border border-slate-400 rounded ${selectedTokens?.name === token.name ? 'bg-red-500 text-white' : availabletoken.some(t => t.token_no === token.name) ? 'bg-green-500 hover:bg-green-700 text-white' : 'bg-slate-300 cursor-default'}`}
                                onClick={() => handleTokenClick(token)}>
                                <div className='font-bold text-sm'>TOK {token.name}</div>
                                <div>{token.time}</div>
                            </button>
                        ))}
                    </div>

                    <hr className='mx-5 mt-6'/>
                    <div className='flex justify-end'>
                            <button onClick={submitted} className='bg-[#3497F9] me-2 md:me-14 mt-2 w-20 text-center text-white font-semibold text-xs rounded px-2 p-1.5 hover:bg-blue-600'>ADD</button>
                        </div>
                </div>

            </div>
            {isModalVisible && (
                <div
                    className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
                    <div className="relative mx-3 p-4 w-full max-w-md md:h-auto bg-white rounded-lg shadow dark:bg-white">
                        < button className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={showModal} ><IoMdClose className='w-6 h-6 font-bold'/>
                        </button>
                        <div className="p-4 text-center">
                            <GiConfirmed className=' dark:text-green-500 w-11 h-11 mb-3.5 mx-auto'/>
                            <p className="mb-4 text-gray-600 dark:text-gray-600">Are you confirm Appointment</p>
                            <div className="flex justify-center items-center space-x-4">
                                <button className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                    onClick={showModal} > No, cancel
                                </button>
                                <button type="submit" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                                    onClick={confirm}>
                                    Yes, I'm sure
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default DashboardLayout;
