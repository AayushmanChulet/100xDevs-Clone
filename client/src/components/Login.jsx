// login code here
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';

const Login = ({isAdmin, isSignup}) => {
    // call the functions onClick of button.
    const [email, setEmail] = useState('');
    const [password , setPassword] = useState('')
    const [reload , setReload] = useState(false);
    const navigate = useNavigate();

    async function handleLogin() {
        if(isAdmin){
            const resposne = await axios.post('http://localhost:3300/admin/login',{}, {
                headers: {
                    username: email, 
                    password
                }
            });
            localStorage.setItem('authorization', resposne.data.token);
            setReload(!reload);
            navigate('/admin');
        }else{
            const resposne = await axios.post('http://localhost:3300/user/login', {
                username: email, 
                password
            });
            localStorage.setItem('authorization', resposne.data.token);
            setReload(!reload);
            navigate('/');
        }
    }

    async function handleSignup() {
        if(isAdmin){
            const resposne = await axios.post('http://localhost:3300/admin/signup',{}, {
                headers: {
                    username: email, 
                    password
                }
            });
            localStorage.setItem('authorization', resposne.data.token);
            setReload(!reload);
            navigate('/admin');
        }else{
            const resposne = await axios.post('http://localhost:3300/user/signup', {
                username: email, 
                password
            });
            localStorage.setItem('authorization', resposne.data.token);
            setReload(!reload);
            navigate('/');
        }
    }


    return (
        <div className='bg-[#1c1e25] rounded-2xl px-8 py-8 text-white flex flex-col gap-8'>
            <div className=''>
                <div className='text-center text-3xl font-medium w-full'>
                    <span className='text-white'>Welcome To</span><span className='text-blue-500'>100xDevs</span>
                </div>
                <div className='text-center text-lg font-normal text-white'>
                    Log in to access paid content!
                </div>
            </div>
            <div className='flex flex-col gap-3 '>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='Email'>Email</label>
                    <input type="text" name="Email" id="Email" placeholder='name@email.com' className='p-2 bg-[#2E323C] rounded-lg' value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='password'>Password</label>
                    <input type="password" name="password" id="password" placeholder='••••••••' className='p-2 bg-[#2E323C] rounded-lg' value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
            </div>
            {!isSignup ? <div className='w-full flex flex-col gap-2'>
                <div>New to 100xDevs? <button className='text-blue-200' onClick={() => navigate('/signup')}>Click here!</button> </div>
                <button className='bg-blue-500 rounded-lg p-2 w-full' onClick={() => handleLogin()}> Login </button>
            </div> :  <div className='w-full flex flex-col gap-2'>
                <div>Already a user? <button className='text-blue-200' onClick={() => navigate('/login')}>Click here!</button> </div>
                <button className='bg-blue-500 rounded-lg p-2 w-full' onClick={() => handleSignup()}> Signup </button>
            </div>}
            
            
        </div>
    )
}

export default Login