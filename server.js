const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT

const app = express();
app.use(express.json());


const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI2).then(() => {
    console.log("Connected to Database");
    app.listen(PORT, () => {
       console.log(`Server is listening to Port:${PORT}`);
});
  }).catch((error) => {
    console.log("Unable to connect:", error.message);
  });
 