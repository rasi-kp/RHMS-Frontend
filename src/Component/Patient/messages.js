import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

import Sidebar from './components/Sidebar';
import SidebarDoctor from '../Doctor/component/Sidebar';
import Navbar from './components/Navbar';
import NavbarMobile from './components/NavbarMobile';
import man from '../images/profile.png';

import { IoSend } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { Card } from "@material-tailwind/react";
// import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CiSearch } from 'react-icons/ci';
import { allchats, message } from '../../services/patient';
import { allchatsdoctor } from '../../services/doctor';
import { BASE_URL } from '../../apiconfig';
import { ToastContainer, toast } from 'react-toastify';


const Message = ({ children }) => {

    // const navigate = useNavigate()
    const token = useSelector(state => state.auth.token);
    const role = useSelector(state => state.auth.role);
    const user = useSelector(state => state.auth.user);
    const [doctor, setDoctor] = useState([])
    const [doctordata, setDoctordata] = useState('')
    const [doctorid, setDoctorid] = useState('')
    const chatContainerRef = useRef(null);
    const [socket, setSocket] = useState(null);
    const [typingTimeout, setTypingTimeout] = useState(null);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState('');
    const [currentMessage, setCurrentMessage] = useState('');
    const [typingStatus, setTypingStatus] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    useEffect(() => {
        const fetchData = async () => {
            if (role == 'patient') {
                const response = await dispatch(allchats(token));
                setDoctor(response.uniqueChats)
            }
            if (role == 'doctor') {
                const response = await dispatch(allchatsdoctor(token));
                setDoctor(response.uniqueChats)
            }
        }
        fetchData()
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [doctordata]);
    const handleTyping = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
        socket.emit('typing', { senderId: user.id, receiverId: doctorid });
    };
    const clickdoctor = async (doctorid) => {
        setDoctorid(doctorid)
        const response = await dispatch(message(doctorid, token));
        setDoctordata(response.doctor)
        setMessages(response.chats);
        const newSocket = io(BASE_URL);
        setSocket(newSocket);
        // // Handle socket connection
        newSocket.on('connect', () => {
            newSocket.emit('joinRoom', { senderId: user.id, receiverId: doctorid });
        });
        newSocket.on('user_status', (data) => {
            setStatus(data)
        });
        newSocket.on('receive_message', (newChat) => {
            setMessages((prevMessages) => [...prevMessages, newChat]);
        });
        // Handle typing status
        newSocket.on('user_typing', ({ senderId }) => {
            setTypingStatus(senderId);
            clearTimeout(typingTimeout);
            setTypingTimeout(
                setTimeout(() => {
                    setTypingStatus(false);
                }, 3000) // Typing indicator will be hidden after 3 seconds of inactivity
            );
        });
    }
    const sendMessage = () => {
        if (currentMessage.trim() !== '') {
            const chatData = {
                senderId: user.id,
                receiverId: doctorid,
                message: currentMessage,
            };
            socket.emit('message', chatData);
            setMessages((prevMessages) => [...prevMessages, chatData]);
            setCurrentMessage('');
        }
    };
    return (
        <div className='bg-[#E2F1FF] h-screen'>
            <NavbarMobile toggle={toggleSidebar} />
            <div>
                {user.role=='patient'?(<Sidebar isOpen={isOpen} toggle={toggleSidebar} />):(<SidebarDoctor isOpen={isOpen} toggle={toggleSidebar} />)}
                <h1 className='absolute lg:ml-52 p-7 pt-6 font-semibold hidden lg:block'>Messages</h1>
                <Navbar />
                <div className='flex flex-col md:flex-row md:flex-nowrap w-full'>
                    <div className=' lg:ml-60 mt-1 ml-4 me-3 md:w-2/5'>
                        <div className=' h-full md:h-96 bg-white w-full rounded-lg text-center justify-center mb-1 pb-4' style={{ height: '480px' }}>
                            <div className=" items-center justify-center">
                                <div className="relative w-full px-8 ">
                                    <input type="text" className="pl-8 w-full h-6 text-xs mt-4 rounded-lg bg-[#E2F1FF] outline-none" placeholder="Search"
                                        onChange={e => setSearch(e.target.value)} />
                                    <CiSearch className="absolute mt-3 left-10 top-2" />
                                </div><hr className='mt-4' />
                                {doctor.map((chat, index) => (
                                    <><div key={index} className={`flex items-center p-2 md:pl-5 cursor-pointer hover:bg-blue-100 ${chat?.receiverId === doctorid ? 'bg-blue-300' : ''}`} onClick={e => clickdoctor(chat.receiverId)}>
                                        <img src={`${BASE_URL}/doctors/${chat?.ReceiverDoctor?.image}`} alt="Doctor Photo" className="h-9 w-10 rounded-full mr-3" />
                                        <div className="w-full py-1">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-semibold text-slate-600">
                                                    {chat?.ReceiverDoctor?.first_name} {chat?.ReceiverDoctor?.last_name}
                                                </p>
                                                <p className="text-xs text-slate-400">{new Date(chat.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                                            </div>
                                            <div className="flex items-center">
                                                {/* <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span> */}
                                                <p className="text-xs text-slate-400 pl-1 pt-0.5">{chat?.message}</p>
                                            </div>
                                        </div>
                                    </div> <hr className='mx-5' /></>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className=' lg:me-8 mt-1 h-full pb-5 me-3 ml-3 md:ml-1 rounded-lg md:w-3/4'>
                        <Card className="bg-rose-100 h-full md:h-96 w-full shadow-none" style={{ height: '480px' }}>
                            <div className="flex items-center p-2 md:pl-5 bg-blue-500 rounded-lg">
                                {role === 'patient' ? (
                                    doctordata?.image ? (
                                        <img
                                            src={`${BASE_URL}/doctors/${doctordata?.image}`}
                                            alt="Doctor Photo"
                                            className="h-11 w-11 rounded-full mr-3" />) : (
                                        <img
                                            src={`${BASE_URL}/users/${user.image}`}
                                            alt="Placeholder Image"
                                            className="h-11 w-11 rounded-full mr-3" />)) : (
                                    <img
                                        src={`${BASE_URL}/users/${doctordata?.image}`}
                                        alt="User Photo"
                                        className="h-9 w-9 rounded-full mr-3" />
                                )}
                                <div className='w-full py-1'>
                                    <div className="flex items-center justify-between">
                                        <p className="text-white text-sm font-semibold">
                                            {doctordata ? (`${doctordata.first_name} ${doctordata.last_name}`) : (`${user.name} ${user.lname}`)}
                                        </p>
                                        {/* <IoMdClose className=' text-white me-3 w-6 h-6' /> */}
                                    </div>
                                    <div className="flex items-center">
                                        {status && status.userId === doctorid && status.status == 'online' ?
                                            (<>
                                                <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                                                <p className="text-white text-xs">Online</p>
                                            </>) : (<>
                                                <span className="h-2 w-2 bg-red-500 rounded-full mr-2"></span>
                                                <p className="text-white text-xs">Offline</p>
                                            </>)}
                                    </div>


                                </div>
                            </div><hr className='mx-5' />

                            <div className="p-4 h-80 overflow-y-auto" ref={chatContainerRef}>
                                <div className='mb-0'>
                                    {messages.map((chat, index) => (
                                        <div key={index} className={`${chat.senderId === user.id ? ' text-right' : 'text-left'}`}>
                                            <p className={`message text-white rounded-lg py-1.5 px-4 inline-block ${chat.senderId === user.id ? 'sent bg-blue-500 md:ml-52' : 'received bg-gray-500'}`}>
                                                {chat.message}</p>
                                            <p className="text-xs text-slate-400 mb-1">
                                                {chat.timestamp ? new Date(chat.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                                                    : new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {typingStatus && typingStatus === doctorid && (
                                <><div class='flex space-x-1 justify-start items-center ml-2 mb-2'>
                                    <span class='sr-only'>Loading...</span>
                                    <div class='h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                                    <div class='h-2 w-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                                    <div class='h-2 w-2 bg-gray-800 rounded-full animate-bounce'></div>
                                </div></>
                            )}
                            <div className="p-4 border-t flex">
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={currentMessage}
                                    onChange={(e) => setCurrentMessage(e.target.value)}
                                    onKeyDown={handleTyping}
                                    placeholder="Type a message" />
                                <button className=" text-blue-500 px-4 py-2 rounded-r-md hover:text-blue-700 transition duration-300"
                                    onClick={sendMessage}><IoSend className='h-6 w-5' />
                                </button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Message;
