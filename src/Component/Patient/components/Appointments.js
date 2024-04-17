import React from 'react'
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";

import {
    Card,
    Typography,
    CardBody,
} from "@material-tailwind/react";
const TABLE_HEAD = ["Time", "Date", "Patient", "Doctor"];

const TABLE_ROWS = [
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
        name: "John Michael",
        doctor: "Dr.Smith",
        time: "10:30 AM",
        online: true,
        date: "23/04/18",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
        name: "Alexa Liras",
        doctor: "Dr.Roopa S",
        time: "11:30 AM",
        online: false,
        date: "23/04/18",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
        name: "Laurent Perrier",
        doctor: "Dr.John Doe",
        time: "10:30 AM",
        online: false,
        date: "19/09/17",
    },

];
function Appointments() {
    return (
        <div className='bg-white ml-6 lg:ml-2 me-6 lg:me-8 mt-1 h-56 rounded-lg'>
            <Card className="h-full w-full">
                <div className='flex p-2 pl-5 pb-4'>
                    <h5 className='text-xs font-semibold cursor-pointer pr-3 underline underline-offset-8 decoration-blue-700 hover:font-bold'>Upcoming Appointments</h5>
                    <h1 className='text-xs cursor-pointer hover:font-bold'>Completed Appointments</h1>
                </div>

                <CardBody className=" overflow-x-hidden px-3 pt-0">
                    <table className=" w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head, index) => (
                                    <th
                                        key={head}
                                        className="cursor-pointer p-2 pl-4 " >
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
                                ({ img, name, time, doctor, date }, index) => {
                                    const isLast = index === TABLE_ROWS.length - 1;
                                    const classes = isLast ? "pl-3" : "pl-3 border-b border-blue-gray-50";
                                    return (
                                        <tr key={name}>
                                            <td className={classes}>
                                                <div className="flex items-center p-3">
                                                    <Typography className="font-semibold text-xs text-slate-500" >
                                                        {time}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex items-center ">
                                                    <Typography className="font-semibold text-xs text-slate-500" >
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
                                                    <Typography className="font-semibold text-xs text-slate-500" >
                                                        {doctor}
                                                    </Typography>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                },
                            )}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </div>
    )
}

export default Appointments
