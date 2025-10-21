const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const router = express.Router();

router.post("/signup", async (req, res) => {
    console.log('recieved');
  const { name, email,companyname, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ msg: "Email already in use", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ name, email, companyname, password: hashedPassword });
    await newAdmin.save();

    const payload = { id: newAdmin._id,role: "admin",name: newAdmin.name, company:newAdmin.companyname, email: newAdmin.email };
    const token = jwt.sign(payload, process.env.JWT_ADMIN_SECRET, { expiresIn: "2h" });

    res.json({ msg: "Admin registered", success: true, token, admin: payload });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", success: false });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ msg: "Admin not found", success: false });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials", success: false });

    const payload = { id: admin._id,role: "admin", name: admin.name, email: admin.email };
    const token = jwt.sign(payload, process.env.JWT_ADMIN_SECRET, { expiresIn: "1h" });

    res.json({ token, admin: payload, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", success: false });
  }
});

module.exports = router;
