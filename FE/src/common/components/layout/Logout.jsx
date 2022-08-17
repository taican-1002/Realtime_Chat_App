//react
import React from "react";
//axios
import axios from "axios";
//utils
import { logoutRoute } from "../../../utils/apiRoutes";
//react router dom
import { useNavigate } from "react-router-dom";
//toast
import { toast } from "react-toastify";
//antd
import { Button } from "antd";

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
  return <Button onClick={handleLogout}>Logout</Button>;
};

export default Logout;
