import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [flag, setflag] = useState(false);
  const [passStatus, setPassStatus] = useState("show");

  const [inpval, setInpVal] = useState({
    email: "",
    password: "",
  });

  const setVal = (e) => {
    const { name, value } = e.target;

    setInpVal(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const loginUser=async ()=>{
    const {email,password}=inpval;
    if(email===""){
        toast.error("Email cannot be empty")
    }else if(!email.includes("@")){
        toast.error("Enter valid email")
    }else if(password===""){
        toast.error("password cannot be empty")
    }else if(password.length<6){
        toast.error("Password must be of 6 characters")
    }else{

      const data =await fetch("http://localhost:3000/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email,password
        })
      })

      const res=await data.json();
      // console.log(res)

      

      if(res.status===201){
        localStorage.setItem("usertoken",res.result.token)
        toast.success("User logged in successfully")
        setInpVal({...inpval,email:"",password:""})
      }
    }
  }

  const handlePassStatus = () => {
    setflag(!flag);

    if (flag) {
      setPassStatus("hide");
    } else {
      setPassStatus("show");
    }
  };
  return (
    <div className="w-1/2 p-5 mx-auto mt-14">
        <ToastContainer/>
      <h1 className="text-4xl font-bold text-blue-950 text-center">
        Welcome Back, Log In
      </h1>
      <p className="text-center mt-2">
        Hi, we are glad you are back. Please Login
      </p>
      <div className="mt-10 w-full flex justify-center">
        <TextField
          id="filled-basic"
          label="Email"
          variant="filled"
          sx={{ width: "70%" }}
          name="email"
          onChange={setVal}
          value={inpval.email}
        />
      </div>
      <div className="mt-10 w-full flex justify-center relative">
        <div className="absolute top-3 right-24 z-10">
          <button
            className="px-3 py-1 rounded-sm bg-slate-300 text-slate-600 font-semibold"
            onClick={handlePassStatus}
          >
            {passStatus === "show" ? "Show" : "Hide"}
          </button>
        </div>
        <TextField
          id="filled-basic"
          label="Password"
          variant="filled"
          sx={{ width: "70%" }}
          type={`${passStatus === "show" ? "password" : "text"}`}
          name="password"
          onChange={setVal}
          value={inpval.password}
        />
      </div>
      <div className="mt-10 w-full flex justify-center">
        <Button
          variant="contained"
          className="w-[70%]"
          sx={{ fontWeight: "bold", fontSize: "18px" }}
          onClick={loginUser}
        >
          Log In
        </Button>
      </div>
      <p className="mt-3 text-center">
        Don't have an account?
        <Link
          to={"/register"}
          className="underline text-blue-600 font-semibold ml-2"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default Login;
