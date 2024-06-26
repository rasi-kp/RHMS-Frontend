import React, { useEffect, useState } from 'react';

import Sidebar from './component/Sidebar';
import Navbar from '../common/Navbar';
import man from '../images/profile.png'
import girl from '../images/girl.jpg'

import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { RxCross2 } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { FaRegBell } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";

import {Card,Typography,CardBody} from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { allappointments, addprescriptions, accept, pending } from "../../services/doctor";
import { IoMdClose } from 'react-icons/io';
import Pagination from '../common/Pagination';

const TABLE_HEAD = ["Time", "Date", "Patient Name", "Age", "Token No", "Doctor Action"];

const DashboardLayout = ({ children }) => {

    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const [absentAppointment,setabsentappointment] = useState(false)
    const [attendmodel, setAttendmodel] = useState(false);
    const [appointmentid, setAppointmentid] = useState('');
    const [patientid, setPatientid] = useState('')
    const [patientdata, setPatientdata] = useState('')
    const [isOpen, setIsOpen] = useState(false);

    const [observation, setObservation] = useState('')
    const [search, setSearch] = useState('')
    const [moreprescription, setmoreprescription] = useState(false)

    const [date, setDate] = useState('')
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [allappointment, setAllappointment] = useState([])

    const [tablets, setTablets] = useState([]);
    const [addtablate, setAddtablate] = useState('');
    const [time, setTime] = useState([]);
    const [days, setDays] = useState('');
    const [dosage, setDosage] = useState(250);
    const [test, setTest] = useState('')

    const addTablet = () => {
        if (!addtablate) {
            return toast.error("Enter Tablet First");
        }
        const newTablet = {
            name: addtablate,
            time: time,
            days: days,
            dosage: dosage,
        };
        setTablets((prevTablets) => [...prevTablets, newTablet]);
        setAddtablate('');
        setTime([]);
        setDays('');
        setDosage(250);
    };
    // Function to handle checkbox change
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setTime((prevTime) => [...prevTime, value]);
        } else {
            setTime((prevTime) => prevTime.filter((time) => time !== value));
        }
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const closeModal = () => {
        setAttendmodel(!attendmodel)
    }
    useEffect(() => {
        const fetchData = async () => {
            const data = await dispatch(allappointments(page, date, search, token));
            setAllappointment(data.appointment);
            setTotalPages(data.totalPages)
        };
        fetchData();
    }, [page, date, search, attendmodel,absentAppointment]);

    const notify = (appoinmentid) => {
        toast.success("Notification sent successfully")
    }
    const attend = async (appoinmentid, patientid) => {
        dispatch(accept(appoinmentid, token))
            .then(Data => {
                setPatientdata(Data);
            })
        setAppointmentid(appoinmentid)
        setPatientid(patientid)
        setAttendmodel(true)
    }
    const addprescription = async () => {
        if (!appointmentid || !patientid) {
            return toast.error("not have appointmentId or Patientid")
        }
        if (!observation || (tablets && tablets.length === 0)) {
            return toast.error("Must add observation or tablets !!")
        }
        const prescription = {
            appointmentid: appointmentid,
            patientid: patientid,
            observation: observation,
            tablets,
            test,
        }
        await dispatch(addprescriptions(prescription, token));
        setAttendmodel(false)
        setObservation('')
        setTablets([])
        setTest('')
    }
    const morep = () => {
        setmoreprescription(!moreprescription)
    }
    const showModal=(appoinmentid)=>{
        setAppointmentid(appoinmentid)
        setabsentappointment(!absentAppointment)
    }
    const handleDelete=()=>{
        dispatch(pending(appointmentid, token))
        setabsentappointment(false)
    }
    return (
        <div className='bg-[#E2F1FF] h-screen'>
            <div>
                <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
                <h1 className='absolute lg:ml-52 p-7 pt-6 font-semibold hidden lg:block'>Appointment Details</h1>
                <Navbar toggle={toggleSidebar}/>

                <div className='bg-white lg:ml-60 ml-6 me-6 lg:me-8 mt-1 h-full pb-5 rounded-lg'>
                    <Card className="h-full w-full">
                        <div className='flex justify-between pt-5 pl-5 md:pe-5'>
                            <div className='hidden sm:flex'>
                                <h5 className='text-xs font-bold cursor-pointer pr-1 md:pr-5 underline underline-offset-8 decoration-blue-700 '>UPCOMING APPOINTMENTS</h5>
                                <h1 className='text-xs cursor-pointer text-slate-400 font-bold'><Link to="/doctor/appointments/complete"> COMPLETED APPOINTMENTS</Link></h1>
                            </div>
                            <button className='hidden sm:inline bg-[#3497F9] text-white text-xs rounded-xl mb-0 mt-0 px-2 p-1.5'>New Appointment</button>
                            <div className='sm:hidden flex'>
                                <h5 className='text-xs font-bold cursor-pointer pr-1 md:pr-5 underline underline-offset-8 decoration-blue-700 hover:font-bold'>UPCOMING</h5>
                                <h1 className='text-xs cursor-pointer text-slate-400 font-bold'><Link to="/doctor/appointments/complete">COMPLETED </Link></h1>
                            </div>
                            <button className='sm:hidden bg-[#3497F9] text-white text-xs rounded-xl mb-1 me-3 px-2 p-1.5'>new appointment</button>
                        </div>
                        <div className='flex mb-3 ml-6 mt-0'>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="pl-8 w-32 h-6 text-xs mt-3 rounded-full bg-[#E2F1FF] outline-none"
                                    placeholder="Search"
                                    onChange={e=>setSearch(e.target.value)}
                                />
                                <CiSearch className="absolute mt-2 left-2 top-2" /> {/* Assuming CiSearch is an icon component */}
                            </div>
                            <div className="relative">
                                <input
                                    type="date"
                                    onChange={e => setDate(e.target.value)}
                                    className="md:ml-8 ml-2 pl-3 w-32 h-6 text-blue-400 cursor-pointer text-xs mt-3 pe-2 border border-blue-600 rounded-full  outline-none"
                                    value= {date}
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
                                            ({ image, appointment_id, date, time, status, token, patient, doctor }, index) => {
                                                const isLast = index === allappointment.length - 1;
                                                const classes = isLast ? "pl-3 border-b border-blue-gray-50" : "pl-3 border-b border-blue-gray-50";
                                                const rowClass = status === 'pending' ? 'bg-green-300' : '';
                                                return (
                                                    <tr key={appointment_id} className={`h-14 ${rowClass}`}>
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
                                                                <Typography className="font-semibold text-xs pb-2 pl-0 text-slate-500">{patient.first_name}</Typography> {/* Name */}
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
                                                                <button className=" border-2 bg-red-400 border-red-400 rounded-lg p-1 flex items-center justify-center"
                                                                    onClick={e => showModal(appointment_id)}>
                                                                    <RxCross2 className="w-3 h-3 text-white" />
                                                                </button>
                                                                <button className="ml-2 border-2 border-green-500 bg-green-500  rounded-lg p-1 flex items-center justify-center"
                                                                    onClick={e => attend(appointment_id, patient.patient_id)}>
                                                                    <FaCheck className="w-3 h-3 text-white" />
                                                                </button>
                                                                <button className="ml-2 border-2 border-yellow-500 bg-yellow-500  rounded-lg p-1 flex items-center justify-center"
                                                                    onClick={e => notify(appointment_id)}>
                                                                    <FaRegBell className="w-3 h-3 text-white" />
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
                    <Pagination page={page} setPage={setPage} totalPages={totalPages} />
                </div>
            </div>
            <ToastContainer />
            {attendmodel &&
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative my-6 mx-auto max-w-3xl">
                            <div className="mt-16 lg:ml-20 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between pt-2 pl-4 pe-3 ">
                                    <h3 className="text-md font-semibold">
                                        Add Prescription
                                    </h3>
                                    <button onClick={closeModal}>
                                        <RxCross2 className="w-5 h-5 m-1" />
                                    </button>
                                </div><hr />

                                <div className="mt-3 mb-5 relative px-6 flex">
                                    <div className='w-2/5 text-center'>
                                        <img
                                            className=" border-4 mb-3 w-28 h-28 rounded-full mx-auto"
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjjHgx4o1LUI6z6FVAgLeNTx9ssgmn4vJQu5gOQuEdOg&s"
                                            alt="Uploaded Image" />
                                        <h1 className=' text-blue-700 font-semibold'>{patientdata?.detials?.patient?.first_name ?? 'N/A'} {patientdata?.detials?.patient?.last_name ?? 'N/A'}</h1>
                                        <h1 className=' font-semibold text-xs'>9605942261</h1>
                                        <h1 className=' font-semibold text-xs'>Weight : {patientdata?.detials?.patient?.weight ?? 'N/A'}</h1>
                                        <h1 className=' font-semibold text-xs'>Height : {patientdata?.detials?.patient?.height ?? 'N/A'}</h1>
                                        <h1 className=' font-semibold text-xs'>Blood Group : {patientdata?.detials?.patient?.blood_group ?? 'N/A'}</h1>
                                        <p className='text-start text-slate-500 text-sm mt-1 ml-2'>Last Visit Details :</p>
                                        <p className='text-start text-slate-900 text-xs ml-2'>
                                            Date: {patientdata.prescription && patientdata.prescription[0] && new Date(patientdata.prescription[0].createdAt).toLocaleDateString() || 'N/A'}
                                        </p>

                                        <div className='h-24 w-64 ml-1 pl-2 border-2 bg-slate-100 mt-2'>
                                            <p className=' text-start text-xs text-slate-600'>Observation :  {patientdata?.prescription && patientdata.prescription.length > 0
                                                ? patientdata.prescription[0].observation ?? ' N/A'
                                                : 'N/A'} </p>
                                            <p className='text-xs text-start text-slate-600'>
                                                Tablets:
                                                {patientdata?.prescription?.length > 0 && patientdata.prescription[0].tablets?.length > 0
                                                    ? patientdata.prescription[0].tablets.map((tablet, idx) => (
                                                        <p key={idx} className='text-xs text-slate-600'>
                                                            {idx + 1}.  {tablet.name}-{tablet.dosage} mg, ({tablet.time.join(',')}), {tablet.days}-D
                                                        </p>
                                                    )) : ' N/A'}
                                            </p>
                                            <p className=' text-start text-xs text-slate-600'>Tests :  {patientdata?.prescription && patientdata.prescription.length > 0
                                                ? patientdata.prescription[0].test ?? 'N/A'
                                                : 'N/A'} </p>

                                        </div>
                                        <div className='text-end mt-2'>
                                            <button className="bg-blue-500 py-1 text-white text-xs px-2 rounded hover:bg-blue-700">Test Report</button>
                                            <button onClick={morep} className=" ml-2 bg-blue-500 py-1 text-white text-xs px-2 rounded hover:bg-blue-700">More</button>
                                        </div>
                                    </div>
                                    <div className='ml-4 w-2/3'>
                                        <p className='text-sm font-semibold m-1'>
                                            Observation:
                                        </p>
                                        <textarea
                                            value={observation}
                                            onChange={e => setObservation(e.target.value)}
                                            className="text-sm w-full px-4 py-1.5 h-20 outline-none border bg-blue-50 rounded"
                                            placeholder="Observation">
                                        </textarea>
                                        <p className='text-xs font-semibold'>Any Tests :</p>
                                        <input className="m-1 text-sm w-full px-4 py-1 outline-none border bg-blue-50 rounded"
                                            type="text"
                                            placeholder="Test Name"
                                            value={test}
                                            onChange={(e) => setTest(e.target.value)} /><hr className='mt-1' />
                                        <p className='text-sm font-semibold m-1'>Add Tablet :</p>
                                        <input className="mt-2 text-sm w-full px-4 py-1 outline-none border bg-blue-50 rounded"
                                            type="text"
                                            placeholder="Tablet name"
                                            value={addtablate}
                                            onChange={(e) => setAddtablate(e.target.value)} />
                                        <p className='text-sm font-semibold m-1'>Time :</p>
                                        <div className="flex space-x-4">
                                            <label className="flex items-center text-xs font-semibold ml-2 mt-1">
                                                <input type="checkbox" className="mr-2" value="morning"
                                                    checked={time.includes('morning')}
                                                    onChange={handleCheckboxChange} />
                                                Morning
                                            </label>
                                            <label className="flex items-center text-xs font-semibold">
                                                <input type="checkbox" className="mr-2" value="noon"
                                                    checked={time.includes('noon')}
                                                    onChange={handleCheckboxChange} />
                                                Noon
                                            </label>
                                            <label className="flex items-center text-xs font-semibold">
                                                <input type="checkbox" className="mr-2" value="afternoon"
                                                    checked={time.includes('afternoon')}
                                                    onChange={handleCheckboxChange} />
                                                Afternoon
                                            </label>
                                            <label className="flex items-center text-xs font-semibold">
                                                <input type="checkbox" className="mr-2" name="time"
                                                    value="night"
                                                    checked={time.includes('night')}
                                                    onChange={handleCheckboxChange} />Night
                                            </label>
                                        </div>
                                        <div className="flex justify-between items-center space-x-2 mt-4">
                                            <p className='text-sm font-semibold m-1'>Days:</p>
                                            <input className="text-sm w-16 px-2 py-1 outline-none border bg-blue-50 rounded"
                                                type="number"
                                                value={days}
                                                onChange={(e) => setDays(e.target.value)}
                                                placeholder="Days" />
                                            <p className='text-sm font-semibold m-1 ml-3'>Dosage :</p>
                                            <input className="text-sm w-16 px-2 py-1 outline-none border bg-blue-50 rounded"
                                                type="number"
                                                value={dosage}
                                                onChange={(e) => setDosage(e.target.value)}
                                                placeholder="in mg"
                                            /><p className='text-sm'> mg</p>
                                            <button className="bg-blue-500 py-1  text-white text-xs px-2 rounded hover:bg-blue-700"
                                                type="button"
                                                onClick={addTablet}>
                                                Add
                                            </button>
                                        </div><hr className='mt-1' />
                                        <div className="mt-2 flex justify-end font-semibold text-sm">

                                        </div>
                                        <div className="mt-1 flex justify-end font-semibold text-sm">
                                            <button
                                                className="bg-green-500 py-1 text-white text-xs px-2 rounded hover:bg-green-700"
                                                type="button"
                                                onClick={addprescription}>
                                                Submit
                                            </button>
                                        </div>
                                        <h3 className='text-xs mt-1'>Added Tablets:</h3>
                                        <ul>
                                            {tablets.map((tablet, index) => (
                                                <li key={index} className='flex items-center justify-between bg-blue-50 p-2 rounded mt-1'>
                                                    <p className='text-xs'><strong>{index + 1}.</strong> {tablet.name}-{tablet.dosage}mg ({tablet.time.join(', ')}) - Days: {tablet.days}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            }
            {moreprescription &&
                <>
                    <div className=" flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-72 my-6 mx-auto max-w-3xl">
                            <div className="mt-14 lg:ml- rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-1 ">
                                    <h3 className=" font-semibold">

                                    </h3>
                                    <button onClick={morep}>
                                        <RxCross2 className="w-5 h-5 m-1" />
                                    </button>
                                </div><hr />
                                <div className="mt-3 mb-5 relative px-3 flex-auto">
                                    <div className='h-full bg-slate-100 px-2 w-60 ml-3 border-2 '>
                                        {patientdata.prescription.map((presc, index) => (
                                            <div key={index}>
                                                <p className="text-start text-slate-900 text-xs ml-2 mt-1 mb-1 font-semibold underline">
                                                                Date: {presc.createdAt ? new Date(presc.createdAt).toLocaleDateString() : 'N/A'}
                                                            </p>
                                                <p className='text-xs text-slate-600'>Observation: {presc.observation}</p>
                                                <p className='text-xs text-slate-600'>Tablets:</p>
                                                <ul>
                                                    {presc.tablets.map((tablet, idx) => (
                                                        <li key={idx} className="text-xs text-slate-600"> 
                                                            <strong>{idx+1}.</strong> {tablet.name}-{tablet.dosage} mg, Time: {tablet.time.join(', ')}, Days: {tablet.days}
                                                        </li>
                                                    ))}
                                                </ul>

                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            }
            {absentAppointment && (
                    <div
                        className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
                        <div className="relative mx-3 p-4 w-full max-w-md md:h-auto bg-white rounded-lg shadow dark:bg-white">
                            < button className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={showModal} ><IoMdClose className='w-6 h-6 font-bold' />
                            </button>
                            <div className="p-4 text-center">
                                <MdPendingActions className='text-gray-400 dark:text-green-500 w-11 h-11 mb-3.5 mx-auto' />
                                <p className="mb-4 text-gray-600 dark:text-gray-600">Are you sure you want to Pending Appointment?</p>
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
    );
};

export default DashboardLayout;
