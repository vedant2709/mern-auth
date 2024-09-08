import React from "react";
import errorimage from "../images/error.jpg";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="w-full h-full flex justify-center items-center gap-3 flex-col">
      <img src={errorimage} alt="" className="w-[50%] h-[90%] object-cover" />
      <Link to={'/'}>
        <Button variant="contained">Go to Home</Button>
      </Link>
    </div>
  );
}

export default Error;
