import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { IoMdClose } from "react-icons/io";
import { GiConfirmed } from "react-icons/gi";

import Sidebar from './components/Sidebar';
import Navbar from '../common/Navbar';
import NavbarMobile from '../common/NavbarMobile';
import { viewmonitor } from "../../services/patient";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../apiconfig';
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
    const navigate = useNavigate()
    const location = useLocation()
    const { doctorid = null, date = null } = location.state || {}
    const token = useSelector(state => state.auth.token); // Move useSelector inside the function
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const [doctor, setDoctor] = useState('');
    const [availabletoken, setAvailabletoken] = useState([])

    const mapTokensWithStatus = (tokens, availableTokens) => {
        return tokens.map((token) => {
            const availableToken = availableTokens.find(at => at.token_no === token.name);
            return {
                ...token,
                status: availableToken ? availableToken.status : 'unknown',
            };
        });
    };
    const tokensWithStatus = mapTokensWithStatus(tokens, availabletoken);
    useEffect(() => {
        if (!doctorid) {
            navigate('/patient/appointments')
        }
        const fetchToken = async () => {
            const datas = await dispatch(viewmonitor(date, doctorid, token));
            setAvailabletoken(datas.tokens);
            setDoctor(datas.doctor)
        };
        fetchToken();
        const intervalId = setInterval(fetchToken, 300000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const submitted = (e) => {
        navigate('/patient/appointments')

    }

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='bg-[#E2F1FF] h-screen'>
            <NavbarMobile toggle={toggleSidebar} />
            <div>
                <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
                <h1 className='absolute lg:ml-52 p-7 pt-6 font-semibold hidden lg:block'>Live Monitor</h1>
                <Navbar />
                <div className='bg-white lg:ml-60 ml-6 me-6 lg:me-8 mt-1 h-full pb-5 rounded-lg'>
                    <div className="mx-3 flex items-center p-2">
                        {/* Doctor Image */}
                        <div className='rounded-full mt-2 h-24 w-24 overflow-hidden'>
                            <img src={`${BASE_URL}/doctors/${doctor.image}`} alt="Doctor" className='h-full w-full object-cover' />
                        </div>
                        {/* Doctor Name and Specialization */}
                        <div className='ml-6'>
                            <h2 className='text-lg font-semibold text-slate-800'>{doctor.first_name} {doctor.last_name}</h2>
                            <p className='text-sm text-slate-600'>Doctor id: {doctor.doctor_id}</p>
                            <p className='text-sm text-slate-600'>{doctor.gender}</p>
                            <p className='text-sm text-slate-600'>{doctor.specialization}</p>
                            <p className='text-xs text-slate-500'>{doctor.qualification}</p>
                        </div>
                    </div>
                    <h1 className='p-1 text-lg pl-3 mt-1 font-bold md:ml-3'>Date : {date}</h1>
                    
                    <hr className='my-2' />
                    <div className='flex flex-wrap overflow-x-auto whitespace-nowrap px-5'>
                        <div className='text-xs font-semibold text-slate-500'>
                            <div className="flex flex-wrap items-center mb-1">
                                <div className="ml-4 rounded-full h-2 w-2 bg-purple-500 mr-1"></div>
                                <p>Completed</p>
                                <div className="ml-4 rounded-full h-2 w-2 bg-blue-500 mr-1"></div>
                                <p>Current Token</p>
                                <div className="ml-4 rounded-full h-2 w-2 bg-red-500 mr-1"></div>
                                <p>Absent</p>
                                <div className="ml-4 rounded-full h-2 w-2 bg-yellow-500 mr-1"></div>
                                <p>Pending Token</p>
                                <div className="ml-4 rounded-full h-2 w-2 bg-green-500 mr-1"></div>
                                <p>Available Token</p>
                                <div className="ml-4 rounded-full h-2 w-2 bg-slate-400 mr-1"></div>
                                <p>Not Available</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-wrap overflow-x-auto whitespace-nowrap mx-2 mt-3'>
                        {tokensWithStatus.map(token => (
                            <button
                                key={token.name}
                                className={`w-20 md:w-20 text-xs p-1 ml-3 mt-2 border text-white border-slate-400 cursor-default rounded 
                                    ${token.status === 'booked' ? 'bg-yellow-500' :
                                        token.status === 'absent' ? 'bg-red-500' :
                                            token.status === 'completed' ? 'bg-purple-500' :
                                                token.status === 'checking' ? 'bg-blue-500' :
                                                    token.status === 'available' ? 'bg-green-500 cursor-pointer' :
                                                        'bg-slate-400 border-slate-400'}`}>
                                <div className='font-bold text-sm'>TOK {token.name}</div>
                                <div>{token.time}</div>
                            </button>
                        ))}
                    </div>

                    <hr className='mx-5 mt-6' />
                    <div className='flex justify-end'>
                        <button onClick={submitted} className='bg-[#3497F9] me-2 md:me-14 mt-2 w-20 text-center text-white font-semibold text-sm rounded px-2 p-1 hover:bg-blue-600'>Back</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default DashboardLayout;
