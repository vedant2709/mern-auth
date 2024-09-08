import React, { useContext, useEffect, useState } from "react";
import userImage from "../images/man.png";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../ContextProvider/Context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Dashboard() {
  const { logindata, setlogindata } = useContext(LoginContext);
  const [data, setData] = useState(false);
  const navigate = useNavigate();
  const dashboardValid = async () => {
    let token = localStorage.getItem("usertoken");
    console.log(token);

    const res = await fetch("http://localhost:3000/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data.status == 401 || !data) {
      console.log("user not valid")
    } else {
      setlogindata(data);
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      dashboardValid();
      setData(true);
    }, 3000);
  }, []);
  return (
    <div className="w-full h-[50vh]">
      {data ? (<div className="w-full   flex justify-center mt-24 flex-col gap-3 items-center">
      <img
        src={userImage}
        alt="user"
        className="w-[10vw] h-[10vw] object-cover"
      />
      <h1 className="text-3xl font-semibold">
        User Email :
        <span className="text-blue-900">
          {logindata && logindata.user.email}
        </span>
      </h1>
    </div>):
    (<Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>)}
    </div>
  );
}

export default Dashboard;
