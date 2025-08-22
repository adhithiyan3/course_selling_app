const { Router } = require('express');
const courseRouter = Router();
const{coursemodel} = require("../db")
const{purchasemodel} = require("../db")


courseRouter.post('/purchuse',async function(req, res){
   try {
    const { userId, courseId } = req.body;

    const purchase = await purchasemodel.create({ userId, courseId });

    res.json({ message: "Course purchased successfully", purchase });
  } catch (err) {
    res.status(500).json({ message: "Failed to purchase course", error: err.message });
  }
})
courseRouter.get('/preview',async function(req, res){
     try {
    const courses = await coursemodel.find({});
    res.json({ courses });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch courses", error: err.message });
  }
})

module.exports={
    courseRouter: courseRouter
}