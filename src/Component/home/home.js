import React from 'react';
import back from '../images/hero-bg1.png'
import image from '../images/19778-removebg-preview.png'

import { Link, useNavigate } from 'react-router-dom';

const Main = () => {
  return (
    <section className="relative md:py-8 xxl:py-8 pb-0" >
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url("${back}")`,
        }} ></div>
      {/* <div className="container mx-auto px-3 py-4"> */}
      <div className=" container mx-auto relative px-1">
        <div className=" md:flex min-h-screen xl:min-h-screen">
          <div className="xl:min-h-screen min-h-1/4 md:order-1">
            <img className="md:mt-20 md:mr-10 pt-24 md:pt-1 pt-md-0 w-100" src={image} alt="hero-header" /></div>
          <div className="md:w-3/4 xl:w-2/3 xxl:w-6/12 px-2 xxl:ml-20 lg:pl-20 py-6 text-center md:text-left">
            <h1 className="md:mt-28 font-normal font-sans text-5xl"style={{color:'#283779'}}>We're <strong className='font-bold'>determined </strong>for<br />your&nbsp;<strong className='font-bold'>better life.</strong></h1>
            <p className="text-xl font-normal  mt-3 mb-4" style={{ color: '#1B71A1' }}>You can get the care you need 24/7 – be it online or in <br />person. You will be treated by caring specialist doctors. </p>
            <Link to='/doctors'> <button className="font-semibold px-12 py-4 text-white rounded-full mt-3"
              style={{ backgroundColor: '#283779', borderColor: '#283779' }}>Make an Appointment</button> </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
