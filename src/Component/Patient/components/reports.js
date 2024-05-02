import React from 'react'
import { IoDocuments } from "react-icons/io5";
import { MdSubscriptions } from "react-icons/md";
import { MdBloodtype } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

function Reports({appcount,memcount,subscription}) {
    return (
        <div className='w-full lg:ml-52 md:w-96 '>
            <div className='bg-white ml-7 me-6 mt-1 h-56  flex rounded-lg'>

                <div className="w-2/4 flex flex-col">
                    {/* <h1 className='absolute pl-3 pt-2 font-semibold text-xs hidden lg:block'>Report</h1> */}
                    <h1 className='text-xs pt-2 pl-4 font-semibold'>Reports </h1>
                    <div className="h-full">
                        <div className='flex justify-center items-center mt-2 ml-4 me-2 h-20 rounded-xl bg-red-200'>
                            <div className="text-center justify-center">
                                <MdBloodtype className='w-7 h-7 ml-4 text-[#7F8F98]' />
                                <h1 className='text-sm font-bold'>B+</h1>
                                <h1 className='text-xs font-light'>Blood Group</h1> {/* Blood group */}
                            </div>
                        </div>
                    </div>

                    <div className="h-full">
                        <div className='flex items-center justify-center ml-4 me-2 h-20 rounded-xl bg-yellow-200'>
                            <div className="text-center justify-center">
                                <FaUsers className='w-7 h-7 ml-3 text-[#7F8F98]' />
                                <h1 className='text-sm font-bold'>{memcount}</h1>
                                <h1 className='text-xs font-light'>Members</h1> {/* Blood group */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-2/4 flex flex-col">
                    <div className="h-full ">
                        <div className='flex items-center mt-8 ml-2 me-4 h-20 rounded-xl justify-center bg-blue-200'>
                            <div className="text-center justify-center">
                                <IoDocuments className='w-6 h-6 ml-6 text-[#7F8F98]' />
                                <h1 className='text-sm font-bold'>{appcount}</h1>
                                <h1 className='text-xs font-light'>Appointments</h1> {/* Blood group */}
                            </div>
                        </div>
                    </div>
                    <div className="h-full">
                        <div className='flex items-center mt-3 ml-2 me-4 h-20 rounded-xl justify-center bg-green-200'>
                            <div className="text-center justify-center">
                                <MdSubscriptions className='w-6 h-7 ml-5 text-[#7F8F98]' />
                                <h1 className='text-sm font-bold'>{subscription ? "yes":"No"}</h1>
                                <h1 className='text-xs font-light'>Subscription</h1> {/* Blood group */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reports
