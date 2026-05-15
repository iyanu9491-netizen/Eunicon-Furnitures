const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 6060;
const userRouter = require('./routes/user');

const app = express();
app.use(express.json());
app.use('/api/v1/', userRouter);


const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to Database");
    app.listen(PORT, () => {
       console.log(`Server is listening to Port:${PORT}`);
});
  }).catch((error) => {
    console.log("Unable to connect:", error.message);
  });
  