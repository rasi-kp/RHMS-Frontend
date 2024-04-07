import React, { useState } from 'react';
import { IoKeyOutline } from "react-icons/io5";
import back from '../images/hero-bg1.png'
import image from '../images/3293465-removebg-preview.png'
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate()
    const [eerror, setError] = useState("")
    const [otp, setOtp] = useState('')
    const userid = useSelector(state => state.auth.userid);
    const submit = async (e) => {
        e.preventDefault()
        setError('');
        if (!otp.trim()) {
            toast.error("OTP is Required");
            setError('OTP is required');
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/user/validateotp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: userid,
                    otp: otp,
                }),
            });
            if (!response) {
                throw new Error('Failed to sign in');
            }
            const data = await response.json();
            if (data.message) {
                toast.success(data.message);
                navigate('/login')
                setTimeout(() => {
                    toast.success("Account Created Successfully");
                }, 100);
            }
            else {
                toast.error(data.error);
                setError(data.error)
            }
        } catch (error) {
            alert(error.message)
        }
    }
    return (
        <section className="relative md:py-10 xxl:py-8 pb-0" >
            <div className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: `url("${back}")` }} >
            </div>
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
                                                Enter OTP
                                            </label>
                                        </div>
                                        <p className=' text-red-600'>{eerror}</p>

                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pt-3 pl-3 pointer-events-none">
                                                <IoKeyOutline className="h-5 w-5 text-gray-600" />
                                            </div>
                                            <input
                                                onChange={(e) => setOtp(e.target.value)}
                                                value={otp}
                                                type="text"
                                                placeholder="Enter OTP"

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
            <ToastContainer />
        </section>
    );
};

export default Main;
