const { Router } = require('express');
const userRouter = Router();
const { usermodel } = require("../db")
const jwt = require('jsonwebtoken')
const { z } = require('zod');
const bcrypt = require("bcrypt")
const {jwt_user_secret } =require('../config')

const signupSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
  firstname: z.string().min(3, "First name must be at least 3 characters"),
  lastname: z.string().min(1, "Last name is required")
});

userRouter.post("/signup", async (req, res) => {
  const validation = signupSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: validation.error.errors,
    });
  }
  const { email, password, firstname, lastname } = validation.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await usermodel.create({
      email,
      password: hashedPassword,
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
userRouter.post('/signin', async function (req, res) {
  const { email, password } = req.body;

  try {

    const user = await usermodel.findOne({ email });
    console.log(user)
    if (!user) {
      return res.status(403).json({ message: "Invalid email or password" });
    }
    const validpassword = await bcrypt.compare(password, user.password)
    if (!validpassword) {
      return res.status(403).json({ message: "Invalid email or password" });
    }


    const token = jwt.sign({ id: user._id }, jwt_user_secret);

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = {
  userRouter: userRouter
}