const mongoose = require("mongoose");

const DB =
  "mongodb+srv://vedant:vedant2730@cluster0.a2mpy.mongodb.net/mernstack?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(DB)
  .then(() => console.log("Database Connected"))
  .catch((err) => {
    console.log(err);
  });
