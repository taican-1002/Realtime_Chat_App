// react
import React, { useEffect, useState, useRef } from "react";
// styled
import styled from "styled-components";
//axios
import axios from "axios";
//react router dom
import { useNavigate } from "react-router-dom";
// utils
import { allUsersRoute } from "../utils/apiRoutes";
// socket io
import { io } from "socket.io-client";
//component
import Contact from "../components/Contact";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

const Chat = () => {
  const socketRef = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  //socket emit
  useEffect(() => {
    if (currentUser) {
      socketRef.current = io(process.env.REACT_APP_API_URL);
      socketRef.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  // set currentUser
  useEffect(() => {
    const handleSetCurrentUser = async () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/login");
      } else {
        await setCurrentUser(
          JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
        );
      }
    };
    handleSetCurrentUser();
  }, [navigate]);

  // set Contact
  useEffect(() => {
    const handleSetContacts = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    handleSetContacts();
  }, [currentUser, navigate]);

  //change chat
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        <Contact contacts={contacts} changeChat={handleChatChange} />
        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            socketRef={socketRef}
          />
        )}
      </div>
    </Container>
  );
};

export default Chat;
