import React from "react";
import { PhoneOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VideoCall = () => {
  const navigate = useNavigate();
  const handleJoin = () => {
    // axios.get(`http://localhost:5000/join`).then((res) => {
    //   navigate(`/join/${res.data.link}?
    //        quality=${quality}`);
    // });
  };
  return (
    <div>
      <PhoneOutlined onClick={handleJoin} />
    </div>
  );
};

export default VideoCall;
