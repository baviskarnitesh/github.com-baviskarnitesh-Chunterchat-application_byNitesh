import React from 'react';
import { useNavigate } from 'react-router-dom';
export
 const StatusUserCard = ({user}) => {
    const navigate=useNavigate();

    const handleNavigate=()=>{
        navigate(`/status/{userId}`)
    }
  return (
    <div onClick={handleNavigate} className='flex items-center p-3 cursor-pointer'>
        <div>
            <img className='h-7 w-7 lg:h-10 lg:w-10 rounded-full' src={user?.profile_picture}  alt="" />
        </div>
        <div className='ml-2 text-white'>
            <p>{user?.full_name}</p>
        </div>
    </div>
  )
}
export default StatusUserCard