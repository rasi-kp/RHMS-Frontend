import React from 'react';
import logo from '../../images/logo.png'
import { AiFillDashboard } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { AiOutlineClose } from 'react-icons/ai';
import { IoDocuments,IoLogOutSharp } from "react-icons/io5";
import { FaUserDoctor } from "react-icons/fa6";
import { RiMessage2Fill } from "react-icons/ri";
import { MdSubscriptions } from "react-icons/md";
import { IoMdVideocam } from "react-icons/io";
import { BiSolidAmbulance } from "react-icons/bi";
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggle }) => {
  return (
    <nav className={`${isOpen ? 'block' : 'hidden'} lg:block lg:w-52 bg-white h-screen fixed top-0 left-0 z-50`}>
      <div className="p-4 text-white flex">
        <Link to="/patient"> <img className='ml-5 ' src={logo} width="118" alt="logo" /></Link>
        <AiOutlineClose className='text-black w-5 h-5 ml-8 cursor-pointer md:hidden' onClick={toggle}/>
      </div>
      <ul className="text-[#7F8F98]">
        <li className="pl-6 p-3 lg:pb-3 bg-blue-100 text-[#3497F9] flex"><AiFillDashboard className="w-5 h-5 mr-3 "/><span className="cursor-pointer text-sm text-md"><Link to="/patient">Dashboard</Link></span></li>
        <li className="pl-6 p-2 lg:pb-3 flex"><FaUsers className="w-5 h-6 mr-3"/><span className="cursor-pointer text-sm"><Link to="/patient/members">Members</Link></span></li>
        <li className="pl-6 p-2 lg:pb-3 flex"><IoDocuments className="w-5 h-5 mr-3"/><span className="cursor-pointer text-sm"><Link to="/patient/appointments"> Appointment</Link></span></li>
        <li className="pl-6 p-2 lg:pb-3 flex"><FaUserDoctor className="w-5 h-5 mr-3"/><span className="cursor-pointer text-sm"><Link to="/patient/doctors">Doctors</Link></span></li>
        <li className="pl-6 p-2 lg:pb-3 flex"><RiMessage2Fill className="w-5 h-5 mr-3"/><span className="cursor-pointer text-sm"><Link to="">Messages</Link></span></li>
        <li className="pl-6 p-2 lg:pb-3 flex"><IoMdVideocam className="w-5 h-5 mr-3"/><span className="cursor-pointer text-sm" ><Link to="">Online Consultant</Link></span></li>
        <li className="pl-6 p-2 lg:pb-3 flex"><BiSolidAmbulance className="w-5 h-5 mr-3"/><span className="cursor-pointer text-sm"><Link to="">Ambulance</Link></span></li>
        <li className="pl-6 p-2 lg:pb-3 flex"><MdSubscriptions className="w-5 h-5 mr-3"/><span className="cursor-pointer text-sm"><Link to="">Subscription</Link></span></li>
        {/* <li className="pl-6 p-2 flex"><MdMore className="w-5 h-5 mr-3"/>Others</li> */}
      </ul>

      <div className="absolute bottom-0 pl-6 p-6 text-[#7F8F98]">
        
        <button onClick={toggle} className="flex"><IoLogOutSharp className="w-5 h-6 mr-3"/>Logout</button>
      </div>
    </nav>
  );
};

export default Sidebar;
