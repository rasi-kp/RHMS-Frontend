import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RxCross2 } from "react-icons/rx";
import { edituser, updateUser } from "../../../services/patient";
import { useDispatch, useSelector } from "react-redux";

function EditUser({ closeModal, patientid }) {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const [user, setUser] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        dispatch(edituser(patientid, token))
            .then(initialData => {
                setUser(initialData);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    }, []);

    const edituserClick = async (e) => {
        e.preventDefault()
        const data=await dispatch(updateUser(user, token));
        if (data.message) {
            toast.success(`Successfully Update ${data.name}`)
          }
          setTimeout(() => {
            closeModal(true); // Close the modal by passing true
        }, 1000);
    }
    return (
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
                                value={user.first_name}
                                onChange={e => setUser({ ...user, first_name: e.target.value })}
                                name="fname" />
                            <input
                                className="mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                type="text"
                                placeholder="Last Name"
                                value={user.last_name}
                                onChange={e => setUser({ ...user, last_name: e.target.value })}
                                name="lname" />
                            <input
                                className="mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                type="text"
                                placeholder="DOB (YYYY-MM-DD)"
                                value={user.date_of_birth}
                                onChange={e => setUser({ ...user, date_of_birth: e.target.value })}
                                name="dob" />
                            <select
                                className=" mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                value={user.blood_group}
                                onChange={e => setUser({ ...user, blood_group: e.target.value })}
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
                                value={user.gender}
                                onChange={e => setUser({ ...user, gender: e.target.value })}
                                name="gender">
                                <option value="">Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <input
                                className="mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                type="number"
                                placeholder="Age"
                                value={user.age}
                                onChange={e => setUser({ ...user, age: e.target.value })}
                                name="age" />
                            <input
                                className="mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                type="number"
                                placeholder="Height"
                                value={user.height}
                                onChange={e => setUser({ ...user, height: e.target.value })}
                                name="height" />
                            <input
                                className="mt-2 text-sm w-full px-4 py-1.5 outline-none border bg-blue-50 rounded"
                                type="number"
                                placeholder="Weight"
                                value={user.weight}
                                onChange={e => setUser({ ...user, weight: e.target.value })}
                                name="weight" />
                            <div className="mt-4 flex justify-between font-semibold text-sm">


                            </div>
                            <button
                                className="bg-blue-500 py-1.5 w-full text-white text-sm px-6 rounded hover:bg-blue-700"
                                type="button"
                                onClick={edituserClick}>
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
export default EditUser