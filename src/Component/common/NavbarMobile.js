import React, { useState } from 'react'
import logo from '../images/logo.png'
import image from '../images/doctor 1.jpg'

import { AiOutlineMenu } from 'react-icons/ai';
import { IoNotifications } from "react-icons/io5";

function NavbarMobile({toggle}) {
    return (
        <div className='p-3 flex items-center lg:hidden justify-around'>
            <AiOutlineMenu className='' size={30} onClick={toggle} />
            <img className='ml-2' src={logo} width="102" alt="logo" />
            <div className='flex items-center'>
                <IoNotifications className='cursor-pointer w-5 h-5 me-3 text-slate-500' />
                <div className="rounded-full border-2 border-blue-900 overflow-hidden bg-gray-200 w-8 h-8 flex mx-auto">
                    <img className="w-full h-auto cursor-pointer" src={image} alt="Doctor" />
                </div>
            </div>
        </div>
    )
}

export default NavbarMobile
