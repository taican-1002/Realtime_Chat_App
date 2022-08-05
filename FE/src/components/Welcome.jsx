//react
import React, { useState, useEffect } from "react";
//styled
import styled from "styled-components";
//img
import robot from "../assets/robot.gif";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;

const Welcome = () => {
  const [username, setUsername] = useState(undefined);

  //set Username
  useEffect(() => {
    const handleSetUsername = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setUsername(data.username);
    };
    handleSetUsername();
  }, []);

  return (
    <Container>
      <img src={robot} alt="robot" />
      <h1>
        Welcome, <span>{username}</span>
      </h1>
      <h3>Please select a chat to Start Messaging.</h3>
    </Container>
  );
};

export default Welcome;
