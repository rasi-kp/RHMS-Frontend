import React, { useEffect, useRef, useState } from 'react'
import logo from '../images/logo.png'
import image from '../images/profile.png'
import { CgProfile } from "react-icons/cg";
import { IoNotifications } from "react-icons/io5";
import { AiOutlineMenu } from 'react-icons/ai';
import { LiaSignOutAltSolid } from "react-icons/lia";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducer/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../apiconfig';

function Navbar({toggle}) {
    const [profile, setProfile] = useState(false)
    const [notify, setNotify] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
    const role = useSelector(state => state.auth.role)
    const modalRef = useRef();
    const imageRef = useRef();

    const handleClickOutside = (event) => {
        if (
            modalRef.current &&
            !modalRef.current.contains(event.target) &&
            !imageRef.current.contains(event.target)
        ) {
            setProfile(false);
        }
    };
    useEffect(() => {
        if (profile) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [profile]);

    const toggleProfile = () => {
        setProfile(!profile);
    };
    const logoutonclick = async (e) => {
        dispatch(logout());
        navigate('/')
        setTimeout(() => {
            toast.success("Successfully Logged Out", {
                autoClose: 1000, // Set the duration to 2 seconds (2000 milliseconds)
            });
        }, 100);
    }
    return (
        <div >
            {/* Mobile Menu Icon and Logo */}
            <div className='p-3 flex items-center lg:hidden justify-between mx-5'>
                <AiOutlineMenu  className='' size={30} onClick={toggle} />
                <img  className='ml-2' src={logo} width="102" alt="logo" />
                <div className='flex items-center'>
                    <IoNotifications onClick={e => setNotify(!notify)} className='cursor-pointer w-5 h-5 me-3 text-slate-500' />
                    <div ref={imageRef} className="rounded-full border-2 border-blue-900 overflow-hidden bg-gray-200 w-8 h-8 flex mx-auto">
                        <img className="w-full h-auto cursor-pointer" onClick={toggleProfile} src={(role == 'patient' ? (user.image ? (`${BASE_URL}/users/${user.image}`) : (image)) : (role == 'doctor' ? (`${BASE_URL}/doctors/${user.img}`) : (image)))} alt="profile" />
                    </div>
                </div>
            </div>
            {/* Notification and Profile Section */}
            <div className='flex items-center lg:ml-52 lg:me-5 p-3 pt-4 justify-end lg:flex hidden lg:block'>
                <IoNotifications onClick={e => setNotify(!notify)} className='cursor-pointer w-5 h-5 me-3 text-slate-500' />
                <div className='flex' ref={imageRef} onClick={toggleProfile}>
                    <div className="rounded-full border-2 border-blue-900 overflow-hidden bg-gray-200 w-8 h-8 flex mx-auto">
                        <img className="w-full h-auto cursor-pointer" src={(role == 'patient' ? (user.image ? (`${BASE_URL}/users/${user.image}`) : (image)) : (role == 'doctor' ? (`${BASE_URL}/doctors/${user.img}`) : (image)))} alt="image" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-sm font-semibold text-blue-900 ml-2 mr-3 cursor-pointer">{role === 'patient' ? (user.lname ? (`${user.name} ${user.lname}`) : (user.name)) : role === 'doctor' ? (`${user.name} ${user.last}`) : 'Admin'}</h1>
                        <h1 className='text-xs ml-2 cursor-default text-slate-400'>
                            {role === 'patient' ? 'Patient' :
                                role === 'doctor' ? 'Doctor' :
                                    role === 'admin' ? 'Admin' :
                                        ''}</h1>
                    </div>
                </div>
            </div>
            {profile && <>

                <div ref={modalRef} className="absolute top-14 right-16 bg-slate-100 rounded-lg border-2 shadow-xl z-10">
                    <ul className="py-2">
                        <li >
                            <Link to="/patient/profile" className="flex px-5 py-2 hover:bg-gray-300">
                                <CgProfile className="w-5 h-6 mr-2 ml-1" />Profile
                            </Link>
                        </li ><hr className='border-1' />
                        <li onClick={logoutonclick} className="flex px-5 py-2 cursor-pointer hover:bg-gray-300">
                            <LiaSignOutAltSolid className="w-6 h-6 mr-2 " />Logout
                        </li>
                    </ul>
                </div></>}
            {notify && <>
                <div className="absolute top-12 w-1/3 right-28 bg-slate-100 rounded-lg border-2 shadow-xl z-10">
                    <ul className="py-2">
                        <li >
                            <Link to="/patient/notify" className="flex px-5 py-2 hover:bg-gray-300">
                                notification
                            </Link>
                        </li ><hr className='border-1' />
                        <li onClick={logoutonclick} className="flex px-5 py-2 cursor-pointer hover:bg-gray-300">
                            notification
                        </li>
                        <li className="flex px-5 py-2 cursor-pointer hover:bg-gray-300">
                            notification
                        </li>
                        <li className="flex px-5 py-2 cursor-pointer hover:bg-gray-300">
                            notification
                        </li>
                        <li className="flex px-5 py-2 cursor-pointer hover:bg-gray-300">
                            notification
                        </li>
                    </ul>
                </div></>}
        </div>
    )
}

export default Navbar
