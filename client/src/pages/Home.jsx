//  implement the home page UI here.
import React, { useEffect, useState } from 'react'

// compoents imports
import Login from '../components/Login'
import Register from '../components/Register'
import Courses from '../components/Courses'
import axios from 'axios'
import Card from '../components/card'
import { useNavigate } from 'react-router';
const Home = ({token, isAdmin}) => {
  const navigate = useNavigate();
  const [user , setUser] = useState([]);
  useEffect(()=>{
    const getData = async () => {
      const data = await axios.get('http://localhost:3300/user/purchasedCourses', {
        headers : {
          authorization : token,
        }
      })
      setUser(data.data.user);
      console.log(data.data.user);
    }
    getData();
  }, []);
  return (
    //  write home page UI code here
    <div className=''>
      <div className='flex flex-row justify-between'>
        <span className='text-white text-4xl font-medium'>
          Hey, {user.username}
        </span>
        {isAdmin && <button className='bg-blue-500 rounded-lg p-2 text-white' onClick={() => navigate('/admin/create')}>Add a Course</button>}
      </div>
      <div className='grid grid-cols-3 '>
        {user?.coursesAccess?.length > 0 && user?.coursesAccess?.map(e => {
          return(<Card id={e._id} title={e.title} imageLink={e.imageLink}  key={e._id} isAdmin={isAdmin} />)
        })}
      </div>
    </div>
  )
}

export default Home