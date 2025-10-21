const mongoose = require("mongoose");
const Item = require("../models/Item.js");
const sampleData = require("./dummy.js");

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://prajapatmihir100_db_user:R6tNDxwpDk7CmFQR@e-commerce.zyfthps.mongodb.net/?retryWrites=true&w=majority&appName=E-commerce");
    console.log("✅ Connected with MongoDB");

    // Clear previous items (optional, useful for clean seeding)
    await Item.deleteMany({});
    console.log("🧹 Existing data cleared");

    // Insert dummy items
    const result = await Item.insertMany(sampleData.data);
    console.log("✅ Data inserted successfully!");
    console.log(result);

  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    // Always close connection after work
    mongoose.connection.close();
  }
}

main();
