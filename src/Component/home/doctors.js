import React, { useEffect, useState } from 'react';
import back from '../images/hero-bg1.png';
const BASE_URL = require('../../apiconfig').BASE_URL;

const Main = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${BASE_URL}/user/doctors`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      setData(data.doctors)
    };
    fetchData();
  }, []);
  return (
    <section className="relative md:py-10 xxl:py-8 pb-0">
      <div
        className="absolute left-0 inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url("${back}")` }}
      />
      <div className="container mx-auto relative px-10 ">
        <h1 className='pt-24 md:pt-10 md:pl-14 mb-0 py-5 font-normal text-5xl text-blue-800'>Our <strong>Doctors</strong></h1>
        <div className="md:flex md:px-10 ">
          <div className="md:w-full flex flex-wrap justify-center space-y-8 lg:space-y-10 lg:space-x-10">
            {data.map((doctor, index) => (
              <div key={index} className="flex flex-col w-80 md:mt-8 md:ml-10 lg:w-64 rounded-lg p-5 shadow-[0px_10px_20px_-0px_#38488f]">
                <div className="rounded-full overflow-hidden bg-gray-200 w-36 h-36 flex items-center justify-center mx-auto">
                  <img className="w-36 h-32" src={`${BASE_URL}/doctors/${doctor.image}`} alt={`${doctor.first_name} ${doctor.last_name}`} />
                </div>
                <h1 className='py-2 text-center font-semibold text-4xl text-blue-800'>{`${doctor.first_name} ${doctor.last_name}`}</h1>
                <h2 className="text-lg font-semibold text-center text-blue-600 mt-1">{doctor.specialization}</h2>
                <h2 className="text-lg font-semibold text-center mt-2">{doctor.address}</h2>
                <button className="font-semibold px-10 py-2 text-white rounded-full mt-4" style={{ backgroundColor: '#283779', borderColor: '#283779' }}>Book an Appointment</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
  
};

export default Main;
