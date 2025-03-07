import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useState } from 'react';
import { MoonIcon, SunIcon, PersonIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router';


const Header = () => {
  const [theme , setTheme] = useState(false);
  const [token , setToken] = useState(localStorage.getItem('authorization'));
  const [isAdmin , setIsAdmin] = useState(false);
  const [isSignup , setIsSignup] = useState(false);
  const navigate = useNavigate();
  console.log(token);

  return (<div className="flex text-amber-300 flex-row justify-evenly p-3 h-20">
  <div className='w-[50%] flex justify-center items-center gap-2' onClick={() => navigate('/')}>
      <img src="https://app.100xdevs.com/favicon.ico" alt="logo" className='h-10'/>
      <span className='text-blue-500 text-xl font-bold pr-20'>100xdevs</span>
  </div>
  {token === "" ? <div className='w-[50%] flex flex-row justify-center items-center gap-4 pl-18 '>
    <div onClick={() => setTheme(!theme)} className='items-center mr-4'>
      {theme ? <SunIcon className='w-6 h-7'/> : <MoonIcon  className='w-6 h-7 '/>}
    </div>
      <button className='px-3.5 py-3 bg-white text-black rounded-xl ' onClick={() => navigate('/login')}>Login</button>
      <button className='px-3.5 py-3 bg-blue-500 text-white rounded-xl' onClick={() => navigate('/signup')}>Join now</button>
  </div> : <div className='w-[50%] flex flex-row justify-center items-center gap-6 pl-18 '>
    <input type="text" placeholder='Search' className='p-4 bg-[#2E323C] w-1/2 rounded-3xl' />
    <div onClick={() => setTheme(!theme)} className='items-center'>
      {theme ? <SunIcon className='w-6 h-7'/> : <MoonIcon  className='w-6 h-7 '/>}
    </div>
    <PersonIcon className='w-6 h-7'/>
  </div>}
  </div>)
}

export default Header;