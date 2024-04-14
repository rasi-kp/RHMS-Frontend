import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RxCross2 } from "react-icons/rx";
import { createDoctor } from "../../../connection/admin";
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
    const [error, setError] = useState("")

    const adddoctor = async (e) => {
        e.preventDefault()
        const isDateFormatValid = (dateString) => {
            const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
            return dateFormatRegex.test(dateString);
        };

        if (!fname.trim() || !lname.trim() || !dob.trim() || !gender.trim() || !mobno.trim() || !email.trim() || !specialization.trim()) {
            toast.error("Fill All Field")
            setError('Fill Required Field');
            return;
        }
        if (!isDateFormatValid(dob)) {
            return toast.error("Invalied Date Format")
        }
        const doctorData = {
            email: email,
            first_name: fname,
            last_name: lname,
            date_of_birth: dob,
            gender: gender,
            mob_no: mobno,
            qualification: qualification,
            specialization: specialization,
            address: address,
            department: department
        };
        dispatch(createDoctor(doctorData, token));
        closeModal(!closeModal)
    }
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-80 my-6 mx-auto max-w-3xl">
                    <div className="mt-20 lg:ml-20 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-3 ">
                            <h3 className="text-xl font-semibold">
                                Add Doctor
                            </h3>
                            <button onClick={closeModal}>
                                <RxCross2 className="w-5 h-5 m-1" />
                            </button>
                        </div><hr />
                        <div className="mt-3 mb-5 relative px-6 flex-auto">
                            {/* <p className="text-red-600 hover:underline hover:underline-offset-4">{error}</p> */}
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