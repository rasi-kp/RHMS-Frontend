import React, { useEffect, useState } from 'react'

import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Card, Typography, CardBody, } from "@material-tailwind/react";

import image from '../../images/download.png'
import man from '../../images/profile.png'
import girl from '../../images/girl.jpg'
import { Link } from 'react-router-dom';

const TABLE_HEAD = ["Time", "Date", "Patient", "Doctor"];

function Appointments({ appointment }) {
    const [available, setAvailable] = useState(false)
    useEffect(() => {
        if (appointment.length === 0) {
            setAvailable(true);
        } else {
            setAvailable(false);
        }
    }, [appointment]);
    return (
        <div className='bg-white ml-6 lg:ml-2 me-6 lg:me-8 mt-1 h-56 rounded-lg'>
            <Card className="h-full w-full">
                <div className='flex p-2 pl-5 pb-4'>
                    <h5 className='text-xs font-semibold cursor-default underline underline-offset-8 pr-3 '>Upcoming Appointments</h5>
                    {/* <h5 className='text-xs font-semibold cursor-pointer pr-3 underline underline-offset-8 decoration-blue-700 hover:font-bold'>Upcoming Appointments</h5> */}
                    {/* <h1 className='text-xs cursor-pointer hover:font-bold'>Completed Appointments</h1> */}
                </div>

                <CardBody className=" overflow-x-hidden px-3 pt-0">
                {available ? (
                        <div className="flex flex-col md:flex-row justify-center items-center">
                            <div className="flex justify-center w-full md:w-1/2">
                                <img src={image} alt="No appointments available" className="max-w-full h-auto" />
                            </div>
                            <div className="flex flex-col items-center w-full md:w-1/2">
                                <h1 className="cursor-default text-center font-semibold text-xl text-red-500">
                                    No Upcoming Appointments
                                </h1>
                                <Link to="/patient/appointments">
                                    <h1 className="cursor-pointer text-center font-semibold mt-2 text-md text-blue-500">
                                        Take New Appointment
                                    </h1>
                                </Link>
                            </div>
                            
                        </div>
                    ):(
                    <table className=" w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head, index) => (
                                    <th
                                        key={head}
                                        className="cursor-default p-2 pl-4 " >
                                        <Typography className=" flex gap-2 text-xs font-semibold leading-none ">
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
                            {appointment.map(
                                ({ img, appointment_id, time, doctor, patient, date }, index) => {
                                    const isLast = index === appointment.length - 1;
                                    const classes = isLast ? "pl-3" : "pl-3 border-b border-blue-gray-50";
                                    return (
                                        <tr key={appointment_id}>
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
                                                    {patient.gender == 'male' ? (<img src={man} alt={patient.first_name} className="w-7 h-7 rounded-full mr-2" />) : (<img src={girl} alt={patient.first_name} className="w-7 h-7 rounded-full mr-2" />)}
                                                    <Typography className="font-semibold text-xs pb-2 pl-0 text-slate-500">{patient.first_name} {patient.last_name}</Typography> {/* Name */}
                                                </div>
                                            </td>

                                            <td className={classes}>
                                                <div className="flex items-center">
                                                    <Typography className="font-semibold text-xs text-slate-500" >
                                                        {doctor.first_name} {doctor.last_name}
                                                    </Typography>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                },
                            )}
                        </tbody>
                    </table>
                )}                    
                </CardBody>
            </Card>
        </div>
    )
}

export default Appointments
