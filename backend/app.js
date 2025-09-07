if(process.env.NODE_ENV != "Production"){
    require("dotenv").config();
}

const express = require("express");
const mongoose  = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));

if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: "http://localhost:5173", credentials: true }));
}

const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log("App is running on port 8080");
});

const atlasurl = process.env.ATLAS_URL;
async function main(){
    await mongoose.connect(atlasurl);
}
main().then((res)=>{
    console.log("Connected with DB");
})
.catch((err)=>{
    console.log(err);
});

const authRoutes = require("./routes/auth");
const itemRoutes = require("./routes/items");
const cartRoutes = require("./routes/cart");

app.use("/api/user", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/cart", cartRoutes);


app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

