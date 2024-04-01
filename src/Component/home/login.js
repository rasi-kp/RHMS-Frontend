import React from 'react';
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import back from '../images/hero-bg1.png'
import image from '../images/19778-removebg-preview.png'

const Main = () => {
    return (
        <section className="relative md:py-10 xxl:py-8 pb-0" >
            <div className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: `url("${back}")` }} >
            </div>
            <div className="container mx-auto relative px-1">
                <div className=" md:flex min-h-screen xl:min-h-screen">
                    <div className="md:1/2 md:order-1">
                        <img className="md:mt-20 md:mr-10 pt-24 md:pt-1 pt-md-0 w-100" src={image} alt="hero-header" /></div>
                    <div className="w-full md:w-3/4 xl:w-2/3 xxl:w-5/12 lg:px-2 py-6 text-center ">
                        <section className="h-3/4 lg:w-5/6 md:mt-16">
                            <div className="p-6 md:ml-16 flex h-full items-center ">
                                <div className="w-full ">
                                    <form>
                                        <div className="mb-10 flex items-center justify-between">
                                            <label className="pl-8 underline decoration-4 underline-offset-8 inline-block font-bold text-3xl hover:cursor-pointer text-[#003171]">
                                                Login
                                            </label>
                                            <label className="p-5 underline decoration-4 underline-offset-8 inline-block font-bold text-3xl hover:cursor-pointer text-[#003171]">
                                            </label>
                                            <label
                                                className="pr-8 underline decoration-4 underline-offset-8 inline-block font-bold text-3xl hover:cursor-pointer text-[#5f80a9]">
                                                SignUp
                                            </label>
                                        </div>

                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pt-3 pl-3 pointer-events-none">
                                                <MdOutlineMailOutline className="h-5 w-5 text-gray-600" />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Email ID"
                                               
                                                style={{ textShadow: '0px 2px 4px rgba(0, 0, 0, .3)' }}
                                                className="placeholder:text-gray-500 placeholder: text-center mb-6 w-full px-4 py-2 rounded-full bg-transparent border-2 focus:outline-none focus:border-blue-500 border-blue-900 shadow-[0_10px_20px_-2px_#38488f] " />
                                        </div>
                                        
                                        <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pt-3 pl-3 pointer-events-none">
                                        <RiLockPasswordLine className="h-5 w-5 text-gray-600" />
                                            </div>
                                            <input
                                                type="text"
                                                style={{ textShadow: '0px 2px 4px rgba(0, 0, 0, .3)' }}
                                                className="placeholder:text-gray-500 text-center mb-4 w-full px-4 py-2 rounded-full bg-transparent border-2 focus:outline-none focus:border-blue-500 border-blue-900 shadow-[0_10px_20px_-2px_#38488f]"
                                                placeholder="Password" />
                                        </div>
                                        <div className="mb-6 flex items-center justify-between">
                                            <div className="mb-[0.125rem] block min-h-[1.5rem] ">
                                                <label
                                                    className="mt-3 inline-block text-xs font-semibold hover:cursor-pointer text-[#003171]">
                                                    Forgotten Your Password ?
                                                </label>
                                            </div>
                                            <button className='w-32 h-10 mt-2 text-xl bg-blue-900 text-white font-bold rounded-full  hover:bg-blue-900 hover:text-blue-900 hover:border border-blue-900 hover:bg-transparent'>Login</button>
                                        </div>
                                        <div className="my-4 flex items-center  before:flex-1 before:border-2 before:border-blue-900  after:mt-0.5 after:flex-1 after:border-2 after:border-blue-900">
                                            <p className="mx-2 mb-0 text-center font-bold text-blue-900">
                                                OR
                                            </p>
                                        </div>
                                        <button className="text-blue-900 font-semibold mb-4 w-full px-4 py-2 rounded-full bg-transparent border-2 border-blue-900 shadow-[0_10px_20px_-2px_#38488f]">
                                        <FcGoogle className="absolute h-7 w-8"/>Login With Google</button>
                                    </form>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Main;