import React from 'react'

import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { MdModeEditOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { IoChatbubble } from "react-icons/io5";

import {
    Card,
    Typography,
    CardBody,
} from "@material-tailwind/react";
import { CiSearch } from 'react-icons/ci';
const TABLE_HEAD = ["Doctor Name", "Gender", "Qualification", "Specialitation", ""];

const TABLE_ROWS = [
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
        name: "John Michael",
        gender: "male",
        qualification: "MBBS",
        specialitation: "cardiolagyst"
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
        name: "John Michael",
        gender: "male",
        bloodgroup: "B+",
        qualification: "MBBS",
        specialitation: "neuroligist"
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
        name: "John Michael",
        gender: "Female",
        qualification: "MBBS",
        specialitation: "gynecologist"
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
        name: "John Michael",
        gender: "Female",
        qualification: "MBBS",
        specialitation: "generic medicine"
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
        name: "John Michael",
        gender: "male",
        qualification: "MBBS",
        specialitation: "cardiolagyst"
    },

];
function patientcom() {
    return (
        <div>
            <div className='lg:ml-60 ml-6 me-8 rounded-lg bg-white  px-5 h-full pb-10 pt-3'>
                <h1 className='absolute font-semibold text-xs pt-4 pl-3 underline underline-offset-8 decoration-blue-500'>Doctor Info</h1>
                {/* <div className=' justify-end flex'>
                        <button className=' bg-[#3497F9]  text-white text-xs rounded-xl px-2 p-1.5'>Add Member</button>
                    </div> */}
                <hr className='mt-9 ' />
                <div className='flex'>
                    <div className="relative">
                        <input
                            type="text"
                            className="ml-3 pl-8 w-32 h-6 text-xs mt-3 rounded-full bg-[#E2F1FF] outline-none"
                            placeholder="Search"
                        />
                        <CiSearch className="absolute mt-2 left-5 top-2" /> {/* Assuming CiSearch is an icon component */}
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            className="ml-10 pl-8 w-32 md:w-44 h-6 text-xs mt-3 rounded-full bg-[#E2F1FF] outline-none"
                            placeholder="Search by specialization"
                        />
                        <CiSearch className="absolute mt-2 left-12 top-2" />
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
                                {TABLE_ROWS.map(
                                    ({ img, name, gender, qualification, specialitation }, index) => {
                                        const isLast = index === TABLE_ROWS.length - 1;
                                        const classes = isLast ? "pl-3 border-b border-blue-gray-50" : "pl-3 border-b border-blue-gray-50";
                                        return (
                                            <tr key={name} className=' h-12'>
                                                <td className={classes} >
                                                    <div className="flex items-center ">
                                                        <img src={img} alt={name} className="w-7 h-7 rounded-full mr-2" />
                                                        <Typography className="font-semibold text-xs pb-2 pl-0 text-slate-500">{name}</Typography>
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
                                                            {specialitation}
                                                        </Typography>
                                                    </div>
                                                </td>

                                                <td className={classes}>
                                                    <div className="flex items-center">
                                                        <button className="border bg-blue-500 rounded-lg p-1.5 flex items-center justify-center">
                                                            <IoChatbubble className="w-3 h-3 text-white" />
                                                        </button>
                                                        <button className='ml-2 bg-green-600  text-white text-xs rounded-md px-2 p-1'>Take Appointment</button>

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
        </div>
    )
}

export default patientcom
