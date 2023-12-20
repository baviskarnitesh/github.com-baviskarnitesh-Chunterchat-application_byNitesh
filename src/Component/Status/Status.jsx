import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
//import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import StatusUserCard from './StatusUserCard';

const Status = () => {

  //const dispatch = useDispatch();
  const { auth, chat, message } = useSelector((store) => store);

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1)
  }
  const user = [
    { profile_picture: "https://cdn.pixabay.com/photo/2022/11/19/10/00/tiger-7601733__340.jpg", full_name: "lione" },
    { profile_picture: "https://cdn.pixabay.com/photo/2023/04/11/18/31/duck-7917949__340.jpg", full_name: "aman" }
  ]
  return (
    <div>
      <div className=' flex items-center  px-[14vw] py-[7vh]'>
        {/* left side part */}
        <div className='left h-[85vh] bg-[#1e262c] lg:w-[30%]  w-[50%] px-5'>
          <div className='pt-5 h-[13%] '>
            <StatusUserCard user={auth.reqUser} />
          </div>

          <hr />
          <div className='overflow-y-scroll h-[86%] pt-2'>
            {user.map((item) => <StatusUserCard user={item} />)}
          </div>
        </div>

        {/* right side part */}
        <div className='relative h-[85vh] lg:w-[70%] w-[50%] bg-[#0b141a]'>
          <AiOutlineClose onClick={handleNavigate} className='text-white cursor-pointer absolute top-5 right-10 text-xl' />
        </div>

      </div>
    </div>
  )
}

export default Status