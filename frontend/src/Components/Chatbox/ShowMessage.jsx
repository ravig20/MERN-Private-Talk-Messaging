import { Avatar } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useRef } from "react";
const ShowMessage = ({ FatchMessageData }) => {
    const scrollTofeedRef = useRef(); 
    const { meinfo } = useSelector((store) => store.Medata);  // 
    const isSameSender = (chatArray, message, index, userId) => {
        return (
            index < chatArray.length - 1 &&
            (
                (chatArray[index + 1].sender._id !== message?.sender._id ||
                    chatArray[index + 1].sender?._id === undefined) &&
                chatArray[index].sender?._id !== userId
            )
        );
    };

    const isLastMessage = (chatArray, index, userId) => {
        return (
            (index === chatArray.length - 1 &&
                chatArray[chatArray.length - 1].sender._id !== userId) &&
            chatArray[chatArray.length - 1].sender._id
        )
    };


    const isSameSenderMargin = (chatArray, message, index, userId) => {
    

        if (
            index < chatArray.length - 1 &&
            chatArray[index + 1].sender._id === message.sender._id &&
            chatArray[index].sender._id !== userId
        )
            return 33;
        else if (
            (index < chatArray.length - 1 &&
                chatArray[index + 1].sender._id !== message.sender._id &&
                chatArray[index].sender._id !== userId) ||
            (index === chatArray.length - 1 && chatArray[index].sender._id !== userId)
        )
            return 0;
        else return "auto";
    };
     const isSameUser = (chatArray, message, index) => {
        return index > 0 && chatArray[index - 1]?.sender?._id === message?.sender?._id;
      };

      useEffect(()=>{
        scrollTofeedRef?.current?.scrollIntoView({transition:"smooth"});
      },[FatchMessageData])
      
    return (
        <>
            {
                FatchMessageData && FatchMessageData?.map((message, index) => (
                    <div key={index} style={{ display: "flex" }} ref={scrollTofeedRef} >
                        {
                            (isSameSender(FatchMessageData, message, index, meinfo?.data?._id) || isLastMessage(FatchMessageData, index, meinfo?.data?._id)) && (

                                <Avatar
                                    mt="7px"
                                    color="red"
                                    mr={1}
                                    size="sm"
                                    cursor="pointer"
                                    name={message?.sender.name}
                                    src={message?.sender.pic.url}
                                />

                            )
                        }

                        <samp style={{
                            backgroundColor: `${message?.sender._id === meinfo?.data?._id ? "#BEE3F8" : "#B9F5D0"
                                }`,
                            borderRadius: "20px",
                            padding: "5px 15px",
                            maxWidth: "75%",
                            marginLeft:isSameSenderMargin(FatchMessageData, message, index, meinfo?.data?._id),
                            marginTop:isSameUser(FatchMessageData, message, index)
                            

                        }}>

                            {message.content}
                        </samp>

                    </div>
                ))
            }

        </>
    )
}

export default ShowMessage