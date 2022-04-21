//Schema實體
const Restaurant = require("../restaurant");
//data資料
const restaurantData = require("../../restaurant.json").results;

const db = require("../../config/mongoose");

db.once("open", () => {
  console.log("mongodb connected! and creating res seeds..");
  //Schema + data 實體 =格式化的資料
  Restaurant.create(restaurantData)
    .then(() => {
      console.log("Done!");
      db.close();
    })
    .catch((error) => console.log(error));
});
