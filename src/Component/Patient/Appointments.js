import React, { useEffect, useState } from 'react';

import Sidebar from './components/Sidebar';
import Navbar from '../common/Navbar';
import NavbarMobile from '../common/NavbarMobile';
import man from '../images/profile.png'
import girl from '../images/girl.jpg'

import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { MdMonitor } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";

import {
    Card,
    Typography,
    CardBody,
} from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';

import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { alldoctorselection, allpatient, allappointments, deleteappointment1 } from "../../services/patient";

const TABLE_HEAD = ["Time", "Date", "Patient Name", "Age", "Token", "Doctor", "Status", "Action", ""];

const DashboardLayout = ({ children }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const [addappointment, setAddappointment] = useState(false);
    const [deleteAppointment, setDeleteappointment] = useState(false);
    const [available, setAvailable] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const [patientid, setPatientid] = useState('')
    const [doctorid, setDoctorid] = useState('')
    const [appointmentid, setappointmentid] = useState(null)
    const [doctor, setDoctor] = useState([])
    const [search, setSearch] = useState('')
    const [data, setData] = useState([])
    const [date, setDate] = useState('')
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [allappointment, setAllappointment] = useState([])

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const showModal = () => {
        setDeleteappointment(!deleteAppointment)
    }
    useEffect(() => {
        const fetchData = async () => {
            const data = await dispatch(allappointments(page, date, search, token));
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

    const Addappointment = () => {
        dispatch(allpatient(page, search, token))
            .then(Data => {
                setData(Data.data);
                if (Data.data.length === 0) {
                    return toast('👤 First Add Member !')
                } else {
                    setAddappointment(true)
                }
            })
        dispatch(alldoctorselection())
            .then(Data => {
                setDoctor(Data.doctors);
            })
    }
    const submit = () => {
        if (patientid == '' || doctorid == '') {
            return toast.error("Please Select Patient and Doctor!!!")
        }
        navigate('/patient/token', { state: { patientid, doctorid } })

    }
    const reschedule = (appointmentid, patientid, doctorid) => {
        navigate('/patient/token', { state: { patientid, doctorid, appointmentid } })
    }
    const deleteappointment = (appoinmentid) => {
        setappointmentid(appoinmentid)
        setDeleteappointment(true)
    }
    const monitor = (doctorid, date) => {
        navigate('/patient/livemonitor', { state: { doctorid, date } })
    }
    const handleDelete = async () => {
        await dispatch(deleteappointment1(appointmentid, token));
        setDeleteappointment(false)
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
            <NavbarMobile toggle={toggleSidebar} />
            <div>
                <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
                <h1 className='absolute lg:ml-52 p-7 pt-6 font-semibold hidden lg:block'>Appointment Details</h1>
                <Navbar />

                <div className='bg-white lg:ml-60 ml-6 me-6 lg:me-8 mt-1 h-full pb-5 rounded-lg'>
                    <Card className="h-full w-full">
                        <div className='flex justify-between pt-5 pl-5 md:pe-5'>
                            <div className='hidden sm:flex'>
                                <h5 className='text-xs font-bold cursor-pointer pr-1 md:pr-5 underline underline-offset-8 decoration-blue-700 '>UPCOMING APPOINTMENTS</h5>
                                <h1 className='text-xs cursor-pointer text-slate-400 font-bold'><Link to="/patient/appointments/complete"> COMPLETED APPOINTMENTS</Link></h1>
                            </div>
                            <button className='hidden sm:inline bg-[#3497F9] text-white text-xs rounded-xl mb-0 mt-0 px-2 p-1.5' onClick={Addappointment}>New Appointment</button>
                            <div className='sm:hidden flex'>
                                <h5 className='text-xs font-bold cursor-pointer pr-1 md:pr-5 underline underline-offset-8 decoration-blue-700 hover:font-bold'>UPCOMING</h5>
                                <h1 className='text-xs cursor-pointer text-slate-400 font-bold'><Link to="/patient/appointments/complete">COMPLETED </Link></h1>
                            </div>
                            <button className='sm:hidden bg-[#3497F9] text-white text-xs rounded-xl mb-1 me-3 px-2 p-1.5' onClick={Addappointment}>new appointment</button>
                        </div>{available ? (<div className='mt-6'></div>) : (<div className='flex mb-3 ml-6 mt-0'>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="pl-8 w-32 h-6 text-xs mt-3 rounded-full bg-[#E2F1FF] outline-none"
                                    placeholder="Search"
                                    onChange={e => setSearch(e.target.value)}
                                />
                                <CiSearch className="absolute mt-2 left-2 top-2" />
                            </div>
                            <div className="relative">
                                <input type="date"
                                    onChange={e => setDate(e.target.value)}
                                    className="md:ml-8 ml-2 pl-3 w-32 h-6 text-blue-400 cursor-pointer text-xs mt-3 pe-2 border border-blue-600 rounded-full  outline-none" />
                            </div>
                        </div>)}


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
                                            ({ image, appointment_id, date, time, status, token, patient, doctor }, index) => {
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
                                                                <Typography className="pl-7 font-semibold text-xs text-slate-500" >
                                                                    {token.token_no}
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <div className="flex items-center">
                                                                <Typography className="pl-3 font-semibold text-xs text-slate-500" >
                                                                    {doctor.first_name} {doctor.last_name}
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <div className="flex items-center">
                                                                <Typography className="pl-3 font-semibold text-xs text-slate-500" >
                                                                    {status}
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        {status == "scheduled" ? (<td className={classes}>
                                                            <div className="flex items-center">
                                                                <p className='pl-3 text-xs text-blue-600 font-normal cursor-pointer' onClick={() => reschedule(appointment_id, patient.patient_id, doctor.doctor_id)}>Reschedule</p>
                                                            </div>
                                                        </td>) : (<div className="flex items-center">
                                                        </div>)
                                                        }
                                                        <td className={classes}>
                                                            <div className="flex items-center">
                                                                {status == "scheduled" ? (<button className=" border-2 bg-red-400 border-red-400 rounded-lg p-1 flex items-center justify-center"
                                                                    onClick={e => deleteappointment(appointment_id)}>
                                                                    <RxCross2 className="w-3 h-3 text-white" />
                                                                </button>) : (<button className=" border-2 bg-red-400 border-red-400 rounded-lg p-1 flex items-center justify-center">
                                                                    <RxCross2 className="w-3 h-3 text-white" />
                                                                </button>)}
                                                                {status == "scheduled" ? (<button className="ml-2 me-2 border-2 border-green-500 bg-green-500  rounded-lg p-1 flex items-center justify-center"
                                                                    onClick={e => monitor(doctor.doctor_id, date)}>
                                                                    <MdMonitor className="w-3 h-3 text-white" />
                                                                </button>) : (<button className="ml-2 me-2 border-2 border-red-500 bg-red-500  rounded-lg p-1 flex items-center justify-center">
                                                                    <MdMonitor className="w-3 h-3 text-white" />
                                                                </button>)}

                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            },
                                        )}
                                    </tbody>

                                </table>
                                {available && <><h1 className=' cursor-default text-center font-semibold mt-16 text-xl text-red-500'>No Upcoming Appointments </h1>
                                    <h1 onClick={Addappointment} className=' cursor-pointer text-center font-semibold mt-2 text-md text-blue-500'>Take New Appointment </h1></>}
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
                {addappointment &&
                    <>
                        <div className="justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className="relative w-80 my-6 mx-auto max-w-3xl">
                                <div className="mt-20 lg:ml-20 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    <div className="flex items-start justify-between p-3 ">
                                        <h3 className="text-xl font-semibold">
                                            Add new Appointment
                                        </h3>
                                        <button onClick={e => setAddappointment(false)}>
                                            <RxCross2 className="w-5 h-5 m-1" />
                                        </button>
                                    </div><hr />
                                    <div className="mt-3 mb-5 relative px-6 flex-auto">
                                        {/* <p className="text-red-600 hover:underline hover:underline-offset-4">{error}</p> */}
                                        <select
                                            className=" mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                            value={patientid}
                                            onChange={e => setPatientid(e.target.value)}
                                            name="patient">
                                            <option value="">Select Patient</option>
                                            {data.map((patient, index) => (
                                                <option key={patient.patient_id} value={patient.patient_id}>{index + 1}. {patient.first_name} {patient.last_name}</option>
                                            ))}

                                        </select>
                                        <select
                                            className="mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                            value={doctorid}
                                            onChange={e => setDoctorid(e.target.value)}
                                            name="doctor">
                                            <option value="">Select Doctor</option>
                                            {doctor.map((doctor, index) => (
                                                <option key={doctor.doctor_id} value={doctor.doctor_id}>{index + 1}. {doctor.first_name} {doctor.last_name}</option>
                                            ))}
                                        </select>
                                        <div className="mt-4 flex justify-between font-semibold text-sm">
                                        </div>
                                        <button
                                            className="bg-blue-500 py-1.5 w-full text-white text-sm px-6 rounded hover:bg-blue-700"
                                            type="button"
                                            onClick={submit}>
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>

                    </>
                }
                {deleteAppointment && (
                    <div
                        className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
                        <div className="relative mx-3 p-4 w-full max-w-md md:h-auto bg-white rounded-lg shadow dark:bg-white">
                            < button className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={showModal} ><IoMdClose className='w-6 h-6 font-bold' />
                            </button>
                            <div className="p-4 text-center">
                                <MdDelete className='text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto' />
                                <p className="mb-4 text-gray-600 dark:text-gray-600">Are you sure you want to Cancel Appointment?</p>
                                <div className="flex justify-center items-center space-x-4">
                                    <button className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                        onClick={showModal} > No, cancel
                                    </button>
                                    <button type="submit" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                                        onClick={handleDelete}>
                                        Yes, I'm sure
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default DashboardLayout;
