const express = require("express");
const router = express.Router({mergeParams:true});
const Item = require("../models/Item");
const adminAuth = require("../middleware/adminAuth");

router.get("/", adminAuth, async (req, res) => {
  try {
    const items = await Item.find({ owner: req.user });
    return res.json({ success: true, items });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
});

router.post("/", adminAuth, async (req, res) => {
    console.log("new");
  try {
    const { name, price, category, image, maxQuantity,company } = req.body;

    if (!name || !price || !category || !image || !maxQuantity || !company) {
      return res.status(400).json({ success: false, msg: "All fields are required" });
    }

    const newItem = new Item({
      name,
      price,
      category,
      image,
      maxQuantity,
      company,
      owner: req.user,
    });

    await newItem.save();
    return res.status(201).json({ success: true, msg: "Item added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
});

router.get("/:itemId", adminAuth, async (req, res) => {
  try {
    const { itemId } = req.params;
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ success: false, msg: "Item not found" });
    }

    return res.status(200).json({ success: true, item });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
});

router.put("/:itemId", adminAuth, async (req, res) => {
    console.log("put");
  try {
    const { itemId } = req.params;
    const { name, price, category, image, maxQuantity } = req.body;

    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      { name, price, category, image, maxQuantity },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ success: false, msg: "Item not found" });
    }

    return res.status(200).json({ success: true, msg: "Item updated successfully", item: updatedItem });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
});

router.delete("/:itemId", adminAuth, async (req, res) => {
  try {
    const { itemId } = req.params;
    const deleted = await Item.findByIdAndDelete(itemId);

    if (!deleted) {
      return res.status(404).json({ success: false, msg: "Item not found" });
    }

    return res.status(200).json({ success: true, msg: "Item deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
});

module.exports = router;
