import React, { useEffect, useState } from 'react';
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import back from '../images/hero-bg1.png'
import image from '../images/19836-removebg-preview.png'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../reducer/authSlice';
import { BASE_URL } from '../../apiconfig';

const Main = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const tokenredux = useSelector(state => state.auth);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [eerror, setError] = useState("")
    const [perror, setPerror] = useState('')

    useEffect(() => {
        if (tokenredux.token != null) {
            if (tokenredux.role == 'patient') {
                navigate('/patient')
            }
            if (tokenredux.role == 'doctor') {
                navigate('/doctor')
            }
            if (tokenredux.role == 'admin') {
                navigate('/admin')
            }
        }
        else {
            navigate('/dlogin')
        }
    }, []);

    const handleClick = async (e) => {
        e.preventDefault()
        setError('');
        setPerror('');
        if (!email.trim()) {
            toast.error("Email Required");
            setError('Email or mobile no is required');
            return;
        }
        if (!password.trim()) {
            toast.error("Password Required");
            setPerror('Password is required');
            return;
        }
        try {
            const response = await fetch(`${BASE_URL}/doctor/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
            if (!response) {
                throw new Error('Failed to sign in');
            }
            const data = await response.json();
            if (data.token) {
                dispatch(loginSuccess(data));
                navigate('/doctor');
                setTimeout(() => {
                    toast.success("Successfully Login", {
                        autoClose: 1000, // Set the duration to 2 seconds (2000 milliseconds)
                    });
                }, 100);
            }
            else {
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
                    <div className="md:1/2 md:order-1">
                        <img className="md:mt-20 md:mr-10 pt-24 md:pt-1 pt-md-0 w-100" src={image} alt="hero-header" /></div>
                    <div className="w-full md:w-3/4 xl:w-2/3 xxl:w-5/12 lg:px-20 py-6 text-center ">
                        <section className="h-3/4 lg:w-5/6 md:mt-5">
                            <div className="p-6 xl:ml-16 flex h-full items-center ">
                                <div className="w-full ">
                                    <form>
                                        <h1 className="mb-10 underline decoration-4 underline-offset-8 inline-block font-bold text-3xl hover:cursor-pointer text-[#003171]">Doctor login</h1>
                                        <p className=' text-red-600'>{eerror}</p>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pt-3 pl-3 pointer-events-none">
                                                <MdOutlineMailOutline className="h-5 w-5 text-gray-600" />
                                            </div>
                                            <input
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
                                                type="text"
                                                placeholder="Email ID or Mobile no"
                                                style={{ textShadow: '0px 2px 4px rgba(0, 0, 0, .3)' }}
                                                className="placeholder:text-gray-500 placeholder: text-center mb-6 w-full px-4 py-2 rounded-full bg-transparent border-2 focus:outline-none focus:border-blue-500 border-blue-900 shadow-[0_10px_20px_-2px_#38488f] " />
                                        </div>
                                        <p className=' text-red-600'>{perror}</p>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pt-3 pl-3 pointer-events-none">
                                                <RiLockPasswordLine className="h-5 w-5 text-gray-600" />
                                            </div>
                                            <input
                                                onChange={(e) => setPassword(e.target.value)}
                                                value={password}
                                                type="password"
                                                style={{ textShadow: '0px 2px 4px rgba(0, 0, 0, .3)' }}
                                                className="placeholder:text-gray-500 text-center mb-4 w-full px-4 py-2 rounded-full bg-transparent border-2 focus:outline-none focus:border-blue-500 border-blue-900 shadow-[0_10px_20px_-2px_#38488f]"
                                                placeholder="Password" />
                                        </div>
                                        <div className="mb-6 flex items-center justify-between">
                                            <div className="mb-[0.125rem] block min-h-[1.5rem] ">
                                                <Link to="/forgotten"> <label
                                                    className="mt-3 inline-block text-xs font-semibold hover:cursor-pointer text-[#003171]">
                                                    Forgotten Your Password ?
                                                </label></Link>
                                            </div>
                                            <button onClick={handleClick} className='w-32 h-10 mt-2 text-xl bg-blue-900 text-white font-bold rounded-full  hover:bg-blue-900 hover:text-blue-900 hover:border border-blue-900 hover:bg-transparent'>Login</button>
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
