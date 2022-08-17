// react
import React, { useEffect, useState, useRef } from "react";
// styled
import styled from "styled-components";
//axios
import axios from "axios";
//react router dom
import { useNavigate } from "react-router-dom";
// utils
import { allUsersRoute } from "@/utils/apiRoutes";
// socket io
import { io } from "socket.io-client";
//component
import CContact from "@/common/components/layout/Chat/CContact";
import Welcome from "@/common/components/layout/Chat/Welcome";
import ChatContainer from "@/common/components/layout/Chat/ChatContainer";
import CHeader from "@/common/components/layout/CHeader";
import Col from "antd/es/grid/col";
import { Row } from "antd";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #f5f7fb;
  .container {
    border-radius: 15px;
    height: 85vh;
    width: 100%;
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
      <CHeader />
      <Container>
        <Row className="container">
          <Col xs={5} sm={5} md={5} lg={5}>
            <CContact contacts={contacts} changeChat={handleChatChange} />
          </Col>
          <Col xs={1} sm={1} md={1} lg={1} />
          <Col xs={18} sm={18} md={18} lg={18}>
            {currentChat === undefined ? (
              <Welcome />
            ) : (
              <ChatContainer
                currentChat={currentChat}
                currentUser={currentUser}
                socketRef={socketRef}
              />
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Chat;
