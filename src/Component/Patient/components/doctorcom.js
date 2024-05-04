import React, { useEffect, useState } from 'react'

import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { AiFillMessage } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, CardBody } from "@material-tailwind/react";
import { CiSearch } from 'react-icons/ci';
import { RxCross2 } from "react-icons/rx";
import { alldoctor, allpatient } from "../../../services/patient";
import Chat from '../../Patient/components/chat';
const BASE_URL = require('../../../apiconfig').BASE_URL;

const TABLE_HEAD = ["Doctor Name", "Gender", "Qualification", "Specialitation", "Action"];
const specializations = ['gynecologist', 'Dermatology', 'Neurologist', 'Associate consultant', 'Emergency Medicine', 'General physician', 'genral', 'Anaesthesiology', 'Psychiatry'];
function Doctor() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const user = useSelector(state => state.auth.user);
    const role = useSelector(state => state.auth.role);
    const [addappointment, setAddappointment] = useState(false);
    const [chat, setChat] = useState(false)
    const [selectedSpecialization, setSelectedSpecialization] = useState('');

    const [patientid, setPatientid] = useState('')
    const [doctorid, setDoctorid] = useState('')
    const [doctoridm, setDoctoridm] = useState('')
    const [data, setData] = useState([])
    const [doctordata, setDoctordata] = useState([])
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const data = await dispatch(alldoctor(page, search, selectedSpecialization, token));
            setDoctordata(data.data);
            setTotalPages(data.totalPages)
        };
        fetchData();
    }, [page, search, selectedSpecialization]);

    const submit = () => {
        if (patientid == '') {
            return toast.error("Please Select Patient !!!")
        }
        navigate('/patient/token', { state: { patientid, doctorid } })
    }

    const handleSpecializationChange = (event) => {
        setSelectedSpecialization(event.target.value);
    };
    const handleAppointment = async (doctorid) => {
        setAddappointment(true)
        setDoctorid(doctorid)
        dispatch(allpatient(1, '', token))
            .then(Data => {
                setData(Data.data);
            })
    }
    const handleMessage = async (doctorid) => {
        setDoctoridm(doctorid)
        setChat(!chat)
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
        <div>
            <div className='lg:ml-60 md:ml-6 ml-3 me-3 md:me-8 rounded-lg bg-white  px-5 h-full pb-10 pt-3'>
                <h1 className='absolute font-semibold text-xs pt-4 pl-3 underline underline-offset-8 decoration-blue-500'>Doctor Info</h1>

                <hr className='mt-9 ' />
                <div className='flex'>
                    <div className="relative">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            className="ml-3 pl-8 w-32 h-6 text-xs mt-3 rounded-full bg-[#E2F1FF] outline-none"
                            placeholder="Search"
                        />
                        <CiSearch className="absolute mt-2 left-5 top-2" /> {/* Assuming CiSearch is an icon component */}
                    </div>
                    <div className="relative">
                        <select
                            className="ml-3 md:ml-10 pl-7 w-32 md:w-44 h-6 text-slate-500 text-xs mt-3 rounded-full bg-[#E2F1FF] outline-none"
                            value={selectedSpecialization}
                            onChange={handleSpecializationChange}>
                            <option value="">Search by specialization</option>
                            {specializations.map((specialization) => (
                                <option key={specialization} value={specialization}>
                                    {specialization}
                                </option>
                            ))}
                        </select>
                        <CiSearch className="absolute mt-2 left-5 md:left-12 top-2" />
                    </div>
                </div>
                <CardBody className=" overflow-x-hidden mt-3 px-2 pt-0">
                    <div className="overflow-x-auto">
                        <table className=" w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head, index) => (
                                        <th
                                            key={head}
                                            className="cursor-pointer p-2 pl-4 pb-3 border-b-2 border-blue-gray-50" >
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
                                {doctordata.map(
                                    ({ image, doctor_id, first_name, last_name, gender, qualification, specialization, isActive }, index) => {
                                        const isLast = index === doctordata.length - 1;
                                        const classes = isLast ? "pl-3 border-b border-blue-gray-50" : "pl-3 border-b border-blue-gray-50";
                                        return (
                                            <tr key={doctor_id} className=' h-12'>
                                                <td className={classes} >
                                                    <div className="flex items-center ">
                                                        <img src={`${BASE_URL}/doctors/${image}`} alt={first_name} className="w-7 h-7 rounded-full mr-2" />
                                                        <Typography className="font-semibold text-xs pb-2 pl-0 text-slate-500">{first_name}</Typography>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="flex items-center p-3">
                                                        <Typography className=" font-semibold text-xs text-slate-500" >
                                                            {gender}
                                                        </Typography>
                                                    </div>
                                                </td>


                                                <td className={classes}>
                                                    <div className="flex items-center">
                                                        <Typography className="pl-5 font-semibold text-xs text-slate-500" >
                                                            {qualification}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="flex items-center">
                                                        <Typography className="pl-3 font-semibold text-xs text-slate-500" >
                                                            {specialization}
                                                        </Typography>
                                                    </div>
                                                </td>

                                                <td className={classes}>
                                                    <div className="flex items-center">
                                                        <button className="border border-blue-500 rounded-lg p-1 flex items-center justify-center" title='Message'
                                                            onClick={() => handleMessage(doctor_id)}>
                                                            <AiFillMessage className="w-4 h-4 text-blue-500" />
                                                        </button>
                                                        <button className="ml-3  border text-xs bg-green-600 text-white rounded-lg p-1.5 hover:bg-green-800"
                                                            onClick={() => handleAppointment(doctor_id)}>Take an Appointment
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
                <div className="mt-5 flex justify-end items-center">
                    <div>
                        <button
                            className="mr-1 hover:bg-blue-400 hover:text-white text-blue-600 text-xs py-1 px-2 rounded-md"
                            onClick={handlePrevClick}
                            disabled={page === 1} // Disable Prev button on first page
                        >
                            Prev
                        </button>
                    </div>
                    <div>
                        {renderPaginationButtons()}
                    </div>
                    <div>
                        <button
                            className="ml- hover:bg-blue-400 hover:text-white text-blue-600 text-xs py-1 px-2 rounded-md"
                            onClick={handleNextClick}
                            disabled={page === totalPages} >
                            Next
                        </button>
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
                {chat && <Chat senderId={user.id} role={role} receiverId={doctoridm} closeChat={handleMessage} />}
            </div>
            <ToastContainer />
        </div>
    )
}

export default Doctor
