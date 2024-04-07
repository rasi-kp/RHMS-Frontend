import React from 'react'
import image from '../../images/doctor 1.jpg'
import { IoNotifications } from "react-icons/io5";

function Navbar({user}) {
    return (
        <div className=" lg:ml-52 p-3 pt-4 flex justify-end lg:flex hidden lg:block">
            <div className='flex items-center'>
                <IoNotifications className='cursor-pointer w-5 h-5 me-3 text-slate-500' />
                <div className="rounded-full border-2 border-blue-900 overflow-hidden bg-gray-200 w-8 h-8 flex mx-auto">
                    <img className="w-full h-auto cursor-pointer" src={image} alt="Doctor" />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-sm font-semibold cursor-default text-blue-900 ml-2 mr-3">{user}</h1>
                    <h1 className='text-xs ml-2 cursor-default text-slate-400'>Patient</h1>
                </div>
            </div>
        </div>
    )
}

export default Navbar
