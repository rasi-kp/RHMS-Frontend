import React, { useEffect, useRef, useState } from 'react';


import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import NavbarMobile from './components/NavbarMobile';
import man from '../images/profile.png';

import { Card } from "@material-tailwind/react";
// import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


const Message = ({ children }) => {

    // const navigate = useNavigate()
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className='bg-[#E2F1FF] h-screen'>
            <NavbarMobile toggle={toggleSidebar} />
            <div>
                <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
                <h1 className='absolute lg:ml-52 p-7 pt-6 font-semibold hidden lg:block'>Profile</h1>
                <Navbar />
                <div className='flex flex-col md:flex-row md:flex-nowrap w-full'>
                    <div className=' max-h-screen lg:ml-60 mt-1 ml-4 me-3 md:w-2/5'>
                        <div className=' bg-white w-full rounded-lg text-center justify-center mb-1 pb-4'>
                            <div className="flex items-center justify-center">
                                {/* <img className='rounded-full p-5 h-52 w-52' src={man} alt="Profile Image" /> */}
                            </div>
                            
                        </div>
                    </div>
                    <div className='bg-white lg:me-8 mt-1 h-full pb-5 me-3 ml-3 md:ml-1 rounded-lg md:w-3/4'>
                        <Card className="h-full w-full">
                            <div className='flex justify-end pt-3 pl-5 md:pe-5'>
                                <button className=' bg-[#3497F9] text-white text-sm rounded-md me-3 px-6 p-1'>Edit</button>
                            </div>
                            <div className="mt-1 mb-5 relative px-6 flex-auto">
                                <labal className="pt-1 text-slate-600">Address :</labal>
                              
                                <input disabled 
                                    className="mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                    placeholder='Blood Group' />
                                <labal className="p-1 text-slate-600">Gender :</labal>
                                <select disabled 
                                    className="mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded">
                                    <option value="">Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </Card>

                        {/* {edit && <>
                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                <div className="relative w-96 my-6 mx-auto max-w-3xl">
                                    <div className="mt-10 lg:ml-20 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        <div className="flex items-start justify-between p-3 ">
                                            <h3 className="text-xl font-semibold">
                                                Edit Profile
                                            </h3>
                                            <button onClick={e => setEdit(!edit)}>
                                                <RxCross2 className="w-5 h-5 m-1" />
                                            </button>
                                        </div><hr />
                                        <div className="mt-3 mb-5 relative px-6 flex-auto">
                                            {!image && (
                                                <label className="bg-white text-black text-base rounded mb-2 h-24 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed font-[sans-serif]">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 mb-2 fill-black" viewBox="0 0 32 32">
                                                        <path
                                                            d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                                                            data-original="#000000" />
                                                        <path
                                                            d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                                                            data-original="#000000" />
                                                    </svg>
                                                    Image Upload
                                                    <input type="file" className="hidden" onChange={handleImageChange} />
                                                    <p className="text-xs text-gray-400 mt-2">PNG, JPG, WEBP, and GIF are Allowed.</p>
                                                </label>
                                            )}
                                            {image && (
                                                <div className="flex">
                                                    <img
                                                        className="ml-24 md:ml-28 mb-3 inset-y-0 w-24 h-24 rounded-full"
                                                        src={URL.createObjectURL(image)}
                                                        alt="Uploaded Image" />
                                                    <span className=" cursor-pointer" onClick={() => setImage(null)}>❌</span>
                                                </div>
                                            )}
                                            <input
                                                className="text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                                type="text"
                                                placeholder="First Name"
                                                value={fname}
                                                onChange={e => setFname(e.target.value)}
                                                name="fname" />
                                            <input
                                                className="mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                                type="text"
                                                placeholder="Last Name"
                                                value={lname}
                                                onChange={e => setLname(e.target.value)}
                                                name="lname" />
                                            <input
                                                className="mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                                type="text"
                                                placeholder="DOB (DD/MM/YYYY)"
                                                value={dob}
                                                onChange={e => setDob(e.target.value)}
                                                name="dob" />
                                            <select
                                                className=" mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                                value={bg}
                                                onChange={e => setBg(e.target.value)}
                                                name="gender">
                                                <option value="">Blood Group</option>
                                                <option value="B+">B+</option>
                                                <option value="B-">B-</option>
                                                <option value="A+">A+</option>
                                                <option value="A-">A-</option>
                                                <option value="O+">O+</option>
                                                <option value="O-">O-</option>
                                                <option value="AB+">AB+</option>
                                                <option value="AB-">AB-</option>
                                            </select>
                                            <select
                                                className="mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                                value={gender}
                                                onChange={e => setGender(e.target.value)}
                                                name="gender">
                                                <option value="">Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                            <button
                                                className="bg-blue-500 mt-2 py-1.5 w-full text-white text-sm px-6 rounded hover:bg-blue-700"
                                                type="button" onClick={submit}>
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                            <ToastContainer />
                        </>} */}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Message;
