const mongoose = require("mongoose");
const Item = require("../models/Item.js");
const sampleData = require("./dummy.js");

async function main(){
    await mongoose.connect("...")
}
main().then((res)=>{
    console.log("Connected with DB");
})
.catch((err)=>{
    console.log(err);
});

Item.insertMany(sampleData.data).then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
});

