import React from 'react'

import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { MdModeEditOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import {
    Card,
    Typography,
    CardBody,
} from "@material-tailwind/react";
const TABLE_HEAD = ["Member Name", "Gender", "Blood Group", "Age", "Weight", "Height", "Action"];

const TABLE_ROWS = [
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
        name: "John Michael",
        gender: "male",
        bloodgroup: "B+",
        online: true,
        age: 22,
        height: 175,
        weight: 59,
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
        name: "John Michael",
        gender: "male",
        bloodgroup: "B+",
        online: true,
        age: 22,
        height: 175,
        weight: 59,
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
        name: "John Michael",
        gender: "male",
        bloodgroup: "B+",
        online: true,
        age: 22,
        height: 175,
        weight: 59,
    },

];
function patientcom() {
  return (
    <div>
      <div className='lg:ml-60 ml-6 me-8 rounded-lg bg-white  px-5 h-full pb-10 pt-3'>
                    <h1 className='absolute font-semibold text-xs pt-4 pl-3 underline underline-offset-8 decoration-blue-500'>Patient Info</h1>
                    <div className=' justify-end flex'>
                        <button className=' bg-[#3497F9]  text-white text-xs rounded-xl px-2 p-1.5'>Add Member</button>
                    </div>
                    <hr className='mt-2 ' />
                    <input
                        type="text"
                        className=" pl-4 ml-5 w-32 h-6 mt-3 rounded-full bg-[#E2F1FF] outline-none "
                        placeholder="Search" />
                    <CardBody className=" overflow-x-hidden mt-3 px-2 pt-0">
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
                                {TABLE_ROWS.map(
                                    ({ img, name, age, bloodgroup, height, weight, gender }, index) => {
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
                                                        <Typography className="pl-8 font-semibold text-xs text-slate-500" >
                                                            {bloodgroup}
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
                                                        <button className="border border-red-500 rounded-lg p-1 flex items-center justify-center">
                                                            <RxCross2 className="w-3 h-3 text-red-500" />
                                                        </button>
                                                        <button className="ml-3 border border-blue-500 rounded-lg p-1 flex items-center justify-center">
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
