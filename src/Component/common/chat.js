import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { RxCross2 } from 'react-icons/rx';
import { BASE_URL } from '../../apiconfig';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Chat({ closeChat, senderId, receiverId, role }) {

    const token = useSelector(state => state.auth.token);
    const [doctor, setDoctor] = useState('')
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [typingStatus, setTypingStatus] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [status, setStatus] = useState('');
    const patientchat = async () => {
        const response = await axios.get(`${BASE_URL}/patient/doctor/${receiverId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        setDoctor(response.data.doctor)
        setMessages(response.data.chats);
    }
    const doctorchat = async () => {
        const response = await axios.get(`${BASE_URL}/doctor/patient/${receiverId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        setDoctor(response.data.user)
        setMessages(response.data.chats);
    }
    useEffect(() => {
        if (role == 'patient') {
            patientchat()
        }
        if (role == 'doctor') {
            doctorchat()
        }
        const newSocket = io(BASE_URL);
        setSocket(newSocket);
        // // Handle socket connection
        newSocket.on('connect', () => {
            newSocket.emit('joinRoom', { senderId, receiverId });
        });
        newSocket.on('user_status', (data) => {
            setStatus(data.status)
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
        return () => {
            newSocket.disconnect();
        };
    }, [senderId, receiverId]);
    const sendMessage = () => {
        if (currentMessage.trim() !== '') {
            const chatData = {
                senderId,
                receiverId,
                message: currentMessage,
            };
            socket.emit('message', chatData);
            setMessages((prevMessages) => [...prevMessages, chatData]);
            setCurrentMessage('');
        }
    };
    const handleTyping = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
        socket.emit('typing', { senderId, receiverId });
    };

    return (
        <div className="fixed bottom-0 right-0 mb-4 mr-4 z-10">
            <div id="chat-container" className="bg-white shadow-md rounded-lg max-w-lg w-full">
                <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
                    <div className="flex items-center">
                        {role == 'patient' ? (<img src={`${BASE_URL}/doctors/${doctor?.image}`} alt="Doctor Photo" className="h-11 w-11 rounded-full mr-3" />) : (<img src={`${BASE_URL}/users/${doctor?.image}`} alt="Doctor Photo" className="h-11 w-11 rounded-full mr-3" />)}
                        <div>
                            {role == 'patient' ? (<p className="text-lg font-semibold">{doctor?.first_name} {doctor?.doctor?.last_name}</p>) : (<p className="text-lg font-semibold">{doctor?.name} {doctor?.last_name}</p>)}
                            <div className="flex items-center">
                                {status === 'online' ? (<><span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span><p>Online</p></>) : (<><span className="h-2 w-2 bg-red-500 rounded-full mr-2"></span><p>offline</p></>)}
                            </div>
                        </div>
                    </div>

                    {/* Close button */}
                    <button onClick={closeChat}>
                        <RxCross2 className="h-6 w-6 text-gray-100 hover:text-gray-300" />
                    </button>
                </div>

                <div className="p-4 h-80 overflow-y-auto">
                    <div className='mb-0'>
                        {messages.map((chat, index) => (
                            <div key={index} className={`${chat.senderId === senderId ? ' text-right' : 'text-left'}`}>
                                <p className={`message text-white rounded-lg py-1.5 px-4 mb-1 inline-block ${chat.senderId === senderId ? 'sent bg-blue-500' : 'received bg-gray-500'}`}>
                                    {chat.message}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {typingStatus && typingStatus === receiverId && (
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
                        placeholder="Type a message"/>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
                        onClick={sendMessage}>
                        Send
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Chat;
