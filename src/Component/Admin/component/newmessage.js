import React from 'react'
import { IoDocuments } from "react-icons/io5";
import { MdSubscriptions } from "react-icons/md";
import { RiMessage2Fill } from "react-icons/ri";
import { MdBloodtype } from "react-icons/md";
import { LiaHospitalAltSolid } from "react-icons/lia";
import { FaUsers } from "react-icons/fa";

function Newmessage() {
    return (
        <div className='w-full lg:ml-52 md:w-96 '>
            <div className='bg-white ml-7 me-6 mt-4 h-56 rounded-lg'>

                {/* <div className="w-2/4 flex flex-col"> */}
                    {/* <h1 className='absolute pl-3 pt-2 font-semibold text-xs hidden lg:block'>Report</h1> */}
                    <h1 className='text-xs pt-2 pl-4 font-semibold'>New Messages </h1>
                    <div className="flex px-4 pt-3 items-center justify-between">
                        <div className='flex items-center'>
                            <RiMessage2Fill className='w-5 h-5 ml-1 me-2 text-slate-500' />
                            <div className='flex flex-col'>
                                <h1 className=' text-slate-600  px-2 text-xs'>Rasi</h1>
                                <h1 className=' text-red-600 px-2 text-xs'>Hai</h1>
                            </div>
                        </div>
                        <button className='bg-[#3497F9]  text-white text-xs rounded-xl px-2 p-1.5'>Replay</button>
                    </div>
                    <hr className='mt-2 mx-3' />
                    <div className="flex px-4 pt-3 items-center justify-between">
                        <div className='flex items-center'>
                            <RiMessage2Fill className='w-5 h-5 ml-1 me-2 text-slate-500' />
                            <div className='flex flex-col'>
                                <h1 className=' text-slate-600  px-2 text-xs'>Akash KV</h1>
                                <h1 className=' text-red-600 px-2 text-xs'>How are you</h1>
                            </div>
                        </div>
                        <button className='bg-[#3497F9]  text-white text-xs rounded-xl px-2 p-1.5'>Replay</button>
                    </div>
                    <hr className='mt-2 mx-3' />
                    <div className="flex px-4 pt-3 items-center justify-between">
                        <div className='flex items-center'>
                            <RiMessage2Fill className='w-5 h-5 ml-1 me-2 text-slate-500' />
                            <div className='flex flex-col'>
                                <h1 className=' text-slate-600  px-2 text-xs'>Kiran </h1>
                                <h1 className=' text-red-600 px-2 text-xs'>hello</h1>
                            </div>
                        </div>
                        <button className='bg-[#3497F9]  text-white text-xs rounded-xl px-2 p-1.5'>Replay</button>
                    </div>
                    <hr className='mt-2 mx-3' />
                {/* </div> */}
                
            </div>
        </div>
    )
}

export default Newmessage
