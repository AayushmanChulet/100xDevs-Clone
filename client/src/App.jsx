// firstly, Don't get overwhelmed and if you are then go with client-easy.
import { useState } from "react"
import Header from "./components/header"
import Login from "./components/Login"
import Home from "./pages/Home"
import Courses from "./components/Courses";
function App({isAdmin}) {
  const [token , setToken] = useState(localStorage.getItem('authorization'));
  const [isSignup, setIsSignup] = useState(false);
  return (<>
    {token != null ? <Home token={token} isAdmin={isAdmin}/> : <Login setToken={setToken} isAdmin={isAdmin} isSignup={isSignup} setIsSignup={setIsSignup}/>}
    </>)
}

export default App
