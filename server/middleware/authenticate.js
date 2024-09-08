const jwt = require("jsonwebtoken");
const userModel = require("../models/userSchema");
const secretkey = "88950236997612403019742353623963";

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    const jwtverify=jwt.verify(token,secretkey);
    const rootUser=await userModel.findOne({_id:jwtverify._id})

    if(!rootUser){throw new Error("User not found")}

    req.token=token;
    req.rootUser=rootUser;
    req.userId=rootUser._id;

    next();
  } catch (error) {
    res.status(401).json({status:401,message:"Unauthorized request"})
  }
};

module.exports = authenticate;
