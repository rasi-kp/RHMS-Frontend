import React, { useEffect, useState, forwardRef } from 'react';
import axios from 'axios';
import logo from '../../images/logo.png'
import { BASE_URL } from '../../../apiconfig';
import { useSelector } from 'react-redux';

import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
const PrescriptionPage = forwardRef((props, ref) => {

    const token = useSelector(state => state.auth.token);
    const { appointment } = props; // Destructure the appointment prop
    const [prescriptionData , setPrescriptionData] = useState(null);

    // Fetch prescription data using the appointment ID
    useEffect(() => {
        const fetchPrescriptionData = async () => {
            try {
                // Replace with your actual API endpoint
                const response = await axios.get(`${BASE_URL}/patient/prescription/${appointment}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setPrescriptionData(response.data);
                console.log(prescriptionData);
            } catch (error) {
                console.error('Error fetching prescription data:', error);
            }
        };
        fetchPrescriptionData();
    }, [appointment]);
    if (!prescriptionData) {
        return <div>Loading...</div>;
    }

    return (
        <div ref={ref} style={{ width: '210mm', height: '297mm' }}>
            <div className='flex justify-between bg-slate-300 pt-4 pe-8 pb-2' >
                <div>
                    <img src={logo} alt="Logo" className=' w-28 p-3 pl-4' />
                </div>
                <div className=''>
                    <div className='flex justify-end '>
                        <MdEmail className='text-blue-500 mr-2 mt-1' size={20} />
                        <p className='pl-2 pb-0.5'>rasir239@gmail.com</p>
                    </div>
                    <div className='flex items-center'>
                        <FaPhoneAlt className='text-blue-500 mr-2 ' size={20} />
                        <p className='pl-2 p-0.5'>9605942261</p>
                    </div>
                    <div className='flex items-center'>
                        <TbWorldWww className='text-blue-500 mr-2 mt-1' size={20} />
                        <p className='pl-2 p-0.5'>rhms.online</p>
                    </div>
                </div>
            </div>
            <h1 className=' underline font-semibold text-start m-2 pl-5'>Doctor Details </h1>
            <div className='flex p-3' >
                <div>
                    <img src={`${BASE_URL}/doctors/${prescriptionData?.prescription?.doctordetails.image}`} alt="Logo" className=' w-28 p-2 ml-4' />
                </div>
                <div className='ml-4 mt-4'>
                    <div className='flex items-center'>
                        {prescriptionData?.prescription?.doctordetails ? (
                            <p className='font-bold text-xl'>{prescriptionData.prescription.doctordetails.first_name} {prescriptionData.prescription.doctordetails.last_name}</p>) : (<p>N/A</p>)}
                    </div>

                    <div className='flex items-center'>
                        <p>Specialization: {prescriptionData?.prescription?.doctordetails.specialization}</p>
                    </div>
                    <div className='flex items-center'>
                        <p>Qualification: {prescriptionData?.prescription?.doctordetails.qualification}</p>
                    </div>
                </div>
            </div><hr className='mt-2 border-2' />
            <h1 className=' underline font-semibold text-start mt-2 ml-2 pl-5'>Patient Details </h1>
            <div className='flex justify-end me-6' >
                <div className=''>
                    <div className='flex items-center'>
                        {prescriptionData?.prescription?.doctordetails ? (
                            <p className=' font-medium'>Name: {prescriptionData.prescription.patient.first_name} {prescriptionData.prescription.patient.last_name}</p>) : (<p>N/A</p>)}
                    </div>
                    <div className='flex items-center'>
                        <p>Age: {prescriptionData?.prescription?.patient.age}</p>
                    </div>
                    <div className='flex items-center'>
                        <p>Gender: {prescriptionData?.prescription?.patient.gender}</p>
                    </div>
                </div>
            </div>
            {/* Prescription content */}
            <div className='mt-3'>
                <h3 className=' font-semibold underline text-start ml-2 pl-5'>Prescriptions</h3>
                {prescriptionData?.prescription?.tablets.map((medicine, index) => (
                    <p className='mt-10 text-start ml-20' key={index}><strong>{index + 1}.</strong>  {medicine.name}- {medicine.dosage} mg, Time:{medicine.time}</p>
                ))}
            </div>

            {/* Footer */}
            <div className='flex flex-col justify-end mt-44 ml-48'>
                <p>Thank you for choosing RHMS.</p>
            </div>

        </div>
    );
});

export default PrescriptionPage;
