import React, { useState } from 'react';
import {
    BsArrowRight
} from 'react-icons/bs';
import { MdArrowCircleLeft } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../../Redux/Auth/Action';
import Chatcard from '../Chatcard/Chatcard';
import NewGroup from './NewGroup';
import SelectedMembers from './SelectedMembers';

// creating Group
const CreateGroup = ({ handleBack, setIsGroup }) => {
    const [newGroup, setNewGroup] = useState(false);
    const [query, setQuery] = useState("");
    const [groupMember, setGroupMember] = useState(new Set());

    const token = localStorage.getItem("token")
    const dispatch = useDispatch();
    const { auth, } = useSelector(store => store)
    const handleRemoveMember = (item) => {

        const updatedMembers = Array.from(groupMember).filter((member) => member !== item);
        setGroupMember(new Set(updatedMembers));


    }
    const handleSearch = () => {
        dispatch(searchUser({ keyword: query, token }))
    }

    return (
        <div className='w-full h-full'>
            {
                !newGroup && (
                    <div>
                        <div className='flex items-center space-x-10 bg-[#511616] text-white pt-16 px-10 pb-5'>
                            <MdArrowCircleLeft className='cursor-pointer text-2xl font-bold'
                                onClick={() => {
                                    console.log("MdArrowCircleLeft clicked");
                                    handleBack();
                                }}
                            />
                            <p className='text-xl font-semibold'>Add Group Participants</p>
                        </div>
                        <div className='relative bg-white py-4 px-3'>
                            <div className='flex space-x-2  flex-wrap space-y-1'>
                                {groupMember.size > 0 &&
                                    Array.from(groupMember).map((item) => (
                                        <SelectedMembers
                                            handleRemoveMember={() => handleRemoveMember(item)}
                                            member={item}
                                            key={item?.id}
                                        />
                                    ))}
                            </div>
                            <input type="text" onChange={(e) => {
                                handleSearch(e.target.value)
                                setQuery(e.target.value)
                            }} className='outline-none border-b border-[#605e5e] px-2 py-2 w-[93%] '
                                placeholder='Search User'
                                value={query}
                            />
                        </div>
                        <div className='bg-white overflow-y-scroll h-[50.2vh]'>
                            {
                                query && auth.searchUser?.map((item) => <div onClick={() => {
                                    groupMember.add(item)
                                    setGroupMember(groupMember)
                                    setQuery("")
                                }}
                                    key={item?.id}
                                >
                                    <hr />
                                    <Chatcard userImg={item.profile_picture} name={item.full_name} />
                                </div>)
                            }

                        </div>
                        <div className='bottom-10 py-10 bg-slate-200  flex items-center justify-center'>
                            <div className="bg-red-800 rounded-full p-4 cursor-pointer" onClick={() => {
                                setNewGroup(true)

                            }}>
                                <BsArrowRight className='text-white font-bold text-3xl' />
                            </div>
                        </div>
                    </div>


                )}
            {newGroup && <NewGroup groupMember={groupMember} setIsGroup={setIsGroup} />}

        </div>
    )
}

export default CreateGroup