const Restaurant = require("../restaurant");
const restaurantData = require("../../restaurant.json").results;

const db = require("../../config/mongoose");

db.once("open", () => {
  console.log("mongodb connected! and creating seeds..");

  Restaurant.create(restaurantData)
    .then(() => {
      console.log("Done!");
      db.close();
    })
    .catch((error) => console.log(error));
});
