import React, { useEffect, useState } from 'react';
import logo from '../../images/logo.png'
import { AiFillDashboard } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { AiOutlineClose } from 'react-icons/ai';
import { IoDocuments, IoLogOutSharp } from "react-icons/io5";
import { RiMessage2Fill } from "react-icons/ri";
import { IoMdVideocam } from "react-icons/io";
import { LiaHospitalAltSolid } from "react-icons/lia";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../../reducer/authSlice';
import { useDispatch } from 'react-redux';
import { MdEventAvailable } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { toast } from 'react-toastify';


const Sidebar = ({ isOpen, toggle }) => {
  const location=useLocation()
  const [activeLink, setActiveLink] = useState(null);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const logoutonclick = async (e) => {
    dispatch(logout());
    navigate('/')
    setTimeout(() => {
      toast.success("Successfully Logged Out", {
        autoClose: 1000, // Set the duration to 2 seconds (2000 milliseconds)
      });
    }, 100);
  }
  const handleItemClick = (link) => {
    setActiveLink(link);
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <nav className={`${isOpen ? 'block' : 'hidden'} lg:block lg:w-52 bg-white h-screen fixed top-0 left-0 z-50`}>
      <div className="p-4 text-white flex">
        <Link to="/doctor"> <img className='ml-5 ' src={logo} width="118" alt="logo" /></Link>
        <AiOutlineClose className='text-black w-5 h-5 ml-8 cursor-pointer md:hidden' onClick={toggle} />
      </div>
      <ul className="text-[#7F8F98]">
        <li className={`pl-6 p-3 lg:pb-3 hover:text-[#3497F9] flex ${activeLink === '/doctor' ? 'bg-blue-100 text-[#3497F9]' : ''}`}><AiFillDashboard className="w-5 h-5 mr-3 " /><span className="cursor-pointer text-sm text-md" onClick={() => handleItemClick('/doctor')}><Link to="/doctor">Dashboard</Link></span></li>
        <li className={`pl-6 p-3 lg:pb-3 hover:text-[#3497F9] flex ${activeLink === '/doctor/patients' ? 'bg-blue-100 text-[#3497F9]' : ''}`}><FaUsers className="w-5 h-6 mr-3" /><span className="cursor-pointer text-sm" onClick={() => handleItemClick('/doctor/patients')}><Link to="/doctor/patients">Patients</Link></span></li>
        <li className={`pl-6 p-3 lg:pb-3 hover:text-[#3497F9] flex ${activeLink === '/doctor/appointments'|| activeLink === '/doctor/appointments/complete' ? 'bg-blue-100 text-[#3497F9]' : ''}`}><IoDocuments className="w-5 h-5 mr-3" /><span className="cursor-pointer text-sm" onClick={() => handleItemClick('/doctor/appointments')}><Link to="/doctor/appointments"> Appointment</Link></span></li>
        <li className={`pl-6 p-3 lg:pb-3 hover:text-[#3497F9] flex ${activeLink === '/doctor/available' ? 'bg-blue-100 text-[#3497F9]' : ''}`}><MdEventAvailable className="w-5 h-5 mr-3" /><span className="cursor-pointer text-sm" onClick={() => handleItemClick('/doctors/available')}><Link to="/doctor/available">Availability</Link></span></li>
        <li className={`pl-6 p-3 lg:pb-3 hover:text-[#3497F9] flex ${activeLink === '/doctor/messages' ? 'bg-blue-100 text-[#3497F9]' : ''}`}><RiMessage2Fill className="w-5 h-5 mr-3" /><span className="cursor-pointer text-sm" onClick={() => handleItemClick('/doctor/messages')}><Link to="">Messages</Link></span></li>
        <li className={`pl-6 p-3 lg:pb-3 hover:text-[#3497F9] flex ${activeLink === '/doctor/report' ? 'bg-blue-100 text-[#3497F9]' : ''}`}><TbReport className="w-5 h-5 mr-3" /><span className="cursor-pointer text-sm" onClick={() => handleItemClick('/doctor/report')}><Link to="">Reports</Link></span></li>
        <li className={`pl-6 p-3 lg:pb-3 hover:text-[#3497F9] flex ${activeLink === '/doctor/online' ? 'bg-blue-100 text-[#3497F9]' : ''}`}><IoMdVideocam className="w-5 h-5 mr-3" /><span className="cursor-pointer text-sm" onClick={() => handleItemClick('/doctor/online')}><Link to="">Online Consultant</Link></span></li>
        <li className={`pl-6 p-3 lg:pb-3 hover:text-[#3497F9] flex ${activeLink === '/doctor/lresult' ? 'bg-blue-100 text-[#3497F9]' : ''}`}><LiaHospitalAltSolid className="w-5 h-5 mr-3" /><span className="cursor-pointer text-sm" onClick={() => handleItemClick('/doctor/lresult')}><Link to="">Lab Result</Link></span></li>
        {/* <li className="pl-6 p-2 flex"><MdMore className="w-5 h-5 mr-3"/>Others</li> */}
      </ul>

      <div className="absolute bottom-0 pl-6 p-6 text-[#7F8F98]">

        <button onClick={logoutonclick} className="flex hover:text-[#3497F9]"><IoLogOutSharp className="w-5 h-6 mr-3" />Logout</button>
      </div>
    </nav>
  );
};

export default Sidebar;
