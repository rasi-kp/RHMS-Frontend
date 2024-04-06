import React from 'react'
import { IoDocuments } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { FaUsers } from "react-icons/fa";


function recentactivity() {
  return (
    <div className='w-full md:w-96 lg:ml-14 xl:ml-10  lg:me-2 mt-3   '>
      <div className='bg-white ml-7 me-6 mt-1 h-56 rounded-lg'>
        <h1 className='text-xs pt-2 pl-4 font-semibold'>Recent Activity </h1>
        <div className="flex px-4 pt-3 items-center justify-between">
          <div className='flex items-center'>
            <IoDocuments className='w-5 h-5 ml-1 me-2 text-slate-500' />
            <div className='flex flex-col'>
              <h1 className=' text-slate-600  px-2 text-xs'>New Appointment</h1>
              <h1 className=' text-red-600 px-2 text-xs'>Rasi</h1>
            </div>
          </div>
          <button className='bg-[#3497F9]  text-white text-xs rounded-xl px-2 p-1.5'>More Details</button>
        </div>
        <hr className='mt-2 mx-3' />
        <div className="flex px-4 pt-3 items-center justify-between">
          <div className='flex items-center'>
            <MdOutlinePayment className='w-5 h-5 ml-1 me-2 text-slate-500' />
            <div className='flex flex-col'>
              <h1 className=' text-slate-600  px-2 text-xs'>Fee payment</h1>
              <h1 className=' text-red-600 px-2 text-xs'>Rasi</h1>
            </div>
          </div>
          <button className='bg-[#3497F9]  text-white text-xs rounded-xl px-2 p-1.5'>More Details</button>
        </div>
        <hr className='mt-2 mx-3' />
        <div className="flex px-4 pt-3 items-center justify-between">
          <div className='flex items-center'>
            <FaUsers className='w-5 h-5 ml-1 me-2 text-slate-500' />
            <div className='flex flex-col'>
              <h1 className=' text-slate-600  px-2 text-xs'>New Member Added</h1>
              <h1 className=' text-red-600 px-2 text-xs'>Rasi</h1>
            </div>
          </div>
          <button className='bg-[#3497F9]  text-white text-xs rounded-xl px-2 p-1.5'>More Details</button>
        </div>
        <hr className='mt-2 mx-3' />
      </div>
    </div>
  )
}

export default recentactivity
