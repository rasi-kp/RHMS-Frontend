import React, { useState } from 'react';
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import back from '../images/hero-bg1.png'
import image from '../images/19778-removebg-preview.png'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { userid } from '../../reducer/authSlice';
import 'react-toastify/dist/ReactToastify.css';

const Main = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setCpassword] = useState("")
    const [eerror, setError] = useState("")
    const [perror, setPerror] = useState('')
    const [nerror, setNerror] = useState("")
    const [cerror, setCerror] = useState('')
    const handleClick = async (e) => {
        e.preventDefault()
        setError('');
        setPerror('');
        setNerror('');
        setCerror('');
        if (!email.trim()) {
            toast.error("Email is Required");
            setError('Email is required');
            return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            toast.error("Invalid email format");
            setError('Invalid email format');
            return;
        }
        if (!name.trim()) {
            toast.error("Name is required");
            setNerror('Name is required');
            return;
        }
        if (!password.trim()) {
            toast.error("Password is required");
            setPerror('Password is required');
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            setPerror('Password must be at least 6 characters');
            return;
        }
        if (!cpassword.trim()) {
            toast.error("Confirm Password is required");
            setCerror('Confirm Password is required');
            return;
        }
        if (password !== cpassword) {
            toast.error("Password does not match");
            setCerror('Password does not match');
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    name: name,
                    password: password,
                }),
            });
            if (!response) {
                throw new Error('Failed to sign in');
            }
            const data = await response.json();
            console.log(data);
            if (data.userid) {
                dispatch(userid(data));
                navigate('/otp')
                setTimeout(() => {
                    toast.success("Enter OTP");
                }, 100);
            }
            else{
                setError('Email ID already Exist');
                toast.error(data.error);
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
                    <div className="md:mt-20 pt-24 md:pt-0 text-center sm:order-1 ">
                        <img className="p-1" src={image} alt="hero-header" /></div>
                    <div className="w-full xl:w-3/6 lg:pl-16 text-center ">
                        <section className="h-3/4 lg:w-5/6 md:mt-16">
                            <div className="p-6 md:ml-16 flex h-full items-center ">
                                <div className="w-full ">
                                    <form>
                                        <div className="mb-10 flex items-center justify-between">
                                            <Link to="/login"> <label className="pl-8 underline decoration-4 underline-offset-8 inline-block font-bold text-3xl hover:cursor-pointer text-[#5f80a9]">
                                                Login
                                            </label></Link>
                                            <label className="p-5 underline decoration-4 underline-offset-8 inline-block font-bold text-3xl hover:cursor-pointer text-[#003171]">
                                            </label>
                                            <label
                                                className="pr-8 underline decoration-4 underline-offset-8 inline-block font-bold text-3xl hover:cursor-pointer  text-[#003171]">
                                                SignUp
                                            </label>
                                        </div>
                                        <p className=' text-red-600'>{eerror}</p>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pt-3 pl-3 pointer-events-none">
                                                <MdOutlineMailOutline className="h-5 w-5 text-gray-600" />
                                            </div>
                                            <input
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                type="text"
                                                placeholder="Email ID"
                                                style={{ textShadow: '0px 2px 4px rgba(0, 0, 0, .3)' }}
                                                className="placeholder:text-gray-500 placeholder: text-center mb-6 w-full px-4 py-2 rounded-full bg-transparent border-2 focus:outline-none focus:border-blue-500 border-blue-900 shadow-[0_10px_20px_-2px_#38488f] " />
                                        </div>
                                        <p className=' text-red-600'>{nerror}</p>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pt-3 pl-3 pointer-events-none">
                                                <FaRegUser className="h-5 w-5 text-gray-600" />
                                            </div>
                                            <input
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                type="text"
                                                placeholder="Name"
                                                style={{ textShadow: '0px 2px 4px rgba(0, 0, 0, .3)' }}
                                                className="placeholder:text-gray-500 placeholder: text-center mb-6 w-full px-4 py-2 rounded-full bg-transparent border-2 focus:outline-none focus:border-blue-500 border-blue-900 shadow-[0_10px_20px_-2px_#38488f] " />
                                        </div>
                                        <p className=' text-red-600'>{perror}</p>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pt-3 pl-3 pointer-events-none">
                                                <RiLockPasswordLine className="h-5 w-5 text-gray-600" />
                                            </div>
                                            <input
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                type="password"
                                                style={{ textShadow: '0px 2px 4px rgba(0, 0, 0, .3)' }}
                                                className="placeholder:text-gray-500 text-center mb-4 w-full px-4 py-2 rounded-full bg-transparent border-2 focus:outline-none focus:border-blue-500 border-blue-900 shadow-[0_10px_20px_-2px_#38488f]"
                                                placeholder="Password" />
                                        </div>
                                        <p className=' text-red-600'>{cerror}</p>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pt-3 pl-3 pointer-events-none">
                                                <RiLockPasswordLine className="h-5 w-5 text-gray-600" />
                                            </div>
                                            <input
                                                value={cpassword}
                                                onChange={(e) => setCpassword(e.target.value)}
                                                type="password"
                                                style={{ textShadow: '0px 2px 4px rgba(0, 0, 0, .3)' }}
                                                className="placeholder:text-gray-500 text-center mb-4 w-full px-4 py-2 rounded-full bg-transparent border-2 focus:outline-none focus:border-blue-500 border-blue-900 shadow-[0_10px_20px_-2px_#38488f]"
                                                placeholder="Confirm Password" />
                                        </div>

                                        <div className="mb-6 flex items-center justify-between">
                                            <div className="mb-[0.125rem] block min-h-[1.5rem] ">
                                                <Link to="/login"> <label
                                                    className="mt-3 inline-block text-xs font-semibold hover:cursor-pointer text-[#003171]">
                                                    Already have an account ?
                                                </label></Link>
                                            </div>
                                            <button onClick={handleClick} className='w-32 h-10 mt-2 text-xl bg-blue-900 text-white font-bold rounded-full  hover:bg-blue-900 hover:text-blue-900 hover:border border-blue-900 hover:bg-transparent'>Sign Up</button>
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
