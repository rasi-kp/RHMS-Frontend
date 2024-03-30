import './App.css';
import Home from  "./Pages/Home";
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Forgotten from './Pages/Forgotten'
function App() {
  return (
    <div>
      {/* <Home/> */}
      <Forgotten/>
      <Signup/>
      <Login/>
    </div>
  );
}

export default App;
