import React, { useEffect, useRef, useState } from "react";
import { ChatService } from "../../services/socket-services/chat.service";
import "./Chat.scss";
import { Message } from "./Message/Message";
import { MessageInput } from "./MessageInput/MessageInput";
import { getCollaborationLinkData } from "./../../excalidraw-app/data/index";
import { IUserDetail } from "../../models/user-detail.model";
import { getUserDetails } from "../../services/auth-service";

type ChatProps = {
  children?: React.ReactNode;
  isCollaborating: boolean;
};

export const Chat: React.FC<ChatProps> = ({ isCollaborating }) => {
  const [isChatVisible, setIsChatVisible] = useState<boolean>(false);
  const [roomData, setRoomData] = useState<String[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [userDetails, setUserDetails] = useState<IUserDetail>({
    name: "",
    username: "",
  });

  const messagesEndRef = useRef<any>();

  useEffect(() => {
    getUserDetails() && setUserDetails(getUserDetails());
    const roomMatch = getCollaborationLinkData(window.location.href);
    if (roomMatch) {
      setRoomData(roomMatch);
    }
  }, []);

  useEffect(() => {
    console.info("Restarting");
    const chatService = ChatService.chatService;
    chatService.listenNewMessages((response: any) => {
      setMessages([...messages, response]);
      scrollToBottom();
      console.info(messages);
    });

    return () => {
      console.info("Going Off");
      chatService.offNewMessages();
    };
  }, [messages]);

  const sendMessageHandler = (messgae: string) => {
    ChatService.chatService.sendMessage({
      from: userDetails.name,
      userType: "1",
      userName: userDetails.username,
      text: messgae,
      group: roomData[1],
    });
  };

  const renderChatButton = () => {
    return (
      <div className="cmp-chat" onClick={() => setIsChatVisible(true)}>
        <i className="fa fa-commenting fa-2x" aria-hidden="true"></i>
      </div>
    );
  };

  const renderChatBox = () => {
    return (
      <div className="cmp-chat">
        <div className="chat-header border-bottom p-2">
          <div className="d-flex justify-content-between">
            <div className="chat-title text-center">
              <strong>Chat</strong>
            </div>
            <div onClick={() => setIsChatVisible(false)}>
              <i className="fa fa-times-circle" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <div className="message-block">
          {messages.map((msg, index) => {
            return (
              <Message
                key={index}
                isOwnMessage={userDetails.username === msg.userName}
                messageObj={msg}
              />
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-footer">
          <MessageInput sendMessage={sendMessageHandler} />
        </div>
      </div>
    );
  };

  const scrollToBottom = () => {
    if (messagesEndRef !== undefined) {
      // messagesEndRef.current!.scrollIntoView({ behavior: "smooth" });
    }
  };
  return isChatVisible ? renderChatBox() : renderChatButton();
};
