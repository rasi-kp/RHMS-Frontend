import React, { useEffect, useState } from 'react'

import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { FaBookMedical } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { Typography, CardBody, } from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import profile from '../../images/profile.png'
import { allpatient, getuserid } from "../../../services/doctor";
import Chat from '../../common/chat';
import Pagination from '../../common/Pagination';

const TABLE_HEAD = ["Member Name", "Gender", "Blood Group", "Age", "Weight", "Height", "Action"];

function Patientcom() {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const doctor = useSelector(state => state.auth.user);
    const role = useSelector(state => state.auth.role);
    const [chat, setChat] = useState(false)
    const [userdata, setUserData] = useState([])
    const [search, setSearch] = useState('')
    const [userid, setUserid] = useState('')
    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const print = () => {
    const elementToPrint = document.getElementById('elementToPrint');
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = elementToPrint.innerHTML;
    window.print();
    document.body.innerHTML = originalContent;
    }
    useEffect(() => {
        const fetchData = async () => {
            const datas = await dispatch(allpatient(page, search, token));
            setUserData(datas.data);
            setTotalPages(datas.totalPages);
        };
        fetchData();
    }, [page, search]);

    const handleMessage = async (patientid) => {
        const userid = await dispatch(getuserid(patientid, token));
        setUserid(userid.user.user_id);
        setChat(true)
    }
    const medicalhistory=()=>{

    }
    const setModal=()=>{
        setChat(!chat)
    }
    return (
        <div>
            <div id='elementToPrint' className='lg:ml-60 ml-6 me-8 rounded-lg bg-white  px-5 h-full pb-10 pt-3'>
                <h1 className='absolute font-semibold text-xs pt-4 pl-3 underline underline-offset-8 decoration-blue-500'>Patient Info</h1>
                <div className=' justify-end flex'>
                    <button className='bg-[#3497F9]  text-white text-xs rounded-xl px-2 p-1.5 hover:bg-blue-600' onClick={print}>Print</button>
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
                    <table  className=" w-full min-w-max table-auto text-left">
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
                                                    <img src={profile} alt={first_name} className="w-7 h-7 rounded-full mr-2" />
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
                                                    <button className="border border-blue-500 rounded-lg p-1 flex items-center justify-center" title='Message'
                                                        onClick={() => handleMessage(patient_id)}>
                                                        <AiFillMessage className="w-4 h-4 text-blue-500" />
                                                    </button>
                                                    <button className="border ml-2 border-green-500 rounded-lg p-1 flex items-center justify-center" title='Message'
                                                        onClick={() => medicalhistory(patient_id)}>
                                                        <FaBookMedical className="w-4 h-4 text-green-500" />
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
                <Pagination page={page} setPage={setPage} totalPages={totalPages} />
            </div>
            {chat && <Chat senderId={doctor.id} role={role} receiverId={userid} closeChat={setModal} />}
            <ToastContainer />
        </div>
    )
}

export default Patientcom
