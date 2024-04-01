import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import logo from '../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='fixed z-10 w-full flex justify-between items-center h-20 mx-auto px-12 text-blue-900 '>
      <Link to="/"> <img src={logo} width="118" alt="logo" /></Link>

      <ul className='hidden md:flex'>
        <li className='p-4 m-2 cursor-pointer duration-200 hover:text-[#38488f] hover:font-semibold'>Departments</li>
        <li className='p-4 m-2 cursor-pointer duration-200 hover:text-[#38488f] hover:font-semibold'>Subscription</li>
        <li className='p-4 m-2 cursor-pointer duration-200 hover:text-[#38488f] hover:font-semibold'>Contact</li>
        <li className='p-4 m-2 cursor-pointer duration-200 hover:text-[#38488f] hover:font-semibold'><Link to='/dlogin'>Doctor Login</Link></li>
        <Link to='/login'><li className='m-2 pl-5 pt-3 border border-blue-900 font-bold rounded-full border-[#283779] w-24 h-12 hover:bg-blue-900 hover:text-white'>
          Sign In
        </li></Link>
      </ul>
      <div onClick={handleNav} className='block md:hidden z-50'>
        {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </div>

      <ul
        className={
          nav
            ? 'pl-8 fixed md:hidden left-0 top-0 w-full bg-[#ffffff] ease-in-out duration-500 z-10'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
        }>

        <img className='mt-2 ml-3' src={logo} width="118" alt="logo" />

        <li className='p-2 m-2 cursor-pointer duration-200 hover:text-[#38488f] hover:font-semibold'>Departments</li>
        <li className='p-2 m-2 cursor-pointer duration-200 hover:text-[#38488f] hover:font-semibold'>Subscription</li>
        <li className='p-2 m-2 cursor-pointer duration-200 hover:text-[#38488f] hover:font-semibold'>Contact</li>
        <li className='p-2 m-2 cursor-pointer duration-200 hover:text-[#38488f] hover:font-semibold'><Link to="/dlogin">Doctor Login</Link></li>
        <Link to='/login'>
        <li className='m-2 pl-5 pt-3 border border-blue-900 font-bold rounded-full border-[#283779] w-24 h-12 hover:bg-blue-900 hover:text-white'>Sign In </li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;