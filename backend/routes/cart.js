const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).populate("cart.itemId");
    res.json({ cart: user.cart, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", success: false });
  }
});

router.post("/add/:itemId", auth, async (req, res) => {
  try {
    const { itemId } = req.params;
    const quantity = req.body.quantity || 1;

    const user = await User.findById(req.user);

    const itemIndex = user.cart.findIndex(c => c.itemId.toString() === itemId);
    if (itemIndex > -1) {
      user.cart[itemIndex].quantity += quantity;
    } else {
      user.cart.push({ itemId, quantity });
    }

    await user.save();
   return res.json({
      cart: user.cart,
      success: true,
      message: "Item added to cart successfully"
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while adding item "
    });
  }
});

router.post("/update/:itemId", auth, async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    const user = await User.findById(req.user);

    const itemIndex = user.cart.findIndex(c => c.itemId.toString() === itemId);
    if (itemIndex > -1) {
      if (quantity > 0) {
        user.cart[itemIndex].quantity = quantity; 
      } else {
        user.cart.splice(itemIndex, 1); 
      }
    }

    await user.save();
    res.json({ cart: user.cart, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", success: false });
  }
});


router.post("/remove", auth, async (req, res) => {
  try {
    const { itemId } = req.body;
    const user = await User.findById(req.user);
    user.cart = user.cart.filter(c => c.itemId.toString() !== itemId);
    await user.save();
    
    await user.populate("cart.itemId");

    res.json({ success: true, cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

module.exports = router;
