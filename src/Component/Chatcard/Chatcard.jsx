import React from "react";

const Chatcard = ({ userImg, name, timestamp, message }) => {
  return (
    <div className="flex items-center justify-center py-2 group cursor-pointer">
      <div className="w-[20%]">
        <img
          className="h-14 w-14 rounded-full"
          src={userImg}
          alt=""
        />
      </div>
      <div className="pl-5 w-[80%]">
        <div className="flex justify-between items-center">
          <p className="text-lg">{name}</p>
          <p className="time-sm">{timestamp}</p>
        </div>
        <div className="flex justify-between items-center   ">
          <p>{message}</p>
          <div className="flex space-x-2 items-center">
            <p className="text text-xs py-1 px-2 text-white bg-red-950 rounded-full">5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatcard;
