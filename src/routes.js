import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Pages/home/Home'
import Login from "./Pages/home/Login"
import Signup from "./Pages/home/Signup"
import Forgotten from './Pages/home/Forgotten'
import Doctors from './Pages/home/doctor'
import Doctorlogin from './Pages/home/doctorlogin'
import Otp from './Pages/home/otp'
import Error from './Pages/404/404'
import Patient from './Pages/patients/Dashboard'
import Patientsall from "./Pages/patients/Patients"
import Doctorsall from "./Pages/patients/Doctors"
import Appointmentall from "./Pages/patients/Appointments"
import Cappointment from "./Component/Patient/cappointment"
//*********** */ Doctor imports *******************
import Doctor from './Component/Doctor/Dashboard'

const routes = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />}/>
                    <Route path="/doctors" element={<Doctors />} />
                    <Route path="/dlogin" element={<Doctorlogin />} />
                    <Route path="/patient" element={<Patient />} />
                    <Route path="/forgotten"element={<Forgotten />} />
                    <Route path="/otp" element={<Otp/>} />
                    <Route path="*" element={<Error />} />
                    <Route path="/patient/members"element={<Patientsall />} />
                    <Route path="/patient/doctors"element={<Doctorsall />} />
                    <Route path="/patient/appointments"element={<Appointmentall />} />
                    <Route path="/patient/appointments/complete"element={<Cappointment />} />
                    {/*********************** Doctor Routes *******************/}
                    <Route path="/doctor" element={<Doctor />} />
                    <Route path="/doctor/patients"element={<Patientsall />} />
                    <Route path="/doctor/"element={<Doctorsall />} />
                    <Route path="/doctor/appointments"element={<Appointmentall />} />
                    <Route path="/doctor/appointments/complete"element={<Cappointment />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default routes;
