import React, { useEffect, useState } from 'react'

import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { MdModeEditOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import {
    Card,
    Typography,
    CardBody,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import { Bounce, ToastContainer, Zoom, toast } from 'react-toastify';
import { BASE_URL } from '../../../apiconfig';
import AddUser from './addpatient';
import Edit from './editpatient';
import man from '../../images/profile.png';
import image from '../../images/right-arrow.gif'
import user from '../../images/user.gif'
import girl from '../../images/girl.jpg';

import { deleteuser, allpatient } from "../../../services/patient";

const TABLE_HEAD = ["Member Name", "Gender", "Blood Group", "Age", "Weight", "Height", "Action"];

function Patientcom() {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const [adduser, setAdduser] = useState(false)
    const [useredit, setUseredit] = useState(false)
    const [userdata, setUserData] = useState([])
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1);
    const [Editpatient, setEditedPatientId] = useState(null)
    const [flag, setFlag] = useState(false)
    const [available, setavailable] = useState(false)
    const [totalPages, setTotalPages] = useState(1);

    const addpatient = () => {
        setAdduser(!adduser)
    }
    const editpatient = () => {
        setUseredit(!useredit)
    }

    useEffect(() => {
        const fetchData = async () => {
            const datas = await dispatch(allpatient(page, search, token));
            setUserData(datas.data);
            setTotalPages(datas.totalPages);
            if (datas.data.length === 0) {
                setavailable(true)
            }
        };
        fetchData();
    }, [adduser, page, search, flag, useredit]);

    const handleDelete = async (patientid) => {
        if (window.confirm('Are you sure you want to delete this patient?')) {
            try {
                await dispatch(deleteuser(patientid, token));
                setFlag(!flag);
            } catch (error) {
                toast.error("Failed to delete user");
            }
        }
    }
    const handleEdit = (patientid) => {
        setEditedPatientId(patientid);
        setUseredit(true)
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
            <div className='lg:ml-60 ml-6 me-8 rounded-lg bg-white  px-5 h-full pb-10 pt-3'>
                <h1 className='absolute font-semibold text-xs pt-4 pl-3 underline underline-offset-8 decoration-blue-500'>Patient Info</h1>
                <div className=' justify-end flex'>
                    <button className='bg-[#3497F9]  text-white text-xs rounded-xl px-2 p-1.5 hover:bg-blue-600' onClick={addpatient}>Add Member</button>
                </div>
                <hr className='mt-2 ' />
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className=" pl-4 ml-5 w-32 h-6 mt-3 rounded-full bg-[#E2F1FF] outline-none "
                    placeholder="Search" />
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
                                                {index !== TABLE_HEAD.length && (
                                                    <ChevronUpDownIcon strokeWidth={2} className="h-3 w-3" />
                                                )}

                                            </Typography>

                                        </th>
                                    ))}
                                </tr>

                            </thead>
                            <tbody>
                                {userdata.map(
                                    ({ img, patient_id, first_name, last_name, age, blood_group, height, weight, gender }, index) => {
                                        const isLast = index === userdata.length - 1;
                                        const classes = isLast ? "pl-3 border-b border-blue-gray-50" : "pl-3 border-b border-blue-gray-50";
                                        return (
                                            <tr key={patient_id} className=' h-12'>
                                                <td className={classes} >
                                                    <div className="flex items-center ">
                                                        {gender == 'male' ? (<img src={man} alt={first_name} className="w-7 h-7 rounded-full mr-2" />) : (<img src={girl} alt={first_name} className="w-7 h-7 rounded-full mr-2" />)}
                                                        <Typography className="font-semibold text-xs pb-2 pl-0 text-slate-500">{first_name} {last_name}</Typography>
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
                                                        <Typography className="pl-8 font-semibold text-xs text-slate-500" >
                                                            {blood_group}
                                                        </Typography>
                                                    </div>
                                                </td>

                                                <td className={classes}>
                                                    <div className="flex items-center">
                                                        <Typography className="pl-3 font-semibold text-xs text-slate-500" >
                                                            {age}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="flex items-center">
                                                        <Typography className="pl-4 font-semibold text-xs text-slate-500" >
                                                            {weight}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="flex items-center">
                                                        <Typography className="pl-4 font-semibold text-xs text-slate-500" >
                                                            {height}
                                                        </Typography>
                                                    </div>

                                                </td>
                                                <td className={classes}>
                                                    <div className="flex items-center">
                                                        <button className="border border-red-500 rounded-lg p-1 flex items-center justify-center"
                                                            onClick={() => handleDelete(patient_id)}>
                                                            <RxCross2 className="w-3 h-3 text-red-500" />
                                                        </button>
                                                        <button className="ml-3 border border-blue-500 rounded-lg p-1 flex items-center justify-center"
                                                            onClick={() => handleEdit(patient_id)}>
                                                            <MdModeEditOutline className="w-3 h-3 text-blue-500" />
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
                {available && (
                    <div className="flex flex-col md:flex-row justify-center items-center">
                        <div className="flex justify-center w-full md:w-1/2">
                            <img src={user} alt="No appointments available" className="w-32 h-32 " />
                            {/* <img src={image} alt="No appointments available" className="w-32 h-32 " /> */}
                        </div>
                        <div className="flex flex-col items-center w-full md:w-1/2">
                            <h1 className="cursor-default text-center font-semibold text-xl text-red-500">
                                No Members are there
                            </h1>
                            <div className='flex'>
                                <h1 onClick={addpatient} className="cursor-pointer text-center font-semibold mt-2 text-md text-blue-500">
                                    Add New Member
                                </h1>
                                <img src={image} onClick={addpatient} alt="" className="w-9 h-9 cursor-pointer" />
                            </div>
                        </div>
                    </div>
                )}
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
            </div>
            {adduser && <AddUser closeModal={addpatient} />}

            {useredit && <Edit closeModal={editpatient} patientid={Editpatient} />}
            <ToastContainer />
        </div>
    )
}

export default Patientcom
