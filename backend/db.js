const mongoose = require("mongoose");
require("dotenv").config();


mongoose.connect(process.env.DB_URL)

const Schema = mongoose.Schema;


const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstname: String,
  lastname: String,
});

const adminSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstname: String,
  lastname: String,
});


const courseSchema = new Schema({
  title:{ type: String, required: true },
  description:{ type: String, required: true} ,
  price: { type: Number, required: true},
  imageUrl:{ type: String, required: true},
  creatorId: { type: Schema.Types.ObjectId, ref: "admin" },
});


const purchaseSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  courseId: { type: Schema.Types.ObjectId, ref: "course" },
});

const usermodel = mongoose.model("user", userSchema);
const adminmodel = mongoose.model("admin", adminSchema);
const coursemodel = mongoose.model("course", courseSchema);
const purchasemodel = mongoose.model("purchase", purchaseSchema);

module.exports = {
  usermodel,
  adminmodel,
  coursemodel,
  purchasemodel,
};
