import React, { useState } from 'react';
import { MdOutlineMailOutline } from "react-icons/md";
import back from '../images/hero-bg1.png'
import image from '../images/3293465-removebg-preview.png'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { BASE_URL } from '../../apiconfig';
import { RxCross2 } from 'react-icons/rx';

const Main = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false)
    const [otp, setOtp] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')

    const submit = async (e) => {
        e.preventDefault()
        if (!email.trim()) {
            toast.error("Enter the Email ID");
            return;
        }
        try {
            setLoading(true);
            const response = await fetch(`${BASE_URL}/user/forgotten`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email
                }),
            });
            if (!response) {
                throw new Error('Failed to Forgotten');
            }
            setLoading(false);
            const data = await response.json();
            if (data.message) {
                toast.success("Enter the OTP");
                setModal(true)
            }
            else {
                toast.error(data.error);
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const submitverify = async (e) => {
        e.preventDefault()
        if (!otp.trim() || !password.trim() || !cpassword.trim()) {
            return toast.error("Enter the Field");
        }
        if (password !== cpassword) {
            return toast.error("Password not same")
        }
        try {
            const response = await fetch(`${BASE_URL}/user/forgottenverify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    otp: otp,
                    password: password
                }),
            });
            if (!response) {
                throw new Error('Failed to Forgotten');
            }
            const data = await response.json();
            if (data.message) {
                navigate('/login')
                setTimeout(() => {
                    toast.success("Forgotten Password Successfully Updated");
                }, 100);
            }
            else {
                toast.error(data.error);
            }
        } catch (error) {
            alert(error.message)
        }
    }
    const closeModal = () => {
        setModal(!modal)
    }

    return (
        <section className="relative md:py-10 xxl:py-8 pb-0" >
            <div className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: `url("${back}")` }} >
            </div>
            {loading &&
                <div className="flex justify-center items-center fixed inset-0 z-50">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto"></div>
                        <p className="mt-2 font-semibold">Loading...</p>
                    </div>
                    <div className="opacity-10 fixed inset-0 z-40 bg-black"></div>
                </div>}
            <div className="container mx-auto relative px-1">
                <div className=" md:flex min-h-screen xl:min-h-screen">
                    <div className="md:1/2 md:order-1 ">
                        <img className="md:mt-5 md:mr-20 pt-24 md:pt-1 pt-md-0 w-100" src={image} alt="hero-header" /></div>
                    <div className="w-full md:w-3/4 xl:w-2/3 xxl:w-5/12 lg:px-20 py-6 text-center ">
                        <section className="h-3/4 lg:w-5/6 md:mt-16">
                            <div className="p-6 md:ml-16 flex items-center ">
                                <div className="w-full ">
                                    <form>
                                        <div className="mb-10 flex items-center justify-between">
                                            <label className="pl-8 underline decoration-4 underline-offset-8 inline-block font-bold text-2xl hover:cursor-pointer text-[#003171]">
                                                Forgotten Password
                                            </label>
                                        </div>

                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pt-3 pl-3 pointer-events-none">
                                                <MdOutlineMailOutline className="h-5 w-5 text-gray-600" />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Enter Email ID"
                                                onChange={e => setEmail(e.target.value)}
                                                value={email}
                                                style={{ textShadow: '0px 2px 4px rgba(0, 0, 0, .3)' }}
                                                className="placeholder:text-gray-500 placeholder: text-center mb-6 w-full px-4 py-2 rounded-full bg-transparent border-2 focus:outline-none focus:border-blue-500 border-blue-900 shadow-[0_10px_20px_-2px_#38488f] " />
                                        </div>


                                        <div className="mb-6 flex items-center justify-between">
                                            <div className="mb-[0.125rem] block min-h-[1.5rem] ">

                                            </div>
                                            <button onClick={submit} className='w-32 h-10 mt-2 text-xl bg-blue-900 text-white font-bold rounded-full  hover:bg-blue-900 hover:text-blue-900 hover:border border-blue-900 hover:bg-transparent'>Submit</button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            {modal && <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-80 my-6 mx-auto max-w-3xl">
                        <div className="mt-10 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex items-center justify-between p-3 ">
                                <h3 className="text-lg font-semibold">
                                    Enter OTP :
                                </h3>
                                <button onClick={closeModal}>
                                    <RxCross2 className="w-5 h-5 m-1" />
                                </button>
                            </div><hr />
                            <div className="mt-3 mb-5 relative px-6 flex-auto">
                                <label className=' text-slate-600 mb-1'>Enter OTP :</label>
                                <input
                                    className="text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                    type="text"
                                    value={otp}
                                    onChange={e => setOtp(e.target.value)}
                                    placeholder="Enter OTP" />
                                <label className=' text-slate-600 mb-1'>Enter Password :</label>
                                <input
                                    className="mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    type="password"
                                    placeholder="New Password" />
                                <label className=' text-slate-600 mt-1'>Confirm Password :</label>
                                <input
                                    className="mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                    type="password"
                                    value={cpassword}
                                    onChange={e => setCpassword(e.target.value)}
                                    placeholder="Confirm Password" />
                                <button
                                    className="bg-blue-500 py-1.5 w-full text-white text-sm px-6 mt-3 rounded hover:bg-blue-700"
                                    type="button"
                                    onClick={submitverify}>
                                    Submit
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>}
            
            <ToastContainer />
        </section>
    );
};

export default Main;
