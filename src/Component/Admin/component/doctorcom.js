import React, { useEffect, useState } from 'react'

import image from '../../images/profile.png'

import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { MdBlock } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { TbLockOpen } from "react-icons/tb";
import { ToastContainer, toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import {
    Card,
    Typography,
    CardBody,
} from "@material-tailwind/react";
import { CiSearch } from 'react-icons/ci';
import { alldoctor, deletedoctor, blockdoctor, unblockdoctor } from "../../../services/admin";
import AddDoctor from './adddoctor';
const BASE_URL = require('../../../apiconfig').BASE_URL;

const TABLE_HEAD = ["Doctor Name", "Gender", "Qualification", "Specialitation", "Action"];

function Doctor() {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const [adddoctor, setAdddoctor] = useState(false)
    const [doctordata, setDoctordata] = useState([])
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1);
    const [flag, setFlag] = useState(false)
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const data = await dispatch(alldoctor(page,search, token));
            setDoctordata(data.data);
            setTotalPages(data.totalPages)
        };
        fetchData();
    }, [adddoctor, page, search, flag]);

    const adddoctorf = () => {
        setAdddoctor(!adddoctor)
    }
    const handleDelete = async (doctorid) => {
        if (window.confirm('Are you sure you want to delete this Doctor?')) {
            try {
                await dispatch(deletedoctor(doctorid, token));
                setFlag(!flag);
            } catch (error) {
                toast.error("Failed to delete user");
            }
        }
    }
    const handleBlock = async (doctorid) => {
        if (window.confirm('Are you want to Block Doctor')) {
            try {
                await dispatch(blockdoctor(doctorid, token));
                setFlag(!flag);
            } catch (error) {
                toast.error("Failed to delete user");
            }
        }
    }
    const handleUnblock = async (doctorid) => {
        await dispatch(unblockdoctor(doctorid, token));
        setFlag(!flag);
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

                <div className=' justify-end flex'>
                    <button className='bg-[#3497F9]  text-white text-xs rounded-xl px-2 p-1.5 hover:bg-blue-600' onClick={adddoctorf}>Add Doctor</button>
                </div>
                <hr className='mt-9 ' />
                <div className='flex'>
                    <div className="relative">
                        <input
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                            type="text"
                            className="ml-3 pl-8 w-32 h-6 text-xs mt-3 rounded-full bg-[#E2F1FF] outline-none"
                            placeholder="Search"
                        />
                        <CiSearch className="absolute mt-2 left-5 top-2" /> {/* Assuming CiSearch is an icon component */}
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            className="ml-3 md:ml-10 pl-8 w-32 md:w-44 h-6 text-xs mt-3 rounded-full bg-[#E2F1FF] outline-none"
                            placeholder="Search by specialization"
                        />
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
                                                        <button className="border border-red-500 rounded-lg p-1 flex items-center justify-center" title='Delete'
                                                            onClick={() => handleDelete(doctor_id)}>
                                                            <RxCross2 className="w-3 h-3 text-red-500" />
                                                        </button>
                                                        <button className="ml-3 border border-blue-500 rounded-lg p-1 flex items-center justify-center" title={isActive ? "Block" : "Unblock"}
                                                            onClick={() => isActive ? handleBlock(doctor_id) : handleUnblock(doctor_id)}>
                                                            {isActive ? (
                                                                <MdBlock className="w-3 h-3 text-blue-500" />
                                                            ) : (
                                                                <TbLockOpen className='w-3 h-3 text-blue-500' />
                                                            )}
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
            </div>
            {adddoctor && <AddDoctor closeModal={adddoctorf} />}
            <ToastContainer />
        </div>
    )
}

export default Doctor
