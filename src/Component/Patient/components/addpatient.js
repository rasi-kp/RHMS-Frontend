import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RxCross2 } from "react-icons/rx";
import { createUser } from "../../../connection/patient";
import { useDispatch, useSelector } from "react-redux";

function AddUser({ closeModal }) {
    const token = useSelector(state => state.auth.token); // Move useSelector inside the function
    const dispatch = useDispatch();
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [dob, setDob] = useState("")
    const [gender, setGender] = useState("")
    const [weight, setWeight] = useState("")
    const [height, setHeight] = useState("")
    const [bg, setBg] = useState("")
    const [age, setAge] = useState("")
    const [error, setError] = useState("")
    const [showModal, setShowModal] = React.useState(true);

    const adduser = async (e) => {
        e.preventDefault()
        const isDateFormatValid = (dateString) => {
            const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
            return dateFormatRegex.test(dateString);
        };

        if (!fname.trim() || !dob.trim() || !gender.trim() || !bg.trim() || !height.trim() || !weight.trim()) {
            toast.error("Fill Required Field")
            setError('Fill Required Field');
            return;
        }
        if (!isDateFormatValid(dob)) {
            return toast.error("Invalied Date Format")
        }
        const userData = {
            fname: fname,
            lname: lname,
            dob: dob,
            bg: bg,
            gender: gender,
            age: age,
            weight: weight,
            height: height,
        };
        dispatch(createUser(userData, token));
        setShowModal(false)
    }
    return (
        <>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-80 my-6 mx-auto max-w-3xl">
                            <div className="mt-20 lg:ml-20 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-3 ">
                                    <h3 className="text-xl font-semibold">
                                        Add new Member
                                    </h3>
                                    <button onClick={closeModal}>
                                        <RxCross2 className="w-5 h-5 m-1" />
                                    </button>
                                </div><hr />
                                <div className="mt-3 mb-5 relative px-6 flex-auto">
                                    {/* <p className="text-red-600 hover:underline hover:underline-offset-4">{error}</p> */}
                                    <input
                                        className="text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                        type="text"
                                        placeholder="First Name"
                                        value={fname}
                                        onChange={e => setFname(e.target.value)}
                                        name="fname" />
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
                                        className=" mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                        value={bg}
                                        onChange={e => setBg(e.target.value)}
                                        name="gender">
                                        <option value="">Blood Group</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                    </select>
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
                                        placeholder="Age"
                                        value={age}
                                        onChange={e => setAge(e.target.value)}
                                        name="age" />
                                    <input
                                        className="mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                        type="number"
                                        placeholder="Height"
                                        value={height}
                                        onChange={e => setHeight(e.target.value)}
                                        name="height" />
                                    <input
                                        className="mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                        type="number"
                                        placeholder="Weight"
                                        value={weight}
                                        onChange={e => setWeight(e.target.value)}
                                        name="weight" />
                                    <div className="mt-4 flex justify-between font-semibold text-sm">


                                    </div>
                                    <button
                                        className="bg-blue-500 py-1.5 w-full text-white text-sm px-6 rounded hover:bg-blue-700"
                                        type="button"
                                        onClick={adduser}>
                                        Submit
                                    </button>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
            <ToastContainer />
        </>
    );
}
export default AddUser