//react
import React, { useState } from "react";
//react icon
import { SmileFilled, SendOutlined } from "@ant-design/icons";
//styled
import styled from "styled-components";
//emoji picker
import Picker from "emoji-picker-react";
//antd icon
import { UploadOutlined } from "@ant-design/icons";
import { Upload } from "antd";
//toast
import { toast } from "react-toastify";

const Container = styled.div`
  display: flex;
  align-items: center;
  /* grid-template-columns: 10% 90%; */
  background-color: #080420;
  padding: 0 2rem;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #e5e5e5;
        box-shadow: 0 5px 10px #e5e5e5;
        border-color: #e5e5e5;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #ccc;
          width: 5px;
          &-thumb {
            background-color: #000;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
          color: #000;
        }
        .emoji-group:before {
          background-color: #ccc;
          color: #000;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      cursor: pointer;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;

const ChatInput = ({ handleSendMsg }) => {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [fileList, setFileList] = useState([]);

  const props = {
    onRemove: (file) => {
      setFileList(fileList.filter((item) => item.uid !== file.uid));
    },
    beforeUpload: (file) => {
      if (file.size > 5242880) {
        toast.error("File upload must be less than 5MB");
      } else {
        setFileList([...fileList, file]);
      }
      return false;
    },
    fileList,
  };
  // const onUploadFile = async (options) => {
  //   const { onSuccess, onError, file, onProgress } = options;
  //   const data = new FormData();
  //   data.append("file", file);
  //   try {
  //     const res = await axios.post(uploadSingleFileRoute, data);
  //     onSuccess("Ok");
  //     setFileList([...fileList, res.data]);
  //     console.log("server res: ", res);
  //   } catch (err) {
  //     // console.log("Error: ", err);
  //     onError({ err });
  //   }
  // };

  //set ShowEmojiPicker
  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  //click choose Emoji
  const handleEmojiClick = (event, emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };
  // send chat
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0 || fileList.length > 0) {
      setShowEmojiPicker(false);
      handleSendMsg({
        text: msg,
        files: fileList,
      });
      setMsg("");
      setFileList([]);
    }
  };
  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <SmileFilled onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <Upload
        {...props}
        // onChange={onChange}
        className="relative flex flex-col-reverse px-4"
      >
        <UploadOutlined className="px-4 py-2 text-lg bg-white rounded-full cursor-pointer" />
      </Upload>
      <form
        className="input-container"
        onSubmit={(event) => sendChat(event)}
        encType="multipart/form-data"
      >
        <input
          type="text"
          placeholder="Type your message here"
          value={msg}
          onChange={(event) => setMsg(event.target.value)}
        />
        <button className="submit">
          <SendOutlined />
        </button>
      </form>
    </Container>
  );
};

export default ChatInput;
