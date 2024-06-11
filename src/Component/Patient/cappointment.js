import React, { useEffect, useRef, useState } from 'react';


import Sidebar from './components/Sidebar';
import Navbar from '../common/Navbar';
import man from '../images/profile.png'
import girl from '../images/girl.jpg'

import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { CiSearch } from "react-icons/ci";
import { LiaPrescriptionBottleAltSolid } from "react-icons/lia";
import { RiDownload2Fill } from "react-icons/ri";

import { Card, Typography, CardBody, } from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { completedappoinment } from "../../services/patient";
import PrescriptionPage from './components/prescription';


const TABLE_HEAD = ["Time", "Date", "Patient Name", "Age", "Doctor", "Fee Status", "Action"];


const DashboardLayout = ({ children }) => {

    const location = useLocation();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const [available, setAvailable] = useState(false)
    const [addappointment, setAddappointment] = useState(false);
    const [deleteAppointment, setDeleteappointment] = useState(false);
    const [appointmentid, setAppointmentid] = useState('')
    const [isOpen, setIsOpen] = useState(false);

    const [p, setp] = useState(false)
    const [search, setSearch] = useState('')
    const [date, setDate] = useState('')
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [allappointment, setAllappointment] = useState([])

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const isActive = (path) => {
        return location.pathname === path;
    };
    useEffect(() => {
        const fetchData = async () => {
            const data = await dispatch(completedappoinment(page, date, search, token));
            setAllappointment(data.appointment);
            setTotalPages(data.totalPages)
            if (data.appointment.length == 0) {
                setAvailable(true);
            } else {
                setAvailable(false);
            }
        };
        fetchData();
    }, [page, date, search, deleteAppointment, addappointment]);

    const prescription = (appointmentId) => {
        setAppointmentid(appointmentId)
        setp(true)
    };
    const closemodel = () => {
        setp(!p)
    }
    //*********************** Pagination Logic *************** */
    const handlePrevClick = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1)); // Ensure page doesn't go below 1
    };
    const handleNextClick = () => {
        setPage(prevPage => Math.min(prevPage + 1, totalPages)); // Ensure page doesn't exceed total pages
    };
    const handlePageClick = (pageNumber) => {
        setPage(pageNumber);
    };
    const renderPaginationButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button
                    key={i}
                    className={`mr-1 hover:bg-blue-400 hover:text-white text-blue-600 text-xs py-1 px-2 rounded-md ${i === page ? 'bg-blue-500 text-white' : ''}`}
                    onClick={() => handlePageClick(i)} >
                    {i}
                </button>
            );
        }
        return buttons;
    };
    //*************************************************** */

    return (
        <div className='bg-[#E2F1FF] h-screen'>
            <div>
                <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
                <h1 className='absolute lg:ml-52 p-7 pt-6 font-semibold hidden lg:block'>Appointment Details</h1>
                <Navbar toggle={toggleSidebar} />
                <div className='bg-white lg:ml-60 ml-6 me-6 lg:me-8 mt-1 h-full pb-5 rounded-lg'>
                    <Card className="h-full w-full shadow-none">
                        <div className='flex justify-between pt-5 pl-5 md:pe-5'>
                            <div className='hidden sm:flex'>
                            <h5 className="text-xs text-gray-400 font-bold cursor-pointer pr-1 md:pr-5">
                                    <Link to="/patient/appointments">UPCOMING APPOINTMENTS</Link>
                                </h5>
                                <h1 className={`text-xs cursor-pointer font-bold text-black ${isActive('/patient/appointments/complete') ? 'underline underline-offset-8 decoration-blue-700 text-black' : ''}`}>
                                    <Link to="/patient/appointments/complete">COMPLETED APPOINTMENTS</Link>
                                </h1>
                            </div>
                            <div className='sm:hidden flex'>
                                <h5 className="text-xs font-bold text-gray-400 cursor-pointer pr-1 md:pr-5 ">
                                    <Link to="/patient/appointments">UPCOMING</Link>
                                </h5>
                                <h1 className={`text-xs cursor-pointer font-bold text-black ml-1 ${isActive('/patient/appointments/complete') ? 'underline underline-offset-8 decoration-blue-700 text-black' : ' hover:text-blue-900'}`}>
                                    <Link to="/patient/appointments/complete">COMPLETED</Link>
                                </h1>
                            </div>
                            {/* <button className='sm:hidden bg-[#3497F9] text-white text-xs rounded-xl mb-1 me-3 px-2 p-1.5'>new appointment</button> */}
                        </div>
                        <div className='flex mb-3 ml-6 mt-3'>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="pl-8 w-32 h-6 text-xs mt-3 rounded-full bg-[#E2F1FF] outline-none"
                                    placeholder="Search"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                                <CiSearch className="absolute mt-2 left-2 top-2" />
                            </div>
                            <div className="relative">
                                <input
                                    type="date"
                                    onChange={e => setDate(e.target.value)}
                                    className="md:ml-8 ml-2 pl-3 w-32 h-6 text-blue-400 cursor-pointer text-xs mt-3 pe-2 border border-blue-600 rounded-full  outline-none"
                                />
                            </div>
                        </div>

                        <CardBody className="overflow-x-hidden  px-3 pt-2">
                            <div className="overflow-x-auto">
                                <table className=" w-full min-w-max table-auto text-left">
                                    <thead>
                                        <tr>
                                            {TABLE_HEAD.map((head, index) => (

                                                <th
                                                    key={head}
                                                    className="cursor-pointer border-b-2 p-2 pl-6 " >
                                                    <Typography className="flex gap-2 text-xs font-semibold leading-none ">
                                                        {head}{" "}
                                                        {index !== TABLE_HEAD.length - 1 && (
                                                            <ChevronUpDownIcon strokeWidth={2} className="h-3 w-3" />
                                                        )}
                                                    </Typography>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allappointment.map(
                                            ({ img, appointment_id, time, patient, token, doctor, date, status, fee }, index) => {
                                                const isLast = index === allappointment.length - 1;
                                                const classes = isLast ? "pl-3 border-b border-blue-gray-50" : "pl-3 border-b border-blue-gray-50";
                                                return (
                                                    <tr key={appointment_id} className=' h-14'>
                                                        <td className={classes}>
                                                            <div className=" flex items-center p-3">
                                                                <Typography className=" font-semibold text-xs text-slate-500" >
                                                                    {time}
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <div className="flex items-center ">
                                                                <Typography className="pl-1 font-semibold text-xs text-slate-500" >
                                                                    {date}
                                                                </Typography>
                                                            </div>
                                                        </td>

                                                        <td className={classes}>
                                                            <div className="flex items-center">
                                                                {patient.gender == 'male' ? (<img src={man} alt={patient.first_name} className="w-7 h-7 rounded-full mr-2" />) : (<img src={girl} alt={patient.first_name} className="w-7 h-7 rounded-full mr-2" />)}
                                                                <Typography className="font-semibold text-xs pb-2 pl-0 text-slate-500">{patient.first_name} {patient.last_name}</Typography> {/* Name */}
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <div className="flex items-center">
                                                                <Typography className="pl-4 font-semibold text-xs text-slate-500" >
                                                                    {patient.age}
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <div className="flex items-center">
                                                                <Typography className="pl-2 font-semibold text-xs text-slate-500" >
                                                                    {doctor.first_name} {doctor.last_name}
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <div className="flex items-center">
                                                                <Typography className="pl-6 font-semibold text-xs text-slate-500" >
                                                                    Paid
                                                                </Typography>
                                                            </div>
                                                        </td>


                                                        <td className={classes}>
                                                            <div className="flex items-center">
                                                                <button className=" border-2  border-blue-500 rounded-lg p-1 flex items-center justify-center" title='Prescription'
                                                                    onClick={e => prescription(appointment_id)}>
                                                                    <LiaPrescriptionBottleAltSolid className="w-3 h-3 " />
                                                                </button>
                                                                <button className="ml-2 me-2 border-2 border-blue-500   rounded-lg p-1 flex items-center justify-center">
                                                                    <RiDownload2Fill className="w-3 h-3 " />
                                                                </button>
                                                            </div>
                                                        </td>

                                                    </tr>
                                                );
                                            },
                                        )}
                                    </tbody>
                                </table>
                                {p && <div >
                                    <PrescriptionPage appointment={appointmentid} closeModal={closemodel} />
                                </div>}
                                {available && <><h1 className=' text-center font-semibold mt-16 text-xl text-red-500'>No Appointments </h1>
                                    <h1 className=' text-center font-semibold mt-2 text-md text-blue-500'>Take New Appointment </h1></>}
                            </div>
                        </CardBody>
                    </Card>

                    <div className="mt-1 me-5 flex justify-end items-center">
                        <div>
                            <button className="mr-1 hover:bg-blue-400 hover:text-white text-blue-600 text-xs py-1 px-2 rounded-md"
                                onClick={handlePrevClick}
                                disabled={page === 1} > Prev
                            </button>
                        </div>
                        <div>
                            {renderPaginationButtons()}
                        </div>
                        <div>
                            <button className="ml- hover:bg-blue-400 hover:text-white text-blue-600 text-xs py-1 px-2 rounded-md"
                                onClick={handleNextClick}
                                disabled={page === totalPages} > Next
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;
