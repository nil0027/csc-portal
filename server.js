const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>console.log("MongoDB connected"))
  .catch(err=>console.log(err));

// Schemas & Models
const Service = mongoose.model("Service", new mongoose.Schema({ name: String }));
const Form = mongoose.model("Form", new mongoose.Schema({ name: String, phone: String, service: String }));
const Complaint = mongoose.model("Complaint", new mongoose.Schema({ name: String, phone: String, message: String }));
const Admin = mongoose.model("Admin", new mongoose.Schema({ username: String, password: String }));

// Routes
app.get("/api/services", async (req,res)=>{ 
  const services = await Service.find();
  res.json(services);
});

app.post("/api/forms", async (req,res)=>{
  const form = new Form(req.body);
  await form.save();
  res.json({success:true, message:"Form submitted successfully"});
});

app.post("/api/complaints", async (req,res)=>{
  const complaint = new Complaint(req.body);
  await complaint.save();
  res.json({success:true, message:"Complaint submitted"});
});

app.post("/api/admin/login", async (req,res)=>{
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });
  if(admin) res.json({success:true});
  else res.json({success:false, message:"Invalid login"});
});

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, ()=>console.log(`Server running on port ${port}`));
           
