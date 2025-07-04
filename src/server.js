const express=require('express');
const connectDB=require('./config/db');
const session=require('express-session');
const userRoutes=require('./routes/userRoutes')
require('dotenv').config();
connectDB();
const app=express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Configure session
app.use(
  session({
    secret: process.env.secret, //REplace with a secure key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set true in production with HTTPS
  })
);
app.use('/auth',userRoutes)
const PORT=process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`Server is running on the port${PORT}`);
});
