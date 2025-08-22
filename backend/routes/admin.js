const { Router } = require('express');
const adminRouter = Router();
const{adminmodel} = require("../db")
const { coursemodel } = require("../db");
const jwt = require('jsonwebtoken')
const jwt_secret = "aadhi161004"
const { z } = require("zod");
const bcrypt = require("bcrypt")


const admimsignupSchema = z.object({
   email: z.string().email("Invalid email format"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
  firstname: z.string().min(3, "First name must be at least 3 characters"),
  lastname: z.string().min(1, "Last name is required")
})

adminRouter.post("/signup", async (req, res) => {

   const validationOfInput = admimsignupSchema.safeParse(req.body);
   if(!validationOfInput.success){
      return res.status(403).json({
         message:"validation failed",
         errors:validationOfInput.error.errors
      })
   }
  const { email, password, firstname, lastname } = validationOfInput.data;
  
  try {
     const hashedPassword = await bcrypt.hash(password ,10)
    await adminmodel.create({
      email,
      password:hashedPassword,   
      firstname,
      lastname,
    });

    res.send("Successfully signed up");
  } catch (e) {
    console.error(e); 
    res.status(403).json({
      message: "Signup failed. Please check your input or try again later.",
      error: e.message, 
    });
  }
});
adminRouter.post('/signin', async function (req, res) {
  const { email, password } = req.body;

  try {

    const admin = await adminmodel.findOne({ email });
    console.log(admin)
    if (!admin) {
      return res.status(403).json({ message: "Invalid email or password" });

    }
    const passwordValid = await bcrypt.compare(password,admin.password);
    if(!passwordValid){
      return res.status(403).json({ message: "Invalid email or password" });
    }

  
    const token = jwt.sign({ id: admin._id }, jwt_secret);

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



adminRouter.post("/createcourse", async function (req, res) {
  const { title, description, price, imageUrl, creatorId } = req.body;

  try {
    const course = await coursemodel.create({
      title,
      description,
      price,
      imageUrl,
      creatorId,
    });

    res.json({ message: "Course created successfully", course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create course", error: err.message });
  }
});

adminRouter.get("/viewcourses", async function (req, res) {
  try {
    const courses = await coursemodel.find({});
    res.json({ courses });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch courses", error: err.message });
  }
});


adminRouter.put("/modifycourse/:id", async function (req, res) {
  const { id } = req.params;
  const { title, description, price, imageUrl } = req.body;

  try {
    const updatedCourse = await coursemodel.findByIdAndUpdate(
      id,
      { title, description, price, imageUrl },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "Course updated successfully", updatedCourse });
  } catch (err) {
    res.status(500).json({ message: "Failed to update course", error: err.message });
  }
});


adminRouter.delete("/deletecourse/:id", async function (req, res) {
  const { id } = req.params;

  try {
    const deletedCourse = await coursemodel.findByIdAndDelete(id);
   
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete course", error: err.message });
  }
});



module.exports={
    adminRouter: adminRouter
}