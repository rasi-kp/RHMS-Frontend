import React, { useEffect, useState, forwardRef, useRef } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import logo from '../../images/logo.png'
import { BASE_URL } from '../../../apiconfig';
import { useSelector } from 'react-redux';

import { MdEmail } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { FaPhoneAlt } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
const PrescriptionPage = forwardRef((props, ref) => {

    const prescriptionRef = useRef(null);
    const token = useSelector(state => state.auth.token);
    const { appointment, closeModal } = props;
    const [prescriptionData, setPrescriptionData] = useState(null);
    useEffect(() => {
        const fetchPrescriptionData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/patient/prescription/${appointment}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setPrescriptionData(response.data);
            } catch (error) {
                console.error('Error fetching prescription data:', error);
            }
        };
        fetchPrescriptionData();
    }, [appointment]);
    const pdownload = () => {
        const element = prescriptionRef.current;
        const options = {
            margin: [5, 2, 2, 5],
            filename: 'prescription.pdf',
            image: {
                type: 'jpeg',
                quality: 0.98,
            },
            jsPDF: {
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            },
            html2canvas: {
                scale: 3, 
                useCORS: true, 
            },
        };
        html2pdf().set(options).from(element).save()
            .catch((error) => {
                console.error('Error generating PDF:', error);
            });
        closeModal(false);
        setPrescriptionData(null);
    }
    if (!prescriptionData) {
        return <div className="flex justify-center items-center fixed inset-0 z-50 ml-20">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto"></div>
                <p className="mt-2 font-semibold ">Loading . . .</p>
            </div>
            <div className=" opacity-10 fixed inset-0 z-40 bg-black"></div>
        </div>
    }

    return (
        <>
            <div className="justify-center items-center flex overflow-y-auto fixed inset-0 z-50 ">
                <div className="relative mx-auto max-w-3xl">
                    <div className="mt-72 mb-10 lg:ml-20 rounded-lg shadow-lg relative flex flex-col w-full bg-white">
                        <div className="flex items-start justify-between p-3 ">
                            <h3 className="text-xl font-semibold">
                                Prescription
                            </h3>
                            <button onClick={closeModal}>
                                <RxCross2 className="w-7 h-7 " />
                            </button>
                        </div><hr />
                        <div className="mt-3 mb-5 relative px-6 flex-auto">
                            <div ref={prescriptionRef}>
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
                                <div className='mt-3'>
                                    <h3 className=' font-semibold underline text-start ml-2 pl-5'>Prescriptions</h3>
                                    {prescriptionData?.prescription?.tablets.map((medicine, index) => (
                                        <p className='mt-10 text-start ml-20' key={index}><strong>{index + 1}.</strong>  {medicine.name}- {medicine.dosage} mg, Time: {medicine.time ? String(medicine.time).split(' ').join(' , ') : ' '}</p>
                                    ))}
                                </div>
                                <div className='text-center text-blue-600 mt-7 mb-3 '>
                                    <p>Thank you for choosing RHMS.</p>
                                </div>
                            </div>
                            <div className='flex justify-end'>
                                <button className='mt-3 text-end bg-green-500 font-semibold text-white p-1.5 rounded-lg' onClick={pdownload}>Download Prescription</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
});

export default PrescriptionPage;
