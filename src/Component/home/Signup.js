import React, { useState } from 'react';
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import back from '../images/hero-bg1.png'
import image from '../images/19778-removebg-preview.png'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { userid } from '../../reducer/authSlice';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../apiconfig';

const Main = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setCpassword] = useState("")
    const [eerror, setError] = useState("")
    const [perror, setPerror] = useState('')
    const [nerror, setNerror] = useState("")
    const [cerror, setCerror] = useState('')
    const [phoneerror, setphonerror] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async (e) => {
        e.preventDefault()
        setError('');
        setPerror('');
        setNerror('');
        setCerror('');
        setphonerror('')
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
        const trimmedPhone = phone.trim();
        if (!trimmedPhone) {
            toast.error(" Phone is required");
            setNerror('Phone is required');
            return;
        }
        if (trimmedPhone.length !== 10) {
            toast.error("Phone No must be exactly 10 characters");
            setphonerror('Phone No must be exactly 10 characters');
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
            setIsLoading(true)
            const response = await fetch(`${BASE_URL}/user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    name: name,
                    password: password,
                    phone: phone
                }),
            });
            if (!response) {
                throw new Error('Failed to sign in');
            }
            const data = await response.json();
            setIsLoading(false)
            if (data.userid) {
                dispatch(userid(data));
                navigate('/otp')
                setTimeout(() => {
                    toast.success("Enter OTP");
                }, 100);
            }
            else {
                setError('Email ID already Exist');
                toast.error(data.error);
            }
        } catch (error) {
            alert(error.message)
        }
    }
    return (
        <section className="relative md:py-10 xxl:py-8 pb-0" >
            {isLoading && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="text-center">
                        <svg
                            aria-hidden="true"
                            className="inline dark:text-gray-400 fill-blue-600 w-16 h-16 text-gray-200 animate-spin"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span className="block text-gray-200">Loading...</span>
                    </div>
                </div>
            )}

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
                                        <div className="mb-6 flex items-center justify-between">
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
                                                className="placeholder:text-gray-500 placeholder: text-center mb-4 w-full px-4 py-2 rounded-full bg-transparent border-2 focus:outline-none focus:border-blue-500 border-blue-900 shadow-[0_10px_20px_-2px_#38488f] " />
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
                                                className="placeholder:text-gray-500 placeholder: text-center mb-4 w-full px-4 py-2 rounded-full bg-transparent border-2 focus:outline-none focus:border-blue-500 border-blue-900 shadow-[0_10px_20px_-2px_#38488f] " />
                                        </div>
                                        <p className=' text-red-600'>{phoneerror}</p>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pt-3 pl-3 pointer-events-none">
                                                <FaPhoneAlt className="h-4 w-5 text-gray-600" />
                                            </div>
                                            <input
                                                value={phone}
                                                onChange={e => setPhone(e.target.value)}
                                                type="text"
                                                placeholder="Phone Number"
                                                style={{ textShadow: '0px 2px 4px rgba(0, 0, 0, .3)' }}
                                                className="placeholder:text-gray-500 placeholder: text-center mb-4 w-full px-4 py-2 rounded-full bg-transparent border-2 focus:outline-none focus:border-blue-500 border-blue-900 shadow-[0_10px_20px_-2px_#38488f] " />
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
