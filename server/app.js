const express=require("express");
const app=express();
const router=require("./routes/router")
const cors=require("cors")
const cookieParser=require("cookie-parser");
require("./db/conn")
const PORT=3000;

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(router)

app.listen(PORT,()=>{
  console.log(`Server running as PORT ${PORT}`)
})