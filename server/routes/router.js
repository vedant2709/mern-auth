const express = require("express");
const router = new express.Router();
const userModel = require("../models/userSchema");
const authenticate = require("../middleware/authenticate");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretkey = "88950236997612403019742353623963";

// user registration
router.post("/register", async (req, res) => {
  const { fname, email, password, cpassword } = req.body;

  if (!fname || !email || !password || !cpassword) {
    res.status(422).json({ error: "fill all the details" });
  }

  try {
    const preuser = await userModel.findOne({ email: email });

    if (preuser) {
      res
        .status(422)
        .json({ error: "This email already exists. Try with anotther" });
    } else if (password !== cpassword) {
      res
        .status(422)
        .json({ error: "Password and Confirm password does not match" });
    } else {
      const finaluser = new userModel({
        fname,
        email,
        password,
        cpassword,
      });

      const storedData = await finaluser.save();
      //   console.log(storedData)

      res.status(201).json({ status: 201, storedData });
    }
  } catch (error) {
    res.status(422).json(error);
  }
});

// user login
router.post("/login", async (req, res) => {
  //   console.log(req.body)

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(422).json({ error: "fill all the details" });
  }

  try {
    const user = await userModel.findOne({ email: email });
    // console.log(user)

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.status(422).json({ error: "Entered Password is not correct" });
      } else {
        // generate jwt token

        try {
          const token = jwt.sign({ _id: user._id }, secretkey);
          user.tokens = user.tokens.concat({ token: token });
          await user.save();
          // console.log(token);

          
          const result = {
            user,
            token,
          };

          res.status(201).json({ status: 201, result });
          // cookiegenerate
          res.cookie("usercookie", token, {
            expires: new Date(Date.now() + 9000000),
            httpOnly: true,
          });
        } catch (error) {
          res.status(422).json(error);
        }
      }
    }
  } catch (error) {
    res.status(422).json({ error: "something went wrong" });
  }
});

router.get("/validuser", authenticate, async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.userId });
    res.status(201).json({ status: 201, user });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

// user logout

router.get("/logout",authenticate,async(req,res)=>{
  console.log(req.token);
  try {
    // req.rootUser.tokens=req.rootUser.tokens.filter((currelem)=>{
    //   return currelem.token!==req.token
    // })
    req.rootUser.tokens.splice(0,req.rootUser.tokens.length)

    res.clearCookie("usercookie",{path:'/'})

    req.rootUser.save();

    res.status(201).json({status:201})
  } catch (error) {
    res.status(401).json({status:401,error})
  }
})
module.exports = router;
