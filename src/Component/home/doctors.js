import React from 'react';
import back from '../images/hero-bg1.png';
import doc1 from '../images/doctor 1.jpg'
import doc2 from '../images/doctor 2.jpg'
import doc3 from '../images/doctor 3.jpg'
import { MdOutlinePerson } from 'react-icons/md'; // Importing icon for demonstration

const Main = () => {
  return (
    <section className="relative md:py-10 xxl:py-8 pb-0">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url("${back}")` }}
      />
      {/* Container */}
      <div className="container mx-auto relative px-10 ">
        <h1 className='pt-24 md:pt-12 md:pl-14 mb-1 py-5 font-normal text-5xl text-blue-800'>Our <strong>Doctors</strong></h1>
        {/* Doctors section */}
        <div className="md:flex md:px-20 ">
          {/* Doctor cards */}
          <div className="md:w-full md:order-1 flex flex-col lg:flex-row justify-between space-y-8 lg:space-y-0 lg:space-x-10 ">
            {/* Doctor card 1 */}
            <div className="flex flex-col lg:w-1/3 rounded-lg p-4 shadow-[0px_10px_20px_-0px_#38488f]">
              <div className="rounded-full overflow-hidden bg-gray-200 w-36 h-36 flex items-center justify-center mx-auto">
                <img className="w-full h-auto" src={doc1} alt="Doctor" />
              </div>
              <h1 className='py-2 text-center font-semibold text-4xl text-blue-800'>Dr. John Doe</h1>
              <h2 className="text-lg font-semibold text-center text-blue-600 mt-1">General physician</h2>
              <h2 className="text-lg font-semibold text-center mt-2">Kannur,Kerala</h2>
              {/* <button className="bg-blue-500 text-white rounded-full py-2 mt-4 mx-auto block w-3/4">Book an Appointment</button> */}
              <button className="font-semibold px-10 py-2 text-white rounded-full mt-4"
              style={{ backgroundColor: '#283779', borderColor: '#283779' }}>Book an Appointment</button>
            </div>

            {/* Doctor card 2 */}
            <div className="flex flex-col lg:w-1/3 rounded-lg p-4 shadow-[0px_10px_20px_-0px_#38488f]">
              <div className="rounded-full overflow-hidden bg-gray-200 w-36 h-36 flex items-center justify-center mx-auto">
                <img className="w-full h-32" src={doc2} alt="Doctor" />
              </div>
              <h1 className='py-2 text-center font-semibold text-4xl text-blue-800'>Dr. Roopa S</h1>
              <h2 className="text-lg font-semibold text-center text-blue-600 mt-1">gynecologist</h2>
              <h2 className="text-lg font-semibold text-center mt-2">payyannur,Kerala</h2>
              {/* <button className="bg-blue-500 text-white rounded-full py-2 mt-4 mx-auto block w-3/4">Book an Appointment</button> */}
              <button className="font-semibold px-10 py-2 text-white rounded-full mt-4"
              style={{ backgroundColor: '#283779', borderColor: '#283779' }}>Book an Appointment</button>
            </div>

           {/* Doctor card 3 */}
           <div className="flex flex-col lg:w-1/3 rounded-lg p-4 shadow-[0px_10px_20px_-0px_#38488f]">
              <div className="rounded-full overflow-hidden bg-gray-200 w-36 h-36 flex items-center justify-center mx-auto">
                <img className="w-60 h-32 mt-8" src={doc3} alt="Doctor" />
              </div>
              <h1 className='py-2 text-center font-semibold text-4xl text-blue-800'>Dr.Soumya C </h1>
              <h2 className="text-lg font-semibold text-center text-blue-600 mt-1">Neurologist</h2>
              <h2 className="text-lg font-semibold text-center mt-2">Kannur,Kerala</h2>
              {/* <button className="bg-blue-500 text-white rounded-full py-2 mt-4 mx-auto block w-3/4">Book an Appointment</button> */}
              <button className="font-semibold px-10 py-2 text-white rounded-full mt-4"
              style={{ backgroundColor: '#283779', borderColor: '#283779' }}>Book an Appointment</button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
