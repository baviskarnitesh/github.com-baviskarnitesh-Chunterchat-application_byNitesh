import React from 'react'

const MessageCard = ({ isReqUserMessage, content }) => {
    return (
        
        <div className={`py-2 px-3 rounded-md ${isReqUserMessage ? "self-start bg-white" : "self-end bg-[#FFB6C1]"}`}>
            <p>{content}</p>
        </div>
    )
}

export default MessageCard