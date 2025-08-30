const express = require('express');
const app = express();
const{adminRouter}=require("./routes/admin")
const{userRouter}=require("./routes/user")
const{courseRouter}=require("./routes/course")
require('dotenv').config()
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use("/admin" , adminRouter)
app.use("/user" , userRouter)
app.use("/course" , courseRouter)

app.listen(process.env.port,()=>{
    console.log(`server is running on port http://localhost:${process.env.port}`)
})