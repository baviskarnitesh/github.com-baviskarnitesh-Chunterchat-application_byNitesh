import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { stories } from './DummyStories';
import ProgressBar from './ProgressBar';
const StatusViewer = () => {
    const [currentStoryIndex, setcurrentStoryIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);

    const navigate = useNavigate();

    const handleNextStory = () => {


        if (currentStoryIndex < stories?.length - 1) {
            setcurrentStoryIndex(currentStoryIndex + 1)
            setActiveIndex(activeIndex + 1)
        }
        else if (currentStoryIndex === stories?.length - 1) {
            setcurrentStoryIndex(0);
            setActiveIndex(0);
        }
    }
    useEffect(() => {
        const intervalId = setInterval(() => {
            handleNextStory()
        }, 3000)
        return () => clearInterval(intervalId);
    }, [currentStoryIndex]);

    console.log("story ---- ", stories);


    const handleNavigate = () => {
        navigate(-1)
    }
    return (
        <div className='w-full'>
            <div 
            className=' relative flex justify-center items-center h-[100vh] bg-slate-900'>
                <div className='relative'>

                     {/* Story image */}
                    <img className='max-h-[96vh] object-contain' 
                    src={stories?.[currentStoryIndex].Image} 
                    alt="stories" />

                    {/* story progress bar */}
                    <div className='absolute top-0 flex w-full'>
                        {stories.map((item, index) => (
                        <ProgressBar key={index}
                         duration={3000}
                          index={index}
                           activeIndex={activeIndex} />))}

                    </div>
                </div>
                <div>
                    <BsArrowLeft onClick={handleNavigate} className=' text-white text-2xl cursor-pointer absolute top-10 left-10' />
                    <AiOutlineClose onClick={handleNavigate} className='text-white text-2xl cursor-pointer absolute top-10 right-10' />
                </div>
            </div>
        </div>
    )
}

export default StatusViewer