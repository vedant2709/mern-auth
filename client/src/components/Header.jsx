import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import { LoginContext } from "../ContextProvider/Context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const { logindata, setlogindata } = useContext(LoginContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const goError = () => {
    navigate("/error");
  };
  const goDash = () => {
    navigate("/dashboard");
  };


  const logoutuser=async ()=>{
    let token = localStorage.getItem("usertoken");

    const res = await fetch("http://localhost:3000/logout", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          Accept:"application/json"
      },
  });

    const data = await res.json();

    if(data.status==201){
      localStorage.removeItem("usertoken")
      setlogindata(false)
      navigate("/")
    }else{
      console.log("error")
    }
  }

  return (
    <div className="w-full px-10 py-3 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">NyuGen Tech</h1>
      {logindata.user ? (
        <Avatar
          sx={{
            backgroundColor: "salmon",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={handleClick}
        >
          {logindata.user.fname[0].toUpperCase()}
        </Avatar>
      ) : (
        <Avatar
          sx={{
            backgroundColor: "blue",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={handleClick}
        />
      )}

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {logindata.user ? (
          <>
            <MenuItem
              onClick={() => {
                goDash();
                handleClose();
              }}
            >
              Profile
            </MenuItem>
            <MenuItem onClick={()=>{
              logoutuser()
              handleClose()
            }
            }>Logout</MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              onClick={() => {
                goError();
                handleClose();
              }}
            >
              Profile
            </MenuItem>
          </>
        )}
      </Menu>
    </div>
  );
}

export default Header;
