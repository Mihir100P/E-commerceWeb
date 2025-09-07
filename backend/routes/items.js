const express = require("express");
const Item = require("../models/Item");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const items = await Item.find({});
    res.json({ success: true, items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, items: [], message: "Server error" });
  }
});

router.get("/search", async (req, res) => {
  try {
    const search = req.query.q?.trim();
    if (!search) {
      return res.json({ success: true, items: [] });
    }

    const items = await Item.find({
      name: { $regex: search, $options: "i" },
    });

    res.json({ success: true, items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, items: [], message: "Server error" });
  }
});


module.exports = router;
