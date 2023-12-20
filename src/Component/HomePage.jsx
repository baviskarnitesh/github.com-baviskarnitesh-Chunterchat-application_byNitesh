
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EmojiPicker from 'emoji-picker-react';
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { BsEmojiSmile, BsFilter, BsMicFill, BsThreeDotsVertical } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { TbCircleDashed } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { LogoutAction, currentUser, searchUser } from "../Redux/Auth/Action";
import { createChat, getUsersChat } from "../Redux/Chat/Action";
import { createMessage, getAllMessageS } from "../Redux/Message/Action";
import Chatcard from "./Chatcard/Chatcard";
import CreateGroup from "./Group/CreateGroup";
import "./HomePage.css";
import MessageCard from "./MessageCard/MessageCard";
import { default as Profile } from "./Profile/Profile";
//import SimpleSnackbar from "./SimpleSnackbar";
const HomePage = () => {
  const { auth, chat, message } = useSelector(store => store);
  const [query, setQuery] = useState(null);

  const [currentChat, setCurrentChat] = useState(null);


  const [content, setContent] = useState("");

  const [isProfile, setIsProfile] = useState(false);

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const [isMenuopen, setIsMenuOpen] = useState(false);

  const [isGroup, setIsGroup] = useState(false)

  const [anchorEl, setAnchorEl] = useState(null);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const dispatch = useDispatch();


  const token = localStorage.getItem("token");
  const [messages, setMessages] = useState([]);

  const open = Boolean(anchorEl);

  const [stompClient, setStompClient] = useState();
  const [isConnect, setIsConnect] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const connect = () => {
    const sock = new SockJS("http://localhost:8383/ws");
    const temp = over(sock);
    setStompClient(temp);

    const headers = {
      Authorization: `Bearer ${token}`,
      "X-XSRF-TOKEN": getcookie("XSRF-TOKEN")
    }

    temp.connect(headers, onConnect, onErr);

  }
  function getcookie(name) {

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`)

    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  }

  const onErr = (error) => {
    console.log("on error", error);
  }

  const onConnect = () => {
    setIsConnect(true)
  }



  const handleEmojiClick = (_, emojiObject) => {
    // Handle the selected emoji
    console.log("Selected Emoji:", emojiObject?.emoji);
    const selectedEmoji = emojiObject.emoji;
    setSelectedEmoji(selectedEmoji);
    setContent((prevContent) => prevContent + selectedEmoji);
  };

  useEffect(() => {
    if (message.newMessage && stompClient) {
      setMessages([...messages, message.newMessage])
      stompClient?.send("/app/message", {}, JSON.stringify(message.newMessage));
    }
  }, [message.newMessage])

  const OnMessageRecieve = (payload) => {

    console.log("onMessageRecive ............. -----------", payload);

    console.log("recieve message--------", JSON.parse(payload.body))

    const recievedMessage = JSON.parse(payload.body);
    setMessages([...messages, recievedMessage]);
  }

  useEffect(() => {
    connect();

    // Cleanup WebSocket connection on component unmount
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  const sendMessageToServer = () => {
    if (stompClient && content.trim() !== "") {
      const value = {
        content,
        chatId: currentChat?.id,
      };
      console.log("---- send message --- ", value);
      stompClient.send(`/app/chat/${currentChat?.id.toString()}`, {}, JSON.stringify(value));
    }
  };

  useEffect(() => {
    if (isConnect && stompClient && auth.reqUser && currentChat) {
      const subscription = stompClient.subscribe(
        `/user/${currentChat?.id}/private`, OnMessageRecieve);

      stompClient.subscribe(
        "/group/" + currentChat.id.toString(),
        OnMessageRecieve
      );
      return () => {
        subscription.unsubscribe();
      }
    }

  })





  useEffect(() => {
    setMessages(message.messages)
  }, [message.messages])
  const handleBack = () => {
    // Implemented the logic to go back
    console.log("handleBack clicked");

    //  the navigate function to go back
    navigate(-1); // This navigates back one step in the history
  };




  const handleClick = (e,) => {
    setAnchorEl(e.currentTarget);
    setIsMenuOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setIsMenuOpen(false);
  };


  const handleClickOnChatCard = (userId) => {

    dispatch(createChat({ token, data: { userId } }))
    setQuery("");
  };

  const handleSearch = (keyword) => {
    dispatch(searchUser({ keyword, token }))
  };

  const handleCreateNewMessage = () => {
    console.log("currentChat", currentChat);
    console.log("content", content);

    dispatch(createMessage({
      token,
      data: { chatId: currentChat.id, content: content }
    }));
    console.log("CREATE NEW MESSAGE");

    // Reset content after creating a new message
    setContent("");
    sendMessageToServer();
  };

  useEffect(() => {
    dispatch(getUsersChat({ token }))
  }, [chat.createdChat, chat.CreatedGroup])

  useEffect(() => {
    console.log("Current Chat ID:", currentChat?.id);
    console.log("Messages:", message.messages);
    if (currentChat?.id)
      dispatch(getAllMessageS({ chatId: currentChat.id, token }));
  }, [currentChat, message.newMessage])

  const handleNavigate = () => {
    setIsProfile(true);
  }
  const handleCloseOpenProfile = () => {
    setIsProfile(false);
  }
  const handleCreateGroup = () => {
    setIsGroup(true)
  }

  useEffect(() => {
    dispatch(currentUser(token))

  }, [token])

  const handleLogout = () => {
    dispatch(LogoutAction())
    navigate("/signup")
  }
  useEffect(() => {
    if (!auth.reqUser) {
      navigate("/signup")
    }
  }, [auth.reqUser])

  const handleCurrentChat = (item) => {

    setCurrentChat(item)
  }
  console.log("current chat", currentChat);



  return (
    <div className='relative '>
      <div className='  w-full py-14 bg-[#800000] '>
      </div>
      <div className='flex bg-[#f0f2f5] h-[90vh]   absolute left-[2vw] top-[5vh]  w-[96vw] '>
        <div className='left  w-[30%] bg-[#e8e9ec] h-full'>

          {/*profile */}
          {isGroup && <CreateGroup handleBack={handleBack} setIsGroup={setIsGroup} />}
          {isProfile && (<div className="w-full h-full">
            {" "}
            <Profile handleCloseOpenProfile={handleCloseOpenProfile} />
          </div>)}
          {!isProfile && !isGroup && (<div className="w-full">


            {/*home*/}
            {<div className="flex justify-between items-center p-3">


              <div
                onClick={handleNavigate}
                className="flex items-center space-x-3">

                <img className='rounded-full w-10 h-10 cursor-pointer'

                  src={auth?.reqUser || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="" />
                <p>{auth?.reqUser?.full_name}</p>

              </div>
              <div className='space-x-3 text-2xl flex' >
                <TbCircleDashed className="cursor-pointer" onClick={() => navigate("/status")} />
                <BiCommentDetail />
                <div>


                  <BsThreeDotsVertical
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick} />



                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={isMenuopen}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={handleClose}>------ </MenuItem>
                    <MenuItem onClick={handleCreateGroup}>CreateChunterGroup</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>

                </div>

              </div >
            </div >}
            <div className="relative  flex justify-center items-center bg-white py-4 px-3">
              <input className="border-none outline-none bg-slate-200  rounded-md w-[93%] pl-9 py-2"
                type="text"
                placeholder="search or start new chat"
                onChange={(e) => {
                  setQuery(e.target.value)
                  handleSearch(e.target.value)
                }}
                value={query}
              />
              <AiOutlineSearch className=" left-5 top-7 absolute" />
              <div>
                <BsFilter className="ml-4 text-3xl" />
              </div>
            </div>
            {/* aLL user*/}
            <div className="bg-white overflow-y-scroll h-[72vh] px-3">
              {query &&
                auth.searchUser?.map((item) => (
                  <div key={item.id} onClick={() => handleClickOnChatCard(item.id)}>
                    {" "}
                    <hr />
                    <Chatcard
                      name={item.full_name}
                      userImg={
                        item.profile_picture ||
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                      }
                    />
                  </div>))}

              {chat.chats.length > 0 && !query &&
                chat.chats?.map((item) => (
                  <div key={item.id} onClick={() => handleCurrentChat(item)}>

                    <hr />

                    {item.is_group ? (
                      <Chatcard
                        name={item.chat_name}
                        userImg={
                          item.chat_image ||
                          "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_640.png"
                        }
                      />
                    ) : (
                      <Chatcard
                        key={item.id}
                        isChat={true}
                        name={
                          auth.reqUser?.id !== item.users[0]?.id
                            ? item.users[0].full_name
                            : item.users[1].full_name
                        }
                        userImg={
                          auth.reqUser.id !== item.users[0].id
                            ? item.users[0].profile_picture ||
                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                            : item.users[1].profile_picture ||
                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                        }

                      />
                    )}
                  </div>))}

            </div>

          </div>)}
        </div>
        {/*deafult  chunterchat page*/}
        {!currentChat && <div className="w-[70%] flex flex-col items-center justify-center">

          <div className=" max-w-[70%] text-center">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT1m2nrYhDmd3vVvZx3uXscv2hidCSKNCvXA&usqp=CAU" alt="" />
            <h1 className="text-4xl text-gray-600" >ChunterChat-Web</h1>
            <p className="my-9">....Connecting the souls... </p>
          </div>
        </div>
        }

        {/*{message-part}*/}

        {currentChat && <div className="w-[70%] relative bg-purple-200">
          <div className="header absolute top-0 w-full bg-[#f0f2f5]">
            <div className="flex justify-between">
              <div className="py-3 space-x-4  flex items-center px-3">
                <img className="w-10 h-10 rounded-full"
                  src={currentChat.is_group ? currentChat.chat_image || "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_640.png" : (auth.reqUser.id !== currentChat.users[0].id
                    ? currentChat.users[0].profile_picture ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                    : currentChat.users[1].profile_picture ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png")} alt="" />
                <p>
                  {currentChat.is_group ? currentChat.chat_name : (auth.reqUser?.id === currentChat.users[0].id ? currentChat.users[1].full_name : currentChat.users[0].full_name)}


                </p>
              </div>
              <div className="py-3  flex space-x-4 items-center px-3">
                <AiOutlineSearch /> {/* for search icon*/}
                <BsThreeDotsVertical />
              </div>
            </div>
          </div>
          {/*  message section */}
          <div

            className="px-10 h-[85vh] overflow-y-scroll ">
            <div className="space-y-1 flex flex-col justify-center mt-20 py-2">
              {messages.length > 0 && messages?.map((item, i) => (

                <MessageCard
                  key={i}
                  isReqUserMessage={item.user.id !== auth.reqUser.id}
                  content={item.content}
                  timestamp={item.timestamp}
                />
              ))}


            </div>
          </div>
          {/* footer part */}

          <div className="footer bg-[#f0f2f5] absolute bottom-0 w-full py-0 text-2xl">
            <div className="flex justify-between items-center px-5 relative">
              <BsEmojiSmile onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)} />

              {isEmojiPickerOpen && (
                <div style={{ position: 'absolute', bottom: '80px', right: '0' }}>
                  <EmojiPicker
                    onEmojiClick={(event, emojiObject) => {
                      handleEmojiClick(event, emojiObject);
                      setIsEmojiPickerOpen(false); // Close the picker after selecting an emoji
                    }}
                  />
                </div>
              )}

              <ImAttachment />
              <input
                className="py-2 outline-none border-none bg-white pl-4 rounded-md w-[85%]"
                type="text"
                onChange={(e) => setContent(e.target.value)}
                placeholder="Type message"
                value={content + (selectedEmoji || '')}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleCreateNewMessage();
                    setContent('');
                    setSelectedEmoji(null);
                  }
                }}
              />
              <BsMicFill />
            </div>
          </div>


        </div>}

      </div>

    </div>
  );
};

export default HomePage