//react
import React, { useEffect, useState, useRef, useCallback } from "react";
//styled
import styled from "styled-components";
//component
import ChatInput from "./ChatInput";
import Logout from "../Logout";
//utils
import {
  sendMessageRoute,
  getAllMessagesRoute,
  deleteMessageRoute,
} from "@/utils/apiRoutes";
//axios
import axios from "axios";
import { downloadFileRoute } from "../../../../utils/apiRoutes";
//antd
import { Popconfirm } from "antd";
//antd icon
import { PaperClipOutlined, DeleteFilled } from "@ant-design/icons";

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  height: 85vh;
  background-color: #fff;
  border-radius: 15px;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .ant-popover-open {
    display: block !important;
    box-shadow: none !important;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: #000;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    /* gap: 1rem; */
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #000;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      /* display: flex; */
      /* align-items: center; */
      /* flex-direction: column; */
      .message-text,
      .message-file {
        margin: 14px 0;
        display: flex;
        align-items: center;
        &:hover {
          .del-icon {
            display: block;
          }
        }
        .del-icon {
          transition: all 0.3s ease-in-out;
          margin: 0 18px;
          display: none;
        }
      }

      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      /* align-items: flex-end; */
      .message-text,
      .message-file {
        justify-content: flex-end;
      }
      .content {
        background-color: #4e426d;
        span {
          color: #fff;
        }
        p {
          color: #fff;
          word-break: break-all;
        }
        .content-file:hover {
          span,
          p {
            color: #1890ff;
          }
        }
      }
    }
    .received {
      /* align-items: flex-start; */
      .message-text,
      .message-file {
        justify-content: flex-end;
        flex-direction: row-reverse;
      }
      .content {
        background-color: #f5f7fb;
        p {
          color: #000;
          word-break: break-all;
        }
        .content-file:hover {
          span,
          p {
            color: #1890ff;
          }
        }
      }
    }
  }
`;

const ChatContainer = ({ currentChat, currentUser, socketRef }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  //pop confirm
  const text = "Bạn có muốn xóa tin nhắn này?";

  //set Messages
  const handleSetMsg = useCallback(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const response = await axios.post(getAllMessagesRoute, {
      from: data._id,
      to: currentChat._id,
    });
    setMessages(response.data);
  }, [currentChat._id]);
  useEffect(() => {
    handleSetMsg();
  }, [currentChat, currentUser, handleSetMsg]);

  //send Messages
  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const sendData = new FormData();
    sendData.append("from", data._id);
    sendData.append("to", currentChat._id);
    sendData.append("message", msg.text);
    if (msg?.files.length > 0) {
      for (let i = 0; i < msg.files.length; i++) {
        sendData.append("files", msg.files[i]);
      }
    }
    await axios.post(sendMessageRoute, sendData);
    // setSubFile(msg.files.map((item) => subFile.push(item.name)));
    socketRef.current.emit("send-msg", {
      from: currentUser._id,
      to: currentChat._id,
      message: {
        text: msg.text.trim(),
        files: msg.files,
        // subFile: subFile,
      },
    });

    const msgs = [...messages];
    msgs.push({
      fromSelf: true,
      message: {
        text: msg?.text.trim(),
        files: msg?.files,
        // subFile: subFile,
      },
    });
    setMessages(msgs);
    handleSetMsg();
  };
  //set arrival messages
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("msg-receive", (msg) => {
        setArrivalMessage({
          fromSelf: false,
          message: {
            text: msg.text?.trim(),
            files: msg?.files,
            // subFile: msg.subFile,
          },
        });
        handleSetMsg();
      });
    }
  }, [socketRef, handleSetMsg]);

  // render and set message
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    handleSetMsg();
  }, [arrivalMessage, handleSetMsg]);
  //scroll every time have a new message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  });
  // download file
  const handleDownloadFile = async (name) => {
    try {
      const response = await axios.get(downloadFileRoute + "/" + name, {
        responseType: "blob",
      });
      if (response.data.error) {
        console.error(response.data.error);
      }

      var fileName = response.headers["content-disposition"];
      const fileNameFinal = fileName.split("; ")[1].split("=")[1];
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileNameFinal); //or any other extension
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  //delete message
  const handleDeleteMessage = async (messId) => {
    await axios.delete(deleteMessageRoute + "/" + messId);
    handleSetMsg();
  };

  return (
    <Container>
      <div className="shadow chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        {/* <VideoCall /> */}
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            ref={scrollRef}
            key={index}
            className={`${
              message.message.files &&
              message.message.text &&
              message.message.text.length === 0
                ? "hidden"
                : "block"
            }`}
          >
            <div
              className={`message ${message.fromSelf ? "sended" : "received"}`}
            >
              {message.message.text &&
                message.message.text.length > 0 &&
                message.message.text.trim() && (
                  <div className="message-text">
                    <Popconfirm
                      placement="top"
                      title={text}
                      onConfirm={() => handleDeleteMessage(message.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteFilled className="text-xl del-icon hover:text-blue-500 hover:cursor-pointer" />
                    </Popconfirm>
                    <div className="content">
                      <span>{message.message?.text}</span>
                    </div>
                  </div>
                )}
              {message.message.files && (
                <div className="message-file">
                  <Popconfirm
                    placement="top"
                    title={text}
                    onConfirm={() => handleDeleteMessage(message.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteFilled className="text-xl del-icon hover:text-blue-500 hover:cursor-pointer" />
                  </Popconfirm>

                  <div className=" content">
                    {message.message.files.type?.split("/")[0] === "image" && (
                      <img
                        src={
                          process.env.REACT_APP_API_URL +
                          "/" +
                          message.message.files.path
                        }
                        alt="preview-img"
                        className="w-full mb-2 cursor-pointer max-h-40"
                        onClick={() =>
                          handleDownloadFile(message.message.files.path)
                        }
                      />
                    )}

                    <div className="flex items-start cursor-pointer content-file">
                      <PaperClipOutlined className="pr-2 leading-8" />
                      <p
                        onClick={() =>
                          handleDownloadFile(message.message.files.path)
                        }
                      >
                        {message.message.files.name}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
};

export default ChatContainer;
