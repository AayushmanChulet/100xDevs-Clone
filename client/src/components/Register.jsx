// register code here
import React, { useState } from 'react'
import axios from "axios"


const Register = ({signupAs}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // call the functions onClick of button.
    async function handleRegister() {
        const resposne = await axios.post(`http://localhost:3300/${signupAs}/login`, {
            username: email, 
            password
        }); 
        console.log(resposne);
        setEmail('');
        setPassword('');
        localStorage.setItem('authorization', resposne.data.token);
        setToken(resposne.data.token);
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
            <button className='bg-blue-500 rounded-lg p-2' onClick={() => handleRegister()}> Login </button>
        </div>
    )
}

export default Register