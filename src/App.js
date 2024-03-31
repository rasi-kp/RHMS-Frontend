import './App.css';
import Home from  "./Pages/home/Home";
import Login from "./Pages/home/Login"
import Signup from "./Pages/home/Signup"
import Forgotten from './Pages/home/Forgotten'
import Doctor from './Pages/home/doctor'
import Doctorlogin from './Pages/home/doctorlogin'
import Error from './Pages/404/404'
import Patient from './Pages/patients/Dashboard'
function App() {
  return (
    <div>
      {/* <Home/> */}
      {/* <Forgotten/> */}
      {/* <Signup/> */}
      {/* <Login/> */}
      {/* <Doctorlogin/> */}
      {/* <Error/> */}
      <Patient/>
    </div>
  );
}

export default App;
