import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const [passShow,setPassShow]=useState(false)

    const [inpval,setInpVal]=useState({
        fname:"",
        email:"",
        password:"",
        cpassword:""
    })

    const setVal=(e)=>{
        const {name,value}=e.target;

        setInpVal(()=>{
            return {
                ...inpval,
                [name]:value
            }
        })
    }

    const adduser=async ()=>{
        const {fname,email,password,cpassword}=inpval;

        if(fname===""){
            toast.error("Name cannot be empty")
        }else if(email===""){
            toast.error("Email cannot be empty")
        }else if(!email.includes("@")){
            toast.error("Enter valid email")
        }else if(password===""){
            toast.error("password cannot be empty")
        }else if(password.length<6){
            toast.error("Password must be of 6 characters")
        }else if(cpassword===""){
            toast.error("Confirm password cannot be empty")
        }else if(cpassword.length<6){
            toast.error("Confirm password must be of 6 characters")
        }else if (password !== cpassword){
            toast.error("Confirm password does not match with original password")
        }else{

          const data =await fetch("http://localhost:3000/register",{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
              fname,email,password,cpassword
            })
          })

          const res=await data.json();
          console.log(res)

          if(res.status===201){
            toast.success("User registered successfully")
            setInpVal({...inpval,fname:"",email:"",password:"",cpassword:""})
          }
        }
    }

  return (
    <div className="w-1/2 p-5 mx-auto mt-14">
        <ToastContainer/>
      <h1 className="text-4xl font-bold text-blue-950 text-center">
        Sign Up
      </h1>
      <p className="text-center mt-2">
        We are glad that you will be using our services! We hope you will like it.
      </p>
      <div className="mt-10 w-full flex justify-center">
        <TextField
          id="filled-basic"
          label="Name"
          variant="filled"
          sx={{ width: "70%" }}
          name="fname"
          onChange={setVal}
          value={inpval.fname}
        />
      </div>
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
            onClick={(e)=>setPassShow(!passShow)}
          >
            {!passShow ? 'Show' : 'Hide'}
          </button>
        </div>
        <TextField
          id="filled-basic"
          label="Password"
          variant="filled"
          sx={{ width: "70%" }}
          type={`${!passShow ? 'password' : 'text'}`}
          name="password"
          onChange={setVal}
          value={inpval.password}
        />
      </div>
      <div className="mt-10 w-full flex justify-center relative">
        <div className="absolute top-3 right-24 z-10">
          <button
            className="px-3 py-1 rounded-sm bg-slate-300 text-slate-600 font-semibold"
            onClick={(e)=>setPassShow(!passShow)}
          >
            {!passShow ? 'Show' : 'Hide'}
          </button>
        </div>
        <TextField
          id="filled-basic"
          label="Confirm Password"
          variant="filled"
          sx={{ width: "70%" }}
          type={`${!passShow ? 'password' : 'text'}`}
          name="cpassword"
          onChange={setVal}
          value={inpval.cpassword}
        />
      </div>
      <div className="mt-10 w-full flex justify-center">
        <Button variant="contained" className="w-[70%]" sx={{fontWeight:"bold",fontSize:"18px"}} onClick={adduser}>
          Register
        </Button>
      </div>
      <p className="mt-3 text-center">
        Already have an account?
        <Link to={'/'} className="underline text-blue-600 font-semibold ml-2">Login</Link>
      </p>
    </div>
  );
}

export default Register;
