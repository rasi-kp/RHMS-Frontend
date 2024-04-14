import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import Sidebar from './component/Sidebar';
import Navbar from './component/Navbar';
import NavbarMobile from './component/NavbarMobile';
const tokens = [
    { name: 'TOK 1', time: '09:00-09:20' },
    { name: 'TOK 2', time: '09:20-09:40' },
    { name: 'TOK 3', time: '09:40-10:00' },
    { name: 'TOK 4', time: '10:00-10:20' },
    { name: 'TOK 5', time: '10:20-10:40' },
    { name: 'TOK 6', time: '10:40-11:00' },
    { name: 'TOK 7', time: '11:00-11:20' },
    { name: 'TOK 8', time: '11:20-11:40' },
    { name: 'TOK 9', time: '11:40-12:00' },
    { name: 'TOK 10', time: '12:00-12:20' },
    { name: 'TOK 11', time: '12:20-12:40' },
    { name: 'TOK 12', time: '12:40-01:00' },
    { name: 'TOK 13', time: '02:00-02:20' },
    { name: 'TOK 14', time: '02:20-02:40' },
    { name: 'TOK 15', time: '02:40-03:00' },
    { name: 'TOK 16', time: '03:00-03:20' },
    { name: 'TOK 17', time: '03:20-03:40' },
    { name: 'TOK 18', time: '03:40-04:00' },
    { name: 'TOK 19', time: '04:20-04:40' },
    { name: 'TOK 20', time: '04:40-05:00' },
    { name: 'TOK 21', time: '05:00-05:20' },
    { name: 'TOK 22', time: '05:20-05:40' },
    { name: 'TOK 23', time: '05:40-06:00' },
    { name: 'TOK 24', time: '06:00-06:20' },
];
// const dates = [
//     { day: 'Mon', date: '26-04-2023' },
//     { day: 'Tue', date: '27-04-2023' },
//     { day: 'Wed', date: '28-04-2023' },
//     { day: 'Thu', date: '29-04-2023' },
//     { day: 'Fri', date: '30-04-2023' },
//     { day: 'Sat', date: '01-05-2023' },
//     { day: 'Sun', date: '02-05-2023' },
// ];
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
    const [isOpen, setIsOpen] = useState(false);

    const [selectedTokens, setSelectedTokens] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleTokenClick = (token) => {
        if (!selectedDate) {
            return toast.error("Please select a Date");
        }
        const index = selectedTokens.findIndex(t => t.name === token.name);
        if (index === -1) {
            setSelectedTokens([...selectedTokens, token]);
        } else {
            setSelectedTokens(selectedTokens.filter(t => t.name !== token.name));
        }
    };
    const handleDateClick = (date) => {
        setSelectedDate(date);
    };
    const submitted=(e)=>{
        if (selectedTokens.length === 0) {
            return toast.error("Please select Token");
        }
        toast.success("Token Successfully Added")
    }
    const handleCheckboxChange = (event, range) => {
        if (!selectedDate) {
            event.target.checked = false;
            return toast.error("Please select a Date");
        }
        const checked = event.target.checked;
        if (checked) {
            setSelectedTokens(range);
        } else {
            event.target.checked = false;
            setSelectedTokens([]);
        }
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    
    return (
        <div className='bg-[#E2F1FF] h-screen'>
            <NavbarMobile toggle={toggleSidebar} />
            <div>
                <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
                <h1 className='absolute lg:ml-52 p-7 pt-6 font-semibold hidden lg:block'>Availability Details</h1>
                <Navbar />
                <div className='bg-white lg:ml-60 ml-6 me-6 lg:me-8 mt-1 h-full pb-5 rounded-lg'>
                    <h1 className='p-1 text-xs pl-3 mt-3 text-slate-500 font-bold '>Choose date</h1>
                    <div className="mx-3 flex overflow-x-auto whitespace-nowrap">
                        {dates.map((date, index) => (
                            <button
                                key={index}
                                className={`w-full text-xs p-1 ml-1 me-1 mt-2 border border-blue-600   ${selectedDate === date ? 'bg-blue-500 text-white' : 'text-blue-800 rounded hover:bg-slate-300'
                                    }`}
                                onClick={() => handleDateClick(date)}
                            >
                                <div className="font-semibold text-sm">{date.day}</div>
                                <div>{date.date}</div>
                            </button>
                        ))}
                    </div>
                    <hr className='my-4' />
                    <div className='flex justify-end pe-2'>
                        <div className=' text-xs font-semibold text-slate-500 '>
                            <div className="flex items-center mb-1">
                                <div className="rounded-full h-2 w-2 bg-green-500 mr-1"></div>
                                <p>Selected</p>
                            </div>
                            <div className="flex items-center">
                                <div className="rounded-full h-2 w-2 bg-slate-400 mr-1"></div>
                                <p>Not Selected</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-wrap overflow-x-auto whitespace-nowrap mx-2 mt-3'>
                        {tokens.map(token => (
                            <button
                                key={token.name}
                                className={`w-20 md:w-20 text-xs p-1 ml-3 mt-2 border border-slate-400 rounded ${selectedTokens.find(t => t.name === token.name) ? 'bg-green-500 text-white' : 'bg-slate-300 hover:bg-slate-500 hover:text-white'
                                    }`}
                                onClick={() => handleTokenClick(token)}>
                                <div className='font-bold text-sm'>{token.name}</div>
                                <div>{token.time}</div>
                            </button>
                        ))}
                    </div>

                    <div className='relative flex justify-end pe-5 mt-3'>
                        <div className=' text-xs font-semibold text-slate-500 '>
                            <div className="flex items-center mb-1">
                                <input type="checkbox"
                                    onChange={(e) => handleCheckboxChange(e, tokens.slice(0, tokens.length))}
                                    className="h-3 w-3 me-2 focus:ring-blue-500 border-gray-400 rounded" />
                                <p>Select All</p>
                            </div>
                            <div className="flex items-center mb-1">
                                <input type="checkbox"
                                    onChange={(e) => handleCheckboxChange(e, tokens.slice(0, 12))}
                                    className="h-3 w-3 me-2 focus:ring-blue-500 border-gray-400 rounded" />
                                <p>Morning</p>
                            </div>
                            <div className="flex items-center mb-1">
                                <input type="checkbox"
                                    onChange={(e) => handleCheckboxChange(e, tokens.slice(12))}
                                    className="h-3 w-3 me-2 focus:ring-blue-500 border-gray-400 rounded" />
                                <p>After noon</p>
                            </div>
                        </div>
                    </div><hr className='mx-3'/>
                    <div className='flex justify-end'>
                            <button onClick={submitted} className='bg-[#3497F9] me-2 md:me-14 mt-2 w-20 text-center text-white font-semibold text-xs rounded px-2 p-1.5 hover:bg-blue-600'>ADD</button>
                        </div>
                </div>

            </div>
            <ToastContainer />
        </div>
    );
};

export default DashboardLayout;