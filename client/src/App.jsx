import React, { useContext, useEffect, useState } from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { LoginContext } from "./ContextProvider/Context";

function App() {
  const location = useLocation();

  const [data, setData] = useState(false);

  const { logindata, setlogindata } = useContext(LoginContext);
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
      navigate("/error");
    } else {
      setlogindata(data);
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      dashboardValid();
      setData(true)
    }, 3000);
  }, []);
  return (
    <div className="w-full h-screen">
      {data ? (
        <>
          {location.pathname !== "/error" && <Header />}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/error" element={<Error />} />
          </Routes>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            width: "100vw",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}

export default App;
