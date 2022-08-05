//react
import React, { useState, useEffect } from "react";
//react router dom
import { Link, useNavigate } from "react-router-dom";
//img
import Logo from "../assets/logo.svg";
//toast
import { toast } from "react-toastify";
//axios
import axios from "axios";
//utils
import { registerRoute } from "../utils/apiRoutes";
//component
import FormContainer from "../components/FormContainer";
//react-hook-form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  usernameValidator,
  emailValidator,
  passwordValidator,
  samePasswordValidator,
} from "../utils/messageValidator";

//register schema
const RegisterSchema = yup.object().shape({
  username: yup.string().required().min(3),
  email: yup.string().required().min(0),
  password: yup.string().required().min(8),
  confirmPassword: yup
    .string()
    .required(samePasswordValidator)
    .oneOf([yup.ref("password")], samePasswordValidator),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
    mode: "onChange",
  });
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  //check login
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, [navigate]);

  //handle change
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  //handle submit
  const onSubmit = async () => {
    const { password, username, email } = values;
    const { data } = await axios.post(registerRoute, {
      username,
      email,
      password,
    });
    if (data.status) {
      toast.success("Create User Success");
      navigate("/login");
    } else {
      toast.error(data.msg);
    }
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>snappy</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            autoComplete="off"
            {...register("username", {
              onChange: (event) => handleChange(event),
            })}
          />
          {errors.username && <p>{usernameValidator}</p>}
          <input
            type="email"
            placeholder="Email"
            name="email"
            autoComplete="off"
            {...register("email", {
              onChange: (event) => handleChange(event),
            })}
          />
          {errors.email && <p>{emailValidator}</p>}
          <input
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="off"
            {...register("password", {
              onChange: (event) => handleChange(event),
            })}
          />
          {errors.password && <p>{passwordValidator}</p>}
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            autoComplete="off"
            {...register("confirmPassword", {
              onChange: (event) => handleChange(event),
            })}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword?.message}</p>}

          <button type="submit">Create User</button>
          <span>
            already have an account ? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
    </>
  );
};

export default Register;
