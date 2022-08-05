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
import { loginRoute } from "../utils/apiRoutes";
import { loginValidator, usernameValidator } from "../utils/messageValidator";
//component
import FormContainer from "../components/FormContainer";
//react-hook-form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// login schema
const LoginSchema = yup.object().shape({
  username: yup.string().required().min(3),
  password: yup.string().required(),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
    mode: "onChange",
  });
  const [values, setValues] = useState({
    username: "",
    password: "",
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
    const { password, username } = values;
    const { data } = await axios.post(loginRoute, {
      username,
      password,
    });
    console.log(data);

    if (data.status) {
      localStorage.setItem(
        process.env.REACT_APP_LOCALHOST_KEY,
        JSON.stringify(data.user)
      );
      toast.success("Sign In Success");
      navigate("/");
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
            <h1>snappy</h1>y
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
          {errors.username ? (
            <p>{usernameValidator}</p>
          ) : errors.password ? (
            <p>{loginValidator}</p>
          ) : (
            ""
          )}
          <input
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="off"
            {...register("password", {
              onChange: (event) => handleChange(event),
            })}
          />
          {errors.password && <p>{loginValidator}</p>}

          <button type="submit">Sign In</button>
          <span>
            Dont't have an account ? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
    </>
  );
};

export default Login;
