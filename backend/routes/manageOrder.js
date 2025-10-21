const express = require("express");
const router = express.Router({mergeParams:true});
const Order = require("../models/Order");
const Item = require("../models/Item");
const User = require("../models/User");
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");

router.post("/user/:itemId",auth,async (req,res)=>{
    try{
    let {name,quantity,company,totalPrice} = req.body;
    let{itemId} = req.params;

    let item = await Item.findById(itemId);
    if (quantity > item.maxQuantity) {
            return res.status(400).json({ msg: "Insufficient stock available", success: false });
    }
    item.maxQuantity -= quantity;
    await item.save();
    const newOrder = new Order({name,quantity,company,totalPrice,image:item.image});
    newOrder.owner = item.owner;
    newOrder.item = itemId;
    newOrder.user = req.user;
    await newOrder.save();

    const user = await User.findByIdAndUpdate(req.user,{$pull:{cart:{itemId:itemId}}},{new:true});
    return res.status(200).json({msg:"order successfully done",success:true});
    }
    catch(err){
        return res.status(500).json({msg:"server error",success:false});
    }
});

router.get("/user",auth,async (req,res)=>{
    try{
    const orders = await Order.find({user:req.user}).sort({ createdAt: -1 });

    if(!orders){
        return res.status(402).json({msg:"order not found",success:false});
    }

    return res.status(200).json({orders,success:true});
    }
    catch(err){
        return res.status(500).json({msg:"server error",success:false});
    }
});

router.get("/admin",adminAuth,async (req,res)=>{
    try{
    const orders = await Order.find({owner:req.user}).sort({ createdAt: -1 });

    if(!orders){
        return res.status(402).json({msg:"order not found",success:false});
    }

    return res.status(200).json({orders,success:true});
    }
    catch(err){
        return res.status(500).json({msg:"server error",success:false});
    }
});

router.post("/admin/:orderId",adminAuth,async(req,res)=>{
    console.log("update");
    try{
        let {orderId} = req.params;
        let {status} = req.body;
        const order = await Order.findById(orderId);
        order.status = status;
        await order.save();
        return res.status(200).json({msg:"order updated",success:true});
    }
    catch(err){
        return res.status(500).json({msg:"server error",success:false});
    }
});

router.post("/user/cancel/:orderId",auth,async(req,res)=>{
    console.log("cancel");
    try{
        let {orderId} = req.params;
        let {status} = req.body;
        const order = await Order.findById(orderId);
        const item = await Item.findById(order.item);
        item.maxQuantity+=order.quantity;
        await item.save();
        if (!order) return res.status(404).json({ msg: "Order not found", success: false });
        if (!["pending", "processing"].includes(order.status)) {
            return res.status(400).json({ msg: "Cannot cancel this order", success: false });
        }
        order.status = status;
        await order.save();
        return res.status(200).json({msg:"order cancelled",success:true});
    }
    catch(err){
        return res.status(500).json({msg:"server error",success:false});
    }
});

module.exports = router;