import React, { useState } from 'react';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import NavbarMobile from './components/NavbarMobile';
import Appointments from './components/Appointments';

import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { MdMonitor } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";

import {
    Card,
    Typography,
    CardBody,
} from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { alldoctorselection, allpatient } from "../../services/patient";

const TABLE_HEAD = ["Time", "Date", "Patient Name", "Age", "Token No", "Doctor", "Action", ""];

const TABLE_ROWS = [
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
        name: "John Michael",
        doctor: "Dr.Smith",
        time: "10:30 AM",
        age: 22,
        token: 2,
        fee: true,
        online: true,
        date: "23/04/18",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
        name: "Alexa Liras",
        doctor: "Dr.Roopa S",
        time: "11:30 AM",
        age: 22,
        token: 5,
        fee: true,
        online: false,
        date: "23/04/18",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
        name: "Laurent Perrier",
        doctor: "Dr.John Doe",
        time: "10:30 AM",
        online: false,
        age: 22,
        token: 9,
        fee: true,
        date: "19/09/17",
    },

];

const DashboardLayout = ({ children }) => {

    const navigate=useNavigate()
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const [addappointment, setAddappointment] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const [patientid, setPatientid] = useState('')
    const [doctorid, setDoctorid] = useState('')
    const [doctor, setDoctor] = useState([])
    const [search, setSearch] = useState('')
    const [data, setData] = useState([])
    const [flag, setFlag] = useState(false)
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const Addappointment = () => {
        setAddappointment(true)
        dispatch(allpatient(page, search, token))
            .then(Data => {
                setData(Data.data);
            })
        dispatch(alldoctorselection())
            .then(Data => {
                setDoctor(Data.doctors);
            })
    }
    const submit=()=>{
        if(patientid=='' || doctorid==''){
            return toast.error("Please Select Patient and Doctor!!!")
        }
        navigate('/patient/token',{ state: { patientid,doctorid}})
        
    }

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
                        </div>
                        <div className='flex mb-3 ml-6 mt-0'>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="pl-8 w-32 h-6 text-xs mt-3 rounded-full bg-[#E2F1FF] outline-none"
                                    placeholder="Search"
                                />
                                <CiSearch className="absolute mt-2 left-2 top-2" /> {/* Assuming CiSearch is an icon component */}
                            </div>
                            <div className="relative">
                                <input
                                    type="date"
                                    className="md:ml-8 ml-2 pl-3 w-32 h-6 text-blue-400 cursor-pointer text-xs mt-3 pe-2 border border-blue-600 rounded-full  outline-none"
                                    value="Filter by Date"
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
                                        {TABLE_ROWS.map(
                                            ({ img, name, time, doctor, date, age, token }, index) => {
                                                const isLast = index === TABLE_ROWS.length - 1;
                                                const classes = isLast ? "pl-3 border-b border-blue-gray-50" : "pl-3 border-b border-blue-gray-50";
                                                return (
                                                    <tr key={name} className=' h-14'>
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
                                                                <img src={img} alt={name} className="w-7 h-7 rounded-full mr-2" /> {/* Image */}
                                                                <Typography className="font-semibold text-xs pb-2 pl-0 text-slate-500">{name}</Typography> {/* Name */}
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <div className="flex items-center">
                                                                <Typography className="pl-4 font-semibold text-xs text-slate-500" >
                                                                    {age}
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <div className="flex items-center">
                                                                <Typography className="pl-7 font-semibold text-xs text-slate-500" >
                                                                    {token}
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <div className="flex items-center">
                                                                <Typography className="pl-3 font-semibold text-xs text-slate-500" >
                                                                    {doctor}
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <div className="flex items-center">
                                                                <p className='pl-3 text-xs text-blue-600 font-normal cursor-pointer'>Reschedule</p>
                                                            </div>
                                                        </td>

                                                        <td className={classes}>
                                                            <div className="flex items-center">
                                                                <button className=" border-2 bg-red-400 border-red-400 rounded-lg p-1 flex items-center justify-center">
                                                                    <RxCross2 className="w-3 h-3 text-white" />
                                                                </button>
                                                                <button className="ml-2 me-2 border-2 border-green-500 bg-green-500  rounded-lg p-1 flex items-center justify-center">
                                                                    <MdMonitor className="w-3 h-3 text-white" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            },
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardBody>
                    </Card>
                    <div class="mt-5 flex justify-end items-center">
                        <div>

                            <button class=" hover:bg-blue-600 hover:text-white text-blue-600 text-sm py-1 px-2 rounded-md">
                                Prev
                            </button>
                        </div>
                        <div>
                            <button class=" bg-blue-600 text-white  text-sm py-1 px-2 rounded-md">
                                1
                            </button>
                            <button class=" hover:bg-blue-600 hover:text-white text-blue-600 text-sm py-1 px-2 rounded-md">
                                2
                            </button>
                            <button class=" hover:bg-blue-600 hover:text-white text-blue-600 text-sm py-1 px-2 rounded-md">
                                3
                            </button>
                        </div>
                        <div>
                            <button class="me-5 hover:bg-blue-600 hover:text-white text-blue-600 text-sm py-1 px-2 rounded-md">
                                Next
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
            </div>
            <ToastContainer />
        </div>
    );
};

export default DashboardLayout;
