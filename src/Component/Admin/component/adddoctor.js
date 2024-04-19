import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RxCross2 } from "react-icons/rx";
import { createDoctor } from "../../../services/admin";
import { useDispatch, useSelector } from "react-redux";

function AddDoctor({ closeModal }) {
    const token = useSelector(state => state.auth.token); // Move useSelector inside the function
    const dispatch = useDispatch();
    const [email, setEmail] = useState("")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [dob, setDob] = useState("")
    const [mobno, setMobno] = useState("")
    const [gender, setGender] = useState("")
    const [qualification, setQualification] = useState("")
    const [specialization, setSpecialization] = useState("")
    const [address, setAddress] = useState("")
    const [department, setdepartment] = useState("")
    const [image, setImage] = useState("")
    const [error, setError] = useState("")

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

    };

    const adddoctor = async (e) => {
        e.preventDefault()
        const isDateFormatValid = (dateString) => {
            const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
            return dateFormatRegex.test(dateString);
        };
        if (!fname.trim() || !image || !lname.trim() || !dob.trim() || !gender.trim() || !mobno.trim() || !email.trim() || !specialization.trim()) {
            toast.error("Fill All Field")
            setError('Fill Required Field');
            return;
        }
        if (!isDateFormatValid(dob)) {
            return toast.error("Invalied Date Format")
        }
        
        const formData = new FormData();

        formData.append('image', image); // Make sure 'image' matches the name of the file input field in your form

        // Append other data fields to the FormData object
        formData.append('email', email);
        formData.append('first_name', fname);
        formData.append('last_name', lname);
        formData.append('date_of_birth', dob);
        formData.append('gender', gender);
        formData.append('mob_no', mobno);
        formData.append('qualification', qualification);
        formData.append('specialization', specialization);
        formData.append('address', address);
        formData.append('department', department);

        dispatch(createDoctor(formData, token));
        setTimeout(() => {
            closeModal(true); // Close the modal by passing true
        }, 1000);
    }

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-96 my-6 mx-auto max-w-3xl">
                    <div className="mt-36 lg:ml-20 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-center justify-between p-3 ">
                            <h3 className="text-xl font-semibold">
                                Add Doctor
                            </h3>
                            <button onClick={closeModal}>
                                <RxCross2 className="w-5 h-5 m-1" />
                            </button>
                        </div><hr />
                        <div className="mt-3 mb-5 relative px-6 flex-auto">
                            {!image && (
                                <label className="bg-white text-black text-base rounded mb-2 h-24 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed font-[sans-serif]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 mb-2 fill-black" viewBox="0 0 32 32">
                                        <path
                                            d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                                            data-original="#000000" />
                                        <path
                                            d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                                            data-original="#000000" />
                                    </svg>
                                    Image Upload
                                    <input type="file" className="hidden" onChange={handleImageChange} />
                                    <p className="text-xs text-gray-400 mt-2">PNG, JPG, WEBP, and GIF are Allowed.</p>
                                </label>
                            )}
                            {image && (
                                <div className="flex">
                                    <img
                                        className="ml-24 md:ml-28 mb-3 inset-y-0 w-24 h-24 rounded-full"
                                        src={URL.createObjectURL(image)}
                                        alt="Uploaded Image"
                                    />
                                    <span className=" cursor-pointer" onClick={() => setImage(null)}>❌</span>
                                </div>
                            )}

                            <input
                                className="text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)} />
                            <input
                                className="mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                type="text"
                                placeholder="First Name"
                                value={fname}
                                onChange={e => setFname(e.target.value)} />
                            <input
                                className="mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                type="text"
                                placeholder="Last Name"
                                value={lname}
                                onChange={e => setLname(e.target.value)}
                                name="lname" />
                            <input
                                className="mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                type="text"
                                placeholder="DOB (YYYY-MM-DD)"
                                value={dob}
                                onChange={e => setDob(e.target.value)}
                                name="dob" />

                            <select
                                className="mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                value={gender}
                                onChange={e => setGender(e.target.value)}
                                name="gender">
                                <option value="">Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <input
                                className="mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                type="number"
                                placeholder="Mobile Number"
                                value={mobno}
                                onChange={e => setMobno(e.target.value)} />
                            <input
                                className="mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                type="text"
                                placeholder="Qualification"
                                value={qualification}
                                onChange={e => setQualification(e.target.value)} />
                            <input
                                className="mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                type="text"
                                placeholder="Department"
                                value={department}
                                onChange={e => setdepartment(e.target.value)} />
                            <input
                                className="mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                type="text"
                                placeholder="Specialization"
                                value={specialization}
                                onChange={e => setSpecialization(e.target.value)} />
                            <input
                                className="mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                type="text"
                                placeholder="Address"
                                value={address}
                                onChange={e => setAddress(e.target.value)} />
                            <div className="mt-4 flex justify-between font-semibold text-sm">


                            </div>
                            <button
                                className="bg-blue-500 py-1.5 w-full text-white text-sm px-6 rounded hover:bg-blue-700"
                                type="button"
                                onClick={adddoctor}>
                                Submit
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            <ToastContainer />
        </>
    );
}
export default AddDoctor