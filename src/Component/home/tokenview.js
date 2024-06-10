import React, { useEffect, useState } from 'react';
import back from '../images/hero-bg1.png';
import { ToastContainer, toast } from 'react-toastify';

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
const BASE_URL = require('../../apiconfig').BASE_URL;

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

function Tokenview() {
    const navigate = useNavigate()
    const location = useLocation()
    const { doctorid = null } = location.state || {}
    const token = useSelector(state => state.auth.token); // Move useSelector inside the function
    const dispatch = useDispatch();

    const [selectedTokens, setSelectedTokens] = useState('');
    const [availabletoken, setAvailabletoken] = useState([])
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        if (!doctorid) {
            navigate('/doctors')
        }
    }, []);
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
    const handleDateClick = async (date) => {
        if (!doctorid) {
            return toast.error("Pls select Doctor")
        }
        setSelectedTokens('')
        setAvailabletoken([]);
        setSelectedDate(date);
        const response = await fetch(`${BASE_URL}/user/viewtoken?date=${date.date}&doctorid=${doctorid}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const Data = await response.json();
        setAvailabletoken(Data.tokens);
        if (Data.tokens.length == 0) {
            return toast.error("No Tokens Available for this date.")
        }
    };
    const submitted = (e) => {
        navigate('/login')
    }

    return (
        <div>
            <section className=" h-auto relative md:py-10 xxl:py-8 pb-0">
                <div
                    className="absolute left-0 top-0 inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: `url("${back}")` }}
                />
                <div className="container mx-auto relative px-5 ">
                    
                    <h1 className='pt-24 md:pt-10 text-xl pl-3 mt-3 text-blue-900 font-bold '>Choose Date</h1>
                    <div className="mx-3 flex overflow-x-auto whitespace-nowrap">
                        {dates.map((date, index) => (
                            <button
                                key={index}
                                className={`w-full text-xs p-1 ml-1 me-1 mt-2 border-2 border-blue-800   ${selectedDate == date ? 'bg-blue-600 text-white' : 'text-blue-900 rounded hover:bg-blue-400'}`}
                                onClick={() => handleDateClick(date)} >
                                <div className="font-bold text-sm">{date.day}</div>
                                <div className='font-semibold'>{date.date}</div>
                            </button>
                        ))}
                    </div>
                    <hr className="my-4 border-t-2 border-white" />

                    <div className='flex pl-5'>
                        <div className=' text-xs font-semibold text-slate-900 '>
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
                                className={`w-20 md:w-20 text-xs p-1 ml-3 mt-2 border border-blue-800 rounded-lg ${selectedTokens?.name === token.name ? 'bg-red-500 text-white' : availabletoken.some(t => t.token_no === token.name) ? 'bg-green-500 hover:bg-green-700 text-white' : ' bg-transparent cursor-default'}`}
                                onClick={() => handleTokenClick(token)}>
                                <div className='font-bold text-sm'>TOK {token.name}</div>
                                <div>{token.time}</div>
                            </button>
                        ))}
                    </div>

                    <hr className='mx-5 mt-6 border-t-2 border-black' />
                    <div className='flex justify-end'>
                        <button onClick={submitted} className='bg-[#3497F9] me-2 md:me-14 my-4  text-center text-white font-semibold text-xs rounded px-2 p-1.5 hover:bg-blue-600'>LOGIN NOW</button>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </div>
    )
}

export default Tokenview
