const mongoose = require("mongoose");
const Restaurant = require("../restaurant");
const restaurantData = require("../../restaurant.json").results;

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;

db.on("error", () => {
  console.log("MongoDB connect error!");
});

db.once("open", () => {
  console.log("mongodb connected! and creating seeds..");

  Restaurant.create(restaurantData)
    .then(() => {
      console.log("Done!");
      db.close();
    })
    .catch((error) => console.log(error));
});
