import React, { useEffect, useRef, useState } from 'react';


import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import NavbarMobile from './components/NavbarMobile';
import man from '../images/profile.png'
import { RxCross2 } from "react-icons/rx";
import girl from '../images/girl.jpg'

import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { CiSearch } from "react-icons/ci";
import { LiaPrescriptionBottleAltSolid } from "react-icons/lia";
import { RiDownload2Fill } from "react-icons/ri";

import { Card, Typography, CardBody, } from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { completedappoinment, profiledit, profileview } from "../../services/patient";
import PrescriptionPage from './components/prescription';
import { ToastContainer, toast } from 'react-toastify';
import { BASE_URL } from '../../apiconfig';


const TABLE_HEAD = ["Time", "Date", "Patient Name", "Age", "Doctor", "Fee Status", "Action"];


const DashboardLayout = ({ children }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false)
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [dob, setDob] = useState("")
    const [gender, setGender] = useState("")
    const [image, setImage] = useState("")
    const [address,setAddress]=useState("")
    const [bg, setBg] = useState("")
    const [profiledata,setProfiledata]=useState('')
    const [error, setError] = useState("")
    const token = useSelector(state => state.auth.token);
    const [available, setAvailable] = useState(false)
    const [addappointment, setAddappointment] = useState(false);
    const [deleteAppointment, setDeleteappointment] = useState(false);
    const [appointmentid, setAppointmentid] = useState('')
    const [isOpen, setIsOpen] = useState(false);

    const [p, setp] = useState(false)
    const [search, setSearch] = useState('')
    const [date, setDate] = useState('')
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [allappointment, setAllappointment] = useState([])

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

    };
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    useEffect(() => {
        const fetchData = async () => {
            const data = await dispatch(profileview(token));
            setProfiledata(data);
            setImage(data.image)
            setFname(data.name)
            setLname(data.last_name)
            setDob(data.date_of_birth)
            setGender(data.gender)
            setBg(data.blood_group)
        };
        fetchData();
    }, []);

    const submit = (e) => {
        e.preventDefault()
        const isDateFormatValid = (dateString) => {
            const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
            return dateFormatRegex.test(dateString);
        };
        if (!fname.trim() || !image || !lname.trim() || !dob.trim() || !gender.trim() ) {
            toast.error("Fill All Field")
            setError('Fill Required Field');
            return;
        }
        if (!isDateFormatValid(dob)) {
            return toast.error("Invalied Date Format")
        }
        
        const formData = new FormData();

        formData.append('image', image); 
        formData.append('first_name', fname);
        formData.append('last_name', lname);
        formData.append('date_of_birth', dob);
        formData.append('gender', gender);
        formData.append('address', address);

        dispatch(profiledit(formData, token));
        setTimeout(() => {
            setEdit(false); // Close the modal by passing true
        }, 1000);
    };
    const closemodel = () => {
        setp(!p)
    }

    return (
        <div className='bg-[#E2F1FF] h-screen'>
            <NavbarMobile toggle={toggleSidebar} />
            <div>
                <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
                <h1 className='absolute lg:ml-52 p-7 pt-6 font-semibold hidden lg:block'>Profile</h1>
                <Navbar />
                <div className='flex h-full'>
                    <div className=' lg:ml-60 mt-1 ml-4 me-3 md:w-2/5'>
                        <div className=' bg-white w-full rounded-lg text-center justify-center mb-4 pb-4'>
                            <img className='pt-7 rounded-full p-2 ml-14 h-52 ' src={man} />
                            <h1 className=' font-semibold text-md'>{profiledata?.data.name}</h1>
                            <h1 className=' text-sm'>{profiledata?.data.phone_no}</h1>
                            <h1 className=' text-sm'>{profiledata?.data.email}</h1>
                        </div>
                        <div className=' bg-white w-full rounded-lg mt-2 text-center'>hello
                            <h1 >Rasi K P</h1>
                            <h1>9605942261</h1>
                            <h1>rasir239@gmail.com</h1>
                        </div>
                    </div>
                    <div className='bg-white lg:me-8 mt-1 h-full pb-5 rounded-lg md:w-3/4'>
                        <Card className="h-full w-full">
                            <div className='flex justify-end pt-3 pl-5 md:pe-5'>
                                <button onClick={e => setEdit(!edit)} className=' bg-[#3497F9] text-white text-sm rounded-md me-3 px-6 p-1'>Edit</button>
                            </div>
                            <div className="mt-1 mb-5 relative px-6 flex-auto">
                                <labal className="pt-1 text-slate-600">Address :</labal>
                                <textarea className="text-sm w-full h-20 px-4 py-1.5 outline-none border bg-blue-50 rounded" disabled
                                value={address}
                                    placeholder="Address" />
                                <labal className="pt-1 text-slate-600">DOB :</labal>
                                <input type='text' disabled value={dob}
                                    className="mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded" />
                                <labal className="pt-1 text-slate-600">Blood Group :</labal>
                                <input disabled value={bg}
                                    className="mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                    placeholder='Blood Group' />
                                <labal className="p-1 text-slate-600">Gender :</labal>
                                <select disabled value={profiledata?.data.gender || ''}
                                    className="mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded">
                                    <option value="">Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </Card>
                        {p && <div >
                            <PrescriptionPage appointment={appointmentid} closeModal={closemodel} />
                        </div>}
                        {edit && <>
                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                <div className="relative w-96 my-6 mx-auto max-w-3xl">
                                    <div className="mt-10 lg:ml-20 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        <div className="flex items-start justify-between p-3 ">
                                            <h3 className="text-xl font-semibold">
                                                Edit Profile
                                            </h3>
                                            <button onClick={e => setEdit(!edit)}>
                                                <RxCross2 className="w-5 h-5 m-1" />
                                            </button>
                                        </div><hr />
                                        <div className="mt-3 mb-5 relative px-6 flex-auto">
                                            {!image && (
                                                <label className="bg-white text-black text-base rounded mb-2 h-24 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed font-[sans-serif]">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 mb-2 fill-black" viewBox="0 0 32 32">
                                                        <path
                                                            d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                                                            data-original="#000000" />
                                                        <path
                                                            d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                                                            data-original="#000000" />
                                                    </svg>
                                                    Image Upload
                                                    <input type="file" className="hidden" onChange={handleImageChange} />
                                                    <p className="text-xs text-gray-400 mt-2">PNG, JPG, WEBP, and GIF are Allowed.</p>
                                                </label>
                                            )}
                                            {image && (
                                                <div className="flex">
                                                    <img
                                                        className="ml-24 md:ml-28 mb-3 inset-y-0 w-24 h-24 rounded-full"
                                                        src={profiledata?.data?.image 
                                                            ? `${BASE_URL}/doctors/${profiledata.data.image}` 
                                                            : (image ? URL.createObjectURL(image) : '')}
                                                        alt="Uploaded Image"
                                                    />
                                                    <span className=" cursor-pointer" onClick={() => setImage(null)}>❌</span>
                                                </div>
                                            )}
                                            <input
                                                className="text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                                type="text"
                                                placeholder="First Name"
                                                value={profiledata?.data.name}
                                                onChange={e => setFname(e.target.value)}
                                                name="fname" />
                                            <input
                                                className="mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                                type="text"
                                                placeholder="Last Name"
                                                value={profiledata?.data.last_name}
                                                onChange={e => setLname(e.target.value)}
                                                name="lname" />
                                            <input
                                                className="mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                                type="text"
                                                placeholder="DOB (DD/MM/YYYY)"
                                                value={profiledata?.data.date_of_birth}
                                                onChange={e => setDob(e.target.value)}
                                                name="dob" />
                                            <select
                                                className=" mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                                value={profiledata?.data.blood_group}
                                                onChange={e => setBg(e.target.value)}
                                                name="gender">
                                                <option value="">Blood Group</option>
                                                <option value="B+">B+</option>
                                                <option value="B-">B-</option>
                                                <option value="A+">A+</option>
                                                <option value="A-">A-</option>
                                                <option value="O+">O+</option>
                                                <option value="O-">O-</option>
                                                <option value="AB+">AB+</option>
                                                <option value="AB-">AB-</option>
                                            </select>
                                            <select
                                                className="mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                                value={profiledata?.data.gender}
                                                onChange={e => setGender(e.target.value)}
                                                name="gender">
                                                <option value="">Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                            <button
                                                className="bg-blue-500 mt-2 py-1.5 w-full text-white text-sm px-6 rounded hover:bg-blue-700"
                                                type="button" onClick={submit}>
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                            <ToastContainer />
                        </>}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;
