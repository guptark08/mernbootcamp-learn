require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {} = require("./controllers/auth");
const authRoutes = require("./routes/auth");


//connect to the DB
mongoose.connect("mongodb://localhost:27017/tshirt", 
{   useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED");
}).catch(() => {
    console.log("DB NOT CONNECTED");
});


// this is my middleware
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

//my routes
app.use("/api", authRoutes);
// all okay yes ma'am thank you all working fine
// my port address
const port = process.env.PORT;

//console log thing
app.listen(port, () => {
    console.log(`app is running at ${port}`);
});
