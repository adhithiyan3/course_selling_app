const express = require('express');
const port = 3000;
const app = express();
const{adminRouter}=require("./routes/admin")
const{userRouter}=require("./routes/user")
const{courseRouter}=require("./routes/course")

app.use(express.json());
app.use("/admin" , adminRouter)
app.use("/user" , userRouter)
app.use("/course" , courseRouter)

app.listen(port,()=>{
    console.log(`server is running on port http://localhost:${port}`)
})