//react
import React from "react";
//styled
import styled from "styled-components";
//react icons
import { BiPowerOff } from "react-icons/bi";
//axios
import axios from "axios";
//utils
import { logoutRoute } from "../utils/apiRoutes";
//react router dom
import { useNavigate } from "react-router-dom";
//toast
import { toast } from "react-toastify";

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;

const Logout = () => {
  const navigate = useNavigate();

  // logout
  const handleLogout = async () => {
    const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      toast.success("Logout success");
      navigate("/login");
    }
  };
  return (
    <Button onClick={handleLogout}>
      <BiPowerOff />
    </Button>
  );
};

export default Logout;
